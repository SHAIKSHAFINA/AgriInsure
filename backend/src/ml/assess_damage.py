
import pandas as pd
import joblib
import json
import sys
import os
from collections import Counter

def assess_farm_flood_damage(df, field_area_acres, crop_type, model_data):
    """
    Assess flood damage and calculate recommended insurance for a single farm
    """
    # Payout rates
    SEVERE_PAYOUT_RATE = 0.90
    MODERATE_PAYOUT_RATE = 0.60

    # Severity thresholds
    HIGH_SEVERITY_THRESHOLD = 50
    MEDIUM_SEVERITY_THRESHOLD = 30

    model = model_data['model']
    features = model_data['features']
    
    # Ensure all required features are present, fill with 0 if not
    for feature in features:
        if feature not in df.columns:
            df[feature] = 0
            
    # Reorder columns to match model's expectation
    df = df[features]
    
    # Predict severity
    preds = model.predict(df)
    df['predicted_severity'] = preds
    
    # Severity label mapping (0, 1, 2 used in your model)
    severity_map = {2: 'Severely Damaged', 1: 'Moderately Damaged', 0: 'Not Damaged'}
    df['severity_label'] = df['predicted_severity'].map(severity_map)
    
    # Percentage calculations
    total_points = len(preds)
    count_severe = (df['predicted_severity'] == 2).sum()
    count_moderate = (df['predicted_severity'] == 1).sum()
    count_not = (df['predicted_severity'] == 0).sum()
    
    severely_damaged_pct = (count_severe / total_points) * 100 if total_points > 0 else 0
    moderately_damaged_pct = (count_moderate / total_points) * 100 if total_points > 0 else 0
    slightly_damaged_pct = 0  # Not in your trained model; set to zero
    not_damaged_pct = (count_not / total_points) * 100 if total_points > 0 else 0
    
    # Crop base values (Rs per acre)
    crop_values = {
        'paddy': 15000, 'cotton': 20000,
        'maize': 12000, 'sugarcane': 25000,
        'other': 10000
    }
    base_value = crop_values.get(crop_type.lower(), crop_values['other'])
    
    # Payout calculation
    payout_rate = (
        (severely_damaged_pct * SEVERE_PAYOUT_RATE) +
        (moderately_damaged_pct * MODERATE_PAYOUT_RATE)
    ) / 100
    
    total_payout = float(field_area_acres) * base_value * payout_rate
    
    # Overall severity logic
    if severely_damaged_pct > HIGH_SEVERITY_THRESHOLD:
        overall_damage_severity = 'High'
    elif moderately_damaged_pct > MEDIUM_SEVERITY_THRESHOLD:
        overall_damage_severity = 'Medium'
    else:
        overall_damage_severity = 'Low'
        
    # Report structure
    result = {
        'total_points_analyzed': total_points,
        'severely_damaged_percent': severely_damaged_pct,
        'moderately_damaged_percent': moderately_damaged_pct,
        'slightly_damaged_percent': slightly_damaged_pct,
        'not_damaged_percent': not_damaged_pct,
        'recommended_payout_rs': total_payout,
        'base_crop_value_per_acre': base_value,
        'overall_damage_severity': overall_damage_severity
    }
    return result

if __name__ == "__main__":
    try:
        if len(sys.argv) != 5:
            print(json.dumps({"error": "Usage: python assess_damage.py <farm_csv_path> <field_area_acres> <crop_type> <model_path>"}))
            sys.exit(1)

        farm_csv_path = sys.argv[1]
        field_area_acres = float(sys.argv[2])
        crop_type = sys.argv[3]
        model_path = sys.argv[4]
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}.")

        if not os.path.exists(farm_csv_path):
            raise FileNotFoundError(f"CSV file not found at {farm_csv_path}.")

        df = pd.read_csv(farm_csv_path)
        model_data = joblib.load(model_path)
        
        report = assess_farm_flood_damage(
            df=df,
            field_area_acres=field_area_acres,
            crop_type=crop_type,
            model_data=model_data
        )
        
        print(json.dumps(report))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib
import json

# Load the dataset
def load_data(file_path):
    data = pd.read_csv(file_path)
    return data

# Preprocess the data
def preprocess_data(data):
    # Example preprocessing steps
    data.fillna(0, inplace=True)
    X = data.drop('insurance_cost', axis=1)  # Features
    y = data['insurance_cost']  # Target variable
    return X, y

# Train the model
def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    print(f'Model Mean Squared Error: {mse}')
    
    return model

# Save the model
def save_model(model, model_path):
    joblib.dump(model, model_path)

# Main function
if __name__ == "__main__":
    # Load configuration
    with open('models/preprocessing.json') as config_file:
        config = json.load(config_file)

    # Load data
    data = load_data(config['data_file_path'])
    
    # Preprocess data
    X, y = preprocess_data(data)
    
    # Train model
    model = train_model(X, y)
    
    # Save the trained model
    save_model(model, config['model_save_path'])
// modelInterface.ts
export interface FloodAssessmentInput {
  /** Area of the plot in hectares */
  area: number;
  /** Type of crop being assessed */
  cropType: string;
  /** GeoJSON representation of the plot */
  geoJson: string; // TODO: Use a more specific type, such as a GeoJSON object from the '@types/geojson' package.
}

export interface FloodSeverityAssessment {
  /** Severity level of the flood */
  severityLevel: 'low' | 'moderate' | 'high';
  /** Estimated damage in monetary value */
  estimatedDamage: number;
  /** Recommended insurance coverage */
  insuranceRecommendation: number;
}

export interface ModelInterface {
  /** Load the ML model from a specified path */
  loadModel(modelPath: string): Promise<void>;
  /** Predict flood severity and insurance based on input */
  predict(input: FloodAssessmentInput): Promise<FloodSeverityAssessment>;
}
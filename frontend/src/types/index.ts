// frontend/src/types/index.ts
export interface PlotData {
  area: number; // Area of the plot in acres or hectares
  cropType: string; // Type of crop being assessed
  geoJson: string; // GeoJSON representation of the plot
}

export interface FloodAssessmentResult {
  severity: string; // Severity level of the flood (e.g., low, moderate, high)
  insuranceAmount: number; // Calculated insurance amount based on assessment
  recommendations: string[]; // Recommendations based on the assessment
}

export interface ApiResponse<T> {
  success: boolean; // Indicates if the API call was successful
  data?: T; // The data returned from the API
  error?: string; // Error message if the API call failed
}
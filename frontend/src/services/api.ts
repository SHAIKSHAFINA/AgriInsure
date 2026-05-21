import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

/**
 * Generate CSV from plot data
 * @param {Object} plotData - The data for the plot
 * @returns {Promise<string>} - The URL of the generated CSV file
 */
export const generateCSV = async (plotData) => {
  const response = await axios.post(`${API_BASE_URL}/api/generate-csv`, plotData);
  return response.data.csvUrl;
};

/**
 * Assess flood severity and calculate insurance
 * @param {Object} assessmentData - The data for the assessment
 * @returns {Promise<Object>} - The assessment results
 */
export const assessFloodSeverity = async (assessmentData) => {
  const response = await axios.post(`${API_BASE_URL}/api/assess`, assessmentData);
  return response.data;
};
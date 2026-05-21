import { FeatureCollection } from 'geojson';
import { FloodAssessmentInput } from '../ml/modelInterface';

/**
 * Calculates the area of a GeoJSON feature in square meters.
 * TODO: This is a simplified implementation and does not handle polygons with holes or multi-polygons.
 * @param {GeoJSON.Feature} feature - The GeoJSON feature to calculate the area for.
 * @returns {number} - The area in square meters.
 */
export function calculateArea(feature: GeoJSON.Feature): number {
  if (!feature.geometry || feature.geometry.type !== 'Polygon') {
    throw new Error('Feature must be a Polygon');
  }

  const coordinates = feature.geometry.coordinates[0];
  let area = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const [x1, y1] = coordinates[i];
    const [x2, y2] = coordinates[i + 1];
    area += (x1 * y2) - (x2 * y1);
  }

  area = Math.abs(area) / 2;
  return area; // Area in square meters
}

/**
 * Converts a GeoJSON FeatureCollection to a simple array of coordinates.
 * TODO: This is a simplified implementation and only extracts the outer ring of polygons.
 * @param {FeatureCollection} featureCollection - The GeoJSON FeatureCollection to convert.
 * @returns {Array<Array<number>>} - An array of coordinates.
 */
export function extractCoordinates(featureCollection: FeatureCollection): Array<Array<number>> {
  return featureCollection.features.map(feature => {
    if (feature.geometry && feature.geometry.type === 'Polygon') {
      return feature.geometry.coordinates[0];
    }
    return [];
  }).flat();
}

/**
 * Validates if the provided GeoJSON is a valid FeatureCollection.
 * @param {any} geoJson - The GeoJSON object to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function isValidFeatureCollection(geoJson: any): boolean {
  return geoJson && geoJson.type === 'FeatureCollection' && Array.isArray(geoJson.features);
}

/**
 * Processes the input data and prepares it for the model.
 * TODO: Replace 'any' with 'PlotData' once it is defined.
 * @param {any} plotData - The plot data to process.
 * @returns {FloodAssessmentInput} - The processed input data.
 */
export function processInputData(plotData: any): FloodAssessmentInput {
  // TODO: Implement the actual data processing logic.
  return {
    area: plotData.area,
    cropType: plotData.cropType,
    geoJson: JSON.stringify(plotData.geoJson),
  };
}
import { ee } from 'google-earth-engine';
import { RasterData } from '../models/rasterDataModel'; // Assuming you have a model for raster data

class RasterService {
  constructor() {
    // Initialize Google Earth Engine
    this.initializeGEE();
  }

  async initializeGEE() {
    try {
      await ee.initialize();
      console.log('Google Earth Engine initialized successfully.');
    } catch (error) {
      console.error('Error initializing Google Earth Engine:', error);
    }
  }

  async getFloodSeverityData(geometry: ee.Geometry, startDate: string, endDate: string): Promise<RasterData> {
    try {
      const dataset = ee.ImageCollection('JRC/GSW1_3/GlobalSurfaceWater')
        .filterDate(startDate, endDate)
        .filterBounds(geometry);

      const floodSeverity = dataset.mean(); // Calculate mean for flood severity

      const url = floodSeverity.getThumbUrl({ format: 'png', region: geometry });

      return {
        severityImageUrl: url,
        severityValue: await floodSeverity.reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: geometry,
          scale: 30,
        }).get('water'),
      };
    } catch (error) {
      console.error('Error fetching flood severity data:', error);
      throw new Error('Failed to fetch flood severity data');
    }
  }
}

export default new RasterService();
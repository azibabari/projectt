export interface WeatherData {
  temperature: number;
  rainfall: number;
  humidity: number;
  soilMoisture: number;
}

export interface YieldPrediction {
  expectedYield: number;
  confidence: number;
  harvestDate: string;
}

export interface FarmData {
  id: string;
  location: string;
  size: number;
  cropType: string;
  plantingDate: string;
  expectedHarvestDate: string;
  currentStatus: 'growing' | 'harvesting' | 'fallow';
  healthScore: number;
  weatherData: WeatherData;
  yieldPrediction: YieldPrediction;
}

export interface SupplyPrediction {
  period: string;
  expectedDemand: number;
  predictedSupply: number;
  confidenceScore: number;
  recommendations: string[];
}
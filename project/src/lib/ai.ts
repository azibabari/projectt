import { FarmData, SupplyPrediction, WeatherData, YieldPrediction } from '@/types/supply';

class AgriculturalAI {
  private static instance: AgriculturalAI;

  private constructor() {}

  public static getInstance(): AgriculturalAI {
    if (!AgriculturalAI.instance) {
      AgriculturalAI.instance = new AgriculturalAI();
    }
    return AgriculturalAI.instance;
  }

  public async predictYield(farmData: FarmData): Promise<YieldPrediction> {
    // Simulated AI prediction based on farm data
    const baseYield = 4.5; // tons per hectare
    const weatherImpact = this.calculateWeatherImpact(farmData.weatherData);
    const expectedYield = baseYield * weatherImpact * farmData.size;

    return {
      expectedYield,
      confidence: 0.85,
      harvestDate: farmData.expectedHarvestDate,
    };
  }

  public async optimizeSupplyChain(
    farms: FarmData[],
    historicalDemand: number[]
  ): Promise<SupplyPrediction[]> {
    const predictions: SupplyPrediction[] = [];
    const totalFarmArea = farms.reduce((sum, farm) => sum + farm.size, 0);
    
    // Generate monthly predictions for the next 6 months
    for (let i = 0; i < 6; i++) {
      const month = new Date();
      month.setMonth(month.getMonth() + i);
      
      const expectedDemand = this.predictDemand(historicalDemand, i);
      const predictedSupply = this.calculateSupply(farms, totalFarmArea, i);
      
      predictions.push({
        period: month.toISOString().slice(0, 7),
        expectedDemand,
        predictedSupply,
        confidenceScore: 0.8,
        recommendations: this.generateRecommendations(expectedDemand, predictedSupply),
      });
    }

    return predictions;
  }

  private calculateWeatherImpact(weather: WeatherData): number {
    const tempFactor = this.normalizeValue(weather.temperature, 25, 5);
    const rainFactor = this.normalizeValue(weather.rainfall, 100, 20);
    const humidityFactor = this.normalizeValue(weather.humidity, 60, 10);
    const soilFactor = this.normalizeValue(weather.soilMoisture, 40, 10);

    return (tempFactor + rainFactor + humidityFactor + soilFactor) / 4;
  }

  private normalizeValue(value: number, optimal: number, range: number): number {
    const diff = Math.abs(value - optimal);
    return Math.max(0, 1 - diff / range);
  }

  private predictDemand(historicalDemand: number[], monthsAhead: number): number {
    // Simple moving average with trend
    const avg = historicalDemand.reduce((a, b) => a + b) / historicalDemand.length;
    const trend = 1.05; // 5% growth trend
    return avg * Math.pow(trend, monthsAhead);
  }

  private calculateSupply(farms: FarmData[], totalArea: number, monthsAhead: number): number {
    // Basic supply calculation based on farm area and typical yield
    const baseYield = 4.5; // tons per hectare
    const seasonality = 1 + 0.2 * Math.sin(2 * Math.PI * monthsAhead / 12); // seasonal variation
    return totalArea * baseYield * seasonality;
  }

  private generateRecommendations(demand: number, supply: number): string[] {
    const recommendations: string[] = [];
    const ratio = supply / demand;

    if (ratio < 0.8) {
      recommendations.push('Increase planting area for next season');
      recommendations.push('Consider importing additional stock');
      recommendations.push('Implement water conservation measures');
    } else if (ratio > 1.2) {
      recommendations.push('Consider reducing planting area');
      recommendations.push('Explore new market opportunities');
      recommendations.push('Optimize storage facilities');
    } else {
      recommendations.push('Maintain current production levels');
      recommendations.push('Monitor market prices');
      recommendations.push('Focus on quality improvement');
    }

    return recommendations;
  }
}

export const agriculturalAI = AgriculturalAI.getInstance();
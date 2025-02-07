import React, { useEffect, useState } from 'react';
import { LineChart, TrendingDown, AlertTriangle, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { agriculturalAI } from '@/lib/ai';
import { FarmData, SupplyPrediction } from '@/types/supply';
import { formatPrice } from '@/lib/utils';

const SAMPLE_FARM_DATA: FarmData[] = [
  {
    id: '1',
    location: 'Ogun State',
    size: 50,
    cropType: 'Ofada Rice',
    plantingDate: '2024-01-15',
    expectedHarvestDate: '2024-05-15',
    currentStatus: 'growing',
    healthScore: 85,
    weatherData: {
      temperature: 28,
      rainfall: 95,
      humidity: 65,
      soilMoisture: 42,
    },
    yieldPrediction: {
      expectedYield: 225,
      confidence: 0.85,
      harvestDate: '2024-05-15',
    },
  },
  // Add more sample farms as needed
];

const HISTORICAL_DEMAND = [500, 520, 540, 530, 550, 570]; // Last 6 months

const SupplyOptimization = () => {
  const [predictions, setPredictions] = useState<SupplyPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPredictions = async () => {
      try {
        const results = await agriculturalAI.optimizeSupplyChain(
          SAMPLE_FARM_DATA,
          HISTORICAL_DEMAND
        );
        setPredictions(results);
      } catch (error) {
        console.error('Failed to load predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPredictions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI-Driven Supply Optimization
        </h1>
        <p className="text-lg text-gray-600">
          Optimize rice production and distribution using advanced AI predictions
          and real-time agricultural data.
        </p>
      </div>

      {/* Farm Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {SAMPLE_FARM_DATA.map((farm) => (
          <div
            key={farm.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{farm.location}</h3>
              <div className={`px-2 py-1 rounded-full text-sm ${
                farm.healthScore >= 80
                  ? 'bg-green-100 text-green-800'
                  : farm.healthScore >= 60
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                Health: {farm.healthScore}%
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Size: {farm.size} hectares
              </p>
              <p className="text-sm text-gray-600">
                Crop: {farm.cropType}
              </p>
              <p className="text-sm text-gray-600">
                Expected Harvest: {new Date(farm.expectedHarvestDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Expected Yield: {farm.yieldPrediction.expectedYield} tons
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Supply Predictions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Supply Chain Predictions</h2>
        <div className="space-y-6">
          {predictions.map((prediction) => (
            <div
              key={prediction.period}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{prediction.period}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Confidence: {(prediction.confidenceScore * 100).toFixed(0)}%
                  </span>
                  {prediction.predictedSupply < prediction.expectedDemand && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Expected Demand</p>
                  <p className="text-lg font-semibold">
                    {prediction.expectedDemand.toFixed(1)} tons
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Predicted Supply</p>
                  <p className="text-lg font-semibold">
                    {prediction.predictedSupply.toFixed(1)} tons
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Recommendations:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="flex items-center justify-center">
          <LineChart className="mr-2 h-5 w-5" />
          View Detailed Analytics
        </Button>
        <Button className="flex items-center justify-center" variant="secondary">
          <TrendingDown className="mr-2 h-5 w-5" />
          Generate Reports
        </Button>
        <Button className="flex items-center justify-center" variant="outline">
          <Leaf className="mr-2 h-5 w-5" />
          Update Farm Data
        </Button>
      </div>
    </div>
  );
};

export default SupplyOptimization;
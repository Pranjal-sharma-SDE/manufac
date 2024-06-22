// utils/DataAnalysis.ts

interface AgroData {
  country: string;
  year: number;
  cropName: string;
  cropProduction: number;
  yieldOfCrops: number;
  areaUnderCultivation: number;
}

export interface MaxMinProductionByYear {
  year: number;
  maxCrop: string;
  minCrop: string;
}

export interface AverageYieldAndArea {
  cropName: string;
  avgYield: number;
  avgArea: number;
}

export const transformData = (jsonData: any[]): AgroData[] => {
  return jsonData.map(item => ({
    country: item.Country as string,
    year: parseInt((item.Year as string).split(', ')[1], 10),
    cropName: item['Crop Name'] as string,
    cropProduction: parseFloat(item['Crop Production (UOM:t(Tonnes))'] as string) || 0,
    yieldOfCrops: parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] as string) || 0,
    areaUnderCultivation: parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))'] as string) || 0,
  }));
};

export const getMaxMinProductionByYear = (data: AgroData[]): MaxMinProductionByYear[] => {
  const result: MaxMinProductionByYear[] = [];
  const years = Array.from(new Set(data.map(item => item.year)));


  years.forEach(year => {
    const cropsOfYear = data.filter(item => item.year === year);
    const maxCrop = cropsOfYear.reduce((prev, current) => (prev.cropProduction > current.cropProduction) ? prev : current);
    const minCrop = cropsOfYear.reduce((prev, current) => (prev.cropProduction < current.cropProduction) ? prev : current);

    result.push({
      year,
      maxCrop: maxCrop.cropName,
      minCrop: minCrop.cropName,
    });
  });

  return result;
};

export const getAverageYieldAndArea = (data: AgroData[]): AverageYieldAndArea[] => {
  const cropNames = Array.from(new Set(data.map(item => item.cropName)));
  const result: AverageYieldAndArea[] = [];

  cropNames.forEach(cropName => {
    const crops = data.filter(item => item.cropName === cropName);
    const avgYield = crops.reduce((sum, item) => sum + item.yieldOfCrops, 0) / crops.length;
    const avgArea = crops.reduce((sum, item) => sum + item.areaUnderCultivation, 0) / crops.length;

    result.push({
      cropName,
      avgYield: parseFloat(avgYield.toFixed(3)),
      avgArea: parseFloat(avgArea.toFixed(3)),
    });
  });

  return result;
};

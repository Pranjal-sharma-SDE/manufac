# Indian Agriculture Data Analytics ~ ![Link](https://manufac.onrender.com/)

This project performs analytics on an Indian Agriculture dataset provided by the National Data and Analytics Platform, NITI Aayog. The analysis results are displayed in tabular format using React and Mantine.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Description](#description)
  - [Data Transformation](#data-transformation)
  - [Analysis Functions](#analysis-functions)
  - [Rendering Tables](#rendering-tables)
- [Screenshots](#screenshots)


## Technologies Used

- TypeScript
- React (via Create React App)
- Yarn
- Mantine v7

## Project Structure

```
project-root/
│
├── public/
├── src/
│   ├── components/
│   │   └── DataTable.tsx
│   ├── data/
│   │   └── Agro.json
│   ├── utils/
│   │   └── dataAnalysis.ts
│   ├── App.tsx
│   └── index.tsx
├── README.md
├── tsconfig.json
├── package.json
└── yarn.lock
```

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Pranjal-sharma-SDE/manufac.git
   cd manufac
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   ```

## Running the Project

1. **Start the development server:**
   ```sh
   yarn start
   ```

2. **Open the application in your browser:**
   ```sh
   http://localhost:3000
   ```

## Description

### Data Transformation

The raw JSON data is transformed into a structured format using the `transformData` function. This function maps the raw data to an array of `AgroData` objects, each containing:

- Country
- Year
- Crop Name
- Crop Production (in tonnes)
- Yield of Crops (in kg/ha)
- Area Under Cultivation (in ha)

### Analysis Functions

1. **`getMaxMinProductionByYear`**:
   - Aggregates the crop data to find the crop with maximum and minimum production for each year.

2. **`getAverageYieldAndArea`**:
   - Calculates the average yield and area under cultivation for each crop over the period from 1950 to 2020.

### Rendering Tables

The `DataTable` component is used to render the results in tabular format. Two instances of `DataTable` are used in the `App` component to display:
1. Maximum and Minimum Crop Production by Year
2. Average Yield and Area Under Cultivation

## Screenshots

### Max/Min Crop Production by Year
![Max/Min Crop Production by Year](https://github.com/Pranjal-sharma-SDE/manufac/blob/master/Snaps/Table1.png)

### Average Yield and Area Under Cultivation
![Average Yield and Area Under Cultivation](https://github.com/Pranjal-sharma-SDE/manufac/blob/master/Snaps/Table2.png)

## Evaluation Criteria

1. **Calculated values are correct and time-efficient** - 60%
2. **Clean code, modularity, folder structure, quality of comments** - 35%
3. **README includes full screenshot of both tables** - 5%
4. **Bonus for using TypeScript** - 15%


---

### Example Code Snippets

#### App.tsx

```typescript
import React from 'react';
import DataTable from './components/DataTable';
import jsonData from './data/Agro.json';
import { transformData, getMaxMinProductionByYear, getAverageYieldAndArea } from './utils/dataAnalysis';

const App: React.FC = () => {
  const data = transformData(jsonData);

  const maxMinProductionData = getMaxMinProductionByYear(data);
  const averageYieldAndAreaData = getAverageYieldAndArea(data);

  return (
    <div>
      <DataTable
        title="Max/Min Crop Production by Year"
        columns={['Year', 'Crop with Max Production', 'Crop with Min Production']}
        data={maxMinProductionData}
      />
      <DataTable
        title="Average Yield and Area under Cultivation"
        columns={['Crop', 'Average Yield (Kg/Ha)', 'Average Cultivation Area (Ha)']}
        data={averageYieldAndAreaData}
      />
    </div>
  );
};

export default App;
```

#### DataTable.tsx

```typescript
import React from 'react';
import { Table, Title, Center } from '@mantine/core';
import { AverageYieldAndArea, MaxMinProductionByYear } from '../utils/dataAnalysis';

interface DataTableProps {
  title: string;
  columns: string[];
  data: MaxMinProductionByYear[] | AverageYieldAndArea[];
}

const DataTable: React.FC<DataTableProps> = ({ title, columns, data }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Center>
        <Title order={2} style={{ marginBottom: '20px' }}>
          {title}
        </Title>
      </Center>
      <Table striped highlightOnHover withColumnBorders>
        <thead style={{ backgroundColor: '#e57a7a' }}>
          <tr>
            {columns.map((column) => (
              <th key={column} style={{ textAlign: 'left', padding: '10px' }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex} style={{ padding: '10px' }}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
```

#### dataAnalysis.ts

```typescript
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
```


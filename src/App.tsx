import React from 'react';
import DataTable from './components/DataTable'; // Import DataTable component
import jsonData from './data/Agro.json'; // Import the JSON data
import { transformData, getMaxMinProductionByYear, getAverageYieldAndArea } from './utils/dataAnalysis'; // Import utility functions for data transformation and analysis

const App: React.FC = () => {
  // Transform the raw JSON data into a more usable format
  const data = transformData(jsonData);

  // Get the max and min crop production data by year
  const maxMinProductionData = getMaxMinProductionByYear(data);

  // Get the average yield and area under cultivation data
  const averageYieldAndAreaData = getAverageYieldAndArea(data);

  return (
    <div>
      {/* Render DataTable component for max/min crop production by year */}
      <DataTable
        title="Max/Min Crop Production by Year"
        columns={['Year', 'Crop with Max Production', 'Crop with Min Production']}
        data={maxMinProductionData}
      />
      {/* Render DataTable component for average yield and area under cultivation */}
      <DataTable
        title="Average Yield and Area under Cultivation"
        columns={['Crop', 'Average Yield of the Crop between 1950-2020', 'Average Cultivation Area of the Crop between 1950-2020']}
        data={averageYieldAndAreaData}
      />
    </div>
  );
};

export default App;

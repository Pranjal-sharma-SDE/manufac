import React from 'react';
import { Table, Title, Center } from '@mantine/core'; // Import necessary components from Mantine library
import { AverageYieldAndArea, MaxMinProductionByYear } from '../utils/dataAnalysis'; // Import types for the data

// Define props for the DataTable component
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
      {/* Render the table with striped and highlighted rows on hover */}
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

import React, { useState } from 'react';
import styled from 'styled-components';

interface SortableTableProps {
  data: any[];
  columns: string[];
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  cursor: pointer;
  padding: 0.5em;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 0.5em;
  border: 1px solid #ddd;
`;

const SortableTable: React.FC<SortableTableProps> = ({ data, columns }) => {
  const [sortedData, setSortedData] = useState<any[]>(data);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);

  const sortData = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((col) => (
            <Th key={col} onClick={() => sortData(col)}>
              {col}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <Td key={col}>{row[col]}</Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SortableTable;

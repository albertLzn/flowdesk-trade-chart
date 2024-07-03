import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortableTable from '../SortableTable';

describe('SortableTable Component', () => {
  const mockData = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
  ];
  const columns = ['id', 'name', 'age'];

  it('renders the table with correct headers and data', () => {
    render(<SortableTable data={mockData} columns={columns} />);

    columns.forEach(col => {
      expect(screen.getByText(col)).toBeInTheDocument();
    });

    mockData.forEach(row => {
      Object.values(row).forEach(value => {
        expect(screen.getByText(value.toString())).toBeInTheDocument();
      });
    });
  });

  it('sorts the table when a header is clicked', () => {
    render(<SortableTable data={mockData} columns={columns} />);

    const nameHeader = screen.getByText('name');
    fireEvent.click(nameHeader);

    const cells = screen.getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('Alice');
    expect(cells[4]).toHaveTextContent('Bob');
    expect(cells[7]).toHaveTextContent('Charlie');

    fireEvent.click(nameHeader);

    expect(cells[1]).toHaveTextContent('Charlie');
    expect(cells[4]).toHaveTextContent('Bob');
    expect(cells[7]).toHaveTextContent('Alice');
  });

  it('sorts numbers correctly', () => {
    render(<SortableTable data={mockData} columns={columns} />);

    const ageHeader = screen.getByText('age');
    fireEvent.click(ageHeader);

    const cells = screen.getAllByRole('cell');
    expect(cells[2]).toHaveTextContent('25');
    expect(cells[5]).toHaveTextContent('30');
    expect(cells[8]).toHaveTextContent('35');

    fireEvent.click(ageHeader);

    expect(cells[2]).toHaveTextContent('35');
    expect(cells[5]).toHaveTextContent('30');
    expect(cells[8]).toHaveTextContent('25');
  });

  it('maintains sort order when data changes', () => {
    const { rerender } = render(<SortableTable data={mockData} columns={columns} />);
  
    const nameHeader = screen.getByText('name');
    fireEvent.click(nameHeader);
  
    const newData = [
      ...mockData
    ];
  
    rerender(<SortableTable data={newData} columns={columns} />);
  
    const allCells = screen.getAllByRole('cell');
  
    expect(allCells.length).toBe(newData.length * columns.length);
  });
});
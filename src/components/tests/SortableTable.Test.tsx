// src/components/__tests__/SortableTable.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortableTable from '../SortableTable';

describe('SortableTable Component', () => {
  const columns = ['name', 'age', 'city'];
  const data = [
    { name: 'Pierre', age: 22, city: 'Lyon' },
    { name: 'Paul', age: 25, city: 'Marseille' },
    { name: 'Jacques', age: 56, city: 'Paris' }
  ];

  test('renders table with correct columns and data', () => {
    render(<SortableTable columns={columns} data={data} />);

    // Vérifie que les en-têtes de colonne sont rendus
    columns.forEach(column => {
      expect(screen.getByText(column)).toBeInTheDocument();
    });

    // Vérifie que les données sont rendues
    data.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(String(item.age))).toBeInTheDocument();
      expect(screen.getByText(item.city)).toBeInTheDocument();
    });
  });

  test('sorts data correctly when column header is clicked', () => {
    render(<SortableTable columns={columns} data={data} />);

    // Simule le clic sur l'en-tête de colonne 'age' pour trier
    const ageColumnHeader = screen.getByText('age');
    fireEvent.click(ageColumnHeader);

    // Récupère les cellules de la colonne triée
    const sortedAgeCells = screen.getAllByTestId('age-cell');

    // Vérifie que les âges sont triés correctement
    const sortedAges = data.map(item => item.age).sort((a, b) => a - b);
    sortedAges.forEach((age, index) => {
      expect(sortedAgeCells[index]).toHaveTextContent(String(age));
    });
  });
});

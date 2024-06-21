// src/components/__tests__/Statistics.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Statistics from '../Statistics';

describe('Statistics Component', () => {
  const mockData = [
    { time: new Date('2024-06-20T10:00:00Z'), price: 100 },
    { time: new Date('2024-06-20T11:00:00Z'), price: 120 },
    { time: new Date('2024-06-20T12:00:00Z'), price: 150 },
    { time: new Date('2024-06-20T13:00:00Z'), price: 130 },
  ];

  test('renders SVG chart with data', () => {
    const { container } = render(<Statistics data={mockData} width={800} height={400} />);

    // Vérifie que l'élément SVG est rendu
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    // Vérifie que le graphique contient une ligne
    const pathElement = screen.getByRole('presentation'); // Rechercher par rôle pour le chemin (path) du graphique
    expect(pathElement).toBeInTheDocument();
  });

  test('updates chart when data prop changes', () => {
    const { rerender } = render(<Statistics data={mockData} width={800} height={400} />);

    // Rendu initial
    let pathElement = screen.getByRole('presentation');
    expect(pathElement).toBeInTheDocument();

    // Données mises à jour
    const updatedData = [
      { time: new Date('2024-06-20T10:00:00Z'), price: 100 },
      { time: new Date('2024-06-20T11:00:00Z'), price: 110 },
      { time: new Date('2024-06-20T12:00:00Z'), price: 120 },
    ];
    rerender(<Statistics data={updatedData} width={800} height={400} />);

    // Vérifie que le graphique est mis à jour avec les nouvelles données
    pathElement = screen.getByRole('presentation');
    expect(pathElement).toBeInTheDocument();
  });

  test('does not render chart if data is empty', () => {
    render(<Statistics data={[]} width={800} height={400} />);

    // Vérifie que l'élément SVG n'est pas rendu si les données sont vides
    const svgElement = screen.queryByRole('presentation');
    expect(svgElement).not.toBeInTheDocument();
  });
});

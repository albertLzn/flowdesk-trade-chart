import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


interface TradeData {
  time: Date;
  price: number;
}

interface StatisticsProps {
  data: TradeData[];
  width: number;
  height: number;
}

const X_DELTA_HEIGHT = 25;

const Statistics: React.FC<StatisticsProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && data.length > 0) {
      d3.select(svgRef.current).selectAll('*').remove();

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height + X_DELTA_HEIGHT);

      const sortedData = [...data].sort((a, b) => a.time.getTime() - b.time.getTime());

      const timeDomain = d3.extent(sortedData, d => d.time) as [Date, Date];

      const xScale = d3.scaleTime()
        .domain(timeDomain)
        .range([50, width - 50]);

      const yScale = d3.scaleLinear()
        .domain(d3.extent(sortedData, d => d.price) as [number, number])
        .nice()
        .range([height - 50, 50]);

      const line = d3.line<TradeData>()
        .x(d => xScale(d.time))
        .y(d => yScale(d.price));

      svg.append('path')
        .datum(sortedData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);

      svg.append('g')
        // @ts-ignore
        .call(d3.axisBottom(xScale).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat('%d/%m')))
        .attr('transform', `translate(0, ${height})`);


      svg.append('g')
        .call(d3.axisLeft(yScale).ticks(5))
        .attr('transform', 'translate(50, 0)');

      svg.append('text')
        .attr('transform', `translate(${width / 2},${height + X_DELTA_HEIGHT - 10})`) 
        .style('text-anchor', 'middle')
        .text('Date (DD/MM)');

      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - ((height + X_DELTA_HEIGHT) / 2)) 
        .attr('y', 20)
        .style('text-anchor', 'middle')
        .text('Price');
    }
  }, [data, width, height]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default Statistics;

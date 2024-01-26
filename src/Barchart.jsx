import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({data}) => {
  // Sample static data
  const [staticData, setStaticData] = useState(data);

  // State to hold the dynamic data
  const [dynamicData, setDynamicData] = useState(staticData);

  // Ref to hold the chart container
  const chartRef = useRef(null);

  // Effect to create and update the chart
  useEffect(() => {
    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Set up chart dimensions
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create scales
    const xScale = d3.scaleBand()
      .domain(dynamicData.map(d => d.ageRange))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dynamicData, d => Math.ceil(d.value / 10) * 10)]) // Ensure whole numbers
      .range([height - margin.bottom, margin.top]);

    // Create chart container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create X axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Create Y axis with whole numbers
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickFormat(d3.format('d')));

    // Create bars
    svg.selectAll('rect')
      .data(dynamicData)
      .enter().append('rect')
      .attr('x', d => xScale(d.ageRange))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.value))
      .attr('fill', 'steelblue');
  }, [dynamicData]);

  // Effect to update the chart when static data changes
  useEffect(() => {
    setDynamicData(staticData);
  }, [staticData]);

  return (
    <div ref={chartRef}></div>
  );
};

export default BarChart;

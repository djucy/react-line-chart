import style from '../CommonStyle/CommoneStyle.module.css';
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import { LineChart } from '@d3/line-chart';
import dataChart from '../../data/data.json';
import { curveCardinal } from 'd3';

export default function LineChart() {
  const [data, setData] = useState([25, 50, 70, 10, 15]);
  const svgRef = useRef();

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      // width = 460 - margin.left - margin.right,
      // height = 400 - margin.top - margin.bottom;
      width = 400,
      height = 400;
    //setting up svg
    const svg = d3
      .select(svgRef.current)
      //   .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background', '#d3d3d3')
      .style('overflow', 'visible');
    //   .append('g')
    //   .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis --> it is a date format
    const xScale = d3
      .scaleLinear()
      //   .domain(
      //     d3.extent(data, function (d) {
      //       return d.date;
      //     })
      //   )
      .domain([0, data.length - 1])
      .range([0, width]);
    // svg
    //   .append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(x));
    // Add Y axis
    const yScale = d3
      .scaleLinear()
      //   .domain([
      //     0,
      //     d3.max(data, function (d) {
      //       return +d.value;
      //     }),
      //   ])
      .domain([0, height])
      .range([height, 0]);
    // svg.append('g').call(d3.axisLeft(y));

    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(curveCardinal);

    //setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append('g').call(xAxis).attr('transform', `translate(0, ${height})`);
    svg.append('g').call(yAxis);
    //setting up the data from the svg
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', d => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'black');
  }, [data]);

  return (
    <div className={style.chart}>
      <svg ref={svgRef} />
    </div>
  );
}

import style from '../CommonStyle/CommoneStyle.module.css';
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dataChart from '../../data/data.json';

export default function LineChart2() {
  const [chartDate] = useState(dataChart);
  const ref = useRef();

  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    // width = 400 - margin.left - margin.right,
    // height = 400 - margin.top - margin.bottom
    width = 400,
    height = 400;
  // const padding = 20;

  const parseTime = d3.timeParse('%Y-%m-%d');
  // const formatTime = d3.timeFormat('%Y %m %d');
  const dates = [];
  // const Chart = d3.json(dataChart);
  // console.log(Chart);
  for (let obj of chartDate) {
    dates.push(parseTime(obj.date));
  }

  const domain = d3.extent(dates);
  console.log(domain);

  useEffect(() => {
    //xScales
    const xScale = d3.scaleTime().domain(domain).range([0, width]);

    const svgElement = d3
      .select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background', '#d3d3d3')
      .style('overflow', 'visible');

    const xAxis = d3.axisBottom(xScale);

    svgElement
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    //yScales
    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(chartDate, function (d) {
          return d.meanSentimentExternal;
        }),
      ])
      .range([height, 0]);
    const yAxis = d3.axisLeft(yScale);
    svgElement
      .append('g')
      // .attr('transform', `translate(0, ${height})`)
      .call(yAxis);

    //add line
    const generateScaledLine = d3
      .line()
      .x(function (d) {
        return xScale(d.date);
      })
      .y(function (d) {
        return yScale(d.meanSentimentExternal);
      });
    // .curve(d3.curveCardinal);

    svgElement
      .append('path')

      .datum(chartDate)

      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', generateScaledLine);
  }, [
    chartDate,
    domain,
    width,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
  ]);

  return (
    <div className={style.chart}>
      <svg ref={ref}></svg>
    </div>
  );
}

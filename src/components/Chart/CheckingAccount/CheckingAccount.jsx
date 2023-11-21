import React, { useRef, useEffect, useContext } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import * as d3 from "d3";
import { useState } from "react";
import axios from "axios";
import { ContextData } from "../../Index/Index";

const CheckingAccount = () => {
  const [startDate, setStartDate] = useState(""); // Add state for start date
  const [endDate, setEndDate] = useState(""); // Add state for end date
  const svgRef = useRef();

  const { chartData, setChartData } = useContext(ContextData);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://data.covid19india.org/v4/min/timeseries.min.json"
      );
      const timeseries = response.data["TT"]?.dates; // Assuming you want data for all of India ("TT")

      if (timeseries) {
        const dates = Object.keys(timeseries);

        // Filter data based on the selected date range
        const filteredData = dates.filter(
          (date) =>
            (!startDate || date >= startDate) && (!endDate || date <= endDate)
        );

        const chartDataArray = filteredData.map((date, index) => {
          const deltaConfirmed = timeseries[date]?.delta?.confirmed || 0;
          const deltaRecovered = timeseries[date]?.delta?.recovered || 0;
          return { date, deltaConfirmed, deltaRecovered, index };
        });

        setChartData((prevChartData) => ({
          ...prevChartData,
          chart1: chartDataArray,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Setting up svg
    const w = 500;
    const h = 230;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#fff");

    svg.selectAll("*").remove(); // Clear existing elements

    console.log("chartData.chart1:", chartData.chart1);

    // Check if chartData.chart1 is not empty
    if (!chartData.chart1 || chartData.chart1.length === 0) {
      console.warn("No data available for charting.");
      return;
    }

    // Check if the date property is present in the first data point
    const firstDataPoint = chartData.chart1[0];
    if (!firstDataPoint || !firstDataPoint.date) {
      console.warn("Date property is missing in the data.");
      return;
    }

    // Setting the scaling
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(chartData.chart1, (data) => new Date(data.date)))
      .range([0, w]);

    console.log("xScale.domain():", xScale.domain());

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(chartData.chart1, (data) =>
          Math.max(data.deltaConfirmed, data.deltaRecovered)
        ),
      ])
      .range([h, 0]);

    // Setting up the chartData.chart1 for svg
    const group = svg.append("g");

    group
      .selectAll(".bar-confirmed")
      .data(chartData.chart1)
      .enter()
      .append("rect")
      .attr("class", "bar-confirmed")
      .attr("x", (data) => xScale(new Date(data.date)))
      .attr("y", (data) => yScale(data.deltaConfirmed))
      .attr("width", w / chartData.chart1.length)
      .attr("height", (data) => h - yScale(data.deltaConfirmed))
      .attr("fill", "green");

    group
      .selectAll(".bar-recovered")
      .data(chartData.chart1)
      .enter()
      .append("rect")
      .attr("class", "bar-recovered")
      .attr("x", (data) => xScale(new Date(data.date)))
      .attr("y", (data) => yScale(data.deltaRecovered))
      .attr("width", w / chartData.chart1.length)
      .attr("height", (data) => h - yScale(data.deltaRecovered))
      .attr("fill", "blue");

    // Adding x-axis with increased font size and rotation
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d"));
    svg
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .call(xAxis)
      .attr("class", "x-axis-labels")
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").call(yAxis).attr("class", "y-axis-labels");

    // Apply styles for horizontal scrolling to the container
    const container = d3.select(svgRef.current.parentElement);
    container.style("overflow-x", "auto");
    container.style("overflow-y", "hidden");
  }, [chartData.chart1, chartData]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <Paper elevation={5} sx={{ padding: "10px" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6">Checking Account</Typography>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <input
            type="date"
            onChange={handleStartDateChange}
            value={startDate}
          />
          <input type="date" onChange={handleEndDateChange} value={endDate} />
        </Box>
      </Box>
      <Divider />
      <svg ref={svgRef}></svg>
    </Paper>
  );
};

export default CheckingAccount;

import React, { useContext, useEffect, useRef } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import * as d3 from "d3";
import "./totalcash.css";
import { ContextData } from "../../Index/Index";

const TotalCash = ({ width = 500, height = 250 }) => {
  const svgRef = useRef();
  const { chartData } = useContext(ContextData);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear the existing chart (if any)
    svg.selectAll("*").remove();

    // Define the margins and dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, chartWidth]).padding(0.1);
    const y = d3.scaleLinear().range([chartHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Update the domain of x and y scales
    x.domain(chartData?.chart3?.map((d) => d?.label));
    y.domain([0, d3.max(chartData?.chart3, (d) => d.inValue + d.outValue)]);

    // Add a single rect element for each bar with separate colors for "inValue" and "outValue"
    g.selectAll(".bar")
      .data(chartData?.chart3)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.inValue + d.outValue))
      .attr("width", x.bandwidth())
      .attr("height", (d) => chartHeight - y(d.inValue + d.outValue))
      .attr("fill", (d) => {
        const inColor = "#02bb7d";
        const outColor = "#4b7747";
        return `url(#${createPatternId(d.label, inColor, outColor)})`;
      })
      .attr("rx", 5);

    // Create a pattern for each bar
    function createPatternId(label, inColor, outColor) {
      const patternId = `pattern-${label.replace(/\s+/g, "-").toLowerCase()}`;

      const pattern = svg
        .append("pattern")
        .attr("id", patternId)
        .attr("width", x.bandwidth())
        .attr("height", chartHeight);

      pattern
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("height", chartHeight / 2)
        .attr("fill", inColor);

      pattern
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("height", chartHeight / 2)
        .attr("fill", outColor)
        .attr("transform", `translate(0, ${chartHeight / 2})`);

      return patternId;
    }

    // Define a gradient for the bars
    const gradient = svg
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#02bb7d"); // Color for "inValue"

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#4b7747"); // Color for "outValue"

    // Add x-axis
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    //hide
    g.select(".x-axis").style("display", "none");
    g.select(".y-axis").style("display", "none");

    // Add custom month labels on the x-axis
    g.selectAll(".x-label")
      .data(chartData.chart3)
      .enter()
      .append("text")
      .attr("class", "x-label")
      .attr("x", (d) => x(d.label) + x.bandwidth() / 2)
      .attr("y", chartHeight + 10) // Adjust the vertical position
      .style("text-anchor", "middle")
      .text((d) => d.label)
      .attr("dy", "1em");

    // Add axis labels
    svg
      .append("text")
      .attr("transform", `translate(${width / 2},${height - 10})`)
      .style("text-anchor", "middle");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Y-Axis Label");
  }, [chartData?.chart3, width, height]);

  return (
    <Paper elevation={5} sx={{ padding: "10px" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6">Total Cash</Typography>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <Box className="small__box1"></Box>
          <span>In</span>
          <Box className="small__box2"></Box>
          <span>Out</span>
        </Box>
      </Box>
      <Divider />
      <svg ref={svgRef} width={width} height={height} />
    </Paper>
  );
};

export default TotalCash;

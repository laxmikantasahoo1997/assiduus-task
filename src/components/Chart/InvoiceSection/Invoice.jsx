import React, { useContext, useEffect, useRef } from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import * as d3 from "d3";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModalMain from "../../ModalMain/ModalMain";
import styled from "@emotion/styled";
import { ContextData } from "../../Index/Index";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Invoice = ({ width = 500, height = 250 }) => {
  const [open, setOpen] = useState(false);

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
    x.domain(chartData.chart2.map((d) => d.label));
    y.domain([0, d3.max(chartData.chart2, (d) => d.value)]);

    // Add the bars to the chart
    g.selectAll(".bar")
      .data(chartData.chart2)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("fill", (d, i) => "green")
      .attr("rx", 5)
      .attr("height", (d) => chartHeight - y(d.value));

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
      .data(chartData.chart2)
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
  }, [chartData.chart2, width, height]);

  return (
    <Paper elevation={5} sx={{ padding: "10px" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6">Invoices Owed to you</Typography>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <Button
            onClick={() => setOpen(true)}
            sx={{
              background: "lightblue",
              color: "green",
              textTransform: "none",
            }}
          >
            New Sales Invoice
          </Button>
        </Box>
      </Box>
      <Divider />
      <svg ref={svgRef} width={width} height={height} />
      <ModalMain open={open} setOpen={setOpen} title={"Upload File"}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </ModalMain>
    </Paper>
  );
};

export default Invoice;

import { useEffect, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";

export default function D3Pie() {
  const svgRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5000/budget").then((res) => {
      const data = res.data.myBudget.map((d) => ({
        label: d.title,
        value: d.budget,
      }));

      const width = 960;
      const height = 450;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie().value((d) => d.value);
      const arc = d3.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4);
      const outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      svg.attr("width", width).attr("height", height);

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      g.append("g").attr("class", "slices");
      g.append("g").attr("class", "labels");
      g.append("g").attr("class", "lines");

      const key = (d) => d.data.label;

      function change(data) {
        const slice = g
          .select(".slices")
          .selectAll("path.slice")
          .data(pie(data), key);

        slice
          .enter()
          .append("path")
          .attr("class", "slice")
          .attr("fill", (d) => color(d.data.label))
          .attr("d", arc)
          .each(function (d) {
            this._current = d;
          });

        slice
          .transition()
          .duration(1000)
          .attrTween("d", function (d) {
            const interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return (t) => arc(interpolate(t));
          });

        slice.exit().remove();

        const text = g
          .select(".labels")
          .selectAll("text")
          .data(pie(data), key);

        text
          .enter()
          .append("text")
          .attr("dy", ".35em")
          .text((d) => d.data.label)
          .merge(text)
          .transition()
          .duration(1000)
          .attrTween("transform", function (d) {
            const interpolate = d3.interpolate(this._current || d, d);
            this._current = interpolate(0);
            return (t) => {
              const d2 = interpolate(t);
              const pos = outerArc.centroid(d2);
              pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
              return `translate(${pos})`;
            };
          })
          .styleTween("text-anchor", function (d) {
            const interpolate = d3.interpolate(this._current || d, d);
            return (t) => {
              const d2 = interpolate(t);
              return midAngle(d2) < Math.PI ? "start" : "end";
            };
          });

        text.exit().remove();

        const polyline = g
          .select(".lines")
          .selectAll("polyline")
          .data(pie(data), key);

        polyline
          .enter()
          .append("polyline")
          .merge(polyline)
          .transition()
          .duration(1000)
          .attrTween("points", function (d) {
            const interpolate = d3.interpolate(this._current || d, d);
            this._current = interpolate(0);
            return (t) => {
              const d2 = interpolate(t);
              const pos = outerArc.centroid(d2);
              pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
              return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
          });

        polyline.exit().remove();
      }

      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }

      change(data);
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}

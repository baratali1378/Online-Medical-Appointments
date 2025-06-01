import { Box, Typography, useTheme, useMediaQuery, Stack } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { JSX } from "react";

// Strategy Pattern for different chart types
interface ChartStrategy {
  renderChart(data: any, colors: string[], theme: any): JSX.Element;
}

class VerticalBarChartStrategy implements ChartStrategy {
  renderChart(data: any, colors: string[], theme: any) {
    return (
      <BarChart layout="vertical" data={data} margin={{ left: 16 }}>
        <XAxis type="number" />
        <YAxis dataKey="rating" type="category" />
        <Tooltip />
        <Bar dataKey="count" fill={"#71C9CE"} />
      </BarChart>
    );
  }
}

class StackedBarChartStrategy implements ChartStrategy {
  renderChart(data: any, colors: string[], theme: any) {
    return (
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey={() => "All Ratings"} hide />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {data[0] &&
          Object.keys(data[0])
            .filter((key) => key !== "name")
            .map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={colors[index]}
                name={key}
              />
            ))}
      </BarChart>
    );
  }
}

// Factory Pattern for chart creation
export class ChartFactory {
  static createChart(type: string): ChartStrategy {
    switch (type) {
      case "stacked":
        return new StackedBarChartStrategy();
      case "vertical":
      default:
        return new VerticalBarChartStrategy();
    }
  }
}

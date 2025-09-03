import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography, Chip, Fade } from "@mui/material";

interface ChartData {
  id: number;
  value: number;
  label: string;
  color?: string;
}

interface CustomPieChartProps {
  data?: Omit<ChartData, "color">[];
  width?: number;
  height?: number;
  colors?: string[];
  title?: string;
}

const AdmindPieChart: React.FC<CustomPieChartProps> = ({
  data,
  width = 320,
  height = 320,
  colors = [
    "#881f9b",
    "#6d1a82",
    "#a855f7",
    "#7c3aed",
    "#9333ea",
    "#581c87",
    "#c084fc",
    "#8b5cf6",
  ],
  title = "User Overview",
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);

  const defaultData: Omit<ChartData, "color">[] = [
    { id: 0, value: 35, label: "Active Users" },
    { id: 1, value: 25, label: "New Users" },
    { id: 2, value: 20, label: "Premium Users" },
    { id: 3, value: 20, label: "Inactive Users" },
  ];

  const baseData = data || defaultData;
  const total = baseData.reduce((sum, item) => sum + item.value, 0);

  const chartData: ChartData[] = baseData.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
  }));

  const handleSliceClick = (_: any, item: any) => {
    const clickedId = item.dataIndex;
    setSelectedSlice(selectedSlice === clickedId ? null : clickedId);
  };

  const handleSliceHover = (_: any, item: any) => {
    if (item) setHoveredSlice(item.dataIndex);
  };
  console.log(handleSliceHover);
  
  const handleSliceLeave = () => {
    setHoveredSlice(null);
  };
  console.log(handleSliceLeave);

  return (
    <Box sx={{ textAlign: "center", mt: "2rem" }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins, sans-serif",
          color: "#374151",
          mb: "1rem",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      <PieChart
        series={[
          {
            data: chartData.map((item, index) => ({
              ...item,
              color:
                hoveredSlice === index
                  ? `${item.color}ee`
                  : selectedSlice === index
                    ? `${item.color}cc`
                    : item.color,
            })),
            innerRadius: 60,
            outerRadius: hoveredSlice !== null ? 125 : 120,
            paddingAngle: 2,
            cornerRadius: 2,
            startAngle: -90,
            endAngle: 270,
            cx: width / 2,
            cy: height / 2,
            highlightScope: { fade: "global", highlight: "item" },
            faded: {
              innerRadius: 40,
              additionalRadius: -5,
              color: "#e5e7eb",
            },
          },
        ]}
        width={width}
        height={height}
        onItemClick={handleSliceClick}
        // onItemEnter={handleSliceHover}
        // onItemLeave={handleSliceLeave}
      />

      <Box
        sx={{
          mt: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.6rem",
        }}
      >
        {chartData.map((item) => (
          // console.log(index)
          <Chip
            key={item.id}
            label={item.label}
            sx={{
              backgroundColor: `${item.color}22`,
              color: item.color,
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              px: "0.5rem",
            }}
          />
        ))}
      </Box>

      {selectedSlice !== null && (
        <Fade in={true} timeout={300}>
          <Box
            sx={{
              mt: "1.5rem",
              px: "1rem",
              py: "0.8rem",
              backgroundColor: `${chartData[selectedSlice]?.color}15`,
              borderRadius: "12px",
              border: `2px solid ${chartData[selectedSlice]?.color}33`,
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: chartData[selectedSlice]?.color,
                fontWeight: 600,
                fontSize: "1rem",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Selected: {chartData[selectedSlice]?.label} (
              {chartData[selectedSlice]?.value}%)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                mt: "0.5rem",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Represents{" "}
              {Math.round((chartData[selectedSlice]?.value / total) * 100)}% of
              total users
            </Typography>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default AdmindPieChart;

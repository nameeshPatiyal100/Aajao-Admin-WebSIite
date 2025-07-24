import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const uData = [25, 35, 64, 35, 64, 75, 94, 18, 23, 53, 64, 75];
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const AdminBarChart = () => {
  const axisLabelStyle = {
    fontFamily: "Poppins, sans-serif",
    color: "#547792",
    fontWeight: 500,
    fontSize: "0.875rem",
  };

  return (
    <Box
      sx={{
        mt: "3rem",
        px: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BarChart
        width={600}
        height={350}
        series={[
          {
            data: uData,
            label: "Monthly Users",
            color: "#881f9b",
            valueFormatter: (value) => `${value} users`,
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            data: months,
            tickLabelStyle: {
              fill: "#547792",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.75rem",
            },
            disableLine: true,
            disableTicks: true,
            labelStyle: {
              ...axisLabelStyle,
              dominantBaseline: "hanging",
              textAnchor: "middle",
            },
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: 100,
            tickLabelStyle: {
              fill: "#547792",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.75rem",
            },
            disableLine: true,
            disableTicks: true,
            labelStyle: {
              ...axisLabelStyle,
              textAnchor: "middle",
            },
          },
        ]}
        margin={{ top: 30, bottom: 60, left: 60, right: 30 }}
        sx={{
          "& .MuiChartsAxis-tickLabel": {
            fontFamily: "Poppins, sans-serif",
          },
          "& .MuiChartsAxis-label": {
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          },
        }}
      />
    </Box>
  );
};

export default AdminBarChart;

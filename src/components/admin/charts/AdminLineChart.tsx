import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const AdminLineChart = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        mt: "3rem",
        px: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LineChart
        xAxis={[
          {
            data: months, // ✅ use strings directly
            // scaleType: "band",
            scaleType: "point",
            disableLine: true,
            disableTicks: true,
            tickLabelStyle: {
              fill: "#547792",
              fontFamily: "Poppins, sans-serif",
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
            },
            disableLine: true,
            disableTicks: true,
          },
        ]}
        series={[
          {
            data: [25, 35, 64, 35, 64, 75, 94, 18, 23, 53, 64, 75],
            color: "#AA60C8",
            showMark: false,
            curve: "monotoneX",
          },
          {
            data: [24, 53, 56, 64, 73, 52, 23, 62, 92, 87, 77, 60],
            color: "#A294F9",
            showMark: false,
            curve: "monotoneX",
          },
        ]}
        height={300}
        width={600}
        grid={{ vertical: true, horizontal: true }}
      />
    </Box>
  );
};

export default AdminLineChart;

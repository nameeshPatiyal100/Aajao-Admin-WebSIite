import { Gauge } from "@mui/x-charts/Gauge";

interface GaugeChartProps {
  value?: number;
  label?: string;
}

const AdminGaugeChart = ({
  value = 75,
  label = "Capacity",
}: GaugeChartProps) => {
  return (
    <div style={{ width: 200, height: 200, textAlign: "center" }}>
      <Gauge
        value={value}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
        text={({ value }) => `${value}%`}
      />
      <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>{label}</div>
    </div>
  );
};

export default AdminGaugeChart;

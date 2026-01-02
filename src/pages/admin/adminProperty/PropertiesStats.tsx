import { Box } from "@mui/material";
import StatCard from "../../common/StatCard";
import { stats } from "../constants/stats";

const PropertiesStats = () => (
  <Box
    display="grid"
    gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
    gap={3}
    mb={4}
  >
    {stats.map((stat, i) => (
      <StatCard key={i} {...stat} />
    ))}
  </Box>
);

export default PropertiesStats;

import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

export default function StatCard({ label, value, icon: Icon, color, bgColor }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "grey.100",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: bgColor, color, width: 56, height: 56 }}>
            <Icon sx={{ fontSize: 28 }} />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import {
  AdmindPieChart,
  AdminBarChart,
  AdminLineChart,
  AdminTable,
} from "../../../components";
import { userRows } from "../../../utils/adminUtils";

import DashboardHeading from "./DashboardHeading";

const Dashboard = () => {
  type Column<T> = {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  };
  type UserRow = {
    name: string;
    email: string;
    role: string;
    status: string;
  };

  const userColumns: Column<UserRow>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <Chip
          label={String(value)}
          color={value === "Active" ? "success" : "error"}
          size="small"
        />
      ),
    },
  ];

  return (
    <>
      {/* ================= HERO / STATS SECTION ================= */}
      <Paper
        sx={{
          background:
            "linear-gradient(135deg, #881f9b 0%, #a855f7 50%, #9333ea 100%)",
          height: "25rem",
          borderRadius: "1rem",
          p: 4,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(136,31,155,0.3)",
          mb: 4,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          },
          "@keyframes float": {
            "0%,100%": { transform: "translateY(0) rotate(0)" },
            "50%": { transform: "translateY(-20px) rotate(180deg)" },
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            mb: 1,
            animation: "slide 0.8s ease-out forwards",
            opacity: 0,
            "@keyframes slide": {
              to: { opacity: 1, transform: "translateX(0)" },
              from: { opacity: 0, transform: "translateX(-30px)" },
            },
          }}
        >
          Welcome Back 🤟🏻
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 4,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            animation: "slide 0.8s ease-out 0.2s forwards",
            opacity: 0,
          }}
        >
          Glad to see you
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {[
            "Total Number of User",
            "Total Number of Host",
            "Total Number of Properties",
            "Total Bookings",
          ].map((label) => (
            <Paper
              key={label}
              sx={{
                height: "8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "1rem",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "-100%",
                  top: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(136,31,155,0.1), transparent)",
                  transition: "left 0.5s ease",
                },
                "&:hover::before": { left: "100%" },
                "&:hover": {
                  transform: "translateY(-5px) scale(1.02)",
                  boxShadow: "0 8px 30px rgba(136,31,155,0.2)",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#881f9b", fontWeight: 700 }}
              >
                125,666
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* ================= MOTIVATION ================= */}
      <Paper
        sx={{
          p: 5,
          mb: 4,
          borderRadius: "1.5rem",
          background:
            "linear-gradient(135deg, #f7f0fa 0%, #faf5ff 50%, #f3e8ff 100%)",
          boxShadow: "0 10px 40px rgba(136,31,155,0.1)",
        }}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={600} color="#881f9b">
              “The only way to do great work is to love what you do”
            </Typography>
            <Typography fontStyle="italic" color="#7c3aed">
              — Steve Jobs
            </Typography>
          </Stack>

          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              width: 160,
              borderRadius: "1rem",
              boxShadow: "0 4px 20px rgba(136,31,155,0.1)",
              "&:hover": {
                transform: "translateY(-8px) scale(1.05)",
                boxShadow: "0 12px 35px rgba(136,31,155,0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              Pending Properties
            </Typography>
            <Typography variant="h4" color="#9333ea">
              8
            </Typography>
          </Paper>
        </Stack>
      </Paper>

      {/* ================= CHARTS ================= */}
      {[<AdminLineChart />, <AdminBarChart />].map((_, _i) => null)}

      <Paper sx={sectionCard}>
        <AdminLineChart />
        <AdminBarChart />
      </Paper>

      <Paper
        sx={{
          ...sectionCard,
          gap: 20,
        }}
      >
        <AdmindPieChart title="Total Users" />
        <AdmindPieChart title="Total Host" />
      </Paper>

      <DashboardHeading heading="Latest Users" buttonText="View All" />
      <Paper sx={sectionCard}>
        <AdminTable<UserRow> columns={userColumns} rows={userRows} />
      </Paper>

      <DashboardHeading heading="Latest Bookings" buttonText="View All" />
      <Paper sx={sectionCard}>
        <AdminTable<UserRow> columns={userColumns} rows={userRows} />
      </Paper>

      <DashboardHeading heading="Latest Transaction" buttonText="View All" />
      <Paper sx={sectionCard}>
        <AdminTable<UserRow> columns={userColumns} rows={userRows} />
      </Paper>
    </>
  );
};

const sectionCard = {
  display: "flex",
  gap: 4,
  p: 4,
  mb: 4,
  borderRadius: "1.5rem",
  background: "linear-gradient(145deg, #ffffff, #f9fafb)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  borderTop: "4px solid",
  borderColor: "#9333ea",
};

export default Dashboard;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomePropCard from "./HomePropCard";
import { useState } from "react";
import { Button, useMediaQuery, Box, Typography } from "@mui/material";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
//   },
// };

export default function FeaturedProperties({ hotels }: { hotels: any[] }) {
  const [visibleCount, setVisibleCount] = useState(12);

  // Responsive media queries
  const isLgDesktop = useMediaQuery("(min-width: 1600px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isLaptop = useMediaQuery("(min-width: 992px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(min-width: 480px)");

  const loadMore = () => setVisibleCount((p) => p + 12);

  // Responsive column count
  const columns = isLgDesktop
    ? 6
    : isDesktop
    ? 5
    : isLaptop
    ? 4
    : isTablet
    ? 3
    : isMobile
    ? 2
    : 1;

  return (
    <section className="featured-properties" style={{ marginTop: "3rem" }}>
      {/* ⭐ TITLE + DESCRIPTION */}
      <Box
        sx={{
          width: "100%",
          padding: "0 1rem",
          marginBottom: "1.5rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            // color: "#222",
            color: "#c14365",
            marginBottom: "0.5rem",

          }}
        >
          Featured Properties
        </Typography>

        <Typography
          sx={{
            color: "#555",
            fontSize: "1rem",
            maxWidth: "600px",
            lineHeight: 1.6,
          }}
        >
          Explore our top-rated stays, selected to provide comfort, convenience,
          and unforgettable experiences.
        </Typography>
      </Box>

      {/* 🔥 PROPERTIES GRID */}
      <motion.div
        className="properties-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.01 }}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {hotels.slice(0, visibleCount).map((hotel, idx) => (
          <motion.div
            key={idx}
            // variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to={`/property/detail/${hotel.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <HomePropCard {...hotel} />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {visibleCount < hotels.length && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Button
            variant="contained"
            onClick={loadMore}
            sx={{
              bgcolor: "#c14365",
              px: 4,
              py: 1.2,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#ab3864" },
            }}
          >
            Load More Properties
          </Button>
        </div>
      )}
    </section>
  );
}

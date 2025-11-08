import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomePropCard from "./HomePropCard"; // adjust import path if needed

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FeaturedProperties({ hotels }: { hotels: any[] }) {
  return (
    <section className="featured-properties" style={{ marginTop: "2rem" }}>
      <motion.div
        className="properties-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // 👈 triggers when 20% visible
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
          padding: "1rem",
        }}
      >
        {hotels.map((hotel, idx) => (
          <motion.div key={idx} variants={cardVariants}>
            <Link
              to={`/property/detail/1`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <HomePropCard {...hotel} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

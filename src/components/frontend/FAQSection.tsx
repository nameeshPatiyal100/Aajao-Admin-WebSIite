import { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  image: string;
  faqs: FAQ[];
  title?: string;
  description?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  image,
  faqs,
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our services.",
}) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (panel: number) => {
    setExpanded(expanded === panel ? false : panel);
  };

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, bgcolor: "#fdfdfd" }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={5}
        sx={{ color: "#c14365" }}
      >
        {title}
      </Typography>

      {/* Content Grid */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "stretch",
        }}
      >
        {/* Left: Image */}
        <Box
          component="img"
          src={image}
          alt="FAQ"
          sx={{
            flex: 1,
            maxWidth: "40%",
            borderRadius: 2,
            boxShadow: 3,
            objectFit: "cover",
            height: { xs: 250, md: "100%" },
          }}
        />

        {/* Right: FAQs */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Description with Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <HelpOutlineIcon sx={{ color: "#c14365", fontSize: 30 }} />
            <Typography variant="h6" sx={{ color: "#c14365", fontWeight: 600 }}>
              {description}
            </Typography>
          </Box>

          {/* FAQ List */}
          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              expanded={expanded === idx}
              onChange={() => handleChange(idx)}
              sx={{
                mb: 2,
                border: "1px solid #c14365",
                borderRadius: 2,
                boxShadow: "none",
                "&:before": { display: "none" },
                padding: "5px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ color: "#c14365", fontSize: 30 }} />
                }
                sx={{
                  bgcolor: expanded === idx ? "#c14365" : "#fff",
                  color: expanded === idx ? "#fff" : "#c14365",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  "&:hover": {
                    bgcolor: expanded === idx ? "#ab3864" : "#fce4ec",
                  },
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  color: "#333",
                  bgcolor: "#fff",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FAQSection;

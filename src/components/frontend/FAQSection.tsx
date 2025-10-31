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
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 6 },
        bgcolor: "#fdfdfd",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={{ xs: 4, md: 5 }}
        sx={{
          color: "#c14365",
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.4rem" },
        }}
      >
        {title}
      </Typography>

      {/* Content Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 4, sm: 5, md: 6 },
        }}
      >
        {/* Left: Image */}
        <Box
          component="img"
          src={image}
          alt="FAQ"
          sx={{
            width: { xs: "100%", sm: "90%", md: "45%" },
            height: { xs: "auto", sm: 280, md: "100%" },
            maxHeight: { md: 420 },
            objectFit: "cover",
            borderRadius: 3,
            boxShadow: 3,
            mx: "auto",
          }}
        />

        {/* Right: FAQs */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Description with Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <HelpOutlineIcon
              sx={{ color: "#c14365", fontSize: { xs: 26, sm: 30 } }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#c14365",
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              }}
            >
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
                overflow: "hidden",
                width: "100%",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: expanded === idx ? "#fff" : "#c14365", fontSize: 28 }}
                  />
                }
                sx={{
                  bgcolor: expanded === idx ? "#c14365" : "#fff",
                  color: expanded === idx ? "#fff" : "#c14365",
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  transition: "0.3s",
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
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  lineHeight: 1.6,
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
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

import { Box, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../styles/user/FAQ.css";
import { CTAoneHome } from "../../components";

const faqs = [
  {
    title: "What is your return policy?",
    description: `You can return items within 30 days of purchase for a full refund.
    You can return items within 30 days of purchase for a full refund.You 
    can return items within 30 days of purchase for a full refund.You can return items within
     30 days of purchase for a full refund.You can return items within 30 days of purchase for a full refund.`,
  },
  {
    title: "Do you offer international shipping?",
    description: "Yes, we ship worldwide with applicable charges.",
  },
  {
    title: "How can I track my order?",
    description:
      "After placing an order, you will receive a tracking ID via email.",
  },
  {
    title: "What payment methods are accepted?",
    description:
      "We accept credit cards, debit cards, UPI, PayPal, and net banking.",
  },
  {
    title: "Can I cancel my order?",
    description: "Yes, orders can be cancelled before they are shipped.",
  },
  {
    title: "How do I contact customer support?",
    description: "You can reach us via email or our 24/7 live chat support.",
  },
  {
    title: "Are my payment details secure?",
    description:
      "Yes, all payments are processed through secure encrypted gateways.",
  },
  {
    title: "Do you offer discounts?",
    description: "Yes, we offer seasonal discounts and promo codes.",
  },
  {
    title: "Is account registration required?",
    description:
      "No, you can checkout as a guest, but registration gives more benefits.",
  },
  {
    title: "How long does delivery take?",
    description:
      "Delivery usually takes 3-7 business days depending on location.",
  },
];

const FAQ = () => {
  const handleApiCall = async () => {
    try {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      console.log("Fetched Rooms:", data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  return (
    <>
      {/* Top Section */}
      <div className="TopContainerFaq">
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to the most commonly asked questions about our services.
          If you have more queries, feel free to contact our support team.
        </p>
      </div>

      {/* FAQ Section */}
      <Box className="FaqContainer">
        {faqs.map((faq, index) => (
          <Box key={index} className="FaqItem">
            <Typography variant="h6" className="FaqTitle">
              <HelpOutlineIcon className="FaqIcon" />
              {faq.title}
            </Typography>
            <Typography variant="body1" className="FaqAnswer">
              {faq.description}
            </Typography>
          </Box>
        ))}
      </Box>
      <CTAoneHome
        backgroundImage="/room3.jpg"
        title="Looking for a relaxing vacation?"
        buttonText="Book now"
        onButtonClick={handleApiCall}
      />
      <Box className="getintouchFaq">
        <Box className="getintouchFaqChild">
          <Typography variant="h4" className="getintouchFaqTitle">
            Still have questions?
          </Typography>
          <Typography variant="body1" className="getintouchFaqText">
            If you can't find the answer you're looking for, please reach out to
            our support team. We're here to help!
          </Typography>
          <a href="/contact" className="getintouchFaqButton">
            Contact Us
          </a>
        </Box>
      </Box>
    </>
  );
};

export default FAQ;

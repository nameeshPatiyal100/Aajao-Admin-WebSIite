import { Box, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../styles/user/FAQ.css";
import { CTAoneHome } from "../../components";

const faqs = [
  {
    title: "How do I find a room near me on AAJOO?",
    description: `You just open the app, enable location, and you’ll see available rooms within walking distance from your current location.`,
  },
  {
    title: "Can I negotiate the price before booking?",
    description:
      "Yes! AAJOO allows real-time price negotiation with the host. You can propose a price and the host may accept, decline, or counter it.",
  },
  {
    title: "Can I book for one night, a week, or a month?",
    description:
      "Absolutely. You can choose a daily, weekly, or monthly stay as per your requirement. Use filters while searching.",
  },
  {
    title: "Is my booking and payment secure?",
    description:
      "Yes. We use secure payment gateways and you receive confirmation via app and email after booking.",
  },
  {
    title: "Do I have to pay a security deposit?",
    description:
      "For monthly stays, a minimal security deposit may apply. For daily or short stays, no deposit is required.",
  },
  {
    title: "Is KYC mandatory to book?",
    description:
      "Yes, to ensure safety for both user and host, basic KYC (ID verification with photo) is required before final booking.",
  },
  {
    title: "What if I have an issue during the stay?",
    description:
      "You can contact AAJOO support via in-app chat, email, or WhatsApp support for any help during your stay.",
  },
  {
    title: "What is the cancellation policy?",
    description:
      "You can cancel your booking according to the cancellation terms.",
  },
  {
    title: "Can I talk to the host before booking?",
    description:
      "Yes, once negotiation or request is accepted, you may get access to communicate with the host through the app.",
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
      <CTAoneHome
        backgroundImage="/room3.jpg"
        title="Looking for a relaxing vacation?"
        buttonText="Book now"
        onButtonClick={handleApiCall}
      />
    </>
  );
};

export default FAQ;

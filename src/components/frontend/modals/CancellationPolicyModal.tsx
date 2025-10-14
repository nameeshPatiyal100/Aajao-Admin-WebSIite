import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

interface CancellationPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancellationPolicyModal: React.FC<CancellationPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : "70%",
          maxHeight: "85vh",
          bgcolor: "#fff",
          borderRadius: "16px",
          boxShadow: 24,
          overflowY: "auto",
          p: isMobile ? 3 : 5,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#444",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: isMobile ? "1.4rem" : "2rem",
            mb: 3,
            color: "#222",
            textAlign: "center",
          }}
        >
          🏡 Aajoo Cancellation and Refund Policy
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Content */}
        <Box sx={{ color: "#333", fontSize: "1rem", lineHeight: 1.8 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            1. Introduction
          </Typography>
          <Typography sx={{ mb: 2 }}>
            At Aajoo, we aim to provide a smooth and fair experience for both
            guests and hosts. This policy explains how cancellations and refunds
            are handled on our platform. By using Aajoo, both guests and hosts
            agree to follow these rules.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            2. Booking Types on Aajoo
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>1. Bookings via Aajoo Platform (Prepaid/Online)</strong>
          </Typography>
          <ul>
            <li>Aajoo processes payments and cancellations.</li>
            <li>Refunds (if applicable) are managed by Aajoo as per this policy.</li>
          </ul>

          <Typography sx={{ mt: 2 }}>
            <strong>2. Direct Bookings with Host (Offline/Outside Aajoo)</strong>
          </Typography>
          <ul>
            <li>Guests and hosts are solely responsible for terms, payments, and cancellations.</li>
            <li>Aajoo does not process refunds for direct/offline bookings.</li>
            <li>
              We recommend putting all terms in written form with the host before confirming.
            </li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            3. Guest Cancellations
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Flexible Policy (default for most Aajoo hosts):</strong>
          </Typography>
          <ul>
            <li>Cancel after check-in → No refund</li>
            <li>Cancel up to 7 days before check-in → Full refund (Pre-Booking)</li>
            <li>Cancel within 7 days of check-in → 50% refund (excluding Aajoo service fees)</li>
            <li>Cancel within 48 hours of check-in → No refund</li>
          </ul>

          <Typography sx={{ mt: 2 }}>
            <strong>Non-Refundable Deals (if chosen by host):</strong>
          </Typography>
          <ul>
            <li>
              No refund on cancellation, but guests may request date changes (subject to host approval).
            </li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            4. Host Cancellations
          </Typography>
          <ul>
            <li>Hosts are strongly discouraged from canceling confirmed bookings.</li>
            <li>If a host cancels before check-in:</li>
            <ul>
              <li>Guest will receive a 100% refund.</li>
              <li>
                Aajoo may reduce host visibility or apply penalties for repeated cancellations.
              </li>
            </ul>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            5. Covered Issues for Refunds During Stay
          </Typography>
          <Typography>Guests may request a partial or full refund if:</Typography>
          <ul>
            <li>The host cancels the booking before check-in.</li>
            <li>The property is significantly different from the listing.</li>
            <li>The property is unsafe, unsanitary, or uninhabitable.</li>
            <li>The guest cannot access the property (host unresponsive/no keys).</li>
          </ul>
          <Typography sx={{ mt: 1 }}>
            Guests must report issues within 24 hours of check-in with photos/videos as evidence.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            6. Refund Processing
          </Typography>
          <ul>
            <li>Refunds are processed within 5–7 working days after approval.</li>
            <li>Refunds go back to the original payment method.</li>
            <li>Bank/payment gateway delays are outside Aajoo’s control.</li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            7. Fraud & Disputes
          </Typography>
          <ul>
            <li>
              Fraudulent refund claims will result in account suspension and possible legal action.
            </li>
            <li>
              Aajoo acts as a neutral mediator but is not legally liable for damages caused by hosts or guests.
            </li>
            <li>
              Both hosts and guests are expected to resolve disputes in good faith, with Aajoo providing support.
            </li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            8. Extenuating Circumstances
          </Typography>
          <Typography sx={{ mb: 2 }}>
            In rare cases (natural disasters, government restrictions, medical emergencies, etc.), 
            Aajoo may provide custom refunds or credits, even if the standard policy does not allow it.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            9. Contact Us
          </Typography>
          <Typography>
            For cancellations, refunds, or disputes:
            <br />
            📧 <strong>contactus@aajoohomes.com</strong>
          </Typography>

          <Typography
            sx={{
              mt: 4,
              fontWeight: 600,
              fontStyle: "italic",
              color: "#2e7d32",
            }}
          >
            ✅ This way, Aajoo protects both sides – giving guests fair refunds
            while holding hosts accountable, and keeping flexibility with custom
            refunds under special cases.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default CancellationPolicyModal;

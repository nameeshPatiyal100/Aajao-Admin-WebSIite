import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import {
  Box,
  Typography,
  // TextField,
  Button as MUIButton,
  CircularProgress,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useNotificationStore } from "../../components/toast";
import useAnimateFn from "../../hooks/useAnimate";
import { useState } from "react";
import storage from "../../utils/storage";
import { animations } from "../../components/layout/loginLayout";
import { Form } from "../../components/Form/form";
import { forgotPassword } from "../../redux/authSllice";
import { InputField } from "../../components/Form/inputField";

const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter email address")
    .email("Please enter a valid email address!"),
});

type ForgetValues = {
  email: string;
};

export const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  const { animate, callAfterAnimateFn } = useAnimateFn();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ForgetValues) => {
    try {
      setLoading(true);
      const response = await forgotPassword(values?.email);
      addNotification({
        type: "success",
        title: "Success",
        message: "OTP has been sent to your email address!",
      });
      if (response.data) {
        storage.setTokenByKey("resetToken", response.data.resetPasswordToken);
        storage.setTokenByKey("emailToken", response.data.emailToken);
        navigate("/auth/verifyOtp", { state: { email: values.email } });
      }
    } catch (e) {
      console.error(e);
      addNotification({
        type: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {animate && (
        <motion.div {...animations}>
          <Box
            className="login-form"
            sx={{
              maxWidth: 420,
              margin: "0 auto",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "#fff",
            }}
          >
            <Typography variant="h5" fontWeight={600} mb={1}>
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Don’t worry, it happens to all of us. Enter your email below to recover your password.
            </Typography>

            <Form<ForgetValues> onSubmit={handleSubmit} schema={schema}>
              {({ register, formState }) => (
                <>
                  <InputField
                    type="text"
                    label="Email"
                    placeholder="Please enter your email"
                    error={formState.errors['email']}
                    registration={register('email', { required: 'Email is required' })}
                  />

                  <Box mt={4}>
                    <MUIButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#C14365",
                        color: "#fff",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#a83956",
                        },
                        borderRadius: "8px",
                        py: 1.5,
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={22} sx={{ color: "#fff" }} />
                      ) : (
                        "Submit"
                      )}
                    </MUIButton>
                  </Box>
                </>
              )}
            </Form>

            <Typography
              mt={3}
              textAlign="center"
              fontSize={14}
              fontWeight={500}
              color="text.secondary"
            >
              <Link
                to="#"
                onClick={callAfterAnimateFn(() => navigate("/auth/login"))}
                style={{ color: "#C14365", textDecoration: "none" }}
              >
                Back to Login
              </Link>
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

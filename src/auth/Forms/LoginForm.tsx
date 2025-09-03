import {
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Form } from "../../components/Form/form";
import { useNotificationStore } from "../../components/toast";
import { InputField } from "../../components/Form/inputField";
import { Button } from "../../components/Element/button";
import { AnimatePresence, motion } from "framer-motion";
import useAnimateFn from "../../hooks/useAnimate";
import { animations } from "../../components/layout/loginLayout";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSllice";
import { AppDispatch } from "../../app/store";
import storage from "../../utils/storage";

const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter email address")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Please enter password"),
});
console.log(schema, "schema");

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { addNotification } = useNotificationStore();
  const { animate } = useAnimateFn();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState<"renter" | "host">("renter");
  const [initialValues, setInitialValues] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userCredentials");
    if (saved) {
      const parsed = JSON.parse(saved);
      setInitialValues(parsed);
      setRememberMe(parsed.rememberMe);
    }
    setIsReady(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await dispatch(
        login({
          user_email: data.email,
          user_password: data.password,
          isHost: userType === "host" ? 1 : 0,
        })
      ).unwrap();

      if (Array.isArray(response.data)) {
        addNotification({ title: "Invalid credentials", type: "error" });
      } else if (typeof response.data === "object" && response.data !== null) {
        if (data.rememberMe) {
          localStorage.setItem("userCredentials", JSON.stringify(data));
        } else {
          localStorage.removeItem("userCredentials");
        }

        storage.setToken(response?.data?.token);
        addNotification({ title: "Login Successfully", type: "success" });
        response?.data?.user?.cred_user_isHost
          ? navigate("/host/dashboard")
          : navigate("/user/dashboard");
      } else {
        addNotification({ title: "Unexpected response format", type: "error" });
      }
    } catch (error) {
      console.log(error);
      addNotification({ title: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {animate && isReady && (
        <motion.div {...animations}>
          <div className="login-form">
            <Form<FormData>
              onSubmit={onSubmit}
              options={{
                defaultValues: {
                  email: initialValues?.email,
                  password: initialValues?.password,
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  {/* User Type Toggle */}
                  <ToggleButtonGroup
                    value={userType}
                    exclusive
                    onChange={(_, value) => {
                      if (value !== null) setUserType(value);
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                      borderRadius: "30px",
                      overflow: "hidden",
                      "& .MuiToggleButton-root": {
                        textTransform: "capitalize",
                        px: 4,
                        py: 1.2,
                        border: "1px solid #C14365",
                        color: "#C14365",
                        fontWeight: 500,
                        borderRadius: 0,
                        transition: "all 0.2s ease-in-out",
                        "&:first-of-type": {
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                        },
                        "&:last-of-type": {
                          borderTopRightRadius: "30px",
                          borderBottomRightRadius: "30px",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#ffe4ec",
                          color: "#C14365",
                          borderColor: "#C14365",
                        },
                        "&:hover": {
                          backgroundColor: "#fcd2e0",
                        },
                      },
                    }}
                  >
                    <ToggleButton value="renter">Renter</ToggleButton>
                    <ToggleButton value="host">Host</ToggleButton>
                  </ToggleButtonGroup>

                  {/* Email Field */}
                  <div className="mb-3">
                    <InputField
                      type="text"
                      label="Email"
                      placeholder="Email"
                      error={formState.errors["email"]}
                      registration={register("email", {
                        required: "Email is required",
                      })}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <InputField
                      type="password"
                      label="Password"
                      placeholder="Password"
                      error={formState.errors["password"]}
                      registration={register("password", {
                        required: "Password is required",
                      })}
                      required
                    />
                  </div>

                  {/* Remember Me + Forgot Password */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          {...register("rememberMe")}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          sx={{
                            color: "#C14365",
                            "&.Mui-checked": {
                              color: "#C14365",
                            },
                          }}
                        />
                      }
                      label="Remember Me"
                    />
                    <Link
                      to="/auth/forget"
                      style={{ color: "#C14365", fontWeight: 500 }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="d-flex justify-content-end gap-3 mt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={loading}
                      style={{
                        backgroundColor: "#C14365",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        fontWeight: 600,
                      }}
                    >
                      Login
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

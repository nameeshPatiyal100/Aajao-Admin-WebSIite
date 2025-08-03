import clsx from "clsx";
import * as React from "react";
import { CircularProgress } from "@mui/material"; // MUI loader

const variants = {
  primary: "btn-primary",
  white: "btn-light",
  outline: "btn-outline-dark",
  danger: "btn-danger",
  success: "btn-success",
};

const sizes = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  disabled?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={clsx("btn", variants[variant], sizes[size], className)}
        {...props}
      >
        <div className="d-flex align-items-center justify-content-center">
          {isLoading ? (
            <CircularProgress
              size={20}
              thickness={5}
              sx={{
                color: variant === "white" || variant === "outline" ? "#000" : "#fff",
              }}
            />
          ) : (
            <>
              {startIcon && <span className="me-1">{startIcon}</span>}
              {props.children && <span className="mx-2">{props.children}</span>}
              {endIcon && <span className="ms-1">{endIcon}</span>}
            </>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";

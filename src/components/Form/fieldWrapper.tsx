import clsx from "clsx";
import * as React from "react";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: any;
  description?: string;
  blueLabel?: boolean;
  floating?: boolean;
  required?: boolean;
  isBold?: boolean;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, error, children, required, isBold } = props;

  return (
    <div className="mb-1 input-box">
      <label
        className={clsx("form-label", className)}
        style={isBold ? { fontWeight: "bold" } : {}}
      >
        {label}
        {required && <span className="text-danger">*</span>}
      </label>

      {children}

      {/* Instant error message with no animation */}
      {error?.message && (
        <div className="form-text text-danger form-error">
          {error.message}
        </div>
      )}
    </div>
  );
};

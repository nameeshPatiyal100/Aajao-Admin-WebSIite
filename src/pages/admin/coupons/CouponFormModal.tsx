import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Stack,
  Fade,
} from "@mui/material";
import { PurpleThemeColor } from "../../../theme/themeColor";
import type { CouponFormModalProps, CouponFormData } from "./types";
import { couponValidationSchema } from "../../../validations/admin-validations";

const defaultForm: CouponFormData = {
  coupon_title: "",
  coupon_code: "",
  discount_percentage: "",
  status: 1,
};

const CouponFormModal: React.FC<CouponFormModalProps> = ({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<any>(defaultForm);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        ...initialData,
      });
    } else {
      setFormData(defaultForm);
    }

    setErrors({});
  }, [mode, initialData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]:
        name === "discount_percentage" || name === "status"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await couponValidationSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({});
      onSubmit(formData);
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  const purpleFieldStyle = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: PurpleThemeColor,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: PurpleThemeColor,
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 4,
          width: 500,
          p: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight={700}>
          {mode === "add" ? "Add Coupon" : "Edit Coupon"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          {/* Coupon Title */}
          <TextField
            label="Coupon Title"
            name="coupon_title"
            value={formData.coupon_title}
            onChange={handleChange}
            fullWidth
            size="small"
            error={!!errors.coupon_title}
            helperText={errors.coupon_title}
            sx={purpleFieldStyle}
          />

          {/* Coupon Code */}
          <TextField
            label="Coupon Code"
            name="coupon_code"
            value={formData.coupon_code}
            onChange={(e) =>
              handleChange({
                ...e,
                target: {
                  ...e.target,
                  value: e.target.value.toUpperCase(),
                },
              })
            }
            fullWidth
            size="small"
            error={!!errors.coupon_code}
            helperText={errors.coupon_code}
            sx={purpleFieldStyle}
          />

          {/* Discount Percentage */}
          <TextField
            label="Discount Percentage"
            name="discount_percentage"
            type="number"
            value={formData.discount_percentage}
            onChange={handleChange}
            fullWidth
            size="small"
            error={!!errors.discount_percentage}
            helperText={errors.discount_percentage}
            sx={{
              ...purpleFieldStyle,
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            }}
            inputProps={{
              min: 1,
              max: 100,
            }}
            onFocus={(e) => {
              if (e.target.value === "0") {
                e.target.value = "";
              }
            }}
          />

          {/* Status */}
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            size="small"
            error={!!errors.status}
            helperText={errors.status}
            sx={purpleFieldStyle}
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </TextField>

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                borderColor: PurpleThemeColor,
                color: PurpleThemeColor,
                px: 3,
                "&:hover": {
                  borderColor: PurpleThemeColor,
                  backgroundColor: "rgba(124,58,237,0.08)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: PurpleThemeColor,
                px: 3,
                "&:hover": {
                  backgroundColor: PurpleThemeColor,
                  opacity: 0.9,
                },
              }}
            >
              {mode === "add" ? "Add Coupon" : "Update Coupon"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CouponFormModal;
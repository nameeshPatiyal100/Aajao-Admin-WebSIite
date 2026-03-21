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
import type { CouponFormModalProps } from "./types";
import { couponValidationSchema } from "../../../validations/admin-validations";
import { TableLoader } from "../../../components/admin/common/TableLoader";

/* ================= Default Form ================= */

const defaultForm = {
  coupon_title: "",
  coupon_code: "",
  discount_type: 1,
  discount_percentage: "",
  discount_amount: "",
  min_amount: "",
  max_amount: "",
  valid_from: "",
  valid_to: "",
  usage_limit: "",
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
        coupon_title: initialData.cpn_title ?? "",
        coupon_code: initialData.cpn_code ?? "",
        discount_type: initialData.cpn_dsctn_type ?? 1,
        discount_percentage: initialData.cpn_dsctn_percnt ?? "",
        discount_amount: initialData.cpn_dsctn_amt ?? "",
        min_amount: initialData.cpn_min_amt ?? "",
        max_amount: initialData.cpn_max_amt ?? "",
        valid_from: initialData.cpn_valid_from ?? "",
        valid_to: initialData.cpn_valid_to ?? "",
        usage_limit: initialData.cpn_usage_limit ?? "",
        status: initialData.cpn_status ?? 1,
      });
    }

    if (mode === "add") {
      setFormData(defaultForm);
    }

    setErrors({});
  }, [initialData, mode]);
  /* ================= Handle Change ================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: [
        "discount_type",
        "discount_percentage",
        "discount_amount",
        "min_amount",
        "max_amount",
        "usage_limit",
        "status",
      ].includes(name)
        ? value === ""
          ? ""
          : Number(value)
        : value,
    }));
  };

  /* ================= Submit ================= */

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

  /* ================= Purple Style ================= */

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
        sx: { borderRadius: 4, width: 520, p: 2 },
      }}
    >
      <DialogTitle>
        <Typography fontWeight={700}>
          {mode === "add" ? "Add Coupon" : "Edit Coupon"}
        </Typography>
        {/* <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>

      {/* <DialogContent>
        <Stack spacing={3} mt={1}> */}
      <DialogContent>
        {loading && mode === "edit" ? (
          <TableLoader minHeight={250} text="Loading coupon details..." />
        ) : (
          <Stack spacing={3} mt={1}>
            {/* Title */}
            <TextField
              label="Coupon Title"
              name="coupon_title"
              value={formData.coupon_title}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }} // ✅ FIX
              error={!!errors.coupon_title}
              helperText={errors.coupon_title}
              sx={purpleFieldStyle}
            />

            <TextField
              label="Coupon Code"
              name="coupon_code"
              value={formData.coupon_code}
              onChange={(e) => {
                const upperValue = e.target.value.toUpperCase();

                setFormData((prev: any) => ({
                  ...prev,
                  coupon_code: upperValue,
                }));
              }}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }} // also fix overlap
              error={!!errors.coupon_code}
              helperText={errors.coupon_code}
              sx={purpleFieldStyle}
            />

            {/* Discount Type */}
            <TextField
              select
              label="Discount Type"
              name="discount_type"
              value={formData.discount_type}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={purpleFieldStyle}
            >
              <MenuItem value={1}>Percentage (%)</MenuItem>
              <MenuItem value={2}>Flat Amount</MenuItem>
            </TextField>

            {/* Conditional Discount Field */}
            {formData.discount_type === 1 ? (
              <TextField
                label="Discount %"
                name="discount_percentage"
                type="number"
                value={formData.discount_percentage}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={purpleFieldStyle}
              />
            ) : (
              <TextField
                label="Discount Amount"
                name="discount_amount"
                type="number"
                value={formData.discount_amount}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={purpleFieldStyle}
              />
            )}

            {/* Min / Max */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Min Amount"
                name="min_amount"
                type="number"
                value={formData.min_amount}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={purpleFieldStyle}
              />
              <TextField
                label="Max Amount"
                name="max_amount"
                type="number"
                value={formData.max_amount}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={purpleFieldStyle}
              />
            </Stack>

            {/* Dates */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Valid From"
                type="date"
                name="valid_from"
                value={formData.valid_from || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                sx={purpleFieldStyle}
              />
              <TextField
                label="Valid To"
                type="date"
                name="valid_to"
                value={formData.valid_to || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                sx={purpleFieldStyle}
              />
            </Stack>

            {/* Usage Limit */}
            <TextField
              label="Usage Limit"
              name="usage_limit"
              type="number"
              value={formData.usage_limit}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={purpleFieldStyle}
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
              sx={purpleFieldStyle}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </TextField>

            {/* Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{
                  borderColor: PurpleThemeColor,
                  color: PurpleThemeColor,
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
                  "&:hover": { backgroundColor: PurpleThemeColor },
                }}
              >
                {mode === "add" ? "Add Coupon" : "Update Coupon"}
              </Button>
            </Box>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CouponFormModal;

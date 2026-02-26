import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { PurpleThemeColor } from "../../../theme/themeColor";
import { reviewSchema } from "../../../validations/admin-validations";
import type { FormValues, UpdateFormProps } from "./types";
import { themeCss } from "../../../theme/themeCss";

export default function UpdateForm({
  formData,
  formshow,
  handleFormClose,
  handleUpdateReview,
}: UpdateFormProps) {
  const formik = useFormik<FormValues>({
    initialValues: {
      id: formData?.id ?? "",
      property: formData?.property ?? "",
      user_name: formData?.user_name ?? "",
      title: formData?.title ?? "",
      description: formData?.description ?? "",
      rating: formData?.rating ?? "1",
      status: formData?.status ?? "0",
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      handleUpdateReview(values);
      handleFormClose();
    },
  });

  return (
    <Modal open={formshow} onClose={handleFormClose}>
      <Box
        sx={{
          ...themeCss.modalFormContainer,
          maxWidth: 700,
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            background: `linear-gradient(135deg, ${PurpleThemeColor}, #6f137f)`,
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography fontSize={12} sx={{ opacity: 0.9 }}>
              Booking ID
            </Typography>
            <Typography fontWeight={700}>#{formik.values.id}</Typography>
          </Box>

          <IconButton onClick={handleFormClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* <Box sx={themeCss.modalBody}> */}
          <form onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* ===== Review Section Component ===== */}
              {[
                { label: "Property Review" },
                { label: "Host Review" },
                { label: "Platform Review" },
              ].map((section) => (
                <Box
                  key={section.label}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: "#fafafa",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f5f3ff",
                      borderColor: "#c4b5fd",
                    },
                  }}
                >
                  <Typography fontWeight={600} mb={1} color={PurpleThemeColor}>
                    {section.label}
                  </Typography>

                  <Typography fontSize={14} fontWeight={500}>
                    {formik.values.title}
                  </Typography>

                  <Typography fontSize={13} color="text.secondary" mt={0.5}>
                    {formik.values.description}
                  </Typography>

                  <Rating
                    value={Number(formik.values.rating)}
                    readOnly
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              ))}

              {/* ===== Host Review for User ===== */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#fff7ed",
                  border: "1px solid #fed7aa",
                }}
              >
                <Typography fontWeight={700} mb={1} color="#9a3412">
                  Host Review for User
                </Typography>

                <Typography fontSize={13}>
                  <b>User:</b> {formik.values.user_name}
                </Typography>
                <Typography fontSize={13}>
                  <b>Host:</b> {formik.values.property}
                </Typography>
                <Typography fontSize={13} mb={1}>
                  <b>Property:</b> {formik.values.property}
                </Typography>

                <Typography fontWeight={500} fontSize={14}>
                  {formik.values.title}
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  {formik.values.description}
                </Typography>

                <Rating
                  value={Number(formik.values.rating)}
                  readOnly
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>

              {/* ===== Status Dropdown ===== */}
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#881f9b",
                    },
                  }}
                >
                  Status
                </InputLabel>

                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  input={<OutlinedInput label="Status" />}
                  sx={{
                    /* Default border */
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#881f9b",
                    },

                    /* Hover border */
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#881f9b",
                    },

                    /* Focused border */
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#881f9b",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#faf5ff", // light purple menu
                      },
                    },
                  }}
                >
                  <MenuItem
                    value="0"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ede9fe",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#ddd6fe",
                        "&:hover": {
                          backgroundColor: "#c4b5fd",
                        },
                      },
                    }}
                  >
                    Pending
                  </MenuItem>

                  <MenuItem
                    value="1"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ede9fe",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#ddd6fe",
                      },
                    }}
                  >
                    Approved
                  </MenuItem>

                  <MenuItem
                    value="2"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ede9fe",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#ddd6fe",
                      },
                    }}
                  >
                    Rejected
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Actions */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button
                variant="outlined"
                onClick={handleFormClose}
                sx={{
                  borderColor: "#dc2626",
                  color: "#dc2626",
                  "&:hover": {
                    backgroundColor: "#fee2e2",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={formik.values.status === "1"}
                sx={{
                  bgcolor: PurpleThemeColor,
                  opacity: formik.values.status === "1" ? 0.6 : 1,
                  cursor:
                    formik.values.status === "1" ? "not-allowed" : "pointer",
                  "&:hover": {
                    bgcolor:
                      formik.values.status === "1"
                        ? PurpleThemeColor
                        : "#6f137f",
                    transform:
                      formik.values.status === "1"
                        ? "none"
                        : "translateY(-1px)",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}

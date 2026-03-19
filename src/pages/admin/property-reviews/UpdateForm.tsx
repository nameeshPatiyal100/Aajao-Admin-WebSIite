import { useState } from "react";
import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../store/store";

import { fetchReviewListing } from "../../../features/admin/Review/reviewListingSlice.slice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateReview } from "../../../features/admin/Review/updateReviewSlice";
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";

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
  reviewDetail,
  loading,
  formshow,
  handleFormClose,
  handleUpdateReview,
}: UpdateFormProps) {
  const dispatch = useAppDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };
  console.log("Review Detail in Form:", reviewDetail); // ✅ Debug log
  const { propertyReview, hostReview, platformReview, hostReviewForUser } =
    reviewDetail || {};
  const {
    page,
    search,
    status,
    loading: listingLoading,
  } = useAppSelector((state) => state.reviewListingSlice);

  // const { loading: updateLoading } =
  // useAppSelector((state) => state.updateReview);

  const limit = 10;
  // const limit = 10; // ✅ FIX: define limit (or use your state value)

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      id: propertyReview?.br_book_id ?? "",
      property:
        hostReviewForUser?.["reviewProp.property_name"] ?? "No Property",
      user_name:
        hostReviewForUser?.["reviewUsername.user_fullName"] ?? "No User",
      title: "",
      description: "",
      rating: "1",

      // ✅ FIXED HERE
      status: String(propertyReview?.br_isActive ?? "0") as "0" | "1" | "2",
    },
    validationSchema: reviewSchema,

    onSubmit: async (values) => {
      try {
        const updateRes = await dispatch(
          updateReview({
            bookingId: values.id,
            status: Number(values.status),
          })
        )
          .unwrap()
          .then((res) => {
            console.log(res, "resresresresresres");
            showSnackbar(
              res?.message || "Review updated successfully",
              "success"
            );
          })
          .then(() => {
            setTimeout(() => {
              handleFormClose();
            }, 500);
          });
        dispatch(
          fetchReviewListing({
            page,
            search,
            limit,
            status,
          })
        );
      } catch (error: any) {
        showSnackbar(error?.message || "Failed to update review", "error");
      }
    },
  });
  const ReviewCard = ({
    title,
    reviewTitle,
    description,
    rating,
  }: {
    title: string;
    reviewTitle?: string | null;
    description?: string | null;
    rating?: number | string;
  }) => (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        background: "#fafafa",
        "&:hover": { borderColor: "#c4b5fd", background: "#f5f3ff" },
      }}
    >
      <Typography fontWeight={600} mb={1} color={PurpleThemeColor}>
        {title}
      </Typography>

      {reviewTitle || description ? (
        <>
          <Typography fontSize={14} fontWeight={500}>
            {reviewTitle ?? "No Title"}
          </Typography>

          <Typography fontSize={13} color="text.secondary">
            {description ?? "No Description"}
          </Typography>

          <Rating
            value={Number(rating || 0)}
            readOnly
            size="small"
            sx={{ mt: 1 }}
          />
        </>
      ) : (
        <Typography fontSize={13} color="text.secondary">
          No Review
        </Typography>
      )}
    </Box>
  );

  /* ================= Review Config ================= */

  const reviews = [
    {
      label: "Property Review",
      title: propertyReview?.br_title,
      desc: propertyReview?.br_desc,
      rating: propertyReview?.br_rating,
    },
    {
      label: "Host Review",
      title: hostReview?.hr_title,
      desc: hostReview?.hr_description,
      rating: hostReview?.hr_rating,
    },
    {
      label: "Platform Review",
      title: platformReview?.pr_title,
      desc: platformReview?.pr_description,
      rating: platformReview?.pr_rating,
    },
  ];

  return (
    <>
      <Modal open={formshow} onClose={handleFormClose}>
        <Box sx={{ ...themeCss.modalFormContainer, maxWidth: 720 }}>
          {/* HEADER */}
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
              <Typography fontWeight={700}>
                #{propertyReview?.br_book_id ?? "N/A"}
              </Typography>
            </Box>

            <IconButton onClick={handleFormClose} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* BODY */}
          <Box p={3}>
            <form onSubmit={formik.handleSubmit}>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Review Cards */}
                {reviews.map((r) => (
                  <ReviewCard
                    key={r.label}
                    title={r.label}
                    reviewTitle={r.title}
                    description={r.desc}
                    rating={r.rating}
                  />
                ))}

                {/* Host Review For User */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid #fed7aa",
                    background: "#fff7ed",
                  }}
                >
                  <Typography fontWeight={700} mb={1} color="#9a3412">
                    Host Review for User
                  </Typography>

                  {hostReviewForUser ? (
                    <>
                      <Typography fontSize={13}>
                        <b>User:</b>{" "}
                        {hostReviewForUser["reviewUsername.user_fullName"]}
                      </Typography>

                      <Typography fontSize={13}>
                        <b>Host:</b>{" "}
                        {hostReviewForUser["reviewHostName.user_fullName"]}
                      </Typography>

                      <Typography fontSize={13} mb={1}>
                        <b>Property:</b>{" "}
                        {hostReviewForUser["reviewProp.property_name"]}
                      </Typography>

                      <Typography fontWeight={500}>
                        {hostReviewForUser.hru_title ?? "No Title"}
                      </Typography>

                      <Typography fontSize={13} color="text.secondary">
                        {hostReviewForUser.hru_description ?? "No Description"}
                      </Typography>

                      <Rating
                        value={Number(hostReviewForUser.hru_rating || 0)}
                        readOnly
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </>
                  ) : (
                    <Typography fontSize={13}>No Review</Typography>
                  )}
                </Box>

                {/* STATUS DROPDOWN */}
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      "&.Mui-focused": { color: PurpleThemeColor },
                    }}
                  >
                    Status
                  </InputLabel>
                  <Select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    // disabled={formik.values.status === "1"}
                    input={<OutlinedInput label="Status" />}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d1d5db",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: PurpleThemeColor,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: PurpleThemeColor,
                      },
                    }}
                  >
                    <MenuItem value="0">Pending</MenuItem>
                    <MenuItem value="1">Approved</MenuItem>
                    <MenuItem value="2">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* ACTION BUTTONS */}
              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button
                  variant="outlined"
                  onClick={handleFormClose}
                  sx={{
                    borderColor: "#dc2626",
                    color: "#dc2626",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  // disabled={formik.values.status === "1"}
                  sx={{
                    bgcolor: PurpleThemeColor,
                    "&:hover": { bgcolor: "#6f137f" },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </>
  );
}

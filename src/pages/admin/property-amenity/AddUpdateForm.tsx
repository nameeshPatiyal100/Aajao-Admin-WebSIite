import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import { PurpleThemeColor } from "../../../theme/themeColor";
import { setupAmenitySchema } from "../../../validations/admin-validations";
import type { AddUpdateFormProps } from "./types";
import { themeCss } from "../../../theme/themeCss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { useEffect, useMemo } from "react";
import { TableLoader } from "../../../components/admin/common/TableLoader";

import { getPropertyAmenityById } from "../../../features/admin/propertyAmenity/propertyAmenityDetails.slice";
import { addOrUpdatePropertyAmenity } from "../../../features/admin/propertyAmenity/propertyAmenityAddUpdate.slice";
import { fetchPropertyAmenities } from "../../../features/admin/propertyAmenity/propertyAmenity.thunk";

export default function AddUpdateForm({
  amenetiesId,
  formshow,
  handleFormClose,
  filterData,
  showSnackbar, 
}: AddUpdateFormProps) {
  const dispatch = useAppDispatch();

  const [submitLoading, setSubmitLoading] = React.useState(false);

  const initialValues = {
    amn_title: "",
    amn_isActive: "",
  };

  const { data, loading } = useAppSelector(
    (state) => state.propertyAmenityDetails
  );

  const mapApiToFormValues = (data: any) => ({
    amn_title: data?.amn_title ?? "",
    amn_isActive: data?.amn_isActive ?? "",
  });

  useEffect(() => {
    if (amenetiesId && formshow) {
      dispatch(getPropertyAmenityById(Number(amenetiesId)));
    }
  }, [amenetiesId, formshow, dispatch]);

  const formInitialValues = useMemo(() => {
    if (amenetiesId === null) return initialValues;
    return data ? mapApiToFormValues(data) : initialValues;
  }, [amenetiesId, data]);

  const handleSubmit = async (values: any) => {
    if (amenetiesId) {
      values.amenetiesId = amenetiesId;
    }

    try {
      setSubmitLoading(true);

      const res = await dispatch(
        addOrUpdatePropertyAmenity(values)
      ).unwrap();

      // ✅ CLOSE MODAL FIRST
      handleFormClose();

      // ✅ REFRESH TABLE
      dispatch(fetchPropertyAmenities(filterData));

      // ✅ SHOW SNACKBAR FROM PARENT
      showSnackbar(
        res?.message ||
          `Amenity ${
            amenetiesId ? "updated" : "added"
          } successfully!`,
        "success"
      );
    } catch (err: any) {
      showSnackbar(
        err?.message || "Failed to save amenity",
        "error"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Modal open={formshow} onClose={handleFormClose}>
      <Box sx={themeCss.modalFormContainer}>
        {/* HEADER */}
        <Box sx={themeCss.modalHeader}>
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {amenetiesId ? "Update Amenity" : "Add Amenity"}
          </Typography>

          <IconButton onClick={handleFormClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box sx={{ p: 3, position: "relative" }}>
          {/* ✅ DETAILS LOADER */}
          {loading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.7)",
                zIndex: 10,
              }}
            >
              <TableLoader text="Loading..." />
            </Box>
          )}

          {/* ✅ SUBMIT LOADER */}
          {submitLoading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.7)",
                zIndex: 20,
              }}
            >
              <TableLoader text="Saving..." />
            </Box>
          )}

          <Formik
            initialValues={formInitialValues}
            validationSchema={setupAmenitySchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box display="flex" flexDirection="column" gap={3}>
                  {/* NAME */}
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="amn_title"
                      sx={{
                        color:
                          touched.amn_title && errors.amn_title
                            ? "error.main"
                            : undefined,
                        "&.Mui-focused": {
                          color: PurpleThemeColor,
                        },
                      }}
                    >
                      Name
                    </InputLabel>

                    <OutlinedInput
                      id="amn_title"
                      name="amn_title"
                      label="Name"
                      value={values.amn_title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.amn_title && !!errors.amn_title}
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: PurpleThemeColor,
                        },
                      }}
                    />

                    {touched.amn_title && errors.amn_title && (
                      <FormHelperText error>
                        {errors.amn_title as string}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* STATUS */}
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>

                    <Select
                      labelId="status-label"
                      id="amn_isActive"
                      name="amn_isActive"
                      value={values.amn_isActive}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      input={<OutlinedInput label="Status" />}
                      error={touched.amn_isActive && !!errors.amn_isActive}
                    >
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="0">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* ACTIONS */}
                <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                  <Button
                    variant="outlined"
                    onClick={handleFormClose}
                    sx={{
                      color: "#cf1f1f",
                      borderColor: "#cf1f1f",
                      "&:hover": {
                        backgroundColor: "#fcecec",
                        borderColor: "#cf1f1f",
                      },
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitLoading}
                    sx={{
                      bgcolor: PurpleThemeColor,
                      "&:hover": {
                        bgcolor: "#6f137f",
                      },
                    }}
                  >
                    {submitLoading ? "Saving..." : "Submit"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
}
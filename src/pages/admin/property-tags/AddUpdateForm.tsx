import { useEffect, useMemo } from "react";
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
import { setupTagSchema } from "../../../validations/admin-validations";
import type { AddUpdateFormProps } from "./types";
import { themeCss } from "../../../theme/themeCss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getPropertyTagById } from "../../../features/admin/propertyTag/propertyTagDetails.slice";
import { addOrUpdatePropertyTag } from "../../../features/admin/propertyTag/propertyTagAddUpdate.slice";
import { fetchPropertyTags } from "../../../features/admin/propertyTag/propertyTag.thunk";
import { TableLoader } from "../../../components/admin/common/TableLoader";

interface Props extends AddUpdateFormProps {
  onSuccess: (message: string) => void;
}

export default function AddUpdateForm({
  tagId,
  formshow,
  handleFormClose,
  filterData,
  onSuccess, // ✅ NEW
}: Props) {
  const dispatch = useAppDispatch();

  const initialValues = {
    tag_name: "",
    tag_isActive: "",
  };

  const { data } = useAppSelector((state) => state.propertyTagDetails);

  // ✅ IMPORTANT: use add/update loading
  const { loading } = useAppSelector((state) => state.propertyTagAddUpdate);

  const mapApiToFormValues = (data: any) => ({
    tag_name: data?.tag_name ?? "",
    tag_isActive: data?.tag_isActive ?? "",
  });

  useEffect(() => {
    if (tagId && formshow) {
      dispatch(getPropertyTagById(Number(tagId)));
    }
  }, [tagId, formshow, dispatch]);

  const formInitialValues = useMemo(() => {
    if (tagId === null) return initialValues;
    return data ? mapApiToFormValues(data) : initialValues;
  }, [tagId, data]);

  const handleSubmit = (values: any) => {
    if (tagId) values.tagId = tagId;

    dispatch(addOrUpdatePropertyTag(values))
      .unwrap()
      .then((res) => {
        // ✅ SEND MESSAGE TO PARENT
        onSuccess(res?.message || "Saved successfully");

        handleFormClose(); // close modal
        dispatch(fetchPropertyTags(filterData));
      })
      .catch((err: any) => {
        onSuccess(err?.message || "Failed to save"); // still show
      });
  };

  return (
    <Modal open={formshow} onClose={handleFormClose}>
      <Box sx={themeCss.modalFormContainer}>
        {/* HEADER */}
        <Box sx={themeCss.modalHeader}>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
            {tagId ? "Update Tag" : "Add Tag"}
          </Typography>

          <IconButton onClick={handleFormClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box sx={{ p: 3, position: "relative" }}>
          {/* ✅ LOADER FOR ADD/UPDATE */}
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
              <TableLoader text="Saving..." />
            </Box>
          )}

          <Formik
            initialValues={formInitialValues}
            validationSchema={setupTagSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box display="flex" flexDirection="column" gap={3}>
                  {/* Name */}
                  <FormControl fullWidth>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                      name="tag_name"
                      value={values.tag_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.tag_name && !!errors.tag_name}
                    />
                    {touched.tag_name && errors.tag_name && (
                      <FormHelperText error>
                        {errors.tag_name as string}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Status */}
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="tag_isActive"
                      value={values.tag_isActive}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      input={<OutlinedInput label="Status" />}
                      error={touched.tag_isActive && !!errors.tag_isActive}
                    >
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="0">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* ACTIONS */}
                <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                  {/* Cancel Button */}
                  <Button
                    variant="outlined"
                    onClick={handleFormClose}
                    sx={{
                      color: "#d32f2f",
                      borderColor: "#d32f2f",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#fdecea",
                        borderColor: "#b71c1c",
                        color: "#b71c1c",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#7C3AED",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#6D28D9",
                      },
                    }}
                  >
                    Submit
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

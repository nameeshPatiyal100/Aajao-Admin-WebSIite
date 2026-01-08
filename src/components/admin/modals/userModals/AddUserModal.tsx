import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";

import { validationSchemaAddUserHostModal } from "../../../../validations/admin-validations";
import { PurpleThemeColor } from "../../../../theme/themeColor";

import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import AccountStatus from "./AccountStatus";
import RoleSelector from "./RoleSelector";
import ProfileUpload from "./ProfileUpload";
import IdUpload from "./IdUpload";

/* ------------------------------------------------------------------ */
/* Initial Values (Formik source of truth) */
/* ------------------------------------------------------------------ */
export const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  city: "",
  zipcode: "",
  status: "",
  verified: "",
  user: true,
  host: false,
  profileImage: "",
  idImage: "",
};

/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */
interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (data: any) => void;
  mode: "add" | "edit" | "view";
  user?: Partial<typeof initialValues>;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */
const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onAddUser,
  mode,
  user,
}) => {
  const isViewMode = mode === "view";

  const getModalTitle = (values: any) => {
    const entity = values.host ? "Host" : "User";
    if (mode === "add") return `Add New ${entity}`;
    if (mode === "edit") return `Edit ${entity}`;
    return `${entity} Details`;
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal open={open} onClose={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            style={styles.motionWrapper}
          >
            <Box sx={styles.container}>
              <Formik
                initialValues={{
                  ...initialValues,
                  ...user,
                }}
                validationSchema={validationSchemaAddUserHostModal}
                enableReinitialize
                onSubmit={(values) => {
                  if (isViewMode) return;
                  onAddUser(values);
                  onClose();
                }}
              >
                {({ values }) => (
                  <Form>
                    {/* ---------------- HEADER ---------------- */}
                    <Box sx={styles.header}>
                      <Box>
                        <Typography sx={styles.title}>
                          {getModalTitle(values)}
                        </Typography>
                        <Typography sx={styles.subtitle}>
                          Manage account information & verification
                        </Typography>
                      </Box>

                      <IconButton onClick={onClose} sx={styles.closeBtn}>
                        <CloseIcon />
                      </IconButton>
                    </Box>

                    {/* ---------------- FORM SECTIONS ---------------- */}
                    <Box sx={styles.formGrid}>
                      <PersonalInfo disabled={isViewMode} />
                      <AddressInfo disabled={isViewMode} />
                      <AccountStatus disabled={isViewMode} />
                      <RoleSelector disabled={isViewMode} />
                    </Box>

                    <ProfileUpload disabled={isViewMode} />
                    <IdUpload disabled={isViewMode} />

                    {/* ---------------- ACTIONS ---------------- */}
                    <Box sx={styles.actions}>
                      <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={styles.cancelBtn}
                      >
                        Cancel
                      </Button>

                      {!isViewMode && (
                        <Button
                          type="submit"
                          variant="contained"
                          sx={styles.submitBtn}
                        >
                          {mode === "edit" ? "Update" : "Add"}
                        </Button>
                      )}
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default AddUserModal;

/* ------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------ */
const styles = {
  motionWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  container: {
    width: { xs: "92%", md: "80%" },
    maxWidth: 900,
    maxHeight: "90vh",
    bgcolor: "#fff",
    borderRadius: 4,
    p: 4,
    overflowY: "auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
    p: 2.5,
    borderRadius: 2,
    background: `linear-gradient(135deg, ${PurpleThemeColor}, #a855f7)`,
    color: "#fff",
  },

  title: {
    fontWeight: 700,
    fontSize: "1.25rem",
  },

  subtitle: {
    fontSize: "0.8rem",
    opacity: 0.9,
  },

  closeBtn: {
    color: "#fff",
    bgcolor: "rgba(255,255,255,0.15)",
    "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 3,
    mb: 3,
  },

  actions: {
    mt: 4,
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
  },

  cancelBtn: {
    borderColor: PurpleThemeColor,
    color: PurpleThemeColor,
  },

  submitBtn: {
    bgcolor: PurpleThemeColor,
    "&:hover": { bgcolor: "#6e167d" },
  },
};

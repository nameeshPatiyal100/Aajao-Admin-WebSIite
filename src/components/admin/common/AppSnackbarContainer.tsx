// src/components/common/AppSnackbarContainer.tsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import AppSnackbar from "../../AppSnackbar";
import { clearMessage } from "../../../features/ui/ui.slice";

const AppSnackbarContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, severity } = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(clearMessage());
  };

  return (
    <AppSnackbar
      open={!!message}
      message={message || ""}
      severity={severity}
      onClose={handleClose}
    />
  );
};

export default AppSnackbarContainer;

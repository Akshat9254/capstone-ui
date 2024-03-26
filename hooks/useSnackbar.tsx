import { CustomSnackbar } from "@components";
import { useState } from "react";

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });

  const handleCloseSnackbar = () =>
    setSnackbar({ visible: false, message: "" });
  return (
    <CustomSnackbar
      visible={snackbar.visible}
      onDismiss={handleCloseSnackbar}
      message={snackbar.message}
    />
  );
};

export default useSnackbar;

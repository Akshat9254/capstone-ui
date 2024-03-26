import { Snackbar } from "react-native-paper";

type PropsType = {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
};

const CustomSnackbar = ({
  message,
  visible,
  onDismiss,
  duration = 1000,
}: PropsType) => {
  if (!visible) return null;
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: "Dismiss",
        onPress: onDismiss,
      }}
      duration={duration}
      style={{ width: "100%" }}
      wrapperStyle={{ alignSelf: "center", marginBottom: 18, width: "100%" }}
    >
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;

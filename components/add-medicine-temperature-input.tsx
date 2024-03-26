import { CustomNumericInput } from "@components/ui";
import { RegisterMedicineRequest } from "../types/input";
import { StyleSheet, View } from "react-native";
import { HelperText, Text } from "react-native-paper";

type PropsType = {
  formData: RegisterMedicineRequest;
  handleTemperatureMinChange: (value: string) => void;
  handleTemperatureMaxChange: (value: string) => void;
  errors: { [key: string]: string | null };
};

const AddMedicineTemperatureInput = ({
  formData,
  handleTemperatureMinChange,
  handleTemperatureMaxChange,
  errors,
}: PropsType) => {
  return (
    <View style={{ gap: 0 }}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.text}>{`Temperature (in \u00b0C)`}</Text>
        <View style={styles.inputContainer}>
          <CustomNumericInput
            value={formData.temperatureRange.min.toString()}
            label={"Min"}
            handleChange={handleTemperatureMinChange}
            error={!!errors["temperatureRange"]}
          />
          <Text style={styles.text}>to</Text>
          <CustomNumericInput
            value={formData.temperatureRange.max.toString()}
            label={"Max"}
            handleChange={handleTemperatureMaxChange}
            error={!!errors["temperatureRange"]}
          />
        </View>
      </View>
      <HelperText type={"error"}>{errors["temperatureRange"]}</HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginLeft: 0,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});

export default AddMedicineTemperatureInput;

import { CustomNumericInput } from "@components/ui";
import { RegisterMedicineRequest } from "../types/input";
import { StyleSheet, View } from "react-native";
import { HelperText, Text } from "react-native-paper";

type PropsType = {
  formData: RegisterMedicineRequest;
  handleHumidityMinChange: (value: string) => void;
  handleHumidityMaxChange: (value: string) => void;
  errors: { [key: string]: string | null };
};

const AddMedicineHumidityInput = ({
  formData,
  handleHumidityMinChange,
  handleHumidityMaxChange,
  errors,
}: PropsType) => {
  return (
    <View>
      <View style={styles.horizontalContainer}>
        <Text style={styles.text}>{`Humidity (in %)`}</Text>
        <View style={styles.inputContainer}>
          <CustomNumericInput
            value={formData.humidityRange.min.toString()}
            label={"Min"}
            handleChange={handleHumidityMinChange}
            error={!!errors["humidityRange"]}
          />
          <Text style={styles.text}>to</Text>
          <CustomNumericInput
            value={formData.humidityRange.max.toString()}
            label={"Max"}
            handleChange={handleHumidityMaxChange}
            error={!!errors["humidityRange"]}
          />
        </View>
      </View>
      <HelperText type={"error"}>{errors["humidityRange"]}</HelperText>
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

export default AddMedicineHumidityInput;

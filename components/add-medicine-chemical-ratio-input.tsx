import { CustomNumericInput, CustomTextInput } from "@components/ui";
import { RegisterMedicineRequest } from "../types/input";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

type PropsType = {
  formData: RegisterMedicineRequest;
  handleChemicalNameChange: (value: string, index: number) => void;
  handleChemicalRatioChange: (value: string, index: number) => void;
  handleRemoveChemicalData: (index: number) => void;
  handleAddChemicalData: () => void;
};

const AddMedicineChemicalRatioInput = ({
  formData,
  handleChemicalNameChange,
  handleChemicalRatioChange,
  handleRemoveChemicalData,
  handleAddChemicalData,
}: PropsType) => {
  return (
    <>
      <Text
        style={[styles.text, { textAlign: "center", fontWeight: "700" }]}
      >{`Chemical Ratios (${formData.chemicalData.length})`}</Text>
      <View
        style={{
          gap: 5,
          alignItems: "center",
        }}
      >
        {formData.chemicalData.map((field, index) => (
          <View
            key={index}
            style={[styles.horizontalContainer, { gap: 5, width: "100%" }]}
          >
            <CustomTextInput
              label={"Chemical Name"}
              value={field.name}
              handleChange={(value) => handleChemicalNameChange(value, index)}
              style={{ flex: 2 }}
            />
            <CustomNumericInput
              label={"Ratio"}
              value={field.ratio.toString()}
              handleChange={(value) => handleChemicalRatioChange(value, index)}
              style={{ flex: 1 }}
            />
            <IconButton
              icon="close"
              size={20}
              style={{ margin: 0, padding: 0 }}
              disabled={formData.chemicalData.length === 1}
              onPress={() => handleRemoveChemicalData(index)}
            />
          </View>
        ))}
      </View>
      <Button onPress={handleAddChemicalData}>Add Data</Button>
    </>
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

export default AddMedicineChemicalRatioInput;

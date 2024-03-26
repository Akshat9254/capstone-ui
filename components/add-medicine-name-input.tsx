import { CustomTextInput } from "@components/ui";
import { RegisterMedicineRequest } from "../types/input";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

type PropsType = {
  formData: RegisterMedicineRequest;
  handleMedicineNameChange: (value: string) => void;
  errors: { [key: string]: string | null };
};

const AddMedicineNameInput = ({
  formData,
  handleMedicineNameChange,
  errors,
}: PropsType) => {
  return (
    <View>
      <CustomTextInput
        value={formData.medicineName}
        label={"Medicine Name"}
        handleChange={handleMedicineNameChange}
        error={!!errors["medicineName"]}
      />
      {/* {errors["medicineName"] && (
        
      )} */}
      <HelperText type={"error"}>{errors["medicineName"]}</HelperText>
    </View>
  );
};

export default AddMedicineNameInput;

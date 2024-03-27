import { useAddMedicine } from "@hooks";
import { useState } from "react";
import { Button, Text } from "react-native-paper";
import { useContractWrite } from "wagmi";
import abi from "../abi/V2.json";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import {
  AddMedicineChemicalRatioInput,
  AddMedicineHumidityInput,
  AddMedicineNameInput,
  AddMedicineTemperatureInput,
  CustomSnackbar,
} from "@components";
import { web3Config } from "@config";

const AddMedicineScreen = () => {
  const {
    formData,
    resetForm,
    formSchema,
    errors,
    setErrors,
    handleMedicineNameChange,
    handleTemperatureMinChange,
    handleTemperatureMaxChange,
    handleHumidityMinChange,
    handleHumidityMaxChange,
    handleChemicalNameChange,
    handleChemicalRatioChange,
    handleRemoveChemicalData,
    handleAddChemicalData,
  } = useAddMedicine();
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    write: registerMedicine,
  } = useContractWrite({
    abi,
    address: web3Config.address,
    functionName: "registerMedicine",
    onSuccess: () => {
      setSnackbar({ visible: true, message: "medicine registered" });
      resetForm();
    },
    onError: () => {
      setSnackbar({ visible: true, message: "something went wrong" });
    },
    // gas: BigInt("1000000"),
  });

  if (isError) {
    console.log({ error });
  }

  if (isSuccess) {
    console.log({ hash: data?.hash });
  }

  const handleCloseSnackbar = () =>
    setSnackbar({ visible: false, message: "" });

  const onSubmit = async () => {
    const validationResult = formSchema.safeParse(formData);
    if (!validationResult.success) {
      const formattedErrors = {};
      validationResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        const tempErrors = { [path]: err.message };
        Object.assign(formattedErrors, tempErrors);
      });
      setErrors(formattedErrors);
      return;
    }

    const { medicineName, chemicalData, temperatureRange, humidityRange } =
      formData;
    Keyboard.dismiss();
    registerMedicine({
      args: [
        medicineName,
        chemicalData.map((data) => data.ratio),
        chemicalData.map((data) => data.name),
        temperatureRange.min,
        temperatureRange.max,
        humidityRange.min,
        humidityRange.max,
      ],
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
        {/* medicine name */}
        <AddMedicineNameInput
          formData={formData}
          handleMedicineNameChange={handleMedicineNameChange}
          errors={errors}
        />
        {/* temperature range */}
        <AddMedicineTemperatureInput
          formData={formData}
          handleTemperatureMinChange={handleTemperatureMinChange}
          handleTemperatureMaxChange={handleTemperatureMaxChange}
          errors={errors}
        />
        {/* humidity range */}
        <AddMedicineHumidityInput
          formData={formData}
          handleHumidityMinChange={handleHumidityMinChange}
          handleHumidityMaxChange={handleHumidityMaxChange}
          errors={errors}
        />
        {/* chemical ratios */}
        <AddMedicineChemicalRatioInput
          formData={formData}
          handleChemicalNameChange={handleChemicalNameChange}
          handleChemicalRatioChange={handleChemicalRatioChange}
          handleRemoveChemicalData={handleRemoveChemicalData}
          handleAddChemicalData={handleAddChemicalData}
        />
      </ScrollView>
      <Button mode={"contained"} onPress={onSubmit} style={styles.submitBtn}>
        Submit
      </Button>
      {/* snackbar */}
      <CustomSnackbar
        visible={snackbar.visible}
        onDismiss={handleCloseSnackbar}
        message={snackbar.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 30,
  },
  inner: {
    flex: 1,
    gap: 5,
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
  text: {
    fontSize: 16,
    marginLeft: 0,
  },
  helperText: {
    fontSize: 14,
    paddingVertical: 0,
    marginVertical: 0,
    fontWeight: "100",
  },
  input: {
    height: 35,
  },
  submitBtn: {
    marginTop: "auto",
  },
});

export default AddMedicineScreen;

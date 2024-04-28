import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Button, DefaultTheme, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { useAppStore } from "store/app-store";
import { CustomSnackbar, Loader } from "@components";
import { useContractRead, useContractWrite } from "wagmi";
import { Redirect } from "expo-router";
import { web3Config } from "@config";

const AddBatchScreen = () => {
  const [medicineNames, setMedicineNames] = useState<
    { label: string; value: string }[]
  >([]);
  const [medicine, setMedicine] = useState<string | null>(null);
  const user = useAppStore((state) => state.user);

  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });

  if (!user) return <Redirect href={"/register"} />;
  const manufacturerName = user.name;

  const handleCloseSnackbar = () =>
    setSnackbar({ visible: false, message: "" });

  const { isError, error } = useContractRead({
    ...web3Config,
    functionName: "getAllMedicineNames",
    onSuccess(data: string[]) {
      setMedicineNames(data.map((item) => ({ label: item, value: item })));
    },
  });

  const {
    data,
    isSuccess,
    isLoading,
    isError: isAddBatchError,
    error: addBatchError,
    write: addBatch,
  } = useContractWrite({
    ...web3Config,
    functionName: "addBatch",
    onSuccess: () => {
      setSnackbar({ visible: true, message: "batch added" });
      setMedicine(null);
    },
    onError: () => {
      setSnackbar({ visible: true, message: "something went wrong" });
    },
  });

  if (isAddBatchError) {
    console.log({ addBatchError });
  }

  if (isSuccess) {
    console.log({ hash: data?.hash });
  }

  if (isError) {
    console.log({ error });
  }

  const onSubmit = async () => {
    if (!medicine) {
      setSnackbar({ visible: true, message: "medicine not selected" });
      return;
    }

    addBatch({
      args: [medicine, manufacturerName, Date.now()],
    });
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <View style={{ gap: 0 }}>
        <TextInput
          label={"Batch Id"}
          value={batchId}
          mode={"outlined"}
          disabled
        />
        <HelperText type={"info"}>Auto-generated Batch Id</HelperText>
      </View> */}
      <TextInput
        label={"Manufacturer Name"}
        value={user?.name}
        mode={"outlined"}
        disabled
      />
      <Dropdown
        labelField={"label"}
        valueField={"value"}
        data={medicineNames}
        value={medicine}
        onChange={(item) => setMedicine(item.value)}
        maxHeight={250}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
      />
      <Button mode={"contained"} onPress={onSubmit} disabled={isLoading}>
        Submit
      </Button>
      <CustomSnackbar
        visible={snackbar.visible}
        onDismiss={handleCloseSnackbar}
        message={snackbar.message}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    padding: 10,
    paddingTop: 40,
    // paddingVertical: 30,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: DefaultTheme.colors.primary,
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddBatchScreen;

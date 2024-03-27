import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useContractWrite } from "wagmi";
import abi from "../abi/V2.json";
import { router } from "expo-router";
import { useAppStore } from "store/app-store";
import { web3Config } from "@config";

const RegisterInput = () => {
  const [username, setUsername] = useState("");
  const [inputError, setInputError] = useState("");
  const { user, setUser } = useAppStore();

  useEffect(() => {
    if (!user) return;
    router.replace("/");
  }, [user]);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    write: registerManufacturer,
  } = useContractWrite({
    abi,
    address: web3Config.address,
    functionName: "registerManufacturer",
    onSuccess: () => {
      setUser({ name: username, role: "manufacturer" });
    },
  });

  const handleLoginAsManufacturer = () => {
    Keyboard.dismiss();
    if (!username) {
      setInputError("Username is empty !!!");
      return;
    }
    registerManufacturer({
      args: [username],
    });
    // setUser({ name: username, role: "manufacturer" });
  };

  if (isError) {
    console.log({ error });
  }

  if (isSuccess) {
    console.log({ hash: data?.hash });
  }
  return (
    <View style={styles.inputContainer}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TextInput
          label={"Name"}
          mode={"outlined"}
          dense
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          onFocus={() => setInputError("")}
        />
        <HelperText type={"error"}>{inputError}</HelperText>
      </View>
      <Button
        mode={"contained"}
        onPress={handleLoginAsManufacturer}
        style={styles.btn}
        disabled={isLoading}
      >
        Login as Manufacturer
      </Button>
      <Button mode={"contained-tonal"} style={styles.btn}>
        Login as Distributor
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    width: "80%",
  },
});

export default RegisterInput;

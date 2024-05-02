import { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useContractRead, useContractWrite } from "wagmi";
import { router } from "expo-router";
import { useAppStore } from "store/app-store";
import { web3Config } from "@config";
import { KeyboardAvoidingView } from "@components";

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
    ...web3Config,
    functionName: "registerManufacturer",
    onSuccess: () => {
      setUser({ name: username, role: "manufacturer" });
    },
  });

  const { refetch: isRegisteredUser, isLoading: checkRegisteredUserLoading } =
    useContractRead({
      ...web3Config,
      functionName: "isRegisteredUser",
      args: [username],
      enabled: false,
      onSuccess(data: boolean) {
        if (data) {
          setUser({ name: username, role: "manufacturer" });
        } else {
          registerManufacturer({
            args: [username],
          });
        }
      },
    });

  const handleLoginAsManufacturer = () => {
    Keyboard.dismiss();
    if (!username) {
      setInputError("Username is empty !!!");
      return;
    }
    // registerManufacturer({
    //   args: [username],
    // });
    // setUser({ name: username, role: "manufacturer" });
    isRegisteredUser();
  };

  const handleLoginAsDistributor = () => {
    Keyboard.dismiss();
    if (!username) {
      setInputError("Username is empty !!!");
      return;
    }
    setUser({ name: username, role: "distributor" });
  };

  const handleLoginAsAdmin = () => {
    Keyboard.dismiss();
    if (!username) {
      setInputError("Username is empty !!!");
      return;
    }
    setUser({ name: username, role: "admin" });
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
        disabled={isLoading || checkRegisteredUserLoading}
      >
        Login as Manufacturer
      </Button>
      <Button
        onPress={handleLoginAsDistributor}
        mode={"contained-tonal"}
        style={styles.btn}
      >
        Login as Distributor
      </Button>
      <Button onPress={handleLoginAsAdmin}>Login as Admin</Button>
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
    gap: 5,
  },
  btn: {
    width: "80%",
  },
});

export default RegisterInput;

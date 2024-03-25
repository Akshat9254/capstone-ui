import { W3mButton } from "@web3modal/wagmi-react-native";
import { StyleSheet, View } from "react-native";
// import { useAccount } from "wagmi";
import { KeyboardAvoidingView, RegisterInput } from "@components";
import { useAccount } from "wagmi";

const RegisterScreen = () => {
  const { isConnected } = useAccount();

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <W3mButton balance="show" />
        {isConnected && <RegisterInput />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingTop: 180,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
  },
});

export default RegisterScreen;

import { Link, Redirect } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppStore } from "store/app-store";
import { useAccount, useDisconnect } from "wagmi";

const HomeScreen = () => {
  const user = useAppStore((state) => state.user);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!user || !isConnected) return <Redirect href={"/register"} />;

  return (
    <View style={styles.container}>
      {/* <Button
        mode={"contained-tonal"}
        onPress={() => addSensorData()}
        labelStyle={{ letterSpacing: 0.101 }}
      >
        Add Sensor Data
      </Button> */}
      <Button
        mode={"contained-tonal"}
        onPress={() => disconnect()}
        labelStyle={{ letterSpacing: 0.101 }}
      >
        Disconnect
      </Button>
      <Link href={"/add-medicine"} asChild>
        <Button mode={"contained-tonal"}>Add Medicine</Button>
      </Link>
      <Link href={"/add-batch"} asChild>
        <Button mode={"contained-tonal"}>Add Batch</Button>
      </Link>
      <Link href={"/all-batches"} asChild>
        <Button mode={"contained-tonal"}>All Batches</Button>
      </Link>
      <Link href={"/qr-scan"} asChild>
        <Button mode={"contained-tonal"}>QR Scan</Button>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
});

export default HomeScreen;

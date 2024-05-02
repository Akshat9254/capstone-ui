import { useEnableSensorData } from "@hooks";
import { Link, Redirect } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppStore } from "store/app-store";
import { useAccount, useDisconnect } from "wagmi";

const HomeScreen = () => {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { isLoading, error, fetchSensorData, data } = useEnableSensorData();

  if (isLoading) {
    console.log("loading...");
  }

  if (error) {
    console.log({ error });
  }

  if (data) {
    console.log({ data });
  }

  if (!user || !isConnected) return <Redirect href={"/register"} />;

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      {/* <Button
        mode={"contained-tonal"}
        onPress={() => addSensorData()}
        labelStyle={{ letterSpacing: 0.101 }}
      >
        Add Sensor Data
      </Button> */}

      {user.role === "admin" && (
        <Link href={"/add-medicine"} asChild>
          <Button mode={"contained-tonal"}>Add Medicine</Button>
        </Link>
      )}
      {user.role === "manufacturer" && (
        <>
          <Link href={"/add-batch"} asChild>
            <Button mode={"contained-tonal"}>Add Batch</Button>
          </Link>
          <Link href={"/all-batches"} asChild>
            <Button mode={"contained-tonal"}>All Batches</Button>
          </Link>
          <Button mode={"contained-tonal"} onPress={() => fetchSensorData()}>
            Start Fetching Sensor Data
          </Button>
        </>
      )}

      <Link href={"/qr-scan"} asChild>
        <Button mode={"contained-tonal"}>QR Scan</Button>
      </Link>

      <Button
        mode={"contained-tonal"}
        onPress={() => disconnect()}
        labelStyle={{ letterSpacing: 0.101 }}
      >
        Disconnect
      </Button>

      <Button
        mode={"contained-tonal"}
        onPress={handleLogout}
        labelStyle={{ letterSpacing: 0.101 }}
      >
        Logout
      </Button>
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

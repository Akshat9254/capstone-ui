import { Link, Redirect } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppStore } from "store/app-store";
import { useAccount } from "wagmi";

const HomeScreen = () => {
  const user = useAppStore((state) => state.user);
  const { isConnected } = useAccount();

  if (!user || !isConnected) return <Redirect href={"/register"} />;
  return (
    <View style={styles.container}>
      <Link href={"(protected)/add-medicine"} asChild>
        <Button mode={"contained-tonal"}>Add Medicine</Button>
      </Link>
      <Link href={"(protected)/add-batch"} asChild>
        <Button mode={"contained-tonal"}>Add Batch</Button>
      </Link>
      <Link href={"(protected)/all-batches"} asChild>
        <Button mode={"contained-tonal"}>All Batches</Button>
      </Link>
      <Link href={"(protected)/qr-scan"} asChild>
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

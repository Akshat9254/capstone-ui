import "@walletconnect/react-native-compat";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { WagmiConfig } from "wagmi";
import { sepolia } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "aa984146d287d0226df319ab7f5c8f46";

// 2. Create config
const metadata = {
  name: "Web3Modal RN",
  description: "Web3Modal RN Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [sepolia];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

const RootLayout = () => {
  return (
    <PaperProvider>
      <WagmiConfig config={wagmiConfig}>
        <View style={styles.container}>
          <Stack>
            {/* <Stack.Screen name="(protected)" options={{ title: "Home" }} /> */}
          </Stack>
          <Web3Modal />
        </View>
      </WagmiConfig>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default RootLayout;

import CenterContainer from "@components/center-container";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

const Loader = () => {
  const theme = useTheme();
  return (
    <CenterContainer>
      <ActivityIndicator
        animating={true}
        color={theme.colors.primary}
        size={70}
      />
      <Text style={styles.text}>Loading...</Text>
    </CenterContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
});

export default Loader;

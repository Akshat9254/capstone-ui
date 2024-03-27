import CenterContainer from "@components/center-container";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type PropsType = {
  message: string;
};

const NoDataFound = ({ message }: PropsType) => {
  return (
    <CenterContainer>
      <Text style={styles.text}>{message}</Text>
      <View style={{ marginTop: 20, gap: 10 }}>
        <Button
          mode={"contained"}
          onPress={() => router.push("/")}
          labelStyle={styles.btnLabel}
          // style={styles.btn}
        >
          Go to Home
        </Button>
        <Button
          // mode={""}
          onPress={() => router.back()}
          labelStyle={styles.btnLabel}
          // style={styles.btn}
        >
          Back
        </Button>
      </View>
    </CenterContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  btn: {
    marginTop: 20,
  },
  btnLabel: {
    fontSize: 16,
  },
});

export default NoDataFound;

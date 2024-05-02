import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner, BarCodeScannerProps } from "expo-barcode-scanner";
import { router } from "expo-router";
import { Button } from "react-native-paper";

const QRScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (props: BarCodeScannerProps) => {
    setScanned(true);
    // @ts-ignore
    const batchId = String(props.data).split("$")[1];
    console.log(
      `Bar code with type ${props.type} and data ${batchId} has been scanned!`
    );
    // @ts-ignore
    router.push(`${props.data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  //   const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
  //     setScanned(true);
  //     console.log(
  //       `Bar code with type ${scanningResult.type} and data ${scanningResult.data} has been scanned!`
  //     );
  //     router.push(`/batch/${scanningResult.data}`);
  //   };
  return (
    <View style={styles.container}>
      <BarCodeScanner
        // @ts-ignore
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button onPress={() => setScanned(false)}>{"Tap to Scan Again"}</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default QRScanScreen;

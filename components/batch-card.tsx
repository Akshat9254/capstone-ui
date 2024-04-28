import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Card, Modal, Portal, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { Batch } from "types/batches";

type PropsType = {
  batch: Batch;
};

const BatchCard = ({ batch }: PropsType) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <>
      <Card
        style={styles.card}
        onPress={() => router.push(`/batch/${batch.id}`)}
      >
        <Card.Content>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{batch.medicineName}</Text>
            <Pressable onPress={showModal}>
              <Text style={styles.link}>Get QR Code</Text>
            </Pressable>
          </View>
          <Text style={styles.info}>{`Batch Id: ${
            batch.id.split("$")[1]
          }`}</Text>
          <Text style={styles.info}>{`Created At: ${new Date(
            batch.createdAt
          ).toLocaleDateString("en-GB")}`}</Text>
          <Text style={styles.info}>{`${batch.numReadings} Readings`}</Text>
        </Card.Content>
        <Card.Actions>
          {/* <Button>Cancel</Button> */}
          <Button mode={"outlined"}>View Readings</Button>
        </Card.Actions>
      </Card>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <QRCode value={`/batch/${batch.id}`} size={250} />
          <Text style={{ fontSize: 20 }}>{`Batch: ${
            batch.id.split("$")[1]
          }`}</Text>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  containerStyle: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    gap: 15,
    margin: 20,
    minHeight: 350,
  },
  link: {
    color: "#3F83F8",
    textDecorationLine: "underline",
  },
});

export default BatchCard;

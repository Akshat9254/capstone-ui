import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Batch } from "types/batches";

type PropsType = {
  batch: Batch;
};

const BatchCard = ({ batch }: PropsType) => {
  return (
    <Card style={styles.card} onPress={() => router.push(`/batch/${batch.id}`)}>
      <Card.Content>
        <Text style={styles.title}>{batch.medicineName}</Text>
        <Text style={styles.info}>{`Batch Id: ${batch.id}`}</Text>
        <Text style={styles.info}>{`Created At: ${new Date(
          batch.createdAt
        ).toLocaleDateString("en-US")}`}</Text>
        <Text style={styles.info}>{`${batch.numReadings} Readings`}</Text>
      </Card.Content>
      <Card.Actions>
        {/* <Button>Cancel</Button> */}
        <Button mode={"outlined"}>View Details</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default BatchCard;

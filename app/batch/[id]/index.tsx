import { useState } from "react";
import { Text } from "react-native-paper";
import { Stack, useLocalSearchParams } from "expo-router";
import { web3Config } from "@config";
import { useContractRead } from "wagmi";
import { BatchDetails } from "@components";
import { BatchDetailsType, SensorDataResponse } from "types/reading";
import { serializeSensorData } from "@utils";

const BatchDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  if (!id) return <Text>Invalid Batch Id</Text>;

  const [batchDetails, setBatchDetails] = useState<BatchDetailsType | null>(
    null
  );

  const { isError, error } = useContractRead({
    ...web3Config,
    functionName: "getSensorData",
    args: [id],
    onSuccess(data: SensorDataResponse) {
      setBatchDetails(serializeSensorData(data));
    },
  });

  if (isError) {
    console.log({ error });
  }

  return (
    <>
      <Stack.Screen options={{ title: "Readings" }} />
      {batchDetails && <BatchDetails id={id} details={batchDetails} />}
    </>
  );
};

export default BatchDetailsScreen;

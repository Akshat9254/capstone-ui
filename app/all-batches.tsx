// import allBatches from "@data/batches";
// import { getBatchesForManufacturer } from "api";
import { BatchCard, Loader, NoDataFound } from "@components";
import { Redirect } from "expo-router";
import { forwardRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAppStore } from "store/app-store";
import { Batch } from "types/batches";
import { useContractRead } from "wagmi";
import { web3Config } from "@config";
import { allBatchesResponseMapper } from "@utils";

const AllBatchesScreen = forwardRef<FlatList<Batch>, {}>((_, ref) => {
  const [allBatches, setAllBatches] = useState<Batch[]>([]);
  const user = useAppStore((state) => state.user);

  if (!user) return <Redirect href={"/register"} />;
  const manufacturerName = user.name;
  const { isError, error, isLoading, isFetching } = useContractRead({
    ...web3Config,
    functionName: "getAllBatchDetailsOfManufacturer",
    args: [manufacturerName],
    onSuccess(data: string[][]) {
      setAllBatches(allBatchesResponseMapper(data));
    },
  });

  if (isError) {
    console.log({ error });
  }

  if (isLoading || isFetching) return <Loader />;
  if (allBatches.length === 0)
    return <NoDataFound message={`No batches found...`} />;

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={allBatches}
        renderItem={({ item }) => <BatchCard batch={item} />}
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default AllBatchesScreen;

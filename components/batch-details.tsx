import Reading from "@components/reading";
import { FlatList, View } from "react-native";
import { List } from "react-native-paper";
import { useContractRead } from "wagmi";
import { web3Config } from "@config";
import { useState } from "react";
import { ReadingType } from "types/reading";
import { transformResponse } from "@utils";
import Loader from "@components/loader";
import NoDataFound from "@components/no-data-found";

type PropsType = {
  details: {
    temperatures: number[];
    humidities: number[];
    createdAts: number[];
    // chemicalWeights: number[][];
    // chemicalNames: string[][];
    medicineName: string;
  };
  id: string;
};

const BatchDetails = ({ details, id }: PropsType) => {
  const [readings, setReadings] = useState<ReadingType[]>([]);
  const [expanded, setExpanded] = useState([...Array(20).fill(false)]);

  const { isLoading, isError, error, isFetched, isFetching } = useContractRead({
    ...web3Config,
    functionName: "getMedicineDetails",
    args: [details.medicineName],
    onSuccess(data: [bigint, bigint, bigint, bigint, string[], bigint[]]) {
      const temperature = {
        min: parseInt(String(data[0])),
        max: parseInt(String(data[1])),
      };
      const humidity = {
        min: parseInt(String(data[2])),
        max: parseInt(String(data[3])),
      };
      // const chemicalData = [];
      // for (let i = 0; i < data[4].length; i++) {
      //   const name = data[4][i];
      //   const ratio = parseInt(String(data[5][i]));
      //   chemicalData.push({ name, ratio });
      // }
      // const medicineData = { temperature, humidity, chemicalData };
      const medicineData = { temperature, humidity };
      setReadings(transformResponse(details, medicineData));
    },
  });

  const handlePress = (index: number) =>
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !prev[index];
      return newExpanded;
    });

  if (isError) {
    console.log({ error });
  }

  if (isLoading || isFetching) return <Loader />;
  if (isFetched && readings.length === 0)
    return <NoDataFound message={"No Readings Found..."} />;

  return (
    <List.Section
      title={`Batch: ${id.split("$")[1]} Readings`}
      style={{ flex: 1, paddingVertical: 15 }}
      titleStyle={{ fontSize: 22, fontWeight: "600" }}
    >
      <FlatList
        data={readings}
        showsVerticalScrollIndicator
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
        renderItem={({ item, index }) => (
          <Reading
            reading={item}
            expanded={expanded[index]}
            handlePress={handlePress}
            index={index}
          />
        )}
      />
    </List.Section>
  );
};

export default BatchDetails;

import ReadingRow from "@components/reading-row";
import { View } from "react-native";
import { List, Tooltip } from "react-native-paper";
import { ReadingType } from "types/reading";

type PropsType = {
  reading: ReadingType;
  expanded: boolean;
  handlePress: (index: number) => void;
  index: number;
};

const Reading = ({ reading, expanded, handlePress, index }: PropsType) => {
  // console.log(reading);
  return (
    <List.Accordion
      title={`Reading ${index + 1}`}
      left={(props) => (
        <List.Icon {...props} icon={expanded ? "minus" : "plus"} />
      )}
      expanded={expanded}
      onPress={() => handlePress(index)}
    >
      <ReadingRow
        name="Temperature"
        value={reading.temperature.value}
        unit={`\u00b0C`}
        isInRange={reading.temperature.isInRange}
      />
      <ReadingRow
        name="Humidity"
        value={reading.humidity.value}
        unit="%"
        isInRange={reading.humidity.isInRange}
      />
      <List.Subheader style={{ fontSize: 18, fontWeight: "700" }}>
        Chemical Data
      </List.Subheader>
      {reading.chemicalData.map((data, index) => (
        <ReadingRow
          key={index}
          name={data.name}
          value={data.weight}
          unit={"gm"}
          isInRange={data.isInRange}
        />
      ))}
    </List.Accordion>
  );
};

export default Reading;

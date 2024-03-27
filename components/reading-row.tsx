import { View } from "react-native";
import { List, Tooltip } from "react-native-paper";

type PropsType = {
  name: string;
  value: string | number;
  unit: string;
  isInRange: boolean;
};

const ReadingRow = ({ name, value, unit, isInRange }: PropsType) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        borderColor: "black",
        borderRadius: 24,
      }}
    >
      <List.Item
        title={name}
        style={{ flex: 5 }}
        titleNumberOfLines={3}
        titleEllipsizeMode={"tail"}
      />
      <List.Item
        title={`${value}${unit}`}
        style={{ flex: 4 }}
        titleStyle={{ color: isInRange ? "black" : "red" }}
        right={(props) => (
          <Tooltip
            title={`${name.split(" ")[0].toLowerCase()} is out of range`}
            enterTouchDelay={1}
            leaveTouchDelay={800}
          >
            <List.Icon
              {...props}
              icon={isInRange ? "" : "help-circle"}
              style={{ height: 30 }}
            />
          </Tooltip>
        )}
      />
    </View>
  );
};

export default ReadingRow;

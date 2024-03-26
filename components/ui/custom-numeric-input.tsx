import { ComponentProps } from "react";
import { TextInput } from "react-native-paper";

type PropsType = ComponentProps<typeof TextInput> & {
  handleChange: (value: string) => void;
  value: string;
};

const CustomNumericInput = ({
  label,
  value,
  handleChange,
  ...props
}: PropsType) => {
  return (
    <TextInput
      mode={"outlined"}
      dense
      {...props}
      value={value !== "0" ? value : ""}
      label={label}
      onChangeText={handleChange}
      keyboardType={"numeric"}
      inputMode={"numeric"}
      maxLength={2}
    />
  );
};

export default CustomNumericInput;

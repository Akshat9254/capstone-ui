import { ComponentProps } from "react";
import { TextInput } from "react-native-paper";

type PropsType = ComponentProps<typeof TextInput> & {
  handleChange: (value: string) => void;
  value: string;
};

const CustomTextInput = ({
  label,
  value,
  handleChange,
  ...props
}: PropsType) => {
  return (
    <TextInput
      mode={"outlined"}
      dense
      value={String(value)}
      label={label}
      onChangeText={handleChange}
      {...props}
    />
  );
};

export default CustomTextInput;

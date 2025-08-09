import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { TitleProps } from "./TitleTypes";

export const Title = ({ title }: TitleProps) => {
  return (
    <View className="flex-row items-center justify-center mb-2.5">
      <Svg height="20" width="60">
        <Path
          d="M0,10 Q15,8 30,10 T60,10"
          stroke="gray"
          strokeWidth="2"
          fill="transparent"
        />
      </Svg>

      <Text className="mx-2.5 text-lg font-bold italic text-gray-500">
        {title}
      </Text>

      <Svg height="20" width="60">
        <Path
          d="M0,10 Q15,8 30,10 T60,10"
          stroke="gray"
          strokeWidth="2"
          fill="transparent"
        />
      </Svg>
    </View>
  );
};

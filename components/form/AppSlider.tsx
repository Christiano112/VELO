import Slider from "@react-native-community/slider";
import { COLORS } from "@/constants/Colors";
import { type Control, Controller } from "react-hook-form";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

type PropType = {
  id: string;
  label?: string;
  control?: Control<any>;
  isRequired?: boolean;
  MAXIMUM_DISTANCE?: number;
  MINIMUM_DISTANCE?: number;
  STEP?: number;
  value?: number;
  onChange?: (value: number) => void;
  errorMessage?: string;
};

const AppSlider = ({
  id,
  label,
  control,
  isRequired,
  value,
  onChange,
  errorMessage,
  STEP = 10,
  MINIMUM_DISTANCE = 1,
  MAXIMUM_DISTANCE = 100,
}: PropType) => {
  return (
    <ThemedView>
      {label && <ThemedText type="subtitle">{label}</ThemedText>}
      {control ? (
        <Controller
          control={control}
          rules={{
            required: isRequired,
          }}
          name={id}
          render={({ field: { onChange, value } }) => (
            <Slider
              value={value}
              onSlidingComplete={onChange}
              maximumValue={MAXIMUM_DISTANCE}
              upperLimit={MAXIMUM_DISTANCE}
              lowerLimit={MINIMUM_DISTANCE}
              step={STEP}
              tapToSeek
              thumbTintColor={COLORS.light.brand}
            />
          )}
        />
      ) : (
        <Slider
          value={value}
          onSlidingComplete={onChange}
          maximumValue={MAXIMUM_DISTANCE}
          upperLimit={MAXIMUM_DISTANCE}
          lowerLimit={MINIMUM_DISTANCE}
          step={STEP}
          tapToSeek
          thumbTintColor={COLORS.light.brand}
        />
      )}
      {errorMessage && (
        <ThemedText type="errorMessage">{errorMessage}</ThemedText>
      )}
    </ThemedView>
  );
};

export default AppSlider;

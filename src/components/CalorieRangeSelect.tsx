import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";

type CalorieRangeSelectProps = {
  name: string;
  value: number;
  onChangeEnd: (value: number) => void;
};

function CalorieRangeSelect({
  name,
  value = 0,
  onChangeEnd,
}: CalorieRangeSelectProps) {
  return (
    <>
      <Text
        data-testid="calorie-component"
        fontSize="xs"
        fontWeight="bold">
        {name} {value}
      </Text>
      <Slider
        min={100}
        max={300}
        step={10}
        width="80%"
        defaultValue={100}
        aria-label="slider-ex-1"
        focusThumbOnChange={false}
        onChangeEnd={onChangeEnd}>
        <SliderTrack>
          <SliderFilledTrack bg="#0CA25F" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  );
}

export default CalorieRangeSelect;

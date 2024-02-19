import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CalorieRangeSelect from "../components/CalorieRangeSelect";

describe("Testing CalorieRangeSelect", () => {
  it("Renders the CalorieRangeSelect compoent with value 100", () => {
    render(
      <CalorieRangeSelect
        name="Calories"
        value={100}
        onChangeEnd={() => {}}
      />
    );
    expect(screen.getByTestId("calorie-component")).toHaveTextContent("100");
  });

  it("Renders the CalorieRangeSelect compoent with name Hello", () => {
    render(
      <CalorieRangeSelect
        name="Hello"
        value={100}
        onChangeEnd={() => {}}
      />
    );
    expect(screen.getByTestId("calorie-component")).toHaveTextContent("Hello");
  });
});

import { describe, expect, it } from "vitest";
import { parseFilters } from "../util/filters";

describe("Testing parseFilters functions", () => {
  const InitFilterState = {
    diet: "",
    health: "",
    calories: 100,
    dishType: "",
    mealType: "",
    cuisineType: "",
  };
  it("Passing Initial state object in Recipe Page", () => {
    const data = parseFilters(InitFilterState);
    expect(data).toStrictEqual({});
  });

  it("Passing 150 calories", () => {
    const data = parseFilters({
      diet: "",
      health: "",
      calories: 150,
      dishType: "",
      mealType: "",
      cuisineType: "",
    });
    expect(data).toStrictEqual({ calories: 150 });
  });
});

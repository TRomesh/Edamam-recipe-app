import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RecipeCard from "../components/RecipeCard";

const image =
  "https://edamam-product-images.s3.amazonaws.com/web-img/b86/b86f5e78e65f500e63285723e5052c49.JPG?X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLWVhc3QtMSJGMEQCID1SkEW%2Bq%2B6VRcNa7uQqJoOC2vwuwPsOezGJolJq%2FMd8AiBLjHgqugNmvutRHIlfWwJXgbqv8YKHtOU%2B0azPRH3XjyrCBQj6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMPqP1Ppqd3xfgZsAfKpYFsKCwXFe0sIzCF0d60svk%2FXAnNlaVqSAwFiB%2FCAhN8kpV%2BKlG3LZZzOmh75%2FWSR3g%2BdevJf0%2FCMOeIsJlTYfWhI9aOd5LO5ZoEsnZFGwllJChdj4SPE6KqU6ErgnEjFEaihRgrxStEs%2FeV2X1BJTeV8fV%2BlfWMm6CqW8m54mFgME7PoqMunM4MTxU3n%2BhGg%2FWqZW9jIJV8WFe2LtIyS6KiC%2B6InUjwZ9fEdqIieqy6jWIcikyQIQyvf%2BCmFGhfaugMkgITxpqSPwJAWXt2hEzuuLkRNDBeMKfTsMRmy%2B0txD1ofb%2FEJklEv9NrCrbolLM9dwQN4WOdHM17b%2FfzmdwIqtuSrfnsQfJW9QrIF1fn%2BxEF1Y7giZkI3vBsdxql11pDFRWMd%2BirS0lncw7tmM35u0gSeh2E2a%2B6LPsylkeQGATjMr3UP3KnuFPCd23Lerze%2Bh4O1vJc8F5d2cAy8DfF%2BORLauiu2hDxJRHcZcYFWVAN8UWrIWvYnSgDfj16qz6E9XwaGbrzv8dJNELxjHb3jGkXSk5g2UW3YUdHw%2Bw%2BPfrCnBGS4V2N%2F%2BdwV%2B8hCPvakvu9BMkdG8JF%2BAB0QIKE2xFqrgEHL9poZOLV4YLDHMrmkCL1VXTWSuyiTIX3w4mPiC6KGpevmeJL84%2F7QTcf6S6LmyZoq14M2RsM80QDvU1xqe%2Fhzpfxw3onprmAM9rPv93qAtMp%2F9f4KGtswVrsd8CXV3Bw3Q3wD1RGBpMksRtiKdQiPcX50FB537Zry8Ith8qrvgAmOSW5oynW6d%2FmRyXoo%2Bb4hAYo3CoBhh1wPpEBW%2Bpa1%2Fy9i1V1oU4B9WN03JsSQppuOj5FzVG%2FDjrAwPfBT7fYGef1aP%2BcAMRici80QVzY7cw383KrgY6sgGPToP1PNjdx4TA%2FsEccC1aGuzjmW7HH8V8Jr5imLhFQBOLMVuA6U5dnY4c1T%2BJViNwYxiEpq1vPqxI9Xif1louB2jrb%2BaZrTxREG0TUJJvhcDqbPkUFrYUYkziGgrxxrvFsO2YupTqlAnlDsZeMbM1Qvp4Q%2FcykPZ3g%2F30v3UZQN67OlBQJvNADBV%2Bo5Jky3GSeiKqmMC1otEN2Mg0wCXwYme4af8I2RDGkxJ%2FxwaFTJoE&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240219T014532Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLTXDKGGS%2F20240219%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=67e3cc8823ea7b22c50add8f7d70d68cba4430d78db9c146b3a305ba1a257b70";

const recipe = {
  label: "Apple Pie Punch",
  image,
  calories: 250,
  dietLabels: [],
  healthLabels: [],
  digest: [],
  ingredients: [],
  totalNutrients: {},
};

describe("Testing RecipeCard", () => {
  it("Renders the RecipeCard compoent with label Apple Pie Punch", () => {
    render(<RecipeCard recipe={recipe} />);

    expect(screen.getByTestId("recipe-card-label")).toHaveTextContent(
      "Apple Pie Punch"
    );
  });

  it("Renders the RecipeCard compoent with calories 250", () => {
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getByTestId("recipe-card-calories")).toHaveTextContent(
      "Calories 250.00 kcal"
    );
  });

  it("Renders the RecipeCard compoent and check image rendered", () => {
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });
});

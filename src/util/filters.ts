export const HealthLabelColor: Record<string, string> = {
  Balanced: "yello",
  "High-Fiber": "green",
  "High-Protein": "red",
  "Low-Carb": "Gold",
  "Low-Fat": "orange",
  "Low-Sodium": "SkyBlue",
};

const cuisineFilters = [
  "American",
  "Asian",
  "British",
  "Caribbean",
  "Central Europe",
  "Chinese",
  "Eastern Europe",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Kosher",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "South American",
  "South East Asian",
];

const mealFilters = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];

const dishFilters = [
  "Biscuits and cookies",
  "Bread",
  "Cereals",
  "Condiments and sauces",
  "Desserts",
  "Drinks",
  " Main course",
  "Pancake",
  "Preps",
  "Preserve",
  "Salad",
  "Sandwiches",
  "Side dish",
  "Soup",
  "Starter",
  "Sweets",
];

const healthFilters = [
  "alcohol-cocktail",
  "alcohol-free",
  "celery-free",
  "crustacean-free",
  "dairy-free",
  "DASH",
  "egg-free",
  "fish-free",
  "fodmap-free",
  "gluten-free",
  "immuno-supportive",
  "keto-friendly",
  "kidney-friendly",
  "kosher",
  "low-fat-abs",
  "low-potassium",
  "low-sugar",
  "lupine-free",
  "Mediterranean",
  "mollusk-free",
  "mustard-free",
  "no-oil-added",
  "paleo",
  "peanut-free",
  "pescatarian",
  "pork-free",
  "red-meat-free",
  "sesame-free",
  "shellfish-free",
  "soy-free",
  "sugar-conscious",
  "sulfite-free",
  "tree-nut-free",
  "vegan",
  "vegetarian",
  "wheat-free",
];

const dietFilters = [
  "balanced",
  "high-fiber",
  "high-protein",
  "low-carb",
  "low-fat",
  "low-sodium",
];

export interface FiltersTypes {
  diet: string;
  health: string;
  calories: number;
  dishType: string;
  mealType: string;
  cuisineType: string;
}

export type RecipeType = {
  label: string;
  image: string;
  calories: number;
  dietLabels: string[];
  healthLabels: string[];
  digest: Array<Record<string, string | number>>;
  ingredients: Array<Record<string, string | number>>;
  totalNutrients: Record<string, Record<string, string | number>>;
};

export type FilterTypes = keyof Omit<FiltersTypes, "calories">;

export interface RecipeRowType {
  recipe: RecipeType;
  _links: { href: string; title: string };
}

export const Filters = [
  { name: "Health", type: "health", options: healthFilters },
  { name: "Diet", type: "diet", options: dietFilters },
  { name: "Dish", type: "dishType", options: dishFilters },
  { name: "Meal", type: "mealType", options: mealFilters },
  { name: "Cuisine", type: "cuisineType", options: cuisineFilters },
];

export const parseFilters = (obj: Record<FilterTypes, string | number>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== "" && (key !== "calories" || value !== 100)
    )
  );
};

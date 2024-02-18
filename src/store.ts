import { create } from "zustand";
import { FilterTypes, RecipeRowType, RecipeType } from "./util/filters";
import { getNextRecipes, getRecipes } from "./services/services";

interface LinkType {
  href: string | null;
  title: string | null;
}

interface AppState {
  isLoading: boolean;
  recipes: RecipeType[];
  nextLink: LinkType;
  favorites: RecipeType[];
  checkFavorite: (name: string) => boolean;
  getRecipeData: (
    name: string,
    filters?: Record<FilterTypes, string | number>
  ) => void;
  addFavorite: (recipe: RecipeType) => void;
  removeFavorite: (name: string) => void;
  getNextRecipes: (url: string) => void;
  clearRecipes: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  isLoading: false,
  recipes: [],
  nextLink: { href: null, title: null },
  favorites: [],
  getRecipeData: async (
    name: string,
    filters?: Record<FilterTypes, string | number>
  ) => {
    const { data } = await getRecipes({
      name,
      filters,
    });
    const recipes = (data.hits as RecipeRowType[]).map(({ recipe }) => recipe);
    const next = data._links.next;
    return set(() => ({
      recipes: recipes,
      nextLink: next,
    }));
  },
  addFavorite: (favorite) => {
    set((state) => ({
      favorites: [...state.favorites, favorite],
    }));
  },
  checkFavorite: (label) => {
    const { favorites } = get();
    return favorites.some((recipe) => recipe.label === label);
  },
  removeFavorite: (label) =>
    set((state) => ({
      ...state,
      favorites: state.favorites.filter((recipe) => recipe.label !== label),
    })),
  getNextRecipes: async (url: string) => {
    const { data } = await getNextRecipes(url);
    const recipes = (data.hits as RecipeRowType[]).map(({ recipe }) => recipe);
    const next = data._links.next;
    return set((state) => ({
      recipes: [...state.recipes, ...recipes],
      nextLink: next,
    }));
  },
  clearRecipes: () => {
    return set((state) => ({
      ...state,
      recipes: [],
      nextLink: { href: null, title: null },
    }));
  },
}));

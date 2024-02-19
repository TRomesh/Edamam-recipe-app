import { create } from "zustand";
import { FiltersTypes, RecipeRowType, RecipeType } from "./util/filters";
import { getNextRecipes, getRecipes } from "./services/services";

interface LinkType {
  href: string | null;
  title: string | null;
}

interface AppState {
  isLoading: boolean;
  recipes: RecipeType[];
  nextLink: LinkType;
  bookmarks: RecipeType[];
  checkBookmark: (name: string) => boolean;
  getRecipeData: (
    name: string,
    filters?: Record<keyof FiltersTypes, string | number>
  ) => void;
  addBookmark: (recipe: RecipeType) => void;
  removeBookmark: (name: string) => void;
  getNextRecipes: (url: string) => void;
  clearRecipes: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  isLoading: false,
  recipes: [],
  nextLink: { href: null, title: null },
  bookmarks: [],
  getRecipeData: async (
    name: string,
    filters?: Record<keyof FiltersTypes, string | number>
  ) => {
    set(() => ({
      isLoading: true,
    }));
    const { data } = await getRecipes({
      name,
      filters,
    });
    const recipes = (data.hits as RecipeRowType[]).map(({ recipe }) => recipe);
    const next = data._links.next;
    return set(() => ({
      recipes: recipes,
      nextLink: next,
      isLoading: false,
    }));
  },
  addBookmark: (bookmark) => {
    set((state) => ({
      bookmarks: [...state.bookmarks, bookmark],
    }));
  },
  checkBookmark: (label) => {
    const { bookmarks } = get();
    return bookmarks.some((recipe) => recipe.label === label);
  },
  removeBookmark: (label) =>
    set((state) => ({
      ...state,
      bookmarks: state.bookmarks.filter((recipe) => recipe.label !== label),
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

import axios from "axios";
import { FiltersTypes, parseFilters } from "../util/filters";

const APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID;
const APPLICATION_KEY = import.meta.env.VITE_APPLICATION_KEY;

const BASE_URL = `${
  import.meta.env.VITE_BASE_URL
}?type=public&app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEY}`;

const instance = axios.create({
  headers: {
    "content-type": "application/json",
  },
});

export const getRecipes = ({
  name,
  filters,
}: {
  name: string;
  filters?: Record<keyof FiltersTypes, string | number>;
}) => {
  return instance.get(BASE_URL, {
    params: {
      ...(name && { q: name }),
      ...(filters && { ...parseFilters(filters) }),
    },
  });
};

export const getNextRecipes = (url: string) => {
  return instance.get(url);
};

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import { ChangeEvent, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Filter from "../components/Filter";
import { FilterTypes, Filters, FiltersTypes } from "../util/filters";
import CalorieRangeSelect from "../components/CalorieRangeSelect";
import debounce from "lodash.debounce";
import { useStore } from "../store";

interface InitialState {
  search: string;
  hasFilters: boolean;
}

const InitFilterState = {
  diet: "",
  health: "",
  calories: 100,
  dishType: "",
  mealType: "",
  cuisineType: "",
};

function Recipies() {
  const {
    recipes,
    isLoading,
    getRecipeData,
    getNextRecipes,
    nextLink,
    clearRecipes,
  } = useStore((state) => state);

  const [state, setState] = useState<InitialState>({
    search: "",
    hasFilters: false,
  });

  const [filters, setFilters] = useState<FiltersTypes>(InitFilterState);

  // cleaning up recipes in store on unmount
  useEffect(() => {
    return () => {
      clearRecipes();
    };
  }, [clearRecipes]);

  const clear = () => {
    setState((state) => ({ ...state, search: "" }));
    clearRecipes();
  };

  const clearFilters = () => {
    setFilters(InitFilterState);
  };

  const enableFilters = () => {
    clearFilters();
    setState((state) => ({ ...state, hasFilters: !state.hasFilters }));
  };

  // use debounce to stop firing api calls when typinh in search field
  const debouncedGetRecipeData = debounce(getRecipeData, 300);

  const onChangeFilters = async (type: string, value: string | number) => {
    setFilters((filters) => ({ ...filters, [type]: value }));
    await debouncedGetRecipeData(state.search, {
      ...filters,
      [type]: value,
    });
  };

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, search: e.target.value }));
    await getRecipeData(state.search, { ...filters });
  };

  return (
    <Flex
      direction="column"
      minH="84vh">
      <Flex justifyContent="center">
        <Box p={2}>
          <InputGroup w={{ sm: "80vw", md: "80vw" }}>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search Recipie"
              onChange={onChangeHandler}
              value={state.search}
            />
            {state.search ? (
              <InputRightElement>
                <IconButton
                  size="sm"
                  aria-label="Clear recipe"
                  icon={<CloseIcon />}
                  onClick={clear}>
                  Clear
                </IconButton>
              </InputRightElement>
            ) : null}
          </InputGroup>
        </Box>
        <Box p={2}>
          <Button
            leftIcon={<HamburgerIcon />}
            onClick={enableFilters}>
            Filters
          </Button>
        </Box>
      </Flex>
      {state.hasFilters ? (
        <Flex
          justifyContent="center"
          direction="column">
          <SimpleGrid
            justifyContent="center"
            marginLeft={{ base: 10, md: 20, lg: 55, xl: 60 }}
            marginRight={{ base: 10, md: 20, lg: 55, xl: 60 }}
            columns={{ base: 2, md: 3, lg: 6, xl: 6 }}>
            {Filters.map(({ name, options, type }) => (
              <Box key={name}>
                <Filter
                  name={name}
                  type={type}
                  options={options}
                  value={filters[type as FilterTypes]}
                  onSelect={(option) => onChangeFilters(type, option)}
                />
              </Box>
            ))}
            <Box
              marginTop={3}
              padding={1}>
              <CalorieRangeSelect
                name="Calories"
                value={filters.calories}
                onChangeEnd={(value) => onChangeFilters("calories", value)}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      ) : null}
      <Divider
        marginTop={5}
        width="100vw"
      />
      <Flex
        justifyContent="center"
        direction="column"
        m="10">
        <SimpleGrid
          spacing={10}
          paddingLeft={10}
          paddingRight={10}
          columns={isLoading ? 1 : { sm: 1, md: 2, lg: 3, xl: 4 }}>
          {isLoading ? (
            <Flex
              alignContent="center"
              justifyContent="center">
              <CircularProgress
                isIndeterminate
                color="green.300"
              />
            </Flex>
          ) : (
            <>
              {recipes.map((recipe) => {
                return (
                  <RecipeCard
                    key={`${recipe.label}-${Math.random()}`}
                    recipe={recipe}
                  />
                );
              })}
            </>
          )}
        </SimpleGrid>
        <Flex>
          {nextLink?.href && !isLoading ? (
            <Button
              marginTop="5"
              width="100%"
              onClick={() => {
                if (nextLink.href) {
                  getNextRecipes(nextLink.href);
                }
              }}>
              Load more
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Recipies;

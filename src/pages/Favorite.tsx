import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import RecipeCard from "../components/RecipeCard";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

function Favorite() {
  const navigate = useNavigate();
  const favorites = useStore((state) => state.favorites);
  const removeFavorite = useStore((state) => state.removeFavorite);

  return (
    <Flex
      direction="column"
      minH="84vh">
      {!favorites.length ? (
        <Flex justifyContent="center">
          <Box
            textAlign="center"
            py={10}
            px={6}>
            <Text
              fontSize="28px"
              mt={3}
              mb={2}>
              No Bookmarks Found
            </Text>
            <Text
              color={"gray.500"}
              mb={6}>
              Please add bookmarks from Recipe page
            </Text>

            <Button
              colorScheme="primary"
              borderRadius="8px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              onClick={() => navigate("/recipes")}>
              Go to Recipes
            </Button>
          </Box>
        </Flex>
      ) : null}
      <Flex
        justifyContent="center"
        direction="column"
        m="10">
        <SimpleGrid
          spacing={10}
          paddingLeft={10}
          paddingRight={10}
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
          {favorites.map((recipe) => {
            return (
              <RecipeCard
                recipe={recipe}
                key={recipe.label}
                favoriteMode={true}
                removeFavorite={removeFavorite}
              />
            );
          })}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default Favorite;

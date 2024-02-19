import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import RecipeImage from "../assets/recipe.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const gotToSearch = () => {
    navigate("/recipes");
  };

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      minH="74vh"
      px={12}
      mb={16}>
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}>
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}>
          Edamam Recipe's
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}>
          Find you're bookmark recipies from one place
        </Heading>
        <Button
          colorScheme="primary"
          borderRadius="8px"
          py="4"
          px="4"
          lineHeight="1"
          size="md"
          onClick={gotToSearch}>
          Search Recipe
        </Button>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6">
          No payment required
        </Text>
      </Stack>
      <Box
        w={{ base: "100%", sm: "70%", md: "50%" }}
        mb={{ base: 12, md: 0 }}>
        <Image
          src={RecipeImage}
          sizes="100%"
          rounded="1rem"
          shadow="2xl"
        />
      </Box>
    </Flex>
  );
}

export default Home;

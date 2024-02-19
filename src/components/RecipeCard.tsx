import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { useState, MouseEvent } from "react";
import { HealthLabelColor, RecipeType } from "../util/filters";
import RecipeModal from "./RecipeModal";
import { DeleteIcon } from "@chakra-ui/icons";

type RecipeCardProp = {
  recipe: RecipeType;
  bookmarkMode?: boolean;
  removeBookmark?: (id: string) => void;
};

const PaginatedHealthLabel = ({
  labels,
}: {
  labels: RecipeType["healthLabels"];
}) => {
  const [state, setState] = useState({
    labels,
    itemsToShow: 3,
    expanded: false,
  });

  const allShown = state.itemsToShow === state.labels.length;

  // Loads health labels 3 by 3
  const showMore = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setState({
      ...state,
      itemsToShow: allShown ? 3 : state.itemsToShow + 3,
      expanded: !allShown,
    });
  };

  return (
    <Box>
      {state.labels.slice(0, state.itemsToShow).map((label) => (
        <Badge
          rounded="full"
          px="2"
          m="1"
          fontSize="0.7em"
          key={label}>
          {label}
        </Badge>
      ))}
      <Badge
        rounded="full"
        px="2"
        m="1"
        fontSize="0.8em"
        color="green"
        cursor="pointer"
        onClick={showMore}>
        {allShown ? "Less" : "Show"}
      </Badge>
    </Box>
  );
};

const DietLabels = ({ dietLabels }: { dietLabels: string[] }) => {
  return (
    <Box
      display="flex"
      alignItems="center">
      {dietLabels.map((label) => {
        return (
          <Badge
            m="1"
            px="2"
            key={label}
            rounded="full"
            fontSize="0.7em"
            color={HealthLabelColor[label]}>
            {label}
          </Badge>
        );
      })}
    </Box>
  );
};

function RecipeCard({
  recipe,
  removeBookmark,
  bookmarkMode = false,
}: RecipeCardProp) {
  const { label, image, calories, healthLabels, dietLabels } = recipe;
  const [isOpen, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      onClick={onOpen}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">
        <Image
          src={image}
          boxSize="400px"
          objectFit="cover"
          alt={`Picture of ${label}`}
          roundedTop="lg"
          data-testid="recipe-card-image"
        />

        <Box p="5">
          <Flex
            mt="1"
            justifyContent="space-between"
            alignContent="center">
            <DietLabels dietLabels={dietLabels} />
          </Flex>
          <Flex
            mt="1"
            justifyContent="space-between"
            alignContent="center">
            <Box
              fontSize="lg"
              data-testid="recipe-card-label"
              fontWeight="semibold"
              lineHeight="tight">
              {label}
            </Box>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignContent="center">
            <Box
              fontSize="2xl"
              color={"gray.800"}>
              <Box
                as="span"
                color={"gray.600"}
                data-testid="recipe-card-calories"
                fontSize="lg">
                Calories {calories.toFixed(2)} kcal
              </Box>
            </Box>
          </Flex>
          <Flex
            mt="1"
            alignContent="space-around">
            <PaginatedHealthLabel labels={healthLabels} />
          </Flex>
          {bookmarkMode && removeBookmark ? (
            <Flex
              mt="1"
              justifyContent="flex-end">
              <IconButton
                size="sm"
                aria-label="Delete recipe"
                icon={<DeleteIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  removeBookmark(label);
                }}
              />
            </Flex>
          ) : null}
        </Box>
      </Box>
      <RecipeModal
        size="md"
        recipe={recipe}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
}

export default RecipeCard;

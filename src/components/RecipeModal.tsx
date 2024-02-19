import { StarIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  TagLeftIcon,
  useToast,
} from "@chakra-ui/react";
import { useStore } from "../store";
import { RecipeType } from "../util/filters";

type ModalProps = {
  isOpen: boolean;
  size: string;
  recipe: RecipeType;
  onClose: () => void;
};

const Ingredients = ({
  ingredients,
}: {
  ingredients: RecipeType["ingredients"];
}) => {
  return ingredients.map((ingre, i) => (
    <Heading
      key={i}
      as="h4"
      size="sm">{`${ingre.text}`}</Heading>
  ));
};

const Nutrients = ({
  totalNutrients,
}: {
  totalNutrients: RecipeType["totalNutrients"];
}) => {
  return Object.values(totalNutrients).map((nutri, i) => (
    <Heading
      key={`${nutri.label}-${i}`}
      as="h5"
      size="sm">
      {`${nutri.label} ${(nutri.quantity as number).toFixed(2)} ${nutri.unit}`}
    </Heading>
  ));
};

const Digest = ({ digest }: { digest: RecipeType["digest"] }) => {
  return digest.map((dige, i) => (
    <Heading
      key={`${dige.label}-${i}`}
      as="h4"
      size="sm">
      {`${dige.label} ${(dige.total as number).toFixed(2)} ${dige.unit}`}
    </Heading>
  ));
};

function RecipeModal({ isOpen, onClose, size, recipe }: ModalProps) {
  const toast = useToast();
  const { label, image, ingredients, totalNutrients, digest } = recipe;
  const { addBookmark, checkBookmark } = useStore((state) => state);
  return (
    <Modal
      onClose={onClose}
      size={size}
      isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{label}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {checkBookmark(label) ? (
            <Tag
              size="sm"
              variant="outline"
              marginBottom="2"
              colorScheme="green">
              <TagLeftIcon as={StarIcon} />
              <TagLabel>Bookmark</TagLabel>
            </Tag>
          ) : null}
          <Image
            src={image}
            boxSize="200px"
            objectFit="cover"
            alt={`Picture of ${label}`}
            rounded="lg"
          />
          <Box marginTop={5}>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left">
                      Ingredients
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Ingredients ingredients={ingredients} />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left">
                      Nutrients
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Nutrients totalNutrients={totalNutrients} />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left">
                      Digest
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Digest digest={digest} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </ModalBody>
        <ModalFooter>
          {!checkBookmark(label) ? (
            <Button
              m={2}
              size="sm"
              rounded="md"
              color={["primary.500", "primary.500", "white", "white"]}
              bg={["white", "white", "primary.500", "primary.500"]}
              _hover={{
                bg: [
                  "primary.100",
                  "primary.100",
                  "primary.600",
                  "primary.600",
                ],
              }}
              leftIcon={<StarIcon />}
              onClick={() => {
                addBookmark(recipe);
                onClose();
                toast({
                  title: `Added ${label} to bookmarks`,
                  status: "success",
                  isClosable: true,
                  duration: 2000,
                });
              }}>
              Add Bookmark
            </Button>
          ) : null}
          <Button
            m={2}
            size="sm"
            rounded="md"
            onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RecipeModal;

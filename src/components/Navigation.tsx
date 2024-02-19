import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuItem = ({
  children,
  onClick,
  isLast,
  ...rest
}: {
  children: ReactNode;
  onClick: () => void;
  isLast?: boolean;
}) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
      onClick={onClick}>
      <Link>{children}</Link>
    </Text>
  );
};

const CloseIcon = () => (
  <svg
    width="24"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white">
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const Navigation = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setShow(!show);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      mb={8}
      p={8}
      gap={2}
      width="100vw"
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}>
      <Box color={["white", "white", "primary.500", "primary.500"]}>
        <Text
          fontSize="lg"
          cursor="pointer"
          fontWeight="bold"
          onClick={() => navigate("/")}>
          Edamam Recipes
        </Text>
      </Box>

      <Box
        display={{ base: "block", md: "none" }}
        onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}>
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}>
          <MenuItem onClick={() => navigate("/recipes")}>Recipies</MenuItem>
          <MenuItem
            onClick={() => navigate("/bookmarks")}
            isLast>
            <Button
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
              leftIcon={<StarIcon />}>
              Bookmarks
            </Button>
          </MenuItem>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navigation;

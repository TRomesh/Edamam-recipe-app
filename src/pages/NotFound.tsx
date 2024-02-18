import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      minH="84vh">
      <Flex justifyContent="center">
        <Box
          textAlign="center"
          py={10}
          px={6}>
          <Heading
            display="inline-block"
            as="h1"
            size="4xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}>
            404
          </Heading>
          <Text
            fontSize="18px"
            mt={3}
            mb={2}>
            Page Not Found
          </Text>
          <Text
            color={"gray.500"}
            mb={6}>
            The page you&apos;re looking for does not seem to exist
          </Text>

          <Button
            colorScheme="primary"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default NotFound;

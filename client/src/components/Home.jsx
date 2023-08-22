import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

const Home = () => {
  const [fileLink, setFileLink] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:2500/upload",
        formData
      );
      setFileLink(response.data.path);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <Center minHeight="100vh">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        width="100%"
        maxWidth="400px"
      >
        <Stack spacing={4}>
          <Heading size="lg">File Sharing App</Heading>
          {fileLink && (
            <Box>
              <Text fontSize="md" mb={2}>
                Your file is uploaded.{" "}
                <Link href={fileLink} isExternal color="teal.500">
                  {fileLink}
                </Link>
              </Text>
            </Box>
          )}
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel htmlFor="file">Click Here to Choose a file:</FormLabel>
              <Input
                type="file"
                id="file"
                name="file"
                display={"none"}
                required
              />
            </FormControl>
            <Button mt={2} type="submit" colorScheme="teal" size="md">
              Share
            </Button>
          </form>
        </Stack>
      </Box>
    </Center>
  );
};

export default Home;

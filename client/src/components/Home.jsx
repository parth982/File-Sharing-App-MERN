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
  const [isFileUploaded, setIsFileUploaded] = useState(false);

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
      setIsFileUploaded(true);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <Center minHeight="100vh" bg="gray.100">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="xl"
        width="100%"
        maxWidth="500px"
        bg="white"
      >
        <Stack spacing={4}>
          <Heading size="xl" textAlign="center" color="red.700">
            File Sharing App
          </Heading>
          {fileLink && (
            <Box display={"flex"} flexDir={"column"}>
              <Text fontSize="md" textAlign="center" mb={2}>
                Your file has been successfully uploaded.
              </Text>
              <Link
                textAlign="center"
                href={fileLink}
                isExternal
                color="teal.500"
              >
                {fileLink}
              </Link>
            </Box>
          )}
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel htmlFor="file">
                <Button
                  as="label"
                  htmlFor="file"
                  cursor="pointer"
                  colorScheme={"whatsapp"}
                  size="lg"
                  w="100%"
                  transition="background-color 0.3s, color 0.3s"
                >
                  {isFileUploaded ? "Upload Another File" : "Upload a File"}
                </Button>
              </FormLabel>
              <Input
                type="file"
                id="file"
                name="file"
                display="none"
                required
              />
            </FormControl>
            <Button
              mt={4}
              type="submit"
              colorScheme="messenger"
              size="lg"
              w="100%"
              disabled={isFileUploaded}
              transition="background-color 0.3s, color 0.3s"
            >
              Get Download Link
            </Button>
          </form>
        </Stack>
      </Box>
    </Center>
  );
};

export default Home;

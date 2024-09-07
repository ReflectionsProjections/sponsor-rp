import { Box, Button, Flex, HStack, Spacer, Text, Input, Center, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [isMedium] = useMediaQuery("(max-width: 850px)");
	const [isSmall] = useMediaQuery("(max-width: 600px)");
	const [isXSmall] = useMediaQuery("(max-width: 400px)");
    const [email, setEmail] = useState(""); // State to store the email input
    const navigate = useNavigate();

    const sponsorLogin = async (email:any) => {
        const url = "https://api.reflectionsprojections.org/auth/sponsor/login";
      
        try {
          const response = await axios.post(url, { email });
          console.log("Success:", response.data);
      
          if (response.data === "Created") {
            navigate('/two-factor');
          } else {
            console.log("Response status:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
    
      const handleSubmit = () => {
        console.log("Button clicked, email:", email);  // Log button click
        sponsorLogin(email);  // Call the function with the current email value
      };
    
        // Log the input value whenever it's updated
    const handleEmailChange = (e:any) => {
        setEmail(e.target.value);
        console.log("Input value:", e.target.value);  // Log the input value
    };


    return (
        <Box>
            <Box
                position="fixed"
                bottom="0"
                left="0"
                right="0"
                height="50%"
                zIndex="1"
                backgroundImage="/pink_grid_horizontal.svg"
                backgroundSize="cover"
            />

            <Flex height="77vh" mt="2vh" mb="5vh" pb="15vh" flexDirection={"column"} textAlign="center" textColor={"white"}>
                <Center mt="15vh">
					<Box p='4' >
						<HStack justifyContent="center" spacing="8px" textAlign={"center"}>
							<Text fontSize={isXSmall ? "20" : isSmall ? "28" : isMedium ? "43" : "56"} fontFamily={"Roboto Slab"} fontWeight={"700"} letterSpacing={"0.08em"}> reflections </Text>
							<Text fontSize={isXSmall ? "52" : isSmall ? "60" : isMedium ? "76" : "120"} fontFamily={"Roboto Slab"} fontWeight={"300"} letterSpacing={"0.08em"} mt="-10px"> |</Text>
							<Text fontSize={isXSmall ? "20" : isSmall ? "28" : isMedium ? "43" : "56"} fontFamily={"Roboto Slab"} fontWeight={"700"} letterSpacing={"0.08em"}> projections </Text>
						</HStack>
					</Box>
				</Center>


                <Box mt='10vh' zIndex="2">
                    <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"400"}>Enter your Email</Text>
                    <Input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="name@example.com"
                        width="300px"
                        mt="20px"
                        mx="auto"
                        bg="white"
                        textColor="black"
                        borderRadius="5px"
                        _placeholder={{ color: "gray.400" }}
                    />
                <Button onClick={() => handleSubmit()} zIndex="3">
                    Submit
                </Button>
                </Box>
            </Flex>
        </Box>
    );
}
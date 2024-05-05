import { Box, Flex, Text, Spacer, HStack, Button } from "@chakra-ui/react";
import '@fontsource/kufam/700.css'
import '@fontsource/lexend-deca'
import '@fontsource/lexend-deca/700.css'
import '@fontsource/lexend-exa'

export function Home() {
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

            <Flex height="77vh" mt="5vh" mb="5vh" pb="15vh" flexDirection={"column"} textAlign="center" textColor={"white"}>
                <Box p='4' >
                    <Text fontSize="56" fontFamily="kufam" fontWeight={"700"} letterSpacing={"0.07em"} mb="12px"> reflections | projections </Text>
                    <Text fontSize="24" whiteSpace="pre-line" fontFamily={"Lexend Deca"} fontWeight={"400"}>  Interested in sponsoring the {"\n"}</Text>
                    <Text fontSize="24" fontFamily={"Lexend Deca"} fontWeight={"700"}> Midwest's largest tech conference? </Text>
                </Box>
                <Spacer />
                <HStack justifyContent="center" spacing="100px" textAlign={"center"}>
                    <Box>
                        <Text fontSize="32" fontFamily={"Lexend Exa"} fontWeight={"400"}> XXXX </Text>
                        <Text fontSize="32" fontFamily={"Lexend Exa"} fontWeight={"400"}> attendees </Text>
                    </Box>
                    
                    <Box>
                        <Text fontSize="40" fontFamily={"Lexend Exa"} fontWeight={"700"}> SEPTEMBER </Text>
                        <Text fontSize="40" fontFamily={"Lexend Exa"} fontWeight={"700"}> 18-22 </Text>
                    </Box>
                    
                    <Box>
                        <Text fontSize="32" fontFamily={"Lexend Exa"} fontWeight={"400"}> XXXX </Text>
                        <Text fontSize="32" fontFamily={"Lexend Exa"} fontWeight={"400"}> events </Text>
                    </Box>
                    
                    
                </HStack>
                <Spacer />
                <HStack justifyContent="center" spacing="100px">
                    <Button w={"220px"} zIndex={"1"} _hover={{ bg: "#FFEF64" }}> Sponsorship Packet </Button>
                    <Button w={"220px"} zIndex={"1"} _hover={{ bg: "#FFEF64" }}> I'm Interested! </Button>
                </HStack>
            </Flex>
        </Box>
    );
}
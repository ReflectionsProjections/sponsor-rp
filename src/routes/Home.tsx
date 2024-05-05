import { Box, Flex, Text, Spacer, HStack, Button } from "@chakra-ui/react";
import '@fontsource/kufam/700.css'
import '@fontsource/lexend-deca'
import '@fontsource/lexend-deca/700.css'
import '@fontsource/lexend-exa'
import '@fontsource/roboto-slab'
import '@fontsource/nunito'

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
                    <HStack justifyContent="center" spacing="8px" textAlign={"center"}>
                        <Text fontSize="56" fontFamily={"Roboto Slab"} fontWeight={"700"} letterSpacing={"0.08em"}> reflections </Text>
                        <Text fontSize="120" fontFamily={"Roboto Slab"} fontWeight={"300"} letterSpacing={"0.08em"} mt="-10px"> | </Text>
                        <Text fontSize="56" fontFamily={"Roboto Slab"} fontWeight={"700"} letterSpacing={"0.08em"}> projections </Text>
                    </HStack>
                    <Text fontSize="24" whiteSpace="pre-line" fontFamily={"Nunito"} fontWeight={"400"}>  Interested in sponsoring the {"\n"}</Text>
                    <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"900"}> Midwest's largest tech conference? </Text>
                </Box>
                <Spacer />
                <HStack justifyContent="center" spacing="100px" textAlign={"center"}>
                    <Box>
                        <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}> XXXX </Text>
                        <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}> attendees </Text>
                    </Box>
                    
                    <Box>
                        <Text fontSize="40" fontFamily={"Nunito"} fontWeight={"700"} letterSpacing={"0.09em"}> SEPTEMBER </Text>
                        <Text fontSize="40" fontFamily={"Nunito"} fontWeight={"700"}> 18-22 </Text>
                    </Box>
                    
                    <Box>
                        <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}> XXXX </Text>
                        <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}> events </Text>
                    </Box>
                    
                    
                </HStack>
                <Spacer />
                <HStack justifyContent="center" spacing="100px">
                    <Button w={"220px"} zIndex={"1"}> Sponsorship Packet </Button>
                    <Button w={"220px"} zIndex={"1"}> I'm Interested! </Button>
                </HStack>
            </Flex>
        </Box>
    );
}
import { Box, Image, Link } from "@chakra-ui/react";

export function NavBar() {
    return (
        <Box height="100%" display="flex" alignItems="center" pl="40px" pt="20px" pb="20px">
            <Link href="https://hackillinois.org">
                <Image
                    src="/hackillinois-logo.svg"
                    maxH="100%"
                    _hover={{ filter: "brightness(90%)", transition: "filter 0.2s ease-in-out", cursor: "pointer" }}  
                />
            </Link>
        </Box>
    )
}
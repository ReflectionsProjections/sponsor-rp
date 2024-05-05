import { Box, Image } from "@chakra-ui/react";

export function NavBar() {
    return (
        <Box height="100%" display="flex" alignItems="center" pl="10px" pt="10px" pb="10px">
            <Image
                src="/white_rp_logo.svg"
                maxH="100%"
                _hover={{ filter: "brightness(20%)" }}  
                onClick={() => {window.location.href = "https://reflectionsprojections.org"}}
            />
        </Box>
    )
}
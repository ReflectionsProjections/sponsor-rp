import React, { useEffect, useState } from 'react';
import { Box, Button, ChakraProvider, Flex, Icon, Image, IconButton, Text, HStack, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import ResumeGrid from './ResumeGrid';
import ResumeList from './ResumeList';
import { BsGrid, BsList, BsDownload } from "react-icons/bs";
import { BiSelectMultiple } from "react-icons/bi";
import { TiDocumentDelete } from "react-icons/ti";

interface Resume {
    id: string;
    name: string;
    imageUrl: string;
    major: string;
    graduationYear: string;
}


export function ResumeBook() {
    
    const resumes: Resume[] = [
        { id: '1', name: 'Finn the Human', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Professional Furry', graduationYear: '2022'},
        { id: '2', name: 'Jake the Dog', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Backend', graduationYear: '2023'},
        { id: '3', name: 'Princess Bubblegum', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Frontend', graduationYear: '2024'},
        { id: '4', name: 'Marceline the Vampire Queen', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Fullstack', graduationYear: '2025'},
        { id: '5', name: 'BMO', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'DevOps', graduationYear: '2026'},
        { id: '6', name: 'Princess Lumpy Space', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Designer', graduationYear: '2027'},
        { id: '7', name: 'Ice King', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Manager', graduationYear: '2028'},
        { id: '8', name: 'SpongeBob SquarePants', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'CEO', graduationYear: '2029'},
        { id: '9', name: 'Patrick Star', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'CTO', graduationYear: '2030'},
        { id: '10', name: 'Squidward Tentacles', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Sales', graduationYear: '2031'},
        { id: '11', name: 'Mr. Krabs', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Marketing', graduationYear: '2032'},
        { id: '12', name: 'Sandy Cheeks', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Pirate', graduationYear: '2033'},
        { id: '13', name: 'Plankton', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Musician', graduationYear: '2034'},
        { id: '14', name: 'Gary the Snail', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Rapper', graduationYear: '2035'},
        { id: '15', name: 'Pearl Krabs', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Singer', graduationYear: '2036'},
        // Add more resumes here
    ];

  const [showList, setShowList] = useState(true);
  const [selectedResumes, setSelectedResumes] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 550);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  const toggleResume = (id: string) => {
    setSelectedResumes((prev) =>
      prev.includes(id) ? prev.filter((resumeId) => resumeId !== id) : [...prev, id]
    );
  };

  const selectAllResumes = () => {
    if (selectedResumes.length === resumes.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(resumes.map((resume) => resume.id));
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  }

    return (
        <ChakraProvider>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} color='white' padding='10px'>
                {/* <IconButton
                    size={'lg'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                /> */}
                <HStack spacing={8} alignItems={'center'}>
                    <Flex align="center" mr={5} maxWidth={50}>
                    <Image
                        src="/2024_rp_logo.svg"
                        minHeight={50}
                        maxH="100%"
                        _hover={{ filter: "brightness(30%)", transition: "filter 0.2s ease-in-out", cursor: "pointer" }}
                        onClick={() => { window.location.href = "/" }}
                    />
                    </Flex>
                </HStack>
                Resume Book
                <Flex alignItems={'center'}>
                    <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                        size={'sm'}
                        src={
                            'https://cdn-icons-png.freepik.com/512/8742/8742495.png'
                        }
                        />
                    </MenuButton>
                    <MenuList color='black'>
                        {/* <MenuItem onClick={printToken}>Print {userName} JWT</MenuItem> */}
                        {/* <MenuItem onClick={toggleColorMode}>Toggle Light/Dark Mode</MenuItem> */}
                        <MenuDivider />
                        <MenuItem onClick={signOut}>Sign Out</MenuItem>
                    </MenuList>
                    </Menu>
                </Flex>
                </Flex>
            <Box bg="gray.200" p={4}>
                <Flex justify="space-between" align="center">
                    {/* <Flex align="center"></Flex> */}
                    
                    <Flex align='flex-start'>
                        <IconButton
                            aria-label='List View'
                            icon={<Icon as={BsList} boxSize={6} />}
                            onClick={() => setShowList(true)}
                            mr={2}
                            backgroundColor={showList ? 'gray.300' : 'gray.200'}
                            border={showList ? '1px solid black' : '1px solid gray.200'}
                        />
                        <IconButton
                            aria-label='Grid View'
                            icon={<Icon as={BsGrid} boxSize={6} />}
                            onClick={() => setShowList(false)}
                            backgroundColor={showList ? 'gray.200' : 'gray.300'}
                            border={showList ? '1px solid gray.200' : '1px solid black'}
                        />
                    </Flex>
                    <Flex>

                        <Button onClick={selectAllResumes} mr={2} backgroundColor={selectedResumes.length === resumes.length ? 'lightsalmon' : 'lightblue'} border='1px solid transparent' _hover={{ border:'1px solid black'}}>
                            {isMobile ? (
                                selectedResumes.length === resumes.length ? <TiDocumentDelete/> : <BiSelectMultiple/>
                            ) : (
                                selectedResumes.length === resumes.length ? 'Deselect All' : 'Select All'
                            )}
                        </Button>
                        <Button mr={2} border='1px solid transparent' _hover={{ border:'1px solid black'}}>
                            {isMobile ? <BsDownload/> : 'Download'}
                        </Button>
                        {/* <Button>Button 3</Button> */}
                    </Flex>
                </Flex>
            </Box>
            {
                showList ? <ResumeList resumes={resumes} selectedResumes={selectedResumes} toggleResume={toggleResume} /> : <ResumeGrid resumes={resumes} selectedResumes={selectedResumes} toggleResume={toggleResume} />
            }
            {/* Your components and content here */}
        </ChakraProvider>
    );
}

export default ResumeBook;
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Box, Button, ChakraProvider, Flex, Icon, Image, IconButton, Text, HStack, Menu, MenuButton, Avatar, MenuList, MenuItem, useToast, useColorMode, useColorModeValue, FormControl, Select } from '@chakra-ui/react';
import ResumeGrid from './ResumeGrid';
import ResumeList from './ResumeList';
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import { majors } from "../components/majors";
import { BsGrid, BsList, BsDownload } from "react-icons/bs";
import { BiSelectMultiple } from "react-icons/bi";
import { TiDocumentDelete } from "react-icons/ti";

import axios from 'axios';
import { saveAs } from 'file-saver';
import { Config } from "../config";
import { FaMoon, FaSun } from 'react-icons/fa';

interface Resume {
    id: string;
    name: string;
    imageUrl: string;
    major: string;
    graduationYear: string;
}

interface ResumeLink {
    url: string;
}

interface ResumeIDs {
    userId: string
    name: string
    major: string
    graduation: string
}


export function ResumeBook() {

    const toast = useToast();
    const { toggleColorMode } = useColorMode();
        
    // const resumes: Resume[] = [
        // { id: '1', name: 'Finn the Human', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Professional Furry', graduationYear: '2022'},
        // { id: '2', name: 'Jake the Dog', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Backend', graduationYear: '2023'},
        // { id: '3', name: 'Princess Bubblegum', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Frontend', graduationYear: '2024'},
        // { id: '4', name: 'Marceline the Vampire Queen', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Fullstack', graduationYear: '2025'},
        // { id: '5', name: 'BMO', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'DevOps', graduationYear: '2026'},
        // { id: '6', name: 'Princess Lumpy Space', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Designer', graduationYear: '2027'},
        // { id: '7', name: 'Ice King', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Manager', graduationYear: '2028'},
        // { id: '8', name: 'SpongeBob SquarePants', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'CEO', graduationYear: '2029'},
        // { id: '9', name: 'Patrick Star', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'CTO', graduationYear: '2030'},
        // { id: '10', name: 'Squidward Tentacles', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Sales', graduationYear: '2031'},
        // { id: '11', name: 'Mr. Krabs', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Marketing', graduationYear: '2032'},
        // { id: '12', name: 'Sandy Cheeks', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Pirate', graduationYear: '2033'},
        // { id: '13', name: 'Plankton', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Musician', graduationYear: '2034'},
        // { id: '14', name: 'Gary the Snail', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Rapper', graduationYear: '2035'},
        // { id: '15', name: 'Pearl Krabs', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Singer', graduationYear: '2036'},
        // Add more resumes here
    // ];

    const [resumes, setResumes] = useState<Resume[]>([]);
    const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
    const [showList, setShowList] = useState(true);
    const [selectedResumes, setSelectedResumes] = useState<string[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const viewColor = useColorModeValue("200","700");
    const selectViewColor = useColorModeValue("gray.300","gray.600");

    const years = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036"];
    const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
    const [selectedYears, setSelectedYears] = useState<string[]>([]);

    const showToast = (message: string) => {
        toast({
        title: message,
        status: "error",
        duration: 9000,
        isClosable: true,
        });
    }

    const filterResumes = useCallback(() => {
        let filtered = resumes;
        if (selectedYears.length > 0) {
            filtered = filtered.filter(resume => selectedYears.includes(resume.graduationYear));
        }
        if (selectedMajors.length > 0) {
            filtered = filtered.filter(resume => selectedMajors.includes(resume.major));
        }
        setFilteredResumes(filtered);
    }, [selectedYears, selectedMajors, resumes]);
  
    const toggleResume = (id: string) => {
        setSelectedResumes((prev) =>
            prev.includes(id) ? prev.filter((resumeId) => resumeId !== id) : [...prev, id]
        );
    };

    const selectAllResumes = () => {
        if (selectedResumes.length === filteredResumes.length) {
            setSelectedResumes([]);
        } else {
            setSelectedResumes(filteredResumes.map((resume) => resume.id));
        }
    };

    const downloadFileFromS3 = async (s3Url: string) => {
        try {
          const response = await axios.get(s3Url, {
            responseType: 'blob' // Ensure the response is a Blob
          });
      
          // Extract the filename from the Content-Disposition header or generate one
          const contentDisposition = response.headers['content-disposition'];
          let filename = 'downloaded-file';
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch.length === 2) {
              filename = filenameMatch[1];
            }
          }
      
          saveAs(response.data, filename);
        } catch (error) {
            showToast("Failed to download resume. Please try again later.");
        //   console.error('Error downloading the file:', error);
        }
    };

    const downloadResumes = () => {
        const jwt = localStorage.getItem('jwt');
        const selectedResumesIds = selectedResumes.join(',');
        axios.get(Config.API_BASE_URL + "/s3/download/user/"+ selectedResumesIds, {
            headers: {
                Authorization: jwt
            }
        })
        .then(function (response) {
            // console.log(response.data);
            const resData: ResumeLink[] | ResumeLink = response.data;
            if (Array.isArray(resData)) {
                resData.forEach(function (resumeURL) {
                    downloadFileFromS3(resumeURL.url);
                });
            } else {
                downloadFileFromS3(resData.url);
            }
        })
        .catch(function (error) {
            // console.log(error);
            showToast(`Error ${error}: Failed to download resumes. Please try again later.`);
        })
    }

    const getResumes = async () => {
        localStorage.setItem("jwt", '');
        const jwt = localStorage.getItem("jwt");

        const requestBody = {
            filter: {
                hasResume: true
            },
            projection: [
                { userId: 1 },
                { name: 1 },
                { major: 1 },
                { graduation: 1 },
                { university: 1 },
                { dietaryRestrictions: 1 },
                { hasResume: 1 }
            ]
        };

        const headers = {
            Authorization: jwt
        };

        // axios.get(Config.API_BASE_URL + "/registration/filter", { headers, requestBody })
          
          
        const params = new URLSearchParams();
        params.append('filter', JSON.stringify(requestBody.filter));
        params.append('projection', JSON.stringify(requestBody.projection));
          
        axios.post(Config.API_BASE_URL + "/registration/filter", requestBody, {headers})
        .then(function (response) {
            // console.log(response.data)
            const fetchedResumes = response.data.map((item: ResumeIDs) => ({
                id: item.userId,
                name: item.name,
                imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png',
                major: item.major,
                graduationYear: item.graduation
            }));
    
            // Use a Set to ensure unique resumes
            const uniqueResumes = new Set([...resumes, ...fetchedResumes]);
            setResumes(Array.from(uniqueResumes));
            setFilteredResumes(Array.from(uniqueResumes));
        })
        .catch(function (error) {
            // handle error
            // console.log(error);
            showToast(`Error ${error}: Failed to fetch resumes - please sign in again`);
        })
    }

    const signOut = () => {
        localStorage.removeItem("jwt");
        window.location.href = "/";
    }


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 550);
        };

        handleResize();

        if (resumes.length === 0) {
            getResumes();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        filterResumes();
    }, [filterResumes, selectedYears, selectedMajors]);
    
    return (
        <ChakraProvider>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} padding='10px' transition="background-color 0.3s ease, color 0.3s ease">
                {/* <IconButton
                    size={'lg'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                /> */}
                <HStack spacing={8} alignItems={'center'}>
                    <Flex align="center" mr={2} maxWidth={50}>
                    <Image
                        src="/2024_rp_logo.svg"
                        minHeight={50}
                        maxH="100%"
                        _hover={{ filter: "brightness(30%)", transition: "filter 0.2s ease-in-out", cursor: "pointer" }}
                        onClick={() => { window.location.href = "/" }}
                    />
                    </Flex>
                </HStack>
                <Text color='white'>Resume Book</Text>
                <Flex alignItems={'center'}>
                    <IconButton
                        color='white'
                        aria-label='List View'
                        icon={<Icon as={BsList} boxSize={6} />}
                        onClick={() => setShowList(true)}
                        _hover={{ border:'1px solid gray'}}
                        mr={2}
                        backgroundColor='transparent'//gray.'+(parseInt(viewColor)-100) : 'gray.'+viewColor}
                        border={showList ? '1px solid white' : '1px solid transparent'}
                        transition="border-color 0.3s ease"
                    />
                    <IconButton
                        color='white'
                        aria-label='Grid View'
                        icon={<Icon as={BsGrid} boxSize={6} />}
                        onClick={() => setShowList(false)}
                        _hover={{ border:'1px solid gray'}}
                        backgroundColor='transparent'//{showList ? 'gray.'+viewColor : 'gray.'+(parseInt(viewColor)-100)}
                        border={showList ? '1px solid transparent' : '1px solid white'}
                        transition="border-color 0.3s ease"
                    />
                    <IconButton
                        isRound={true}
                        fontSize='26px'
                        marginX={4}
                        aria-label="Toggle Light/Dark Mode"
                        icon={useColorModeValue(<FaMoon />, <FaSun />)}
                        onClick={toggleColorMode}
                        // variant="ghost"
                        _hover={{ color:'gray.500'}}
                        bg='#0F1130'
                        color='#F7FAFC'
                        size="sm"
                        transition="color 0.3s ease, background-color 0.3s ease"
                    />
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
                    <MenuList>
                        {/* <MenuItem onClick={printToken}>Print {userName} JWT</MenuItem> */}
                        {/* <MenuItem onClick={toggleColorMode}>Toggle Light/Dark Mode</MenuItem> */}
                        {/* <MenuItem onClick={getResumes}>Refresh Resumes</MenuItem> */}
                        {/* <MenuDivider /> */}
                        <MenuItem onClick={signOut}>Sign Out</MenuItem>
                    </MenuList>
                    </Menu>
                </Flex>
                </Flex>
            <Box bg={useColorModeValue("gray.200","gray.700")} p={4} transition="background-color 0.3s ease, color 0.3s ease">
                <Flex justify="space-between" align="center">
                    <Flex align='flex-start' minWidth='150px' alignItems='center'>
                        <MultiSelectDropdown
                            id="major-dropdown"
                            width='auto'
                            options={majors}
                            selectedOptions={selectedMajors}
                            onSelectionChange={(newSelectedMajors) => setSelectedMajors(newSelectedMajors)}
                            baseColor={viewColor}
                            placeholderText='Select Major(s)'
                        />
                        <MultiSelectDropdown
                            id="year-dropdown"
                            width='30%'
                            options={years}
                            selectedOptions={selectedYears}
                            onSelectionChange={(newSelectedYears) => setSelectedYears(newSelectedYears)}
                            baseColor={viewColor}
                            placeholderText='Select Year(s)'
                        />

                    </Flex>
                    <Flex>

                        <Button onClick={selectAllResumes} mr={2} backgroundColor={selectedResumes.length === filteredResumes.length ? 'salmon' : 'blue.300'} color={'white'} border='1px solid transparent' _hover={{ border:'1px solid black'}} transition="background-color 0.3s ease, color 0.3s ease">
                            {isMobile ? (
                                selectedResumes.length === filteredResumes.length ? <TiDocumentDelete/> : <BiSelectMultiple/>
                            ) : (
                                selectedResumes.length === filteredResumes.length ? 'Deselect All' : 'Select All'
                            )}
                        </Button>
                        <Button mr={2} onClick={downloadResumes} border='1px solid transparent' _hover={{ border:'1px solid black'}} backgroundColor={parseInt(viewColor) < 500 ? 'gray.'+(parseInt(viewColor)+300): 'gray.'+(parseInt(viewColor)-200)} color={'white'} isDisabled={selectedResumes.length < 1} transition="background-color 0.3s ease, color 0.3s ease">
                            {isMobile ? <BsDownload/> : 'Download'}
                        </Button>
                        {/* <Button>Button 3</Button> */}
                    </Flex>
                </Flex>
            </Box>
            {
                showList ? <ResumeList resumes={filteredResumes} selectedResumes={selectedResumes} toggleResume={toggleResume} baseColor={viewColor} /> : <ResumeGrid resumes={filteredResumes} selectedResumes={selectedResumes} toggleResume={toggleResume} baseColor={viewColor} />
            }
        </ChakraProvider>
    );
}

export default ResumeBook;
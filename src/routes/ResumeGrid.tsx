import React from 'react';
import { SimpleGrid, Box, Text, Image, VStack, Checkbox, useToast, Tooltip } from '@chakra-ui/react';
import { MdOpenInNew } from "react-icons/md";
import axios from 'axios';
import { Config } from '../config';

interface Resume {
    id: string;
    name: string;
    imageUrl: string;
    major: string;
    graduationYear: string;
}

interface ResumeGridProps {
  resumes: Resume[];
  selectedResumes: string[];
  toggleResume: (id: string) => void;
  baseColor: string;
}

const ResumeGrid: React.FC<ResumeGridProps> = ({ resumes, selectedResumes, toggleResume, baseColor }) => {

  const toast = useToast();
  
  const showToast = (message: string) => {
      toast({
      title: message,
      status: "error",
      duration: 9000,
      isClosable: true,
      });
  }

  const openResume = (id: string) => {
    const jwt = localStorage.getItem('jwt');
    axios.get(Config.API_BASE_URL + "/s3/download/user/"+ id, {
        headers: {
            Authorization: jwt
        }
    })
    .then(function (response) {
        window.open(response.data.url, '_blank');
    })
    .catch(function (error) {
        console.log(error);
        showToast("Failed to open resume. Please try again later.");
    })
  };

  return (
    <Box padding="4">
      {/* <Text fontSize="2xl" mb="4">Resumes</Text> */}
      <SimpleGrid columns={{ sm: 2, md: 4, lg: 6 }} spacing="6">
        {resumes.map((resume) => {
            const isSelected = selectedResumes.includes(resume.id);
            return (
                <Box 
                    key={resume.id} 
                    onClick={() => toggleResume(resume.id)}
                    borderWidth="3px" 
                    borderRadius="lg" 
                    overflow="hidden"
                    padding="4"
                    background={isSelected ? 'blue.200' : 'gray.'+baseColor}
                    boxShadow="md"
                    position="relative"
                    cursor="pointer"
                    borderColor={isSelected ? 'blue.500' : 'gray.'+baseColor}
                    transition='all 0.2s'
                    _hover={{ transform: 'scale(1.05)', borderColor: 'black', borderWidth: '3px'}}
                    //   _hover={{ borderColor: 'black', borderWidth: '2px' }}
                    >
                    <Tooltip label='Open Resume' fontSize='md'>
                      <Box padding='2px' borderRadius='5px' bg="transparent" _hover={{ bg: 'blue.300' }} transition="background-color 0.3s ease" position="absolute" top="2" right="2" onClick={(e) => {e.stopPropagation(); openResume(resume.id);}}>
                          <MdOpenInNew size={30} />
                      </Box>
                    </Tooltip>
                    {/* <Box 
                        position="relative"
                        onClick={() => openResume(resume.id)}
                        transition='all 0.3s ease-in-out'
                        border='2px solid transparent'
                        
                        _hover={{ border: '2px solid black', borderRadius: '8px', '& .hover-text': { display: 'flex' }, '& .resume-img': { transform: 'scale(1.1)'}}}
                        >
                        <Image
                            className='resume-img'
                            src={resume.imageUrl} 
                            alt={`${resume.name}'s photo`} 
                            boxSize="200px" 
                            objectFit="cover" 
                            mx="auto" 
                            cursor="pointer"
                            transition='all 0.3s ease-in-out'
                        />
                        <Box 
                            className="hover-text" 
                            position="absolute" 
                            top="0" 
                            left="0" 
                            width="100%" 
                            height="100%" 
                            display="none" 
                            alignItems="center" 
                            justifyContent="center" 
                            backgroundColor="rgba(255, 255, 255, 0.7)"
                            color="black"
                            fontSize="lg"
                            fontWeight="bold"
                        >
                            OPEN
                        </Box>
                    </Box> */}
                    <Box width='108%' height='30%'>
                        <VStack align="start" mt="4">
                            <Text fontWeight="bold" fontSize="lg">{resume.name}</Text>
                            <Text color="gray.500" fontSize="sm" mr='20px'>{resume.major}</Text>
                            <Text color="gray.500" fontSize="sm">{resume.graduationYear}</Text>
                        </VStack>
                        {/* <Checkbox 
                            position="absolute" 
                            bottom="4" 
                            right="4" 
                            // size="lg"
                            isChecked={selectedResumes.includes(resume.id)}
                            onChange={() => toggleResume(resume.id)}
                        /> */}
                    </Box>
                </Box>
            );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default ResumeGrid;
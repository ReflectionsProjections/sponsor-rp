import React from 'react';
import { SimpleGrid, Box, Text, Image, VStack, Checkbox } from '@chakra-ui/react';

interface Resume {
    id: string;
    name: string;
    imageUrl: string;
    metadata: string;
}

interface ResumeGridProps {
  resumes: Resume[];
  selectedResumes: string[];
  toggleResume: (id: string) => void;
}

const ResumeGrid: React.FC<ResumeGridProps> = ({ resumes, selectedResumes, toggleResume }) => {
  const openResume = (id: string) => {
    console.log(`Opening resume with id: ${id}`);
    // Add your logic to open the resume here
  };

  return (
    <Box padding="4">
      {/* <Text fontSize="2xl" mb="4">Resumes</Text> */}
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing="8">
        {resumes.map((resume) => {
            const isSelected = selectedResumes.includes(resume.id);
            return (
                <Box 
                    key={resume.id} 
                    borderWidth="3px" 
                    borderRadius="lg" 
                    overflow="hidden"
                    padding="4"
                    background="white"
                    boxShadow="md"
                    position="relative"
                    cursor="pointer"
                    borderColor={isSelected ? 'blue.500' : 'gray.200'}
                    //   _hover={{ borderColor: 'black', borderWidth: '2px' }}
                    >
                    <Box 
                        position="relative"
                        onClick={() => openResume(resume.id)}
                        transition='all 0.3s ease-in-out'
                        _hover={{ '& .hover-text': { display: 'flex' }, '& .resume-img': { transform: 'scale(1.1)'}}}
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
                    </Box>
                    <Box width='100%' height='40%' onClick={() => toggleResume(resume.id)}>
                        <VStack align="start" mt="4">
                            <Text fontWeight="bold" fontSize="lg">{resume.name}</Text>
                            <Text color="gray.500" fontSize="sm">{resume.metadata}</Text>
                        </VStack>
                        <Checkbox 
                            position="absolute" 
                            bottom="4" 
                            right="4" 
                            // size="lg"
                            isChecked={selectedResumes.includes(resume.id)}
                            onChange={() => toggleResume(resume.id)}
                        />
                    </Box>
                </Box>
            );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default ResumeGrid;
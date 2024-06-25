import React, { useState } from 'react';
import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import ResumeGrid from './ResumeGrid';

interface Resume {
    id: string;
    name: string;
    imageUrl: string;
    metadata: string;
}


export function ResumeBook() {
    
    const resumes: Resume[] = [
        { id: '1', name: 'John Doe', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'HTML God' },
        { id: '2', name: 'Jane Smith', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'Backend' },
        { id: '3', name: 'Alice Wonderland', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'Frontend' },
        { id: '4', name: 'Bob Builder', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'Fullstack' },
        { id: '5', name: 'Charlie Brown', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'DevOps' },
        { id: '6', name: 'Dora Explorer', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'Designer' },
        { id: '7', name: 'Eve Adams', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'Manager' },
        { id: '8', name: 'Frank Ocean', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'CEO' },
        { id: '9', name: 'Grace Hopper', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'CTO' },
        { id: '10', name: 'Hank Hill', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', metadata: 'Sales' },
        // Add more resumes here
    ];

  const [selectedResumes, setSelectedResumes] = useState<string[]>([]);

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

    return (
        <ChakraProvider>
            <Box bg="gray.200" p={4}>
                <Flex justify="space-between" align="center">
                    <Text fontSize="xl" fontWeight="bold">Resume Book</Text>
                    <Flex>
                        <Button onClick={selectAllResumes} mb="4" backgroundColor={selectedResumes.length === resumes.length ? 'lightsalmon' : 'lightblue'}>
                            {selectedResumes.length === resumes.length ? 'Deselect All' : 'Select All'}
                        </Button>
                        <Button mr={2}>Button 2</Button>
                        {/* <Button>Button 3</Button> */}
                    </Flex>
                </Flex>
            </Box>
            <ResumeGrid resumes={resumes} selectedResumes={selectedResumes} toggleResume={toggleResume} />
            {/* Your components and content here */}
        </ChakraProvider>
    );
}

export default ResumeBook;
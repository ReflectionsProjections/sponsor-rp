import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Box, Text, Checkbox, VStack, Grid, GridItem, useMediaQuery, Button } from '@chakra-ui/react';
import { MdOpenInNew } from "react-icons/md";

interface Resume {
    id: string;
    name: string;
    imageUrl: string;
    major: string;
    graduationYear: string;
}

interface ResumeListProps {
  resumes: Resume[];
  selectedResumes: string[];
  toggleResume: (id: string) => void;
}

const ResizableColumn: React.FC<{
    width: number;
    onResize: (width: number) => void;
    children: React.ReactNode;
    canResize: boolean;
  }> = ({ width, onResize, children, canResize }) => {
    const startXRef = useRef<number | null>(null);
  
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      startXRef.current = e.clientX;
      
      const handleMouseMove = (e: MouseEvent) => {
        if (startXRef.current !== null) {
          const diff = e.clientX - startXRef.current;
          onResize(Math.max(50, width + diff));
        }
      };
  
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }, [width, onResize]);
  
    return (
      <Box
        position="relative"
        display="inline-block"
        width={`${width}px`}
        minWidth="50px"
        cursor="default"
      >
        {children}
        {canResize ? (
        <Box
          position="absolute"
          right="-6px"
          top="0"
          height="100%"
          width="3px"
          cursor="col-resize"
          backgroundColor="gray.300"
          transition="all 0.3s"
          _hover={{ backgroundColor: "gray.500", height: "120%", top: "-10%"}}
          onMouseDown={handleMouseDown}
          zIndex="1"
        />
        ) : null}
      </Box>
    );
  };

const ResumeList: React.FC<ResumeListProps> = ({ resumes, selectedResumes, toggleResume }) => {
  const [columnWidths, setColumnWidths] = useState({
    checkbox: 50,
    name: 175,
    major: 300,
    graduationYear: 150,
    actions: 150,
    data: 300,
  });

  const navbarRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [navbarTop, setNavbarTop] = useState(0);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) {
      setNavbarTop(navbar.offsetTop);
    }

    const handleScroll = () => {
      if (navbar) {
        const scrollY = window.scrollY;
        setIsSticky(scrollY > navbarTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navbarTop]);

  const [isLargerThan1800] = useMediaQuery("(min-width: 1800px)");
  const [isLargerThan1550] = useMediaQuery("(min-width: 1550px)");  
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan960] = useMediaQuery("(min-width: 960px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
  const [isLargerThan330] = useMediaQuery("(min-width: 330px)");

  useEffect(() => {
    if (isLargerThan1800) {
        setColumnWidths({
          checkbox: 50,
          name: 475,
          major: 500,
          graduationYear: 550,
          actions: 150,
          data: 300,
        });
    } else if (isLargerThan1550) {
        setColumnWidths({
          checkbox: 50,
          name: 425,
          major: 400,
          graduationYear: 400,
          actions: 150,
          data: 300,
        });
    } else if (isLargerThan1280) {
      setColumnWidths({
        checkbox: 50,
        name: 375,
        major: 300,
        graduationYear: 350,
        actions: 100,
        data: 300,
      });
    } else if (isLargerThan960) {
      setColumnWidths({
        checkbox: 50,
        name: 175,
        major: 300,
        graduationYear: 150,
        actions: 150,
        data: 300,
      });
    } else if (isLargerThan700) {
      setColumnWidths({
        checkbox: 50,
        name: 125,
        major: 200,
        graduationYear: 100,
        actions: 100,
        data: 300,
      });
    } else if (isLargerThan550) {
      setColumnWidths({
        checkbox: 50,
        name: 100,
        major: 150,
        graduationYear: 100,
        actions: 100,
        data: 300,
      });
    } else if (isLargerThan400) {
      setColumnWidths({
        checkbox: 50,
        name: 100,
        major: 150,
        graduationYear: 100,
        actions: 60,
        data: 220,
      });
    } else if (isLargerThan330) {
      setColumnWidths({
        checkbox: 50,
        name: 125,
        major: 200,
        graduationYear: 100,
        actions: 60,
        data: 150,
      });
    } else {
      setColumnWidths({
        checkbox: 50,
        name: 125,
        major: 200,
        graduationYear: 100,
        actions: 60,
        data: 100,
      });
    }
  }, [isLargerThan1800, isLargerThan1550, isLargerThan1280, isLargerThan960, isLargerThan700, isLargerThan550, isLargerThan400, isLargerThan330]);

  const [isDragging] = useState(false);

  const handleResize = useCallback((column: keyof typeof columnWidths, newWidth: number) => {
      setColumnWidths(prev => ({
          ...prev,
          [column]: newWidth,
      }));
  }, []);


  const openResume = (id: string) => {
      console.log(`Opening resume with id: ${id}`);
  };

  return (
    <VStack spacing="0" align="stretch" paddingTop={isSticky ? `${navbarRef.current?.offsetHeight}px`: '0px' } userSelect={isDragging ? "none" : "auto"}>
    <Box
        ref={navbarRef}
        position={isSticky ? "fixed" : "relative"}
        top={isSticky ? "0" : undefined}
        borderWidth="1px"
        overflow="hidden"
        padding="4"
        background="gray.100"
        boxShadow="md"
        width="100%"
        zIndex="10"
      >
        <Grid templateColumns={
            isLargerThan700
                ? `${columnWidths.checkbox}px ${columnWidths.name}px ${columnWidths.major}px ${columnWidths.graduationYear}px ${columnWidths.actions}px`
                : `${columnWidths.checkbox}px ${columnWidths.data}px ${columnWidths.actions}px`
            } gap={4} alignItems="center">
            <GridItem>
                <Text fontWeight="bold">Select</Text>
            </GridItem>
            {isLargerThan700 ? (
                <>
                <GridItem>
                    <ResizableColumn width={columnWidths.name} onResize={(width) => handleResize('name', width)} canResize={true}>
                    <Text fontWeight="bold">Name</Text>
                    </ResizableColumn>
                </GridItem>
                <GridItem>
                    <ResizableColumn width={columnWidths.major} onResize={(width) => handleResize('major', width)} canResize={true}>
                    <Text fontWeight="bold">Major</Text>
                    </ResizableColumn>
                </GridItem>
                <GridItem>
                    <ResizableColumn width={columnWidths.graduationYear} onResize={(width) => handleResize('graduationYear', width)} canResize={true}>
                    <Text fontWeight="bold">Grad Year</Text>
                    </ResizableColumn>
                </GridItem>
                </>
            ) : (
                <GridItem>
                <ResizableColumn width={columnWidths.data} onResize={(width) => handleResize('data', width)} canResize={true}>
                    <Text fontWeight="bold">Data</Text>
                </ResizableColumn>
                </GridItem>
            )}
            <GridItem>
                <ResizableColumn width={columnWidths.actions} onResize={(width) => handleResize('actions', width)} canResize={false}>
                <Text fontWeight="bold">Actions</Text>
                </ResizableColumn>
            </GridItem>
            </Grid>
      </Box>

      {/* {isSticky && (
        <Box height={`${navbarRef.current?.offsetHeight}px`} />
      )} */}

    {resumes.map((resume) => {
        const isSelected = selectedResumes.includes(resume.id);
        return (
            <Box 
            key={resume.id}
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            padding="4"
            marginTop='1'
            background="white"
            boxShadow="md"
            position="relative"
            cursor="pointer"
            transition="all 0.3s"
            _hover={{ background: 'blue.200'}}
            borderColor={isSelected ? 'blue.500' : 'gray.200'}
            onClick={() => toggleResume(resume.id)}
            >
            <Grid templateColumns={
                isLargerThan700
                ? `${columnWidths.checkbox}px ${columnWidths.name}px ${columnWidths.major}px ${columnWidths.graduationYear}px ${columnWidths.actions}px`
                : `${columnWidths.checkbox}px ${columnWidths.data}px ${columnWidths.actions}px`
            } gap={4} alignItems="center">
                <GridItem>
                <Checkbox 
                    size="lg"
                    isChecked={isSelected}
                    onChange={() => toggleResume(resume.id)}
                />
                </GridItem>
                {isLargerThan700 ? (
                <>
                    <GridItem>
                    <Text fontWeight="bold" fontSize="lg">{resume.name}</Text>
                    </GridItem>
                    <GridItem>
                    <Text color="gray.500" fontSize="sm">{resume.major}</Text>
                    </GridItem>
                    <GridItem>
                    <Text color="gray.500" fontSize="sm">{resume.graduationYear}</Text>
                    </GridItem>
                </>
                ) : (
                <GridItem>
                    <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">{resume.name}</Text>
                    <Text color="gray.500" fontSize="sm">{resume.major}</Text>
                    <Text color="gray.500" fontSize="sm">{resume.graduationYear}</Text>
                    </VStack>
                </GridItem>
                )}
                <GridItem zIndex='5'>
                <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={(e) => {
                    e.stopPropagation();
                    openResume(resume.id);
                    }}
                >
                    {isLargerThan550 ? 'Open Resume' : <MdOpenInNew />}
                </Button>
                </GridItem>
            </Grid>
            </Box>
        );
        })}
    </VStack>
  );
}

export default ResumeList;
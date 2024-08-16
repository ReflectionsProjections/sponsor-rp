import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import {
  FormControl,
  Input,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
  HStack
} from '@chakra-ui/react';
import { Config } from '../config';

interface MultiSelectDropdownProps {
  id: string;
  width: string
  options: string[];
  selectedOptions: string[];
  onSelectionChange: (selected: string[]) => void;
  baseColor: string;
}

function MultiSelectDropdown({ id, width, options, selectedOptions, onSelectionChange, baseColor }: MultiSelectDropdownProps) {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options.slice(0, Config.MAX_DROPDOWN_OPTIONS));
  const bgColor = parseInt(baseColor) < 500 ? "gray."+(parseInt(baseColor)-100) : "gray."+(100+parseInt(baseColor));

  const fuse = new Fuse(options, {
    keys: [''], 
    threshold: 0.3, // Lower threshold means more results
  });

  const resetFilter = () => {
    let newOptions;
  
    if (query.trim() === '') {
      newOptions = options
      .filter(option =>
        option.toLowerCase().includes(query.toLowerCase()) &&
        !selectedOptions.includes(option) // Omit already selected options
      )
      .slice(0, Config.MAX_DROPDOWN_OPTIONS);
    } else {
      // Apply fuzzy search if the user has started typing
      const fuzzyResults = fuse.search(query).map(result => result.item);
      newOptions = fuzzyResults
        .filter(option => !selectedOptions.includes(option)) // Omit already selected options
        .slice(0, Config.MAX_DROPDOWN_OPTIONS);
    }
  
    setFilteredOptions(newOptions);
  };

//     const resetFilter = () => {
//     const newOptions = options
//       .filter(option =>
//         option.toLowerCase().includes(query.toLowerCase()) &&
//         !selectedOptions.includes(option) // Omit already selected options
//       )
//       .slice(0, Config.MAX_DROPDOWN_OPTIONS);
//     setFilteredOptions(newOptions);
//   };

  const handleSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      const newSelectedOptions = [...selectedOptions, option];
      onSelectionChange(newSelectedOptions);
      setQuery('');
      resetFilter();
      setIsOpen(false);
    }
  };

  const handleRemove = (option: string) => {
    const newSelectedOptions = selectedOptions.filter(selected => selected !== option);
    resetFilter();
    onSelectionChange(newSelectedOptions);
  };

  useEffect(() => {
    resetFilter();
  }, [query, selectedOptions, options]); // Dependencies include query, selectedOptions, and options

  return (
    <FormControl zIndex="15" width={width}>
      <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} autoFocus={false} closeOnBlur={true}>
        <PopoverTrigger>
          <Box>
            <HStack
            //   onClick={() => setIsOpen(!isOpen)}
              p={2}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              wrap="wrap"
              spacing={1}
              minHeight="40px"
            >
              {selectedOptions.map((option) => (
                <Tag key={option} size="sm" borderRadius="full" variant="solid" colorScheme="teal">
                  <TagLabel>{option}</TagLabel>
                  <TagCloseButton onClick={() => handleRemove(option)} />
                </Tag>
              ))}
              <Input
                id={id}
                value={query}
                variant="unstyled"
                flex="1"
                placeholder={selectedOptions.length === 0 ? 'Select options' : ''}
                // onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  resetFilter();
                  setIsOpen(true);
                }}
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(false)}
              />
            </HStack>
          </Box>
        </PopoverTrigger>
        <PopoverContent bgColor={bgColor} minWidth='200px' width={width} maxWidth='90vw'>
          <PopoverArrow />
          <PopoverBody>
            <List onMouseDown={(event) => { event.preventDefault(); }}>
              {filteredOptions.map((option) => (
                <ListItem
                  key={option}
                  onClick={() => handleSelect(option)}
                  cursor="pointer"
                  _hover={{ backgroundColor: `gray.400` }}
                  borderRadius="4px"
                  padding="8px"
                >
                  {option}
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}

export default MultiSelectDropdown;
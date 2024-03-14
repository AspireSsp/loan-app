import React, { useState } from 'react';
import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const images = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    // Add more image URLs as needed
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <Flex align="center" justify="center" w="100%" h="100%" position="relative">
            <IconButton
                icon={<ChevronLeftIcon />}
                aria-label="Previous"
                position="absolute"
                left="10px"
                onClick={prevSlide}
            />
            <Box w="80%" h="80%" overflow="hidden" position="relative">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        objectFit="cover"
                        position="absolute"
                        top="0"
                        left={`${(index - currentIndex) * 100}%`}
                        transition="left 0.5s ease"
                        w="100%"
                        h="100%"
                    />
                ))}
            </Box>
            <IconButton
                icon={<ChevronRightIcon />}
                aria-label="Next"
                position="absolute"
                right="10px"
                onClick={nextSlide}
            />
        </Flex>
    );
};

export default Carousel;

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

interface SideImageProps {
    imageUrl: string;
    altText: string;
}

const SideImage: React.FC<SideImageProps> = ({ imageUrl, altText }) => {
    console.log(imageUrl)
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: { xs: 2, md: 0 },
            }}
        >
            <Image
                src={imageUrl}
                alt={altText}
                width={600}
                height={600}
                style={{
                    borderRadius: '10px',
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
        </Box>
    );
};

export default SideImage;
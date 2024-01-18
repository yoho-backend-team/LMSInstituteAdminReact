import React from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import cssStyles from '../../../../utils/cssStyles';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import LightboxModal from '../../../../components/LightboxModal';


  
  // ----------------------------------------------------------------------
  
  ProfileGallery.propTypes = {
    gallery: PropTypes.array.isRequired,
  };
const ProfileGallery = ({ gallery }) => {
    const [openLightbox, setOpenLightbox] = useState(false);

const [selectedImage, setSelectedImage] = useState(0);

const imagesLightbox = gallery.map((img) => img.imageUrl);


const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };
  return (
    <Box sx={{ mt: 5 }}>
    <Typography variant="h4" sx={{ mb: 3 }}>
      Gallery
    </Typography>

    <Card sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {gallery.map((image) => (
          <GalleryItem key={image.id} image={image} onOpenLightbox={handleOpenLightbox} />
        ))}
      </Box>

      <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    </Card>
  </Box>
  )
}

export default ProfileGallery
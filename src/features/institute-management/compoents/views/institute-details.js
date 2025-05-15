import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Avatar, Box, Paper, Divider, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import client from 'api/client';
import { getImageUrl } from 'utils/imageUtils';
import { styled } from '@mui/material/styles';
import { useSpinner } from 'context/spinnerContext';
import axios from 'axios';
import toast from 'react-hot-toast';


const InstituteDetails = ({ institute }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(institute);
  console.log(formData,"formdata");
  
  console.log(institute, 'institute');
  useEffect(() => {
    setFormData(institute);
  }, [institute]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    handleSubmit()
    setIsEditing(false);
  };
  const handleCancel = () => {
    setFormData(institute);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const [logo, setLogo] = useState('');
  console.log(logo);
  
  const [logoSrc, setLogoSrc] = useState(
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg'
  );

const { show, hide} = useSpinner()

  const handleInputImageChange = async (file) => {
    try {
      show()
      const { files } = file.target;
      const form_data = new FormData()
      form_data.append("file",files[0])
      const response = await client.file.upload(form_data)
      setLogo(response?.data?.file)
      setFormData({ ...formData, logo: response?.data?.file });

    } catch (error) {
      hide()
      toast.error(error?.message)
    }finally{
      hide()
    }
    };
  
    const handleInputImageReset = () => {
      setLogo('');
      setLogoSrc(
        'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg'
      );
    };


    const handleSubmit = async (e,data) => {
      // e.preventDefault()
      const instituteId = JSON.parse(localStorage.getItem("institute")).uuid;
     
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_PUBLIC_API_URL}/api/lms/platform/update/:${instituteId}`,
          data,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`
            }
          }
        );
    
    
        if (response.data.status) {
          toast.error('done')
          return
        } 
      } catch (error) {
        toast.error(error.message)
        console.error('Error in update Instute:', error);
        throw error;
      }
    };
  
    

  return (
    <Container>
      <form onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4">Institute Details</Typography>
          {!isEditing ? (
            <IconButton
              onClick={handleEdit}
              color="primary "
              sx={{
                '&:hover': {
                  backgroundColor: '#f5f5f5', // Changes color on hover
                  transform: 'scale(1.05)' // Slight zoom effect
                },
                borderRadius: 20
              }}
            >
              <EditIcon /> Edit
            </IconButton>
          ) : (
            <Box>
              <IconButton onClick={handleSave} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancel} color="secondary">
                <CancelIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <Divider sx={{ marginBottom: 3 }} />

        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <Avatar src={ logo ? getImageUrl(logo) : logoSrc} alt="Institute Logo" sx={{ width: 100, height: 100 }} />
            {isEditing && (
             <Box>
               <Button variant="contained" component="label">
                Upload
                <input type="file" accept="image/*" hidden onChange={handleInputImageChange} />
              </Button>
              <Button  component="label" color="error" variant="tonal"   onClick={handleInputImageReset}>
                Reset
              </Button>
             </Box>
              
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Institute Name"
              name="institute_name"
              value={formData.institute_name}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Website" name="website" value={formData.website} onChange={handleChange} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="contact_info.phone_no"
              value={formData.contact_info.phone_no}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Alternate Number"
              name="contact_info.alternate_no"
              value={formData.contact_info.alternate_no}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Address 1"
              name="contact_info.address.address1"
              value={formData?.contact_info?.address?.address1 || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Address 2"
              name="contact_info.address.address2"
              value={formData?.contact_info?.address?.address2 || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City"
              name="contact_info.address.city"
              value={formData?.contact_info?.address?.city || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="State"
              name="contact_info.address.state"
              value={formData?.contact_info?.address?.state || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Pincode"
              name="contact_info.address.pincode"
              value={formData?.contact_info?.address?.pincode || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

        <Typography variant="h6" gutterBottom>
          Social Media
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Twitter"
              name="social_media.twitter_id"
              value={formData?.social_media?.twitter_id || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Facebook"
              name="social_media.facebook_id"
              value={formData?.social_media?.facebook_id || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Instagram"
              name="social_media.instagram_id"
              value={formData?.social_media?.instagram_id || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LinkedIn"
              name="social_media.linkedin_id"
              value={formData?.social_media?.linkedin_id || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pinterest"
              name="social_media.pinterest_id"
              value={formData?.social_media?.pinterest_id || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

        <Typography variant="h6" gutterBottom>
          Gallery Images
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {formData.gallery_images.map((image, index) => (
            <Avatar key={index} src={image} alt={`Gallery Image ${index + 1}`} sx={{ width: 100, height: 100, margin: 1 }} />
          ))}
        </Box>
      </Paper>
      </form>
    </Container>
  );
};

export default InstituteDetails;

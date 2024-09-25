import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Avatar, Box, Paper, Divider, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const InstituteDetails = ({ institute }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(institute);
  console.log(institute,"institute")
  useEffect(() => {
    setFormData(institute);
  }, [institute]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
  };
  const handleCancel = () => {
    setFormData(institute);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4">Institute Details</Typography>
          {!isEditing ? (
            <IconButton onClick={handleEdit} color="primary">
              <EditIcon />
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

        <Typography variant="h6" gutterBottom>General Information</Typography>
        <Grid container spacing={3}>
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
            <Typography>Logo:</Typography>
            <Avatar src={formData.logo} alt="Institute Logo" sx={{ width: 150, height: 150 }} />
            {isEditing && <Button variant="contained" component="label">Upload</Button>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
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

        <Typography variant="h6" gutterBottom>Contact Information</Typography>
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
              value={formData?.contact_info?.address?.address1 || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Address 2"
              name="contact_info.address.address2"
              value={formData?.contact_info?.address?.address2 || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City"
              name="contact_info.address.city"
              value={formData?.contact_info?.address?.city || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="State"
              name="contact_info.address.state"
              value={formData?.contact_info?.address?.state || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Pincode"
              name="contact_info.address.pincode"
              value={formData?.contact_info?.address?.pincode || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

        <Typography variant="h6" gutterBottom>Social Media</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Twitter"
              name="social_media.twitter_id"
              value={formData?.social_media?.twitter_id || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Facebook"
              name="social_media.facebook_id"
              value={formData?.social_media?.facebook_id || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Instagram"
              name="social_media.instagram_id"
              value={formData?.social_media?.instagram_id || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LinkedIn"
              name="social_media.linkedin_id"
              value={formData?.social_media?.linkedin_id || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pinterest"
              name="social_media.pinterest_id"
              value={formData?.social_media?.pinterest_id || ""}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

        <Typography variant="h6" gutterBottom>Gallery Images</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {formData.gallery_images.map((image, index) => (
            <Avatar key={index} src={image} alt={`Gallery Image ${index + 1}`} sx={{ width: 100, height: 100, margin: 1 }} />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default InstituteDetails;

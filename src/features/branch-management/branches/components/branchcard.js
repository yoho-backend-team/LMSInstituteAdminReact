import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BranchesCardHeader from './BrachesCardHeader';
// import { useTheme } from '@mui/system';
import BranchEditModal from './edit-Branch/BranchEditModal';
import BranchDeleteModal from './delete-Branch/BranchDeleteModal';

const BranchCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const theme = useTheme();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    // Implement view logic here
    handleClose();
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    // Implement delete logic here
    setDeleteDialogOpen(true);
    handleClose();
  };

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ position: 'relative', height: '13.5625rem' }}>
          <CardContent sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto'
              }}
              alt="jjj"
              src={`https://cdn-icons-png.flaticon.com/512/992/992651.png`}
            />
            <Button sx={{ mx: 'auto', justifyContent: 'center', alignItems: 'center', display: 'flex',mt:3 }} variant="contained">
              Add New Branch
            </Button>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <BranchesCardHeader />
      </Grid>
      {Array.from({ length: 5 }, (_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ position: 'relative' }}>
            <IconButton
              aria-label="more"
              aria-controls={`menu-${index}`}
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{
                position: 'absolute',
                top: 5,
                right: 3
              }}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleViewClick} component={Link} to="view" sx={{ fontSize: 'small', padding: '8px' }}>
                View
              </MenuItem>
              <MenuItem onClick={() => handleEdit()} sx={{ fontSize: 'small', padding: '8px' }}>
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDeleteClick()} sx={{ fontSize: 'small', padding: '8px' }}>
                Delete
              </MenuItem>
            </Menu>

            <CardMedia
              sx={{
                height: 100,
                width: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3,
                mx: 'auto'
              }}
              image={require('assets/images/avatar/map-pin.png')}
            />
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Location
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                29/1, Ambal Nagar, 1st Main Road, Echankadu, Kovilambakam, Chennai, TamilNadu- 600117
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <BranchEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
      <BranchDeleteModal open={deleteDialogOpen} setOpen={setDeleteDialogOpen} />
    </Grid>
  );
};

export default BranchCard;

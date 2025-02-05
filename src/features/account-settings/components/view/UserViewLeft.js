// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

// ** Custom Components
import UserEditDialog from '../UserEditDialog';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';

const UserViewLeft = ({ userData, id, setRefetch }) => {
  const statusColors = {
    1: 'success',
    pending: 'warning',
    0: 'error'
  };

  // ** States
  const [openEdit, setOpenEdit] = useState(false);

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  return (
    <Box
      // sx={{
      //   boxShadow: 2,
      //   pt: 0,
      //   borderRadius: 3,
      //   width: {xs: 'full',sm:'50vw'},
      //   height: '80vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   backgroundColor: 'white',
      //   p: 5
      // }}
    >
      <Card
        sx={{
          width: {sm: 'full',md:'50vw'},
          backgroundColor: '#f5f5f5', // Changed background color to very light grey
          color: '#fff',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          padding: 2,
          textAlign: 'center'
        }}
      >
        {/* Pro Badge */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', position: 'relative' }}>
          {' '}
          {/* Moved chip to the left */}
          <Chip
            label={userData?.is_active ? 'Active' : 'Inactive'}
            sx={{
              position: 'absolute',
              top: -16,
              left: 16, // Positioned to the left
              backgroundColor: userData?.is_active ? '#ffc107' : 'red',
              color: '#000',
              fontWeight: 'bold',
              mt: 2
            }}
          />
        </Box>

        {/* Avatar */}
        <Avatar
          src={userData?.image ? getImageUrl(userData.image) : profilePlaceholder}
          alt={userData?.name}
          sx={{ width: 100, height: 100, margin: '16px auto' }}
        />

        {/* Name and Location */}
        <Typography variant="h3" fontWeight="bold">
          {`${userData?.first_name || ''} ${userData?.last_name || ''}`}
        </Typography>

        <Typography variant="body2" sx={{ color: '#bbb' }}>
          {userData?.email || 'N/A'}
        </Typography>

       
        <Chip label={userData?.role?.identity || 'User'} variant='filled' sx={{backgroundColor:'#ff7407'}} ></Chip>

        <CardContent sx={{ color: 'black' }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', fontWeight: 500 }}>
            User Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'grid', rowGap: 2 , boxShadow:3 ,p:2 }}>
            {/* Name */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.primary" fontWeight={500}>
                Name:
              </Typography>
              <Typography>{`${userData.first_name || ''} ${userData.last_name || ''}`}</Typography>
            </Box>

            {/* Email */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.primary" fontWeight={500}>
                Email:
              </Typography>
              <Tooltip title={userData.email} arrow>
                <Typography>{userData.email || 'N/A'}</Typography>
              </Tooltip>
            </Box>

            {/* Status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="text.primary" fontWeight={500}>
                Status:
              </Typography>
              <Chip label={userData.is_active ? 'Active' : 'Inactive'}  size="small" />
            </Box>

            {/* Contact */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.primary" fontWeight={500}>
                Contact:
              </Typography>
              <Typography>{userData.phone_number || 'N/A'}</Typography>
            </Box>
          </Box>
        </CardContent>

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={handleEditClickOpen}
            sx={{
              backgroundColor: '#00adb5',
              textTransform: 'none',
              borderRadius: 3,
              padding: '8px 16px',
              ':hover': { backgroundColor: '#007b7f' }
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Card>
      <UserEditDialog id={id} userData={userData} openEdit={openEdit} handleEditClose={handleEditClose} setRefetch={setRefetch} />
    </Box>
  );
};

export default UserViewLeft;

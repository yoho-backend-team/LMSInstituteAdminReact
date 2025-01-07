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
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent
            sx={{
              pt: 4,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              position: 'relative' // Added for absolute positioning inside this CardContent
            }}
          >
            <Avatar
              src={userData?.image ? getImageUrl(userData.image) : profilePlaceholder}
              alt={userData?.name}
              sx={{ width: 120, height: 120, mb: 3, border: '4px solid', borderColor: 'primary.main' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '120px',
                right: 'calc(50% - 60px)', // Adjust this value based on avatar's alignment
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Tooltip title="Edit User Data" placement="right">
                <Button
                  onClick={handleEditClickOpen}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'success',
                    minWidth: 0,
                    padding: '6px',
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: '#0aa865'
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="white"
                      d="m12.25 10.825l.925.925L18.6 6.325l-.925-.925zM5 19h.925l5.825-5.825l-.925-.925L5 18.075zm8.875-5.125l-3.75-3.75L14.3 5.95l-.725-.725L8.8 10q-.3.3-.7.3t-.7-.3t-.3-.712t.3-.713l4.75-4.75q.6-.6 1.413-.6t1.412.6l.725.725l1.25-1.25q.3-.3.713-.3t.712.3L20.7 5.625q.3.3.3.712t-.3.713zM4 21q-.425 0-.712-.288T3 20v-1.925q0-.4.15-.763t.425-.637l6.55-6.55l3.75 3.75l-6.55 6.55q-.275.275-.638.425t-.762.15z"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {`${userData?.first_name || ''} ${userData?.last_name || ''}`}
            </Typography>
            <Chip label={userData?.role?.identity || 'User'} color="warning" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
          </CardContent>

          <Divider />

          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3, textTransform: 'uppercase', fontWeight: 500 }}>
              User Details
            </Typography>
            <Box sx={{ display: 'grid', rowGap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.primary" fontWeight={500}>
                  Name:
                </Typography>
                <Typography>{`${userData?.first_name || ''} ${userData?.last_name || ''}`}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.primary" fontWeight={500}>
                  Email:
                </Typography>
                <Typography>{userData?.email || 'N/A'}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.primary" fontWeight={500}>
                  Status:
                </Typography>
                <Chip
                  label={userData?.is_active ? 'Active' : 'Inactive'}
                  color={statusColors[userData?.is_active] || 'default'}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.primary" fontWeight={500}>
                  Contact:
                </Typography>
                <Typography>{userData?.phone_number || 'N/A'}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <UserEditDialog id={id} userData={userData} openEdit={openEdit} handleEditClose={handleEditClose} setRefetch={setRefetch} />
      </Grid>
    </Grid>
  );
};

export default UserViewLeft;

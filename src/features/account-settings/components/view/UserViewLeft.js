// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

// ** Custom Components
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';

// ** Utils Import
import { getInitials } from 'utils/get-initials';

// import { getUserById } from '../services/viewUserServices';

import UserEditDialog from '../UserEditDialog';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';

// import { MenuItem, TextField } from '@mui/material';

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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 8, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                src={ userData?.image ? getImageUrl(userData?.image) : profilePlaceholder}
                variant="rounded"
                alt={userData?.name}
                sx={{ width: 100, height: 100, mb: 4 }}
              />
            <Typography variant="h4" sx={{ mb: 2 }}>
              {userData?.first_name + userData?.last_name}
            </Typography>
            <CustomChip
              rounded
              skin="light"
              size="small"
              label={userData?.role?.identity}
              color={'warning'}
              sx={{ textTransform: 'capitalize' }}
            />
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>name:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.first_name + userData?.last_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.email}</Typography>
              </Box>
              <Box sx={{ display: 'none', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Designation:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.institution_users?.designation}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                <CustomChip
                  rounded
                  skin="light"
                  size="small"
                  label={userData.is_active ? 'Active' : 'InActive'}
                  color={statusColors[userData.is_active]}
                  sx={{
                    textTransform: 'capitalize'
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.phone_number}</Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Edit Details
            </Button>
          </CardActions>
        </Card>
        <UserEditDialog id={id} userData={userData} openEdit={openEdit} handleEditClose={handleEditClose} setRefetch={setRefetch} />
      </Grid>
    </Grid>
  );
};

export default UserViewLeft;

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { getInitials } from 'utils/get-initials';
import UserEditDialog from './UserEditDialog';
import { getImageUrl } from 'utils/imageUtils';
import { position } from 'stylis';

const UserViewLeft = ({ userData, id, setRefetch }) => {
  const statusColors = {
    true: 'success',
    pending: 'warning',
    false: 'error'
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
          <CardContent sx={{ pt: 8, display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            {userData?.image ? (
              <CustomAvatar
                src={`${getImageUrl(userData?.image)}`}
                variant="rounded"
                alt={userData?.first_name+userData?.last_name}
                sx={{ width: 100, height: 100, mb: 4,ml:0 }}
              />
            ) : (
              <CustomAvatar skin="light" variant="rounded" sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}>
                {userData?.first_name ? getInitials(userData?.first_name+userData?.last_name) : 'U'}
              </CustomAvatar>
            )}
            <Typography variant="h2" sx={{ mb: 2,px:3 }}>
              {userData?.first_name+userData?.last_name}
            </Typography>
            </Box>
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
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.username}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Designation:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.designation}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                <CustomChip
                  rounded
                  skin="light"
                  size="small"
                  label={userData.is_active? 'Active' : 'InActive'}
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
             <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
            <Typography sx={{ mr: 2, mt: 2, fontWeight: 500, color: 'text.secondary' }}>Branches:</Typography>
           
                {/* {userData?.branches?.map((item, index) => ( */}
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={userData?.branch?.branch_identity}
                    color={'primary'}
                    sx={{
                      textTransform: 'capitalize',
                      mt:2
                    }}
                  />
             </Box>
                {/* ))} */}
             
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

UserViewLeft.propTypes = {
  userData: PropTypes.any,
  id: PropTypes.any,
  setRefetch: PropTypes.any
};

export default UserViewLeft;

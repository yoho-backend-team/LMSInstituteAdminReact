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
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';

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
        <Card sx={{
    width: '160%'
  }}>
          <CardContent sx={{ pt: 8, display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            {userData?.image ? (
              <CustomAvatar
                src={`${getImageUrl(userData?.image)}`}
                variant="rounded"
                alt={userData?.first_name+userData?.last_name}
                sx={{ width: 100, height: 100, mb: 4,ml:0,
                  borderRadius: '50%',
                  width: '100px',  
                  height: '100px', 
                  objectFit: 'cover', 
                }}
              />
            ) : (
              <CustomAvatar skin="light" variant="rounded" sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}>
                {userData?.first_name ? getInitials(userData?.first_name+userData?.last_name) : 'U'}
              </CustomAvatar>
            )}

            <Box>
            <Typography variant="h2" sx={{ px:4,mb:3,fontSize: '2rem',}}>
              {userData?.first_name+userData?.last_name}
            </Typography>
            <Box sx={{ display: 'flex', mb: 3,px:4}}>
                <CustomChip
                  // rounded
                  skin="light"
                  size="small"
                  label={userData.is_active? 'Active' : 'InActive'}
                  color={statusColors[userData.is_active]}
                  sx={{
                  
                    textTransform: 'capitalize',
                    borderColor: 'darkgreen',  
                    '&.MuiChip-root': {
                      border: '1px solid darkgreen', 
                    }
              
                  }}
                />
              </Box>
            </Box>


            <CustomChip
              // rounded
              skin="light"
              size="small"
              label={userData?.role?.identity}
              color={'warning'}
              sx={{ textTransform: 'capitalize',backgroundColor: '#e0e0e0', color: '#000', mb:8.5,ml:-2, borderRadius: '16px',fontSize: '0.75rem',  // Smaller font size
               }}
              />
            
              </Box>  

              

          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6, }} />

          <CardContent sx={{ pb: 1 }}>

            <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase',fontSize: '1.2rem',fontWeight: 700 ,mt:2}}>
              Details
            </Typography>

            <Box sx={{ pt: 4 }}>

              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 1, fontWeight: 500, color: 'text.secondary',fontSize: '1rem' }}>Username :</Typography>
                <Typography sx={{ color: 'text.secondary',fontSize: '1rem'  }}>{userData?.username}</Typography>
              <Box sx={{ display: 'flex', mb: 3 ,mx:7}}>
                <Typography sx={{ mr: 1, fontWeight: 500, color: 'text.secondary',fontSize: '1rem'  }}>Email :</Typography>
                <Typography sx={{ color: 'text.secondary',fontSize: '1rem'  }}>{userData?.email}</Typography>
              </Box>
              </Box>
 

              <Box sx={{ display: 'flex' }}>
                <Typography sx={{mr:0.5,mt:-0.5, fontWeight: 500, color: 'text.secondary' }}>
                <PhoneIcon  />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.phone_number}</Typography>
             <Box sx={{ display: 'flex', mb: 3,mx:7 }}>
            <Typography sx={{ml:2, mr:-1.5, fontWeight: 500, color: 'text.secondary' }}>
              <LocationOnIcon/>
            </Typography>
                {/* {userData?.branches?.map((item, index) => ( */}
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={userData?.branch?.branch_identity}
                    sx={{
                      textTransform: 'capitalize',
                    }}
                  />
             </Box>
              </Box>

            </Box>


                {/* ))} */}
                <Box sx={{ display: 'flex', mb: 3,mt:1 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary',fontSize: '1rem'  }}>Designation :</Typography>
                <Typography sx={{ color: 'text.secondary' ,fontSize: '1rem',ml:-1 }}>{userData?.designation}</Typography>
              </Box>
             
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ mr: 2, width: '100%',backgroundColor:'black','&:hover': {
        backgroundColor: 'black'} }} onClick={handleEditClickOpen}>
             <EditIcon sx={{mr:1}}/> Edit Details
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

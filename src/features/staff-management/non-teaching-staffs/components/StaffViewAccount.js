import { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
// ** Custom Components
import CustomChip from 'components/mui/chip';

import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './UserSubscriptionDialog';

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Teacher Profile',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
};

// const statusColors = {
//   active: 'success',
//   pending: 'warning',
//   inactive: 'secondary'
// };

const UserViewAccount = ({ staff }) => {
  // ** States
  // const [openPlans, setOpenPlans] = useState(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  if (data) {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pb: 4 }}>
              <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>@{staff?.users?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={staff.is_active === '1' ? 'Active' : 'inactive'}
                    color={staff.is_active === '1' ? 'success' : 'error'}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{staff.designation}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Phone:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+1 {staff.phone_number}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Alt Phone:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+1 {staff.alternate_number}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>gender:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff.gender}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                  <Box sx={{display:'flex'}} gap={1}>
                    <Typography sx={{ color: 'text.secondary' }}>{staff.address_line_1},</Typography>
                    <Typography sx={{ color: 'text.secondary' }}> {staff.address_line_2}</Typography>
                  </Box>
                  <Typography sx={{ color: 'text.secondary' }}>{staff.city}</Typography>

                  <Typography sx={{ color: 'text.secondary' }}>
                    {staff.state}-{staff.pin_code}
                  </Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: '' }}>
              <Box>
                <Button component={Link} to={'edit'} variant="contained" sx={{ mr: 2 }}>
                  Edit
                </Button>
              </Box>
              <Box>
                <Button color="error" variant="tonal" onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </Box>
            </CardActions>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewAccount;

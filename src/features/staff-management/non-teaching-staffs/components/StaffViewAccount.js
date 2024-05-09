import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { default as DeleteModal } from 'components/modal/DeleteModel';
import { deleteTeachingStaff } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { default as UserSubscriptionDialog } from './UserSubscriptionDialog';

const UserViewAccount = ({ staff, staffID, setRefetch }) => {
  const [staffDeleteModelOpen, setStaffDeleteModelOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  const handleDelete = () => {
    setStaffDeleteModelOpen(true);
  };

  const Navigate = useNavigate();
  const handleStaffDelete = async () => {
    const data = { id: staffID };
    const result = await deleteTeachingStaff(data);
    if (result.success) {
      toast.success(result.message);
      Navigate(-1);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };
  console.log(staffID,staff,"chandran")
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
                <Typography sx={{ color: 'text.secondary' }}>{staff?.[0]?.full_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{staff?.[0]?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{staff?.[0]?.userDetail?.designation}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Gender:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{staff?.[0]?.gender}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>DOB:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{staff?.[0]?.dob}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Number:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>+91 {staff?.[0]?.contact_info?.phone_number}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Alt Number:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>+91 {staff?.[0]?.contact_info?.alternate_number}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Qualification:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{staff?.[0]?.qualification}</Typography>
              </Box>
              <Box>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {staff?.[0]?.contact_info?.address1}, {staff?.[0]?.contact_info?.address2}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{staff?.[0]?.contact_info?.city}</Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: '' }}>
            <Box
              component={Link}
              to={`non-teaching-staffs/${staff?.[0]?.uuid}/edit`}
              state={{ staff: staff, id: staff?.[0]?.uuid }}
            >
              <Button variant="contained" size="medium" sx={{ px: 4 }}>
                Edit
              </Button>
            </Box>
            <Box>
              <Button color="error" variant="tonal" sx={{ px: 3 }} onClick={() => handleDelete(staff?.[0]?.uuid)}>
                Delete
              </Button>
            </Box>
          </CardActions>

          <DeleteModal
            open={staffDeleteModelOpen}
            setOpen={setStaffDeleteModelOpen}
            description="Are you sure you want to delete this Course? "
            title="Delete"
            handleSubmit={handleStaffDelete}
          />
          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
        </Card>
      </Grid>
    </Grid>
  );
};

UserViewAccount.propTypes = {
  staff: PropTypes.any,
  staffID: PropTypes.any,
  setRefetch: PropTypes.any
};

export default UserViewAccount;

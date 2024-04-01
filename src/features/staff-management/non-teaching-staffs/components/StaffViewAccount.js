import { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
// ** Custom Components
import { default as UserSubscriptionDialog } from './UserSubscriptionDialog';
import { default as DeleteModal } from 'components/modal/DeleteModel';
import { deleteTeachingStaff } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import toast from 'react-hot-toast';
const UserViewAccount = ({ staff, formattedDate,staffID,setRefetch }) => {
  
  // ** States
  // const [openPlans, setOpenPlans] = useState(false)
  // const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [staffDeleteModelOpen, setStaffDeleteModelOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
 
  console.log('non teaching details', staff);
//handleDeletion
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
console.log('gettingId', staffID);

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
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.users?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{staff?.teachingStaff?.designation}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Gender:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.gender}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>DOB:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{formattedDate(`${staff?.teachingStaff?.dob}`)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+91 {staff?.teachingStaff?.phone_number}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Alt Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+91 {staff?.teachingStaff?.alternate_number}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Qualification:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.education_qualification}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {staff?.teachingStaff?.address_line_1}, {staff?.teachingStaff?.address_line_2}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.city}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: '' }}>
              <Box
                component={Link}
                to={`non-teaching-staffs/${staff?.teachingStaff?.staff_id}/edit`}
                state={{ staff: staff?.teachingStaff, id: staff?.teachingStaff?.id }}
              >
                <Button variant="contained" size="medium" sx={{ px: 4 }}>
                  Edit
                </Button>
              </Box>
              <Box>
                <Button color="error" variant="tonal" sx={{ px: 3 }} onClick={() => handleDelete(staff?.teachingStaff?.id)}>
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

export default UserViewAccount;

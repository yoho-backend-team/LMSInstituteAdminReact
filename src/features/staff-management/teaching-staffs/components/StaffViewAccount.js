import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import { default as DeleteModal } from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { deleteTeachingStaff } from '../services/teachingStaffServices';
import { default as UserSubscriptionDialog } from './UserSubscriptionDialog';
import { useInstitute } from 'utils/get-institute-details';
import { useSelector } from 'react-redux';
import { getImageUrl } from 'utils/imageUtils';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Divider } from "@mui/material";
import {Paper } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';


const UserViewAccount = ({ staff,  staffID, setRefetch }) => {
  const [staffDeleteModelOpen, setStaffDeleteModelOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const { getInstituteId } = useInstitute();
  const instituteId = getInstituteId();

  const handleDelete = () => {
    setStaffDeleteModelOpen(true);
  };
  
  const Navigate = useNavigate();
  const handleStaffDelete = async () => {
    const data = { id: staffID,
      instituteId,
      branchid: selectedBranchId,

     };
    const result = await deleteTeachingStaff(data);

    if (result.success) {
      toast.success(result.message);
      Navigate(-1);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  if (staff) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent sx={{ pb: 4 }}>
              <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase',fontWeight:"700",fontSize:"20px"  ,  background: "linear-gradient(to right, #8B5CF6, #6366F1)",
        color: "white", borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        padding: "16px" ,mt:-3,ml:-3,mr:-3}}>
               
              <AccountCircleOutlinedIcon sx={{ marginRight: 1,marginBottom:"-5px" }} />
               User Details
              </Typography>
              <Box sx={{ pt: 4 }}>
              <Typography variant="h6"  color="text.primary" sx={{fontSize:"20px",fontWeight:"500"}}>
        Personal Information
      </Typography>
      <Grid item xs={12} >
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "white", 
          boxShadow: "none", 
          border: "none",
        }}
      >
        
       
        <Grid container spacing={2} >
          {[
            { label: "Username", value: staff?.full_name, icon: "mdi:account" },
            { label: "Email", value: staff?.email, icon: "mdi:email" },
            { label: "Role", value: staff?.userDetail?.designation, icon: "mdi:briefcase" },
            { label: "Gender", value: staff?.gender,icon: "mdi:gender-male"},
            { label: "Date of Birth", value: staff?.dob, icon: "mdi:calendar" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
               sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(123, 97, 255, 0.08)", 
                transition: "background 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(123, 97, 255, 0.2)", 
                },
              }}
              
              >
                <Icon icon={item.icon} fontSize={20} style={{ marginRight: 10, color: "#7B61FF" }} />
                <Box>
                  <Typography sx={{ fontWeight: 500, color: "grey" }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ color: "text.primary" }}>
                    {item.value || "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
    <Box my={2} sx={{color:"grey"}}> 
  <Divider />
</Box>
 
<Typography variant="h6"  color="text.primary" sx={{fontSize:"20px",fontWeight:"500"}}>
       Contact Information
      </Typography>
      <Grid item xs={12}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "white", 
          boxShadow: "none", 
          border: "none",
        }}
      >
             <Grid container spacing={2} >
          {[
            { label: "Primary Number", value: staff?.contact_info?.phone_number, icon: "mdi:phone"},
            { label: "Alternative Number", value:staff?.contact_info?.alternate_phone_number, icon: "mdi:phone" },
            
          ].map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
               sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(123, 97, 255, 0.08)", 
                transition: "background 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(123, 97, 255, 0.2)", 
                },
              }}
              
              >
                <Icon icon={item.icon} fontSize={20} style={{ marginRight: 10, color: "#7B61FF" }} />
                <Box>
                  <Typography sx={{ fontWeight: 500, color: "grey" }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ color: "text.primary" }}>
                    {item.value || "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
          </Grid>
          </Paper>
          </Grid>
          <Box my={2} sx={{color:"grey"}}> 
  <Divider />
</Box>            
<Typography variant="h6"  color="text.primary" sx={{fontSize:"20px",fontWeight:"500"}}>
       Additional Information
      </Typography> 
      <Grid item xs={12}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "white", 
          boxShadow: "none", 
          border: "none",
        }}
      >
             <Grid container spacing={2} >
          {[
            { label: "Qualification", value:staff?.qualification, icon: "mdi:school",
              
            
            },
            { 
              label: "Address", 
              value: (
                <>
                  <Typography sx={{ color: "text.primary" }}>{staff?.contact_info?.address1}</Typography>
                  <Typography sx={{ color: "text.primary" }}>{staff?.contact_info?.address2}</Typography>
                  <Typography sx={{ color: "text.primary" }}>{staff?.contact_info?.city}</Typography>
                </>
              
              )
              , icon: "mdi:map-marker"

            }
            
            
            
            
          ].map((item, index) => (
            <Grid item xs={12} sm={12} key={index}>
              <Paper
               sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(123, 97, 255, 0.08)", 
                transition: "background 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(123, 97, 255, 0.2)", 
                },
              }}
              
              >
                <Icon icon={item.icon} fontSize={20} style={{ marginRight: 10, color: "#7B61FF" }} />
                <Box>
                  <Typography sx={{ fontWeight: 500, color: "grey" }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ color: "text.primary" }}>
                    {item.value || "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
          </Grid>
          </Paper>
          </Grid>   
                
              
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <Box
                component={Link}
                to={`teaching-staffs/${staff?.uuid}/edit`}
                state={{ staff: staff, id: staff?.uuid }}
                
              >
                <Button variant="contained" 
                 sx={{
                  mr: 2, 
                  width: 100,
                  flex: 1,
                  px:2,
                  background: "linear-gradient(to right, #8B5CF6, #6366F1)", 
                  "&:hover": { background: "linear-gradient(to right, #7C3AED, #4F46E5)" }
                }}>
                  Edit
                </Button>
              </Box>
              <Box>
                <Button color="error" variant="tonal" sx={{ mr: 2, width: 100 }} onClick={() => handleDelete(staff?.uuid)}>
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

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {staff?.userDetail?.course?.map((course, index) => (
              <Grid item key={index} xs={12} md={6}>
                <Card sx={{ mb: 2 }}>
                  <CardContent sx={{ pb: 0 }}>
                    <CardMedia
                      sx={{ position: 'relative', height: '12.5625rem', borderRadius: '5px', objectFit: 'contain' }}
                      image={getImageUrl(course?.image)}
                    >
                      <CustomChip
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          zIndex: 1,
                          '&.MuiChip-root.MuiChip-rounded': {
                            borderRadius: '0px 4px 0px 10px',
                            height: '2rem'
                          }
                        }}
                        label={course?.class_type?.[0]}
                        rounded
                        color={
                          course?.class_type?.[0] === 'online'
                            ? 'success'
                            : course?.class_type?.[0] === 'offline'
                            ? 'primary'
                            : course?.class_type?.[0] === 'hybrid'
                            ? 'secondary'
                            : 'warning'
                        }
                        size="small"
                        variant="contained"
                      />
                    </CardMedia>
                  </CardContent>
                  <CardContent>
                    <Box>
                      <CustomChip
                        skin="light"
                        label={course?.category?.category_name}
                        rounded
                        color="secondary"
                        size="small"
                        variant="outlined"
                        sx={{ px: 0.5, py: 2 }}
                      />
                    </Box>
                    <Box sx={{ mr: 2, mt: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h4">{course?.course_name}</Typography>
                      <Typography variant="body2" sx={{ fontSize: '13px', pt: 0.7, fontWeight: '400', opacity: 0.9 }}>
                        {course?.overview}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Grid
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          '& svg': { color: 'primary.main', mr: 0.5, ml: 0.5 }
                        }}
                      >
                        <Icon icon="tabler:augmented-reality" fontSize={20} />
                        <Typography sx={{ color: 'text.secondary' }}>
                          <span style={{ fontWeight: 'bold', fontSize: 18, marginRight: 2 }}> {course?.coursemodules?.length}</span>
                          Modules
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="h4" sx={{ color: 'text.secondary', mr: 1 }}>
                          ₹ {course?.price}
                        </Typography>
                      </Grid>
                    </Box>
                  </CardContent>
                  <CardActions
                    className="demo-space-x"
                    sx={{ pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box>
                      <CustomChip
                        skin="light"
                        sx={{ px: 2, py: 2.3 }}
                        label={course?.is_active ? 'Active' : 'Inactive'}
                        rounded
                        color={course?.is_active ? 'success' : 'error'}
                        size="medium"
                      />
                    </Box>
                    <Button component={Link} state={{ id : course?.uuid }} to="/course-management/courses/view " size="medium" variant="contained" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

UserViewAccount.propTypes = {
  staff: PropTypes.any,
  staffID: PropTypes.any,
  setRefetch: PropTypes.any
};

export default UserViewAccount;

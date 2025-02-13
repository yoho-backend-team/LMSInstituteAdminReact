import { useState, useEffect } from 'react';
import {TextField,Grid,MenuItem,Box,Button,Card, CardContent,Pagination, Typography} from '@mui/material';
import StaffManagement from 'components/cards/Skeleton/StaffManagement';
import StatusChangeDialog from 'components/modal/DeleteModel';
import Avatar from 'components/mui/avatar';
import TeacherFilter from 'features/staff-management/teaching-staffs/components/TeacherFilterCard';
import {
  selectLoading,
  selectTeachingStaffs,
} from 'features/staff-management/teaching-staffs/redux/teachingStaffSelectors';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import { staffStatusChange } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useInstitute } from 'utils/get-institute-details';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';

import FilterListIcon from '@mui/icons-material/FilterList';
import EmailIcon from '@mui/icons-material/Email';
import { green } from '@mui/material/colors';
import { Divider } from '@mui/material';
import { fontSize, fontWeight } from '@mui/system';




const Teaching = () => {
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});
  const [page, setPage] = useState(1);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const teachingStaffs = useSelector(selectTeachingStaffs);
  const loading = useSelector(selectLoading);
  const [refetch, setRefetch] = useState({});
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      page: '1',
      branchid: selectedBranchId,
      instituteId: useInstitute().getInstituteId(),
    };
    dispatch(getAllTeachingStaffs(data));
  }, [dispatch, selectedBranchId, refetch]);

  const handleStatusValue = (event, staff) => {
    setStatusValue(staff);
    setStatusChangeDialogOpen(true);
  };

  const handleStatusChangeApi = async () => {
    try {
      if (!statusValue || !statusValue.uuid) {
        console.error('Status value or UUID is undefined');
        return;
      }

      const data = {
        is_active: !statusValue.is_active,
        staff: statusValue?.uuid,
      };

      const response = await staffStatusChange(data);

      if (response.success) {
        toast.success(response.message);
        setRefetch((state) => !state);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error in status change:', error);
    }
  };

  return (
    <Box sx={{ position: 'relative',  }}>
      {/* Toggle Filter Button */}
      <Box 
  sx={{
    position: 'relative',
    left: '10px',
    display: "flex",
    justifyContent: "space-between",
   
     
    
   
  }}
>
  <Grid>
  <Button
    variant="contained"
    onClick={() => setFilterVisible((prev) => !prev)}
    startIcon={<FilterListIcon />}
    sx={{mr:1}}
   
  >
    {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
  

  </Button>
  <span style={{fontSize:"20px",fontWeight:"500"}}>Teaching Staff</span>
  </Grid>

  <Box component={Link} to={'teaching-staffs/add'} sx={{ p: 0, m: 0 }}>
    <Button
      variant="contained"
      size="medium"
      fullWidth
      sx={{
       
        borderRadius: '0.5rem',
        backgroundColor: "#0CCE7F",
        ":hover": { backgroundColor: "#0AA865" }
      }}
    >
      Add New Staff
    </Button>
  </Box>
</Box>


      {/* Filter Overlay */}
      {isFilterVisible && (
        <Box
          sx={{
            position: 'relative',
           
            left: 0,
            width: '100%',
            height: '100%',
           
            padding: 2,
          }}
        >
          <TeacherFilter selectedBranchId={selectedBranchId} />
        </Box>
      )}

      {/* Cards and Pagination */}
      {loading ? (
        <StaffManagement />
      ) : (
        <Grid container spacing={2}>
          {teachingStaffs &&
            teachingStaffs.data?.map((item, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} >
               
                <Card
                  sx={{
                   top:10,
                    position: 'relative',
                    boxShadow: 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    
                  
                   
                  }}
                >
                  
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: 'linear-gradient(145deg,rgb(236, 236, 236) 0%,rgb(148, 150, 153) 100%)',
                      backdropFilter: 'blur(4px)',
                      backgroundColor: '#E5E7EB',

                     backgroundColor: "grey.200"
                      
                    }}
                  >
              

<Box sx={{ position: 'relative',pt:3 }}>
  <Avatar
    src={item?.image ? getImageUrl(item?.image) : profilePlaceholder}
    sx={{
      mb: 2,
      width: 80,
      height: 80,
      border: '2px solid grey',
    }}
  />
  {/* Conditionally render the green dot */}
  {item?.is_active ? ( // Check if the user is active
    <Box
      sx={{
        position: 'absolute',
        bottom: 20,
        
        right: 5,
        width: 12,
        height: 12,
        backgroundColor: green[500],
        borderRadius: '50%',
        border: '2px solid white',
      }}
    />
  ) : null}
</Box>
</CardContent>
<CardContent>
<Box sx={{display:"flex",justifyContent:"center",alignContent:"center"}}>
<Typography variant="h6" sx={{ mb: 1, fontWeight: 600, }}>
 {item.fullname}
  </Typography>
 <Typography
  variant="h5"
  color="textSecondary"
  sx={{
    display: 'inline-flex',   
    alignItems: 'center',     
    mb: 2,
   
  }}
>
  <EmailIcon sx={{ mr: 1, color:"grey" }} />  
  {item?.email}
</Typography>
</Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                      }}
                    >
                      <Box 
                      sx={{
                        display: 'flex',
                        ml:2,
                        mb:-2,
                        alignItems: 'start',
                       fontFamily:"sans-serif",
                        width: '100%',
                        color:"black"
                      }}>
                        Status
                      </Box>
                      <TextField
  size="small"
  select
  SelectProps={{
    value: item?.is_active,
    onChange: (e) => handleStatusValue(e, item),
  }}
  sx={{
    width: '40%',
    mr:23,
    borderRadius: '10px',
    backgroundColor: '#22c55e', 
    transition: 'all 0.3s ease', 

   
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px', 
      '& fieldset': {
        borderColor: '#d1d5db', 
      },
      '&:hover fieldset': {
        borderColor: '#d1d5db', 
      },
      '&.Mui-focused fieldset': {
        borderColor: '#d1d5db', 
        borderWidth: '2px', 
      },
    },

  
    '& .MuiSelect-icon': {
      color: 'white', 
    },

   
    '& .MuiMenu-paper': {
      marginTop: '8px', 
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
    },
  }}
>
  <MenuItem
    value={true}
    sx={{
      color: '#22c55e', // Green color for "Active"
      fontWeight: '500', // Slightly bold
      '&:hover': {
        backgroundColor: '#f0fdf4', // Light green background on hover
      },
    }}
  >
    Active
  </MenuItem>
  <MenuItem
    value={false}
    sx={{
      color: '#ef4444', // Red color for "Inactive"
      fontWeight: '500', // Slightly bold
      '&:hover': {
        backgroundColor: '#fef2f2', // Light red background on hover
      },
    }}
  >
    Inactive
  </MenuItem>
</TextField>

<Button
  component={Link}
  to={`teaching-staffs/${item?.uuid.toString()}`}
  state={{ id: item?.uuid }}
  variant="contained"
  size="small"
  sx={{
    width: '100%',
    backgroundColor: "grey",
    padding: 1.2,
    borderRadius: "10px",
    '&:hover': {
      backgroundColor: "#000000", 
    }
  }}
>
  View Profile
</Button>

                    </Box>
                </CardContent>
                </Card>
              
              </Grid>
            ))}
        </Grid>
      )}

      {teachingStaffs?.last_page !== 1 && (
        <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={teachingStaffs?.last_page}
            page={page}
            color="primary"
            onChange={(e, page) => {
              setPage(page);
              dispatch(
                getAllTeachingStaffs({
                  branchid: selectedBranchId,
                  page: page,
                  instituteId: useInstitute().getInstituteId(),
                })
              );
            }}
          />
        </Grid>
        
      )}

      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change the Status?"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />
    </Box>
  );
};

export default Teaching;

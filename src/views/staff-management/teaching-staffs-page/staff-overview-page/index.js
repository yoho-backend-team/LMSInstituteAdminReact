import { useState, useEffect } from 'react';
import {TextField,Grid,MenuItem,Box,Button,Card, CardContent,Pagination, Typography,} from '@mui/material';
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
      <Box   sx={{
          position: 'absolute', 
          top: '10px', 
          left: '10px',
          zIndex:20 
           
        }}>
        <Button
          variant="contained"
          onClick={() => setFilterVisible((prev) => !prev)}
        >
          {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
        </Button>
      </Box>

      {/* Filter Overlay */}
      {isFilterVisible && (
        <Box
          sx={{
            position: 'absolute',
            top: 50,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.9)',
            zIndex: 10,
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
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    top:50,
                    position: 'relative',
                    boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 .5rem 1.5rem 0 rgba(38,43,67,.3)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      pt: 3,
                    }}
                  >
                    <Avatar
                      src={item?.image ? getImageUrl(item?.image) : profilePlaceholder}
                      sx={{
                        mb: 2,
                        width: 80,
                        height: 80,
                        border: '2px solid #1976d2',
                      }}
                    />
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {item.fullname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {item?.email}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                      }}
                    >
                      <TextField
                        size="small"
                        select
                        label="Status"
                        SelectProps={{
                          value: item?.is_active,
                          onChange: (e) => handleStatusValue(e, item),
                        }}
                        sx={{ width: '50%' }}
                      >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                      </TextField>
                      <Button
                        component={Link}
                        to={`teaching-staffs/${item?.uuid.toString()}`}
                        state={{ id: item?.uuid }}
                        variant="contained"
                        size="small"
                        sx={{ width: '100%' }}
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

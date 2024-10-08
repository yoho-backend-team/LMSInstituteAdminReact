import { Avatar as CustomAvatar } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IdCardSkeleton from 'components/cards/Skeleton/IdCardSkeleton';
import StatusChangeDialog from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import StudentFilterCard from 'features/id-card-management/student-id-cards/components/StudentFilterCard';
import { selectLoading, selectStudentIdCards } from 'features/id-card-management/student-id-cards/redux/studentIdcardSelectors';
import { getAllStudentIdCards } from 'features/id-card-management/student-id-cards/redux/studentIdcardThunks';
import { updateStudentIdCardStatus } from 'features/id-card-management/student-id-cards/services/studentIdcardServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials } from 'utils/get-initials';
import { useInstitute } from 'utils/get-institute-details';

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
};

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

const StudentIdCard = () => {
  const dispatch = useDispatch();
  const StudentIdCards = useSelector(selectStudentIdCards);
  const StudentIdCardsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [studentIdRefetch, setStudentIdRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllStudentIdCards({ branchid: selectedBranchId, instituteid: useInstitute().getInstituteId(), page: '1' }));
  }, [dispatch, selectedBranchId, studentIdRefetch]);

  const [flipped, setFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterstatusValue, setFilterStatusValue] = useState('');


  const handleStatusChangeApi = async () => {
    const data = {
      is_active: statusValue?.is_active === true ? false : true,
    };
    const response = await updateStudentIdCardStatus(statusValue.uuid, data); 
  
    if (response.success) {
      toast.success(response.message);
      setStudentIdRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, student) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(student);
  };

  const flip = (index) => {
    setFlippedIndex(index);
    setFlipped(!flipped);
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudentIdCards({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  const handleFilterByStatus = (e) => {
    setFilterStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStudentIdCards(data));
  };


  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <StudentFilterCard
            selectedBranchId={selectedBranchId}
            searchValue={searchValue}
            handleSearch={handleSearch}
            filterstatusValue={filterstatusValue}
            handleFilterByStatus={handleFilterByStatus}
          />
        </Grid>
        <Grid item xs={12}>
          {StudentIdCardsLoading ? (
            <IdCardSkeleton />
          ) : (
            <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
              {StudentIdCards?.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 450,
                    display: 'block'
                  }}
                >
                  <Grid
                    onMouseEnter={() => flip(index)}
                    onMouseLeave={() => flip(null)}
                    className={`${index === flippedIndex ? 'flipped' : ''}`}
                    sx={{
                      position: 'relative',
                      '&.flipped': {
                        '.front': {
                          transform: 'rotateY(180deg)'
                        },
                        '.back': {
                          transform: 'rotateY(0deg)'
                        }
                      },
                      '.front, .back': {
                        position: 'absolute',
                        backfaceVisibility: 'hidden',
                        transition: 'transform ease 500ms'
                      },
                      '.front': {
                        transform: 'rotateY(0deg)'
                      },
                      '.back': {
                        transform: 'rotateY(-180deg)'
                      }
                    }}
                  >
                    <Card className="front" sx={{ width: '100%', minHeight: 435, boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}>
                      <CardContent sx={{ pt: 6.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {item.image ? (
                          <CustomAvatar
                            src={item.image}
                            alt={item.name}
                            variant="light"
                            sx={{ width: 100, height: 100, mb: 3, border: `4px solid ${roleColors.subscriber}` }}
                          />
                        ) : (
                          <CustomAvatar skin="light" color={statusColors.active} sx={{ width: 100, height: 100, mb: 3, fontSize: '3rem' }}>
                            {getInitials(item.name)}
                          </CustomAvatar>
                        )}
                        <Typography variant="h4" sx={{ mb: 2 }}>
                          {item.name} 
                        </Typography>
                        <CustomChip rounded skin="light" size="small" label={`${item.email}`} color={statusColors.active} />
                        <Box mt={3}>
                          <img
                            style={{ borderRadius: '10px' }}
                            height={100}
                            src={item.qr_code}
                            alt="qrCode"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                    <Card className="back" sx={{ width: '100%', minHeight: 435 }}>
                      <CardContent sx={{ pb: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                          Details
                        </Typography>
                        <Box sx={{ pt: 2 }}>
                          <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                              {item.name} 
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{item.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{item.role.identity}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}> ID:</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{item.roll_no}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{item.contact}</Typography>
                          </Box>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                            <Typography
                              sx={{
                                color: 'text.secondary',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {item.address}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                          <TextField
                            size="small"
                            select
                            width={100}
                            label="Status"
                            SelectProps={{ value: item?.is_active, onChange: (e) => handleStatusValue(e, item) }}
                          >
                            <MenuItem value="true">Active</MenuItem>
                            <MenuItem value="false">Inactive</MenuItem>
                          </TextField>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        {StudentIdCards?.last_page !== 1 && (
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={StudentIdCards?.last_page}
              color="primary"
              onChange={(e, page) => {
                dispatch(getAllStudentIdCards({ branch_id: selectedBranchId, page: page }));
              }}
            />
          </Grid>
        )}
      </Grid>

      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change Status"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />
    </>
  );
};

export default StudentIdCard;

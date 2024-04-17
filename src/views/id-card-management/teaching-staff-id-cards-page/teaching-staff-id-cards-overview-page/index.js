import { Box, Avatar as CustomAvatar, Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import IdCardSkeleton from 'components/cards/Skeleton/IdCardSkeleton';
import StatusChangeDialog from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import StaffFilterCard from 'features/id-card-management/staff-id-cards/components/StaffFilterCard';
import { selectLoading, selectStaffIdCards } from 'features/id-card-management/staff-id-cards/redux/staffIdcardSelectors';
import { getAllStaffIdCards } from 'features/id-card-management/staff-id-cards/redux/staffIdcardThunks';
import { updateStaffIdCardStatus } from 'features/id-card-management/staff-id-cards/services/staffIdcardServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials } from 'utils/get-initials';

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

const TeachingIdCard = () => {
  const dispatch = useDispatch();
  const StaffIdCards = useSelector(selectStaffIdCards);
  const StaffIdCardsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [staffIdRefetch, setStaffIdRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllStaffIdCards({ branch_id: selectedBranchId, page: '1' }));
  }, [dispatch, selectedBranchId, staffIdRefetch]);

  const [flipped, setFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterstatusValue, setFilterStatusValue] = useState('');

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      staff_id: statusValue?.staff?.staff_id
    };
    const response = await updateStaffIdCardStatus(data);
    if (response.success) {
      toast.success(response.message);
      setStaffIdRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, staff) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(staff);
  };

  const flip = (index) => {
    setFlippedIndex(index);
    setFlipped(!flipped);
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStaffIdCards({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  const handleFilterByStatus = (e) => {
    setFilterStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStaffIdCards(data));
  };

  return (
    <>
      <Grid>
        <Grid container spacing={1} className="match-height">
          <Grid item xs={12} sm={12}>
            <StaffFilterCard
              selectedBranchId={selectedBranchId}
              searchValue={searchValue}
              handleSearch={handleSearch}
              filterstatusValue={filterstatusValue}
              handleFilterByStatus={handleFilterByStatus}
              setStaffIdRefetch={setStaffIdRefetch}
            />
          </Grid>
          <Grid item xs={12}>
            {StaffIdCardsLoading ? (
              <IdCardSkeleton />
            ) : (
              <Grid>
                <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
                  {StaffIdCards?.data?.map((item, index) => (
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
                        <Card className="front" sx={{ width: '100%', minHeight: 435 }}>
                          <CardContent sx={{ pt: 6.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            {item.staff.image ? (
                              <CustomAvatar
                                src={item.staff.image}
                                alt={item.staff.first_name}
                                variant="light"
                                sx={{ width: 100, height: 100, mb: 3, border: `4px solid ${roleColors.subscriber}` }}
                              />
                            ) : (
                              <CustomAvatar
                                skin="light"
                                color={statusColors.active}
                                sx={{ width: 100, height: 100, mb: 3, fontSize: '3rem' }}
                              >
                                {getInitials(item.staff.first_name)}
                              </CustomAvatar>
                            )}
                            <Typography variant="h4" sx={{ mb: 2 }}>
                              {item.staff.staff_name}
                            </Typography>
                            <CustomChip rounded skin="light" size="small" label={`${item.staff.email}`} color={statusColors.active} />
                            <Box mt={3}>
                              <img
                                style={{ borderRadius: '10px' }}
                                height={100}
                                src="https://static.vecteezy.com/system/resources/previews/000/406/024/original/vector-qr-code-illustration.jpg"
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
                                  {item.staff.first_name} {item.staff.last_name}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{item.staff.email}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>staff</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}> ID:</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{item.staff.staff_id}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{item.staff.phone_no}</Typography>
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
                                  {item.staff.address_line_1}, {item.staff.address_line_2}, {item.staff.city}, {item.staff.state},{' '}
                                  {item.staff.pincode},
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
                                <MenuItem value="1">Active</MenuItem>
                                <MenuItem value="0">Inactive</MenuItem>
                              </TextField>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            {StaffIdCards?.last_page !== 1 && (
              <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                  count={StaffIdCards?.last_page}
                  color="primary"
                  onChange={(e, page) => {
                    dispatch(getAllStaffIdCards({ branch_id: selectedBranchId, page: page }));
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
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

export default TeachingIdCard;

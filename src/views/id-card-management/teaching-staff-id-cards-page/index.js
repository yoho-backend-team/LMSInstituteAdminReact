import { useCallback, useEffect, useState } from 'react';
// ** MUI Imports
import { Box, Grid, TextField } from '@mui/material';
// import Card from '@mui/material/Card';
import { Avatar as CustomAvatar } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import IdCardSkeleton from 'components/cards/Skeleton/IdCardSkeleton';
import CustomChip from 'components/mui/chip';
import StaffFilterCard from 'features/id-card-management/staff-id-cards/components/StaffFilterCard';

import { getAllStaffIdCards } from 'features/id-card-management/staff-id-cards/redux/staffIdcardThunks';
import { useDispatch, useSelector } from 'react-redux';

import StatusChangeDialog from 'components/modal/DeleteModel';
import { selectLoading, selectStaffIdCards } from 'features/id-card-management/staff-id-cards/redux/staffIdcardSelectors';
import { updateStaffIdCardStatus } from 'features/id-card-management/staff-id-cards/services/staffIdcardServices';
import toast from 'react-hot-toast';
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

  console.log('id cards', StaffIdCards);

  useEffect(() => {
    dispatch(getAllStaffIdCards({ branch_id: selectedBranchId }));
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
      // id: statusValue?.id,
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

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStaffIdCards({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  const handleFilterByStatus = (e) => {
    setFilterStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStaffIdCards(data));
  };

  // const data = [
  //   {
  //     id: 1,
  //     role: 'admin',
  //     status: 'active',
  //     username: 'mdthasthakir',
  //     country: 'El Salvador',
  //     company: 'Yotz PVT LTD',
  //     billing: 'Manual - Cash',
  //     contact: '(479) 232-9151',
  //     currentPlan: 'enterprise',
  //     fullName: 'Mohammed Thasthakir',
  //     email: 'gslixby0@abc.net.au',
  //     avatar: 'https://weassist.io/wp-content/uploads/2022/11/Avatar-11-1.png'
  //   },
  //   {
  //     id: 2,
  //     role: 'user',
  //     status: 'inactive',
  //     username: 'johndoe123',
  //     country: 'United States',
  //     company: 'Tech Solutions Inc.',
  //     billing: 'Credit Card',
  //     contact: '(123) 456-7890',
  //     currentPlan: 'basic',
  //     fullName: 'John Doe',
  //     email: 'johndoe@example.com',
  //     avatar: 'https://example.com/avatar2.png'
  //   },
  //   {
  //     id: 3,
  //     role: 'manager',
  //     status: 'active',
  //     username: 'manager123',
  //     country: 'United Kingdom',
  //     company: 'ABC Corporation',
  //     billing: 'PayPal',
  //     contact: '(987) 654-3210',
  //     currentPlan: 'premium',
  //     fullName: 'Emma Johnson',
  //     email: 'emma@example.com',
  //     avatar: 'https://example.com/avatar3.png'
  //   },
  //   {
  //     id: 4,
  //     role: 'user',
  //     status: 'active',
  //     username: 'jsmith',
  //     country: 'Canada',
  //     company: 'XYZ Ltd.',
  //     billing: 'Automatic - Credit Card',
  //     contact: '(567) 890-1234',
  //     currentPlan: 'standard',
  //     fullName: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //     avatar: 'https://example.com/avatar4.png'
  //   },
  //   {
  //     id: 5,
  //     role: 'admin',
  //     status: 'active',
  //     username: 'adminuser',
  //     country: 'Australia',
  //     company: 'Acme Corp',
  //     billing: 'Automatic - Bank Transfer',
  //     contact: '(111) 222-3333',
  //     currentPlan: 'enterprise',
  //     fullName: 'Admin User',
  //     email: 'admin@example.com',
  //     avatar: 'https://example.com/avatar5.png'
  //   },
  //   {
  //     id: 6,
  //     role: 'manager',
  //     status: 'inactive',
  //     username: 'manager456',
  //     country: 'France',
  //     company: 'Tech Innovations',
  //     billing: 'Manual - Check',
  //     contact: '(444) 555-6666',
  //     currentPlan: 'premium',
  //     fullName: 'Louis Dupont',
  //     email: 'louis@example.com',
  //     avatar: 'https://example.com/avatar6.png'
  //   }
  // ];
  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
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
          {StaffIdCardsLoading ? (
            <IdCardSkeleton />
          ) : (
            <Grid>
              <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
                {StaffIdCards.map((item, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={3}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 440,
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
                      <Card className="front" sx={{ width: '100%', minHeight: 420 }}>
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
                      <Card className="back" sx={{ width: '100%', minHeight: 420 }}>
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
                                  // my: 4,
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
              <Grid container justifyContent="flex-end" mt={2}>
                <div className="demo-space-y">
                  <Pagination count={10} color="primary" />
                </div>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Status Change Modal */}
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

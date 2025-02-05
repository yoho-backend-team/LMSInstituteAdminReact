import { Box, Button, CardMedia, Avatar as CustomAvatar, Grid, TextField } from '@mui/material';
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
import { useInstitute } from 'utils/get-institute-details';
import generateStaffIDCardPDF from 'utils/id-generator';
import { getImageUrl } from 'utils/imageUtils';

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
    dispatch(getAllStaffIdCards({ branchid: selectedBranchId, instituteid: useInstitute().getInstituteId(), page: '1' }));
  }, [dispatch, selectedBranchId, staffIdRefetch]);

  const [flipped, setFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterstatusValue, setFilterStatusValue] = useState('');

  const handleStatusChangeApi = async () => {
    const data = {
      is_active: statusValue?.is_active === true ? false : true
    };

    const response = await updateStaffIdCardStatus(statusValue.uuid, data);

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

  console.log(StaffIdCards);
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
                      sm={4}
                      lg={3}
                      // xl={2}
                      
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
                        <Card className="front" sx={{ width: '100%', minHeight: 410,boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}>
                            <Card
                          sx={{
                            width: '100%',
                            minHeight: 410,
                            borderRadius: 3,
                            boxShadow: 3,
                            padding: 2,
                            paddingRight: 0,
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            display: 'flex',
                            position: 'relative', // Required for absolute positioning of pseudo-element
                            overflow: 'hidden' // Ensures pseudo-element stays within card boundaries
                          }}
                        >
                          {/* Background Image with Opacity */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              backgroundImage: `url('https://png.pngtree.com/background/20210714/original/pngtree-blue-business-atmosphere-line-board-background-material-picture-image_1216242.jpg')`, // Replace with your image URL
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              opacity: 0.8 // Adjust opacity level (0.1 to 1)
                              // Keeps it behind content
                            }}
                          />

                          {/* Sidebar */}
                          {/* <Box sx={{ backgroundColor: '#28a745', width: 20, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }} /> */}

                          {/* Main Content */}
                          <Box sx={{ flex: 1, padding: 2, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                              <CustomAvatar
                                sx={{ width: 90, height: 90, bgcolor: '#ffffff', border: '4px solid #28a745' }}
                                src={getImageUrl(item?.image)}
                                alt="Profile Picture"
                              />
                            </Box>
                            <Typography variant="h3" fontWeight="bold" sx={{ color: '#000', textAlign: 'center' }}>
                              <span style={{ color: '#28a745' }}>{item.name} </span>
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" textAlign="center">
                              {item.role.identity}
                            </Typography>
                            <Box sx={{ alignContent:'center', paddingTop: 2, display: 'grid', gap: 0.5, gridTemplateColumns: 'auto 1fr' }}>
                              <Typography variant="body2" sx={{ color: '#000' }}>
                                <b>ID No:</b>
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#000' }}>
                                {item.staff_id}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#000' }}>
                                <b>Username:</b>
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#000' }}>
                              {item.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#000' }}>
                                <b>Email:</b>
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#000' }}>
                                {item.email}{' '}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#000' }}>
                                <b>Phone:</b>
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#000' }}>
                                {item.contact}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  d="M2 6h1v12H2zm2 0h2v12H4zm4 0h1v12H8zm2 0h3v12h-3zm4 0h1v12h-1zm3 0h1v12h-1zm2 0h1v12h-1zm2 0h1v12h-1z"
                                />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  d="M2 6h1v12H2zm2 0h2v12H4zm4 0h1v12H8zm2 0h3v12h-3zm4 0h1v12h-1zm3 0h1v12h-1zm2 0h1v12h-1zm2 0h1v12h-1z"
                                />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  d="M2 6h1v12H2zm2 0h2v12H4zm4 0h1v12H8zm2 0h3v12h-3zm4 0h1v12h-1zm3 0h1v12h-1zm2 0h1v12h-1zm2 0h1v12h-1z"
                                />
                              </svg>
                            </Box>
                          </Box>
                        </Card>
                          </Card>
                        <Card className="back" sx={{ width: '100%', minHeight: 410 ,position: 'relative',}}>
                           {/* Background Image with Opacity */}
                           <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              backgroundImage: `url('https://png.pngtree.com/background/20210714/original/pngtree-blue-business-atmosphere-line-board-background-material-picture-image_1216242.jpg')`, // Replace with your image URL
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              opacity: 0.4 // Adjust opacity level (0.1 to 1)
                              // Keeps it behind content
                            }}
                          />
                          <CardContent sx={{ pt: 2 , position: 'relative', zIndex: 1}}>
                            <Typography variant="h3" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                              Details
                            </Typography>
                            <Box sx={{ pt: 2 }}>
                              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', width: '70px' }}>Username:</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{item.name}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', width: '70px' }}>Email:</Typography>
                                <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {item.email}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', width: '70px' }}>Role:</Typography>
                                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{item.role.identity}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', width: '70px' }}> ID:</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{item.staff_id}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', width: '70px' }}>Contact:</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{item.contact}</Typography>
                              </Box>

                              <Box sx={{ display: 'flex', textOverflow: 'ellipsis', overflow: 'hidden', textWrap: 'nowrap' }}>
                                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', width: '70px' }}>Address:</Typography>
                                <Box>
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
                                    {item?.address?.address_line_one},
                                  </Typography>
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
                                    {item?.address?.address_line_two},
                                  </Typography>
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
                                    {item?.address?.city}
                                  </Typography>
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
                                    {item?.address?.state} - {item?.address?.pin_code}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                              <Button variant="contained" onClick={() => generateStaffIDCardPDF(item)}>
                                Download
                              </Button>
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

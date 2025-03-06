// import styled from '@emotion/styled';
import { Avatar, Box, Card, Grid, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import StudentSkeleton from 'components/cards/Skeleton/StudentSkeleton';
import CustomChip from 'components/mui/chip';
import SocialsButton from 'features/student-management/students/components/SocialButton';
import StudentFilter from 'features/student-management/students/components/studentFilterCard';
import { selectLoading, selectStudents } from 'features/student-management/students/redux/studentSelectors';
import { getAllStudents } from 'features/student-management/students/redux/studentThunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImageUrl } from 'utils/imageUtils';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Students = () => {
  const dispatch = useDispatch();
  const Students = useSelector(selectStudents);
  const StudentsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    dispatch(getAllStudents({ branch_id: selectedBranchId, page: '1' }));
  }, [dispatch, selectedBranchId]);

  const formattedAddress = (address) => {
    const words = address.replace(/[^\w\s]/g, '').split(/\s+/);
    if (words.length > 6) {
      return words.slice(0, 7).join(' ') + '...';
    } else {
      return address;
    }
  };

  return (
    <>
      <Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12} mb={2}>
            <StudentFilter selectedBranchId={selectedBranchId} />
          </Grid>

          <Grid item xs={12} md={12} lg={12} mb={2}>
            {StudentsLoading ? (
              <StudentSkeleton />
            ) : (
              <Box>
                <Grid container spacing={12}>
                  {Students?.map((item, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                      {/* <Card sx={{ backgroundColor: 'primary.dark', pb: 1, boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}> */}
                      <Card
                        sx={{
                          textAlign: 'center',
                          height: '120%',
                          borderRadius: '15px',
                          width: '100%',
                          maxWidth: 400,
                          mx: 'auto',
                          overflow: 'hidden',
                          transition: 'all 300ms',
                          boxShadow: 'none',
                          '&:hover': {
                            boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)'
                          },
                          '&:hover:dark': {
                            boxShadow: '0 0.5rem 1rem rgba(255,255,255,0.1)'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            backgroundColor: 'grey.200',
                            paddingTop: '48px',
                            paddingBottom: '32px',
                            height: '40%',
                            background: 'linear-gradient(145deg,rgb(236, 236, 236) 0%,rgb(148, 150, 153) 100%)',
                            backdropFilter: 'blur(4px)',
                            backgroundColor: '#E5E7EB'
                          }}
                        >
                          <Avatar
                            alt="image"
                            src={`${getImageUrl(item?.image)}`}
                            sx={{
                              width: 68,
                              height: 68,
                              zIndex: 11,
                              left: 0,
                              right: 0,
                              bottom: -32,
                              mx: 'auto',
                              position: 'absolute',
                              border: '2px solid',
                              borderColor: 'background.paper',
                              boxShadow: 3
                            }}
                          />

                          <Box
                            sx={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: item?.is_active ? '#22C55E' : '#9CA3AF'
                            }}
                            title={item?.is_active ? 'Active' : 'Inactive'}
                          ></Box>
                        </Box>

                        <Typography variant="h3" sx={{ mt: 6 }}>
                          {capitalizeFirstLetter(item.full_name)}
                        </Typography>

                        <CustomChip
                          // color={item?.student?.is_active === '1' ? 'success' : 'error'}
                          skin="light"
                          label={item.email}
                          sx={{ color: 'grey', mb: 1, mt: 1 }}
                          size="x-small"
                        />

                        <Box sx={{ height: 20, display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                          <LocationOnIcon sx={{ fontSize: 20, mr: 0.2, mt: '-1', cursor: 'default', color: 'black' }} />
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'text.secondary',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              textOverflow: 'ellipsis'
                              // mt: 1.75
                            }}
                          >
                            {formattedAddress(
                              `${item.contact_info.address1}, ${item.contact_info.city},`
                              //  ${item.contact_info.state}, ${item.contact_info.pincode}`   //add state and pincode if required
                            )}
                          </Typography>
                        </Box>

                        <Stack alignItems="center">
                          <SocialsButton initialColor sx={{ my: 2.5 }} item={item} />
                        </Stack>
                      </Card>
                      <Box sx={{ backgroundColor: 'primary.main', borderRadius: ' 0 0 15px 15px', width: '240' }}></Box>
                      {/* </Card>                                            */}
                    </Grid>
                  ))}
                </Grid>

                {Students?.last_page !== 1 && (
                  <Box sx={{ mt: 9, display: 'flex', justifyContent: 'flex-end' }}>
                    <Pagination
                      count={Students?.last_page}
                      color="primary"
                      onChange={(e, page) => {
                        dispatch(getAllStudents({ branch_id: selectedBranchId, page: page }));
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Students;

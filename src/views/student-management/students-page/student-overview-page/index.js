// import styled from '@emotion/styled';
import { Avatar, Box, Card, Grid, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import StudentSkeleton from 'components/cards/Skeleton/StudentSkeleton';
import { selectLoading, selectStudents } from 'features/student-management/students/redux/studentSelectors';
import { getAllStudents } from 'features/student-management/students/redux/studentThunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentFilter from 'features/student-management/students/components/studentFilterCard';
import SocialsButton from 'features/student-management/students/components/SocialButton';
import CustomChip from 'components/mui/chip';
// import cssStyles from 'features/student-management/students/components/cssStyles';
// import Image from 'features/student-management/students/components/image';
// import SvgIconStyle from 'features/student-management/students/components/svgIconStyle';

// const OverlayStyle = styled('div')(({ theme }) => ({
//   ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.main }),
//   top: 0,
//   zIndex: 8,
//   content: "''",
//   width: '100%',
//   height: '100%',
//   position: 'absolute'
// }));

const Students = () => {
  const dispatch = useDispatch();
  const Students = useSelector(selectStudents);
  const StudentsLoading = useSelector(selectLoading);
  // const StudentsLoading = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log('students:',Students);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    dispatch(getAllStudents({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId]);

  const formattedAddress = (address) => {
    // Remove punctuation and split into words
    const words = address.replace(/[^\w\s]/g, '').split(/\s+/);

    // If the word count is more than 7, hide extra words
    if (words.length > 6) {
      return words.slice(0, 7).join(' ') + '...';
    } else {
      return address;
    }
  };

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} mb={2}>
              <StudentFilter selectedBranchId={selectedBranchId} />
            </Grid>

            <Grid item xs={12} md={12} lg={12} mb={2}>
              {StudentsLoading ? (
                <StudentSkeleton />
              ) : (
                <Box>
                  <Grid container spacing={2}>
                    {Students.map((item, index) => (
                      <Grid key={index} item xs={12} sm={6} md={3}>
                        <Card sx={{ backgroundColor: 'primary.dark', pb: 1 }}>
                          <Card sx={{ textAlign: 'center', height: '100%', borderRadius: '0px 0px 15px 15px', boxShadow: 'none' }}>
                            <Box>
                              {/* <SvgIconStyle
                              src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
                              sx={{
                                width: 144,
                                height: 62,
                                zIndex: 10,
                                left: 0,
                                right: 0,
                                bottom: -26,
                                mx: 'auto',
                                position: 'absolute',
                                color: 'background.paper'
                              }}
                            /> */}
                              <Avatar
                                alt="image"
                                src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${item?.student?.image}`}
                                sx={{
                                  width: 68,
                                  height: 68,
                                  zIndex: 11,
                                  left: 0,
                                  right: 0,
                                  bottom: -32,
                                  mx: 'auto'

                                  // position: 'absolute'
                                }}
                              />
                              {/* <OverlayStyle /> */}
                              {/* <Image
                              src="https://i.pinimg.com/originals/52/2c/1a/522c1a4289f2e2d0e29ed59071de9dce.jpg"
                              alt="overlaystyle"
                              ratio="16/9"
                            /> */}
                            </Box>

                            <Typography variant="h3" sx={{ mt: 6 }}>
                              {capitalizeFirstLetter(item.student.first_name)}
                            </Typography>
                            <CustomChip
                              rounded
                              variant="tonal"
                              color={item?.student?.is_active === "1" ? 'success' : 'error'}
                              skin="light"
                              label={item.student.email}
                              sx={{ mb: 1, mt: 1 }}
                              size='x-small'
                            />
                            <Box sx={{ height: 20 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: 'text.secondary',
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  textOverflow: 'ellipsis',
                                  mt: 1.75
                                }}
                              >
                                {formattedAddress(
                                  `${item.student.address_line_1}, ${item.student.city}, ${item.student.state}, ${item.student.pincode}`
                                )}
                              </Typography>
                            </Box>

                            <Stack alignItems="center">
                              <SocialsButton initialColor sx={{ my:2.5 }} item={item} />
                            </Stack>
                          </Card>
                          <Box sx={{ backgroundColor: 'primary.main', borderRadius: ' 0 0 15px 15px', width: '240' }}></Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container justifyContent="flex-end" mt={2}>
                    <Pagination count={10} color="primary" />
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Students;

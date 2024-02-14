import { Box, Card, Divider, Grid, Skeleton, Typography } from '@mui/material';

const DashboardSkeleton = () => {
  const limitedData = Array.from({ length: 3 }, (_, index) => ({
    title: `Course ${index + 1}`,
    subtitle: 'Course subtitle',
    amount: '$100',
    imgSrc: `https://via.placeholder.com/75x75?text=Course${index + 1}`
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8.5}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Boxes */}
            <Grid item xs={6} sm={6} lg={3}>
              <Skeleton animation="wave" variant="rounded" height={200} />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <Skeleton animation="wave" variant="rounded" height={200} />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <Skeleton animation="wave" variant="rounded" height={200} />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <Skeleton animation="wave" variant="rounded" height={200} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Revenue Report */}

            <Grid item xs={12} md={7}>
              <Box>
                <Box component={'h2'} sx={{ fontSize: 16, mb: 2.5 }}>
                  <Skeleton animation="wave" height={24} width={100} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontSize: 12 }}>
                    <Skeleton animation="wave" height={16} width={60} />
                  </Typography>
                  <Skeleton animation="wave" height={32} width={100} />
                </Box>

                <Skeleton animation="wave" height={200} />
              </Box>
            </Grid>

            {/* Popular Card */}
            <Grid item xs={12} md={5}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0 }}>
                  <Box component={'h2'} sx={{ fontSize: 16 }}>
                    <Skeleton animation="wave" height={24} width={120} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontSize: 12 }}>
                      <Skeleton animation="wave" height={16} width={60} />
                    </Typography>
                    <Skeleton animation="wave" height={25} width={100} />
                  </Box>
                </Box>
                <Box>
                  <Box sx={{}}>
                    {limitedData.map((_, index) => (
                      <Box key={index} sx={{ padding: 2, display: 'flex' }}>
                        <Skeleton variant="rectangular" width={75} height={68} style={{ borderRadius: 15 }} />
                        <Box
                          sx={{
                            rowGap: 1,
                            columnGap: 4,
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 1
                          }}
                        >
                          <Box sx={{ display: 'flex', ml: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Skeleton animation="wave" height={16} width={150} />
                            <Skeleton animation="wave" height={20} width={110} />
                          </Box>
                          <Skeleton animation="wave" height={16} width={60} sx={{ ml: 2 }} />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Boxes */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid container spacing={1}>
            {[1, 2, 3, 4].map((item, index) => (
              <Grid key={index} item xs={6} sm={6} lg={3}>
                <Skeleton variant="rectangular" width="100%" height={80} animation="wave" />
                <Skeleton variant="text" width="80%" height={20} animation="wave" />
                <Skeleton variant="text" width="50%" height={20} animation="wave" />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* <CardProjectStatus /> */}
               
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Skeleton variant="text" width={50} height={24} />
                      <Skeleton variant="text" width={50} height={24} sx={{ ml: 1 }} />
                      <Skeleton variant="text" width={50} height={24} sx={{ ml: 1 }} />
                    </Box>
                
                <Skeleton variant="rectangular" width="100%" height={300} />
            </Grid>


            <Grid item xs={12} md={6}>
              {/* <CardSupportTracker /> */}
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Skeleton for ReactApexCharts */}
                      <Skeleton variant="rectangular" width={230} height={230} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      {/* Skeleton for Total Course */}
                      <Typography variant="h1">
                        <Skeleton variant="text" width={50} height={40} />
                      </Typography>
                      <Typography sx={{ mb: 3, color: 'text.secondary' }}>
                        <Skeleton variant="text" width={100} height={20} />
                      </Typography>
                      {/* Skeletons for data.map */}
                      {[1, 2, 3].map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: index !== 2 ? 4 : undefined
                          }}
                        >
                          <Skeleton variant="circular" width={34} height={34} sx={{ marginRight: 2 }} />
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="h6">
                              <Skeleton variant="text" width={100} />
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                              <Skeleton variant="text" width={150} />
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* All Activity */}
      <Grid item xs={12} md={3.5} style={{ height: '100vh' }}>
        <Grid container>
          <Grid item xs={12}>
            <Card width="100%" height="100%" sx={{ p: 3 }}>
              <Box>
                <Typography variant="h4" sx={{ color: 'white' }}>
                  <Skeleton variant="text" width="50%" height={20} animation="wave" />
                </Typography>
                <Card sx={{ mt: 2, opacity: 0.8 }}>
                  {[1, 2, 3].map((_, index) => (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: index !== 1 ? 1 : undefined,
                          pb: index === 1 ? 2 : undefined,
                          pr: 2,
                          pl: 2,
                          pt: 2
                        }}
                      >
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box sx={{ marginLeft: 2 }}>
                          <Skeleton variant="text" width={100} />
                          <Skeleton variant="text" width={80} />
                          <Skeleton variant="text" width={80} />
                          <Skeleton variant="text" width={80} />
                        </Box>
                      </Box>
                      {index !== 1 && <Divider sx={{ mr: 2, ml: 2 }} />}
                    </Box>
                  ))}
                </Card>
              </Box>
              <Box>
                <Card sx={{ mt: 4, opacity: 0.8 }}>
                  {[1, 2, 3].map((_, index) => (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: index !== 1 ? 1 : undefined,
                          pb: index === 1 ? 2 : undefined,
                          pr: 2,
                          pl: 2,
                          pt: 2
                        }}
                      >
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box sx={{ marginLeft: 2 }}>
                          <Skeleton variant="text" width={100} />
                          <Skeleton variant="text" width={80} />
                          <Skeleton variant="text" width={80} />
                          <Skeleton variant="text" width={80} />
                        </Box>
                      </Box>
                      {index !== 1 && <Divider sx={{ mr: 2, ml: 2 }} />}
                    </Box>
                  ))}
                </Card>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardSkeleton;

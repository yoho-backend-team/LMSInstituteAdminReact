import { Box, Card, CardHeader, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import CustomAvatar from 'components/mui/avatar';
// import ReactApexCharts from 'react-apexcharts';
import { gridSpacing } from 'store/constant';

const BranchSkeleton = () => {
  return (
    <Grid container spacing={4} sx={{ p: 1 }}>
      {/* First Card */}
      <Grid item xs={12} sm={6}>
        <Card>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardHeader title={<Skeleton animation="wave" height={40} width={150} style={{ marginBottom: 6 }} />} />
            <CardHeader title={<Skeleton animation="wave" height={25} width={140} style={{ marginBottom: 6 }} />} />
          </Box>

          <Box sx={{display:'flex',justifyContent:'space-around',mb:3}}>
            <Box sx={{ p: 1 }}>
              {[1, 2].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CustomAvatar skin="light" variant="rounded" color={item.avatarColor} sx={{ mr: 4, width: 34, height: 34 }}>
                    <Skeleton variant="circular" width={34} height={34} />
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="h6" sx={{mt:2}}>
                      <Skeleton animation="wave" height={24} width={100} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                      <Skeleton animation="wave" height={16} width={150} />
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ p: 1 }}>
              {[1, 2].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CustomAvatar skin="light" variant="rounded" color={item.avatarColor} sx={{ mr: 4, width: 34, height: 34 }}>
                    <Skeleton variant="circular" width={34} height={34} />
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="h6" sx={{mt:2}}>
                      <Skeleton animation="wave" height={24} width={100} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                      <Skeleton animation="wave" height={16} width={150} />
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* Second Card */}

      <Grid item xs={12} sm={6}>
        <Card sx={{ pt: 1,pb:4}}>
          <Grid container display={'flex'} justifyContent={'space-around'} >
            <Box sx={{mt:2}}>
              <Typography variant="h1">
                <Skeleton animation="wave" height={40} width={100} />
              </Typography>
              <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                <Skeleton animation="wave" height={16} width={150} />
              </Typography>
              {[1, 2].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CustomAvatar skin="light" variant="rounded" color={item.avatarColor} sx={{ mr: 4, width: 34, height: 34 }}>
                    <Skeleton variant="circular" width={34} height={34} />
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="h6">
                      <Skeleton animation="wave" height={24} width={100} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                      <Skeleton animation="wave" height={16} width={150} />
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{mt:2}}>
              {/* <ReactApexCharts type="radialBar" height={250} options={{}} series={[85]} /> */}
            <Skeleton variant="rectangular" width={150} height={160} animation="wave" sx={{ mb: 4 }} />

            </Box>
          </Grid>
        </Card>
      </Grid>

      {/* Third Card */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container md={12} spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                  <Grid item xs zeroMinWidth>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" height={20} width={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={150} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
            <Skeleton variant="rectangular" height={25} width={75} />
          </CardContent>
        </Card>
      </Grid>
      {/* Fourth Card */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container md={12} spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                  <Grid item xs zeroMinWidth>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" height={20} width={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={150} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
            <Skeleton variant="rectangular" height={25} width={75} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BranchSkeleton;

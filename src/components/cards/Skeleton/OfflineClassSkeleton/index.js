import React from 'react';
import { Box, Card, CardContent, CardHeader, Grid, Skeleton, Avatar, Typography, TextField, InputAdornment, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { display } from '@mui/system';

const ViewOfflineClassSkeleton = () => {
  return (
    <Box>
      <Grid container spacing={4}>

        {/* Class Details Section */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              sx={{ height: 10 }}
              title={
                <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 2,bgcolor: 'grey.300' }} />
              }
            />
            <CardContent>

              <Grid container spacing={4} justifyContent="space-between" alignItems="center">

                <Grid item   sx={{ mt: -2 }}>
                  <Skeleton variant="text" width={120} height={40} sx={{ bgcolor: 'grey.300' }} />
                </Grid>

                <Grid item sx={{ display: 'flex', alignItems: 'center', mt: -12 }}>
                  <Skeleton variant="text" width={80} height={30} sx={{ bgcolor: 'grey.300', mr:2}} />
                  <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 2 , bgcolor: 'grey.300'}} />
                </Grid>

              </Grid>
              <Grid container spacing={4} sx={{ pt: 3 }} justifyContent="space-between" alignItems="center">
                {[1, 2, 3, 4].map((item) => (
                  <Grid item key={item}>
                    <Skeleton variant="text" width={70} height={20} sx={{ bgcolor: 'grey.300' }} />
                    <Skeleton variant="text" width={150} height={30} sx={{ bgcolor: 'grey.300' }} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Faculty & Coordinators Section */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Skeleton variant="text" width={200} height={30} sx={{ bgcolor: 'grey.300' }}  />} />
            <CardContent>
              <Grid container spacing={4}>
                {[1, 2].map((item) => (
                  <Grid item key={item} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={60} height={60} sx={{ bgcolor: 'grey.300' }} />
                    <Box sx={{ ml: 2 }}>
                      <Skeleton variant="text" width={80} height={15} sx={{ bgcolor: 'grey.300' }} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Enrolled Students Section */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              avatar={<Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'grey.300' }} />}
              title={<Skeleton variant="text" width={180} height={30} sx={{ bgcolor: 'grey.300' }} />}
            />
            <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{ py: 2 }}>
              <Skeleton variant="rectangular" width={300} height={40} sx={{ borderRadius: 2,bgcolor: 'grey.300' }} />
            </Grid>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={12} key={item}>
                    <Card sx={{ p: 2 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Skeleton variant="circular" width={50} height={50} sx={{ bgcolor: 'grey.300' }} />
                            <Box sx={{ ml: 2 }}>
                              <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: 'grey.300' }} />
                              <Skeleton variant="text" width={100} height={15} sx={{ bgcolor: 'grey.300' }} />
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: "center", gap: 4 }}>
                            <Skeleton variant="text" width={20} height={20} sx={{ bgcolor: 'grey.300' }} />
                            <Skeleton variant="text" width={20} height={20} sx={{ bgcolor: 'grey.300' }} />
                            <Skeleton variant="text" width={40} height={20} sx={{ bgcolor: 'grey.300' }} />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewOfflineClassSkeleton;

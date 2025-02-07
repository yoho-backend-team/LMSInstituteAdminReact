import React from 'react';
import { Box, Card, CardContent, Grid, Skeleton, Avatar, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const OnlineClassSkeleton = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#ddd', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Skeleton variant="text" width={80} height={40} sx={{ bgcolor: 'grey.300' }} />
            <Skeleton variant="text" width={150} height={40} sx={{ bgcolor: 'grey.300' }} />
          </Box>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Card sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                  <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: 'grey.300', mb: 1 }} />
                  {item === 7 ? (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }} />
                  ) : (
                    <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: 'grey.300' }} />
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search Student"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon sx={{ color: 'grey.300' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%', maxWidth: 400, bgcolor: 'grey.300' }}
            />
          </Box>

          <Box sx={{ width: '100%' }}>

      {/* Header Skeleton */}
      <Grid container spacing={2} sx={{ mb: 1 }}>

        <Grid item xs={1}>
          <Skeleton variant="text" width={40} height={30} sx={{ bgcolor: 'grey.300' }} />
        </Grid>

        <Grid item xs={4}>
          <Skeleton variant="text" width={100} height={30} sx={{ bgcolor: 'grey.300' }} />
        </Grid>

        <Grid item xs={3}>
          <Skeleton variant="text" width={80} height={30} sx={{ bgcolor: 'grey.300' }} />
        </Grid>

        <Grid item xs={4}>
          <Skeleton variant="text" width={80} height={30} sx={{ bgcolor: 'grey.300' }} />
        </Grid>
      </Grid>

      {/* Data Rows Skeleton */}
      {[1, 2, 3, 4, 5].map((row) => (
        <Grid container spacing={2} key={row} sx={{ mb: 1 }}>
          {/* ID */}
          <Grid item xs={1}>
            <Skeleton variant="rectangular" width={40} height={30} sx={{ bgcolor: 'grey.300' }} />
          </Grid>

          {/* Avatar*/}
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'grey.300' }} />
            <Box>
              <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: 'grey.300', mb: 0.5 }} />
              <Skeleton variant="text" width={60} height={15} sx={{ bgcolor: 'grey.300' }} />
            </Box>
          </Grid>

          {/*  City */}
          <Grid item xs={3}>
            <Skeleton variant="text" width={70} height={20} sx={{ bgcolor: 'grey.300' }} />
          </Grid>

          {/*  Address */}
          <Grid item xs={4}>
            <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: 'grey.300' }} />
          </Grid>
        </Grid>
      ))}
    </Box>


        </CardContent>
      </Card>
    </Box>
  );
};

export default OnlineClassSkeleton;

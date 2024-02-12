import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const CommunitySkeleton = () => {
  const cards = Array.from({ length: 7 }, (_, index) => index + 1);

 

  return (
    <>
      <Grid container spacing={2}>
        {/* Left Side Card */}
        <Grid item xs={12} sm={3}>
          {cards.map((cardIndex) => (
            <Card key={cardIndex} sx={{ mb: 2 }}>
              <CardContent sx={{}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Skeleton variant="text" width={110} />
                    <Skeleton variant="text" width={90} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Chat Content */}
        <Grid item xs={12} sm={9}>
          <Card sx={{ mb: 2,height:"80vh" }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ ml: 2 }}>
                  <Skeleton variant="text" width={60} />
                </Box>
              </Box>

              <Box >
               <Box sx={{display: 'flex',}}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width={200} height={50} />
                </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Skeleton variant="text" width={200} height={50} />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width={200} height={50} />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Skeleton variant="text" width={200} height={50} />
                </Typography>
              </Box>

              <Box sx={{}}>
                <Typography variant="body1" sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Skeleton variant="text" width={200} height={50} />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width={200} height={50} />
                </Typography>

                <Typography variant="body1" sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Skeleton variant="text" width={200} height={50} />
                </Typography>

                
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CommunitySkeleton;
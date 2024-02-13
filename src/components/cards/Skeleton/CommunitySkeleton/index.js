import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const CommunitySkeleton = () => {
  const cards = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <>
      <Grid container spacing={2}>
        {/* Left Side Card */}
        <Grid item xs={12} sm={4}>
          {cards.map((cardIndex) => (
            <Card key={cardIndex} sx={{ mb: 2 }}>
              <CardContent sx={{}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <Skeleton variant="circular" width={45} height={45} />
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Skeleton variant="text" width={110} />
                    <Skeleton variant="text" width={165} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Chat Content */}
        <Grid item xs={12} sm={8}>
          <Card sx={{ mb: 2, height: '80vh' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ ml: 2 }}>
                  <Skeleton variant="text" width={60} />
                </Box>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                  <Box>
                    <Skeleton variant="circular" width={50} height={50} />
                  </Box>
                  <Box sx={{ mr: 1 }}>
                    <Skeleton variant="text" width={220} height={50} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <Skeleton variant="circular" width={50} height={50} />
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Skeleton variant="text" width={160} height={50} />
                    <Skeleton variant="text" width={220} height={50} />
                    <Skeleton variant="text" width={200} height={50} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                  <Box>
                    <Skeleton variant="circular" width={50} height={50} />
                  </Box>
                  <Box sx={{ mr: 1 }}>
                    <Skeleton variant="text" width={220} height={50} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <Box>
                    <Skeleton variant="circular" width={50} height={50} />
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Skeleton variant="text" width={230} height={50} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', mt: 2 }}>
                  <Box>
                    <Skeleton variant="circular" width={50} height={50} />
                  </Box>
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="text" width={160} height={50} />
                    <Skeleton variant="text" width={220} height={50} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>
              </Box>

              <Box sx={{ mt: 6 }}>
                <Box sx={{ ml: 1 }}>
                  <Skeleton variant="text" width='100%' height={85} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CommunitySkeleton;

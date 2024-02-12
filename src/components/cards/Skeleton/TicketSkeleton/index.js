import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const TicketSkeleton = () => {
  const cards = Array.from({ length: 5 }, (_, index) => index + 1);

  const mails = Array.from({ length: 2 }, (_, index) => ({
    subject: `Subject ${index + 1}`,
    to: `Recipient ${index + 1}`,
    from: `Sender ${index + 1}`,
    date: new Date(),
    content: `Content of mail ${index + 1}`
  }));

  return (
    <>
      <Grid container spacing={2}>
        {/* Left Side Card */}
        <Grid item xs={12} sm={3}>
          {cards.map((cardIndex) => (
            <Card key={cardIndex} sx={{ mb: 2 }}>
              <CardContent sx={{}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Skeleton variant="circular" width={30} height={30} />
                  <Box sx={{ ml: 1 }}>
                    <Skeleton variant="text" width={100} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box>
                    <Skeleton variant="text" width={50} />
                  </Box>
                </Box>

                <Box style={{ ml: 2, mt: 2 }}>
                  <Skeleton variant="text" width="80%" />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton variant="rectangular" width={50} height={20} />
                    <Skeleton variant="rectangular" width={50} height={20} />
                    <Skeleton variant="rectangular" width={50} height={20} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Chat Content */}
        <Grid item xs={12} sm={9}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Skeleton variant="circular" width={48} height={48} />
                  <Box sx={{ ml: 2 }}>
                    <Skeleton variant="text" width={60} />
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="60%" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="70%" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="50%" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="80%" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="80%" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="80%" />
                </Typography>
              </CardContent>
            </Card>

          {mails.map((mail, index) => (
            <Card key={index} sx={{  mb: 2 }}>
              <CardContent>
                <Typography variant="h5"> <Skeleton variant="text" width="70%" /></Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                <Skeleton variant="text" width="50%" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                <Skeleton variant="text" width="30%" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                <Skeleton variant="text" width="20%" />
                </Typography>
                <Typography variant="body1"> <Skeleton variant="text" width="40%" /></Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default TicketSkeleton;

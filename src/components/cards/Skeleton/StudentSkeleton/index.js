import { Box, Card, Grid, Skeleton, Typography } from '@mui/material';

const StudentSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {[...Array(6)].map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Card sx={{ alignItems: 'center', height: '100%', px: 0.55, py: 1.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
              <Box>
                <Skeleton variant="circular" width={70} height={70} sx={{ mb: 1 }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ mt: 0.5 }}>
                  <Skeleton width={100} />
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  <Skeleton width={130} />
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                    mt: 2
                  }}
                >
                  <Skeleton width={180} />
                  <Skeleton width={150} />
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1.75, mb: 0.75 }}>
                <Skeleton variant="rounded" width={30} height={30} />
                <Skeleton variant="rounded" width={30} height={30} />
                <Skeleton variant="rounded" width={30} height={30} />
                <Skeleton variant="rounded" width={30} height={30} />
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentSkeleton;

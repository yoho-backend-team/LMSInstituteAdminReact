import { Card, CardContent, CardHeader, Grid, Skeleton, Typography, Box } from '@mui/material';

const BatchViewSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      {/* Header Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={<Skeleton animation="wave" height={40} width={200} sx={{ bgcolor: 'grey.300' }} />} />
          <CardContent sx={{ mt: 0, pt: 0 }}>
            <Grid container spacing={3} direction="row">
              {[1, 2, 3].map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Skeleton variant="rectangular" height={20} width={90} sx={{ bgcolor: 'grey.300' }} />
                    <Skeleton variant="rectangular" height={30} width={110} sx={{ bgcolor: 'grey.300' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Students List */}
      <Grid item xs={12}>
        <Card sx={{ mt: 1, px: 1 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={50} width="100%" sx={{ bgcolor: 'grey.300' }} />
              </Grid>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ display: 'flex', alignItems: 'flex-start', p: 2, minHeight: 250 }}>
                    <Skeleton variant="circular" width={64} height={64} sx={{ bgcolor: 'grey.400', mr: 2 }} />
                    <Box>
                      <Skeleton variant="text" width={120} height={25} sx={{ bgcolor: 'grey.300' }} />
                      <Skeleton variant="text" width={100} height={20} sx={{ mt: 1, bgcolor: 'grey.300' }} />
                      <Box sx={{ mt: 2,ml:-7 }}>
                        <Skeleton variant="text" width={200} height={20} sx={{ bgcolor: 'grey.300' }} />
                        <Skeleton variant="text" width={200} height={20} sx={{ mt: 1, bgcolor: 'grey.300' }} />
                        <Skeleton variant="text" width={200} height={20} sx={{ mt: 1, bgcolor: 'grey.300' }} />
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
            <Skeleton variant="rectangular" height={25} width={65} sx={{ bgcolor: 'grey.300' }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BatchViewSkeleton;

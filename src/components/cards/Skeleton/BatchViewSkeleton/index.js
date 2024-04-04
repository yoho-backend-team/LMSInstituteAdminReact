import { Card, CardContent, CardHeader, Grid, Skeleton, Typography } from '@mui/material';

const BatchViewSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      {/* First Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={<Skeleton animation="wave" height={40} width={200} />} />
          <CardContent sx={{ mt: 0, pt: 0 }}>
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <Grid item key={index}>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    <Skeleton animation="wave" height={20} width={90} />
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    <Skeleton animation="wave" height={30} width={110} />
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* Table */}
      <Grid item xs={12}>
        <Card sx={{ mt: 1, px: 1 }}>
          <CardContent>
            <Grid container spacing={3} direction="column">
              <Grid item paddingBottom={2}>
                <Grid container display={'flex'}>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="rectangle" height={50} width="100%" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="rectangle" height={50} width="100%" />
                  </Grid>
                </Grid>
              </Grid>
              {[...Array(8)].map((_, rowIndex) => (
                <Grid item xs={12} key={rowIndex}>
                  <Grid container spacing={4}>
                    {[...Array(3)].map((_, colIndex) => (
                      <Grid item xs={6} sm={4} key={colIndex} paddingY={4}>
                        <Skeleton variant="text" height={20} width="80%" />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
            <Skeleton variant="rectangular" height={25} width={65} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BatchViewSkeleton;

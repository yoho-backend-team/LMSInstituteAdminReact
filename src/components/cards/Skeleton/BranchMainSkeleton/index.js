import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BranchMainSkeleton = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Grid container justifyContent={'space-between'}>
            <Grid item xs={12} sm={3}>
              <Skeleton variant="rectangular" height={50} width={400} animation="wave" />
            </Grid>
            <Grid container display={'flex'} justifyContent={'flex-end'} xs={12} sm={3}>
              <Skeleton variant="rectangular" height={40} width={150} animation="wave" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', display: 'flex', top: 5, right: 3, gap: 2, p: 1 }}>
                <Skeleton variant="rectangular" width={30} height={30} animation="wave" />
                <Skeleton variant="rectangular" width={30} height={30} animation="wave" />
              </Box>

              <CardMedia
                sx={{
                  height: 70,
                  width: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 6,
                  mx: 'auto'
                }}
              >
                <Skeleton variant="rectangular" width={65} height={65} animation="wave" />
              </CardMedia>

              <CardContent>
                <Typography variant="h3" sx={{ mt: 1 }}>
                  <Skeleton width="50%" animation="wave" />
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  <Skeleton width="80%" animation="wave" />
                </Typography>
                <Typography variant="h6">
                  <Skeleton width="60%" animation="wave" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BranchMainSkeleton;
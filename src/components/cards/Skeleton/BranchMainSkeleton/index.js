import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BranchMainSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 0.5, ml: 0.5 }}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Card sx={{ position: 'relative', minHeight: 300 }}>
            <Box sx={{ position: 'absolute', top: 0, right: 2, p: 1, gap: 2 }}>
              <Skeleton variant="circular" width={8} height={8} animation="wave" />
              <Skeleton variant="circular" width={8} height={8} animation="wave" />
              <Skeleton variant="circular" width={8} height={8} animation="wave" />
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
                <Skeleton width="80%" animation="wave" />
              </Typography>
              <Typography variant="h6">
                <Skeleton width="60%" height={45} animation="wave" />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BranchMainSkeleton;

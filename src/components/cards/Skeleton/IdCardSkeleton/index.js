import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const IdCardSkeleton = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[...Array(6)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card className="front" sx={{ width: '100%' }}>
              <CardContent sx={{ pt: 6.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ width: 100, height: 100, mb: 3 }}>
                  <Skeleton variant="circular" width={100} height={100} />
                </Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  <Skeleton width={180} height={22} />
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Skeleton variant="rectangular" width={150} height={26} />
                </Box>
                <Box mt={2}>
                  <Skeleton variant="rectangular" width={100} height={100} style={{ borderRadius: '10px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default IdCardSkeleton;

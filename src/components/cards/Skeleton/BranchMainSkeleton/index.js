import { Box, Grid, Typography, Card } from '@mui/material';
import CustomWaveSkeleton from './customSkelton';

const BranchCardSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 0.5, ml: 0.5 }}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ minHeight: 300, boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)", p: 2, backgroundColor: "white" }}>
            <Box
              sx={{
                height: 100,
                width: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <CustomWaveSkeleton variant="circular" width={100} height={100} />
            </Box>

            <Typography variant="h4" sx={{ mb: 2 }}>
              <CustomWaveSkeleton width="80%" height={28} />
            </Typography>

            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
              <CustomWaveSkeleton width="90%" height={20} />
            </Typography>

            <Box sx={{ mt: 1.75 }}>
              <CustomWaveSkeleton variant="rectangular" width="50%" height={40} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BranchCardSkeleton;

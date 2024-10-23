// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CustomSkeleton from '..';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const StaffManagement = () => {
  return (
    <>
      <Grid container spacing={4}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} p={1} mt={3}>
            <Card
            sx={{
              width: "380px",
              height: "220px",
              borderRadius: 3,
              boxShadow: 5,
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
            }}
          >
           
              <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CustomSkeleton variant="circular" width={80} />

                  

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'4px'}}>
                <CustomSkeleton variant="text" width={100} height={20} />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none',marginTop:'33px' }}>
                  <Box>
                    <CustomSkeleton variant="text" width={100} height={30} />
                  </Box>
                  <Box>
                    <CustomSkeleton variant="text" width={100} height={30} />
                  </Box>
                </Box>
              </CardContent>
              </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default StaffManagement;

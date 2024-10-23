import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import CustomSkeleton from '..';

const StudentSkeleton = () => {
  return (
    <>
      <Grid container spacing={4}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} spacing={2} px={1}>
            <Card
            sx={{
              width: "350px",
              height: "290px",
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
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'8px'}}>
                <CustomSkeleton variant="text" width={100} height={30} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'12px'}}>
                <CustomSkeleton variant="text" width={150} height={30} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'12px'}}>
                <CustomSkeleton variant="text" width={250} height={20} />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none',marginTop:'16px' }}>
                  <Box>
                    <CustomSkeleton variant="text" width={150} height={30} />
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

export default StudentSkeleton;

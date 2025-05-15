import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import CustomSkeleton from '..';

const StudentTicketsCardsSkeleton = () => {
  return (
    <>
      <Grid container spacing={4}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} p={1} mt={3}>
            <Card
            sx={{
              width: "370px",
              height: "240px",
              borderRadius: 3,
              boxShadow: 5,
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
            }}
          >
           
              <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '16px' }}>
                    <Box sx={{ display: 'flex', gap: '1px' }}>
                        <CustomSkeleton variant="circular" width={50} />
                        <CustomSkeleton variant="text" width={60} height={20} />
                        
                    </Box>
    
</Box>
<Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '36px',gap:"2px" }}>
    <CustomSkeleton variant="text" width={60} height={20} />
</Box>
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Box sx={{ display: 'flex', textDecoration: 'none' }}>
                  <Box sx={{marginTop:'36px'}}>
                    <CustomSkeleton variant="text" width={140} height={30} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt:-1, marginTop:"42px" ,gap:'2px'}}>
                 <CustomSkeleton width={5} height={4} borderRadius={2} />
                    <CustomSkeleton width={5} height={4} borderRadius={2} />
                    <CustomSkeleton width={5} height={4} borderRadius={2} />
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

export default StudentTicketsCardsSkeleton;

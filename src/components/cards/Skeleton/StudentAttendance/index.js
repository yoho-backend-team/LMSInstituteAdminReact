// material-ui
import { Card, CardContent, Grid ,Box} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import CustomSkeleton from '..';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const StudentAttendanceSkeleton = () => {
  return (
    <>
      <Grid container spacing={4}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} p={1} mt={3}>
            <Card
            sx={{
              width: "380px",
              height: "290px",
              borderRadius: 3,
              boxShadow: 5,
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
            }}
          >
           
              <CardContent sx={{ pt: 2.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' ,marginTop:'16px', justifyContent:"center", alignItems: "center"}}>
                <CustomSkeleton variant="text" width={80} height={20} />
                </Box>  


                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
                    <Box sx={{ display: 'flex', gap: '1px' }}>
                        <CustomSkeleton variant="circular" width={40} />
                        <CustomSkeleton variant="circular" width={40} />
                    </Box>
    
</Box>
<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px',gap:"2px" }}>
    <CustomSkeleton variant="text" width={10} height={20} />
    <CustomSkeleton variant="text" width={50} height={20} />
    <CustomSkeleton variant="text" width={10} height={20} />
    <CustomSkeleton variant="text" width={10} height={20} />
    <CustomSkeleton variant="text" width={40} height={20} />
</Box>


                <Box sx={{ display: 'flex',justifyContent:"center", flexDirection: 'column' ,marginTop:'24px',alignItems:"center"}}>
                <CustomSkeleton variant="text" width={210} height={20} />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none' }}>
                  <Box sx={{marginTop:'30px'}}>
                    <CustomSkeleton variant="text" width={140} height={35} />
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

export default StudentAttendanceSkeleton;

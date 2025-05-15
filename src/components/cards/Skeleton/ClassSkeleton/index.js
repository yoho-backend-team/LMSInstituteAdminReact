import CustomSkeleton from '..';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, CardContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AvatarGroup from '@mui/material/AvatarGroup';
// import OptionsMenu from 'components/option-menu';

const ClassSkeleton = () => {
  const liveClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Grid container spacing={4}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} p={1} mt={3}>
            <Card
            sx={{
              width: "390px",
              height: "300px",
              borderRadius: 3,
              boxShadow: 5,
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
            }}
          >
           
              <CardContent sx={{ pt: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'16px'}}>
                <CustomSkeleton variant="text" width={200} height={20} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'center', flexDirection: 'row',marginTop:'16px' }}>
                <CustomSkeleton variant="circular" width={50} />
                <CustomSkeleton variant="circular" width={50} />

                  

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'16px'}}>
                <CustomSkeleton variant="text" width={150} height={20} />
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'18px'}}>
                <CustomSkeleton variant="text" width={350} height={20} />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none' }}>
                  <Box sx={{marginTop:'36px'}}>
                    <CustomSkeleton variant="text" width={100} height={40} />
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

export default ClassSkeleton;

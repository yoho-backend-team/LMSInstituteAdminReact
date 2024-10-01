import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomSkeleton from '..';

const IdCardSkeleton = () => {
  return (
    <>
      <Grid container spacing={4}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={3} p={1} mt={2}>
            <Card
            sx={{
              width: "350px",
              height: "430px",
              borderRadius: 3,
              boxShadow: 5,
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
            }}
          >
           
              <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column',  marginTop:"16px"}}>
                <CustomSkeleton variant="circular" width={100} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'16px'}}>
                <CustomSkeleton variant="text" width={100} height={30} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'18px'}}>
                <CustomSkeleton variant="text" width={180} height={30} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' ,marginTop:'36px'}}>
                <CustomSkeleton variant="text" width={100} height={100} />
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

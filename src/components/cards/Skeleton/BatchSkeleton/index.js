import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomSkeleton from '..';

const BatchSkeleton = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card
              sx={{
                width: 450,
                height: 261,
                padding: "24px",
                borderRadius: 3,
                boxShadow: 5,
                position: 'relative',
                overflow: 'visible',
                background: '#fff',
              }}
            >
              <Box sx={{ width: "336px", display: "flex", justifyContent: "space-between"}} >
                
                <Box sx={{ width: "127px", height: "19px" ,marginBottom:"6px"}} >
                   <CustomSkeleton width={"100%"} height={"100%"} variant='text' />
                 </Box>
                 <Box sx={{ display: 'flex', flexDirection: 'column', mt:-1, marginRight:"-46px" ,gap:'2px'}}>
                 <CustomSkeleton width={5} height={4} borderRadius={2} />
                    <CustomSkeleton width={5} height={4} borderRadius={2} />
                    <CustomSkeleton width={5} height={4} borderRadius={2} />
                </Box>
                
                 
              </Box>
              <Box sx={{ width: "336px",mt:"20px",height: "20px",marginTop:"6px" }}>
                <CustomSkeleton width={35} height={20} variant='text' />
              </Box>
              <Box sx={{ width: "336px", height: "24px", mt: "22px", display: "flex", justifyContent: "space-between" }} >
                <Box sx={{ width: "112px", height: "24px",marginLeft:'24px'}}>
                   <CustomSkeleton width={112} height={24} variant="rectangular" /> 
                </Box>
                <Box sx={{ width: "112px", height: "24px",marginRight:'-16px'}} >
                   <CustomSkeleton width={112} height={24} variant="rectangular" />
                </Box>
              </Box>
              <Box sx={{ width: "336px", height: "24px", mt: "24px", display: "flex", justifyContent: "space-between",}} >
                <Box sx={{ width: "112px", height: "24px",ml:'4px'}}>
                   <CustomSkeleton width={112} height={24} variant="rectangular" /> 
                </Box>
                <Box sx={{ width: "112px", height: "24px", marginRight:'-38px'}} >
                   <CustomSkeleton width={112} height={24} variant="rectangular" />
                </Box>
              </Box>
              <Box sx={{ width:"336px", mt: "24px"}}>
                <CustomSkeleton width={336}  height={6} variant='text' borderRadius={"10px"} />
              </Box>
              <Box sx={{ width: "336px", height: "37px", marginTop: "12px" }}>
                <CustomSkeleton width={142} height={30} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BatchSkeleton;

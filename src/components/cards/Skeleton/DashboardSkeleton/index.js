import { Box, Card, Divider, Grid, Skeleton, Typography } from '@mui/material';
import CustomSkeleton from '..';

const DashboardSkeleton = () => {
  const limitedData = Array.from({ length: 3 }, (_, index) => ({
    title: `Course ${index + 1}`,
    subtitle: 'Course subtitle',
    amount: '$100',
    imgSrc: `https://via.placeholder.com/75x75?text=Course${index + 1}`
  }));

  return (
    <Grid container spacing={2}>
    <Grid container spacing={2} sx={{ pt: "22px", pl: "22px" }}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {[...Array(5)].map((_,index) => (
             <Grid item xs={12} sm={6} md={2.4} key={index} >
                 <CustomSkeleton width={"100%"} height={103} />
              </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={8.5}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <CustomSkeleton width={100} height={18} mt={"13px"} mb={"20px"} />
              <CustomSkeleton width={"100%"}  height={341} />
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomSkeleton width={111} height={18} my={"13px"} />
              <Grid sx={{ display: "flex", flexDirection: "column", height: "363px", justifyContent: "space-between"}}>
                 <CustomSkeleton width={339} height={114} mb= "10px" />
                 <CustomSkeleton width={339} height={114} mb= "10px" />
                 <CustomSkeleton width={339} height={114} mb= "10px" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3.5}>
            <CustomSkeleton width={"100%"} height={501} />
      </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardSkeleton;

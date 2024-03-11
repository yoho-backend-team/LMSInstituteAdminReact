import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BatchSkeleton = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ alignItems: 'center' }}>
                    <Skeleton variant="text" width={150} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="text" width={120} />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
                  {/* <Icon fontSize="1.25rem" icon="tabler:book" /> */}
                  <Typography sx={{ ml: 1 }} variant="h5">
                    <Skeleton width={200} />
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  {/* <Icon fontSize="1.25rem" icon="tabler:calendar-month" /> */}
                  <Box sx={{ alignItems: 'center', mr: 3 }}>
                    <Typography sx={{ color: 'text.secondary', ml: 1 }}>
                      <Skeleton width={70} />
                    </Typography>
                  </Box>
                  {/* <Icon fontSize="1.25rem" icon="tabler:calendar-month" /> */}
                  <Box sx={{ alignItems: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', ml: 1 }}>
                      <Skeleton width={70} />
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <Icon fontSize="1.25rem" icon="tabler:users" /> */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                    <Typography sx={{ my: 2, ml: 1 }} variant="h5">
                      <Skeleton width={70} />
                    </Typography>
                    {/* <Typography sx={{ ml: 0.5, color: 'text.secondary' }}>Students</Typography> */}
                  </Box>
                  {/* <Icon fontSize="1.25rem" icon="tabler:clock" /> */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ my: 2, ml: 1 }} variant="h5">
                      <Skeleton width={70} />
                    </Typography>
                    {/* <Typography sx={{ ml: 0.5, color: 'text.secondary' }}>Months</Typography> */}
                  </Box>
                </Box>

                <Skeleton variant="determinate" width="100%" height={10} sx={{ mt: 2 }} />
                <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="rectangular" width={100} height={40} />
                  </Box>
                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="rectangular" width={40} height={40} sx={{ marginRight: 1 }} />
                    <Skeleton variant="rectangular" width={40} height={40} sx={{ marginRight: 1 }} />
                    <Skeleton variant="rectangular" width={40} height={40} />
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

export default BatchSkeleton;

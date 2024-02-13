import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const ClassSkeleton = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Skeleton height={25} width={200} />} />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rounded" height={50} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rounded" height={50} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rounded" height={50} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rounded" height={50} animation="wave" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Grid container justifyContent={'space-between'}>
            <Grid item xs={12} sm={3}>
              <Skeleton variant="rounded" height={50} width={410} animation="wave" />
            </Grid>
            <Grid container display={'flex'} justifyContent={'flex-end'} xs={12} sm={3}>
              <Skeleton variant="rounded" height={40} width={150} animation="wave" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[...Array(6)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    mt: 2.55,
                    mb: 1.85,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">
                      <Skeleton width={180} />
                    </Typography>
                    <Typography variant="body2">
                      <Skeleton width={100} />
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      borderRadius: '10%', // Make it round
                      // border: '1px solid grey', // Add border
                      padding: '3px 9px', // Adjust padding as needed
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '& .MuiTypography-body2': {
                        margin: 0 // Remove default margin on Typography
                      }
                    }}
                  >
                    <Typography variant="body2">
                      <Skeleton width={50} height={40} />
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2.55, display: 'flex', alignItems: 'center' }}>
                  {/* <TimerIcon sx={{ marginRight: 1 }} /> */}
                  <Typography variant="body2">
                    <Skeleton width={100} />
                  </Typography>
                </Box>

                <Box
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <AvatarGroup max={4} sx={{ width: 100, height: 40, '& .MuiAvatar-root': { width: 50, height: 32 } }}>
                    {[...Array(4)].map((_, friendIndex) => (
                      <Skeleton key={friendIndex} variant="circular" width={50} height={32} />
                    ))}
                  </AvatarGroup>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <CustomChip rounded size="small" skin="light" color={'secondary'} width={150} height={40}> */}
                    <Skeleton skin="light" color={'secondary'} width={150} height={40} />
                    {/* </CustomChip> */}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
                    <Skeleton variant="rectangular" width={40} height={40} sx={{ marginRight: 1 }} />
                    <Skeleton variant="rectangular" width={40} height={40} sx={{ marginRight: 1 }} />
                    <Skeleton variant="rectangular" width={40} height={40} sx={{ marginRight: 1 }} />
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

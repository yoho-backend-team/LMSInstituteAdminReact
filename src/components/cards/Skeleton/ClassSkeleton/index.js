import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AvatarGroup from '@mui/material/AvatarGroup';
// import OptionsMenu from 'components/option-menu';

const ClassSkeleton = () => {
  const liveClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {liveClasses?.map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 3, position: 'relative', borderTop: '4px solid #7cf2e1' }}>
              <Grid container direction="column" spacing={1}>
                <Grid item sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                      sx={{
                        mb: 0,
                        flexShrink: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        textAlign: 'center'
                      }}
                      variant="h3"
                      gutterBottom
                      textAlign="center"
                    >
                      <Skeleton animation="wave" width={120} height={40} />
                    </Typography>
                  </Box>
                </Grid>

                <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 1 }}>
                  <AvatarGroup className="pull-up" max={4}>
                    {[...Array(4)].map((_, index) => (
                      <Skeleton key={index} variant="circular" width={40} height={40} animation="wave" />
                    ))}
                  </AvatarGroup>
                </Grid>

                <Grid item justifyContent="center" display="flex">
                  <Typography sx={{ fontWeight: '500' }}>
                    <Skeleton variant="text" width={120} height={20} animation="wave" />
                  </Typography>
                </Grid>

                <Grid item justifyContent="center" alignItems="center" sx={{ verticalAlign: 'center' }} display="flex" mb={2}>
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex', fontWeight: 'bold' }}>
                      <Skeleton variant="text" width={120} height={20} animation="wave" />
                    </Typography>
                  </Box>
                </Grid>

                <Grid sx={{ mb: 1 }}>
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <IconButton aria-label="copy-link">
                      <Skeleton variant="rectangle" width={20} height={20} animation="wave" />
                    </IconButton>
                    <Typography>
                      <Skeleton variant="text" width={200} height={20} animation="wave" />
                    </Typography>
                  </Box>
                </Grid>

                <Grid container p={1} justifyContent="space-between" alignItems="center">
                  <Box>
                    <Button variant="contained" size="medium">
                      <Skeleton variant="text" width={80} height={30} animation="wave" />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ClassSkeleton;

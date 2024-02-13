// material-ui
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// import { OptionsMenu } from '../OptionsMenu';
// ==============================|| SKELETON - EARNING CARD ||============================== //

const StaffManagement = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Skeleton height={25} width={200} />} />
            <CardContent>
              <Grid container spacing={3} justifyContent="flex-end">
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rounded" height={55} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rounded" height={55} animation="wave" />
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Skeleton variant="rounded" height={55} animation="wave" />
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Skeleton variant="rounded" height={55} animation="wave" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid container xs={12} p={2} mt={2} ml={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} p={1}>
              <Card sx={{ position: 'relative', p: 2 }}>
                {/* <OptionsMenu
              iconButtonProps={{
                size: 'small',
                sx: { top: 12, right: 12, position: 'absolute', color: 'text.disabled' }
              }}
              options={[
                'Share Connection',
                'Block Connection',
                { divider: true },
                { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } }
              ]}
            /> */}
                <CardContent sx={{ pt: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Skeleton variant="circular" width={100} height={100} sx={{ mb: 1, width: 100, height: 100 }} />
                    <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width={100} height={20} sx={{ mb: 2 }} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none' }}>
                    <Box>
                      <Skeleton variant="text" width={100} height={50} />
                    </Box>
                    <Box>
                      <Skeleton variant="text" width={100} height={50} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default StaffManagement;

// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const StaffManagement = () => {
  return (
    <>
      <Grid container spacing={4}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} p={1} mt={3}>
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
    </>
  );
};

export default StaffManagement;

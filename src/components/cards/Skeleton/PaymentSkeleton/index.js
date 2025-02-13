import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const PaymentSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ mt: 2.75, px: 1, ml: 3 }}>
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid item sx={{ pb: 2 }}>
                <Grid container sx={{ display: 'flex' }}>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="rectangular" height={50} width="100%"  sx={{backgroundColor:"#e6e6e6"}}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="rectangular" height={50} width="100%" sx={{backgroundColor:"#e6e6e6"}} />
                  </Grid>
                </Grid>
              </Grid>
              {[...Array(8)].map((_, rowIndex) => (
                <Grid item xs={12} key={rowIndex}>
                  <Grid container spacing={4}>
                    {[...Array(4)].map((_, colIndex) => (
                      <Grid item xs={6} sm={3} key={colIndex} py={4}>
                        <Skeleton variant="text" height={20} width="80%"sx={{backgroundColor:"#e6e6e6"}} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
            <Skeleton variant="rectangular" height={25} width={65} sx={{backgroundColor:"#e6e6e6"}}/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PaymentSkeleton;

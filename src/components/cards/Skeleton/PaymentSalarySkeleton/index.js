import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';

const PaymentSalarySkeleton = () => {
  return (
    <>
      <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                  <Grid item xs zeroMinWidth>
                    <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" height={20} width={20} sx={{backgroundColor:"#e6e6e6"}} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}}/>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20}  sx={{backgroundColor:"#e6e6e6"}}/>
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} sx={{backgroundColor:"#e6e6e6"}} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}}/>
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} sx={{backgroundColor:"#e6e6e6"}} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20}  sx={{backgroundColor:"#e6e6e6"}}/>
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16}  sx={{backgroundColor:"#e6e6e6"}}/>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}}/>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20}sx={{backgroundColor:"#e6e6e6"}} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} sx={{backgroundColor:"#e6e6e6"}} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20}  sx={{backgroundColor:"#e6e6e6"}}/>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} sx={{backgroundColor:"#e6e6e6"}} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} sx={{backgroundColor:"#e6e6e6"}} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
            <Skeleton variant="rectangular" height={25} width={75} sx={{backgroundColor:"#e6e6e6"}} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default PaymentSalarySkeleton;

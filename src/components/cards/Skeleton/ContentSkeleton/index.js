import { Card, CardContent, Grid,CardHeader } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { gridSpacing } from 'store/constant';

const ContentSkeleton = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title={<Skeleton variant="text" width={100} />} />
                <CardContent sx={{ pt: 0, pb: 0 }}>
                  <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
                    <Grid item xs={12} sx={{ mb: 3 }}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={3}>
                          <Skeleton variant="rectangular" height={56} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Skeleton variant="rectangular" height={56} />
                        </Grid>
                        <Grid item sm={3} xs={12}>
                          <Skeleton variant="rectangular" height={56} />
                        </Grid>

                        <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                          <Skeleton variant="rectangular" height={40}  />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{mt:3}}>
            <Grid container md={12} sx={{p:3}} spacing={gridSpacing} >
              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                  <Grid item xs zeroMinWidth>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" height={20} width={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>

        </Grid>
      </Grid>
    </>
  );
};

export default ContentSkeleton;

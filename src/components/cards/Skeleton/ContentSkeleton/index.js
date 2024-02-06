import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { gridSpacing } from 'store/constant';
import Box from '@mui/material/Box';

const ContentSkeleton = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              <Grid>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Grid sx={{ my: 3 }}>
                    <Skeleton variant="text" width={200} height={30} />
                  </Grid>
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
                        <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                          <Skeleton variant="rectangular" height={56} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid container md={12} spacing={gridSpacing}>
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
            </CardContent>
            <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
              <Skeleton variant="rectangular" height={25} width={75} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ContentSkeleton;

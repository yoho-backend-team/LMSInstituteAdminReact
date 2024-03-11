// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// ** Icon Imports
// import Icon from 'components/icon';

// ** Custom Components Imports
// import * as source from 'src/views/components/avatars/AvatarsSourceCode'

const EcommerceStatistics = ({ batchData }) => {
  console.log(batchData);

  const renderStats = () => {
    return (
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={batchData.batch_name} />
              <CardContent sx={{ mt: 0, pt: 0 }}>
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Course Name
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {/* {batchData?.institute_course?.institute_course_branch?.course_name} */}
                      fsdg
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Batch id
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {batchData.batch_id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Duration
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      1:24:36
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Sarted Date
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {batchData.start_date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Ended Date
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {batchData.end_date}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              {/* <CardContent sx={{ mt: 0, pt: 0 }}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Instructor
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box>
                        <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Tooltip title="Olivia Sparks">
                            <Avatar src="/images/avatars/4.png" alt="Olivia Sparks" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Howard Lloyd">
                            <Avatar src="/images/avatars/5.png" alt="Howard Lloyd" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Hallie Richards">
                            <Avatar src="/images/avatars/6.png" alt="Hallie Richards" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Alice Cobb">
                            <Avatar src="/images/avatars/8.png" alt="Alice Cobb" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                        </AvatarGroup>
                      </Box>
                      <Box>
                        <Typography variant="h4">Jerome Bell</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Coordinator
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box>
                        <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Tooltip title="Olivia Sparks">
                            <Avatar src="/images/avatars/4.png" alt="Olivia Sparks" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Howard Lloyd">
                            <Avatar src="/images/avatars/5.png" alt="Howard Lloyd" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Hallie Richards">
                            <Avatar src="/images/avatars/6.png" alt="Hallie Richards" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                          <Tooltip title="Alice Cobb">
                            <Avatar src="/images/avatars/8.png" alt="Alice Cobb" sx={{ width: 25, height: 25 }} />
                          </Tooltip>
                        </AvatarGroup>
                      </Box>
                      <Box>
                        <Typography variant="h4">Robert Fox</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Class Type
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      Online
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent> */}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container spacing={6}>
      {renderStats()}
    </Grid>
  );
};

export default EcommerceStatistics;

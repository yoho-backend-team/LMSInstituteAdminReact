// ** MUI Imports
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Avatar from 'components/mui/avatar';

const renderStats = () => {
  return (
    <Grid item xs={12} md={12}>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Ux Class 13402324" />
            <CardContent sx={{ mt: 0, pt: 0 }}>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Course
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    UX Design
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Batch
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    #2323251
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
                    Date
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    13 Feb 2024
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Sarted At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    10:30 AM
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Ended At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    11:54 AM
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent sx={{ mt: 0, pt: 0 }}>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

const StudentViewHeaderCard = () => {
  return (
    <Grid container spacing={6}>
      {renderStats()}
    </Grid>
  );
};

export default StudentViewHeaderCard;

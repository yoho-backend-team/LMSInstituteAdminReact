import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Avatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';

const userRoleObj = {
  live: 'success',
  offline: 'secondary'
};
const StudentViewHeaderCard = ({ ClassData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={ClassData?.data?.class_name} />
          <CardContent sx={{ mt: 0, pt: 0 }}>
            <Grid container spacing={4}>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Course
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.data?.batch_class?.batch?.institute_course?.institute_course_branch?.course_name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Batch
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.data?.batch_class?.batch?.batch_id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Duration
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.data?.batch_class?.batch?.institute_course?.institute_course_branch?.course_duration}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Date
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.data?.class_date}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Sarted At
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.data?.batch_class?.batch?.start_date}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Ended At
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.data?.batch_class?.batch?.end_date}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent sx={{ mt: 0, pt: 0 }}>
            <Grid container spacing={4}>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Instructor
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                    {ClassData?.instructor?.class_staff.map((staff) => (
                      <Tooltip key={staff.id} title={staff.staff.staff_name}>
                        <Avatar
                          src={staff.staff.image_url} // Assuming the image URL is available in the staff object
                          alt={staff.staff.staff_name}
                          sx={{ width: 25, height: 25 }}
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Coordinator
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                    {ClassData?.coordinator?.class_staff.map((staff) => (
                      <Tooltip key={staff.id} title={staff.staff.staff_name}>
                        <Avatar src={staff.staff.image_url} alt={staff.staff.staff_name} sx={{ width: 25, height: 25 }} />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Class Type
                </Typography>
                <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={ClassData?.data?.type}
                    color={userRoleObj[ClassData?.data?.type]}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

StudentViewHeaderCard.propTypes = {
  ClassData: PropTypes.any
};

export default StudentViewHeaderCard;

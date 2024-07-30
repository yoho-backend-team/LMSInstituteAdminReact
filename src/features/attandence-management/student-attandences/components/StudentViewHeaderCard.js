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
  online: 'success',
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
                  {ClassData?.student_class?.course?.course_name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Batch
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.student_class?.batch?.id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Duration
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.student_class?.course?.duration}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Date
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.student_class?.start_date}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Sarted At
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.student_class?.batch?.start_date}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: 'grey.500' }}>
                  Ended At
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {ClassData?.student_class?.batch?.end_date}
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
                    {ClassData?.student_class?.instructors.map((staff) => (
                      <Tooltip key={staff.id} title={staff.full_name}>
                        <Avatar
                          src={staff.image} // Assuming the image URL is available in the staff object
                          alt={staff.full_name}
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
                    {ClassData?.student_class?.coordinators?.map((staff) => (
                      <Tooltip key={staff.id} title={staff.full_name}>
                        <Avatar src={staff.image} alt={staff.full_name} sx={{ width: 25, height: 25 }} />
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
                    label={ClassData?.student_class?.course?.class_type?.[0]}
                    color={userRoleObj[ClassData?.student_class?.course?.class_type?.[0]]}
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

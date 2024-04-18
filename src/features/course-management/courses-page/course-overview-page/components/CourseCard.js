import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import { default as DeleteDialog, default as StatusChangeDialog } from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { updateCourseStatus } from '../../services/courseServices';

const CourseCard = (props) => {
  const { sx, course, setCourseRefetch } = props;
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const imageUrl = course?.logo
    ? `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${course.logo}`
    : 'https://assets.newredo.com/large_image_default_4f2d3c136b.png';

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseStatus(data);
    if (response.success) {
      toast.success(response.message);
      setCourseRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, course) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(course);
  };

  const maxCharacters = 100;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ ...sx }}>
        <CardContent sx={{ pb: 0 }}>
          <CardMedia sx={{ position: 'relative', height: '10.5625rem', borderRadius: '5px', objectFit: 'cover' }} image={imageUrl}>
            <CustomChip
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
                '&.MuiChip-root.MuiChip-rounded': {
                  borderRadius: '0px 4px 0px 10px',
                  height: '2rem'
                }
              }}
              label={course?.learning_format}
              rounded
              color={
                course?.learning_format === 'online'
                  ? 'success'
                  : course?.learning_format === 'offline'
                  ? 'primary'
                  : course?.learning_format === 'hybrid'
                  ? 'secondary'
                  : 'warning'
              }
              size="small"
              variant="outlined"
            />
          </CardMedia>
        </CardContent>
        <CardContent>
          <Box>
            <CustomChip
              sx={{ px: 0, py: 2 }}
              skin="light"
              label={course?.course?.course_categories?.category_name}
              rounded
              color="secondary"
              size="small"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mr: 2, mt: 1, display: 'flex', flexDirection: 'column', height: '50px' }}>
            <Typography
              variant="h4"
              sx={{
                mt: 1.5,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis'
              }}
            >
              {course?.course_name &&
                (course.course_name.length > maxCharacters ? course.course_name.slice(0, maxCharacters) + '...' : course.course_name)}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& svg': { color: 'primary.main', mr: 0.5 }
              }}
            >
              <Icon icon="tabler:augmented-reality" fontSize={20} />
              <Typography sx={{ color: 'text.secondary' }}>{course?.course?.course_module?.length} Modules</Typography>
            </Grid>
            <Grid>
              <Typography variant="h4" sx={{ color: 'text.dark', mr: 1 }}>
                ₹ {course?.course_price}
              </Typography>
            </Grid>
          </Box>
        </CardContent>
        <CardActions className="demo-space-x" sx={{ pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid sx={{ mt: 1 }}>
            <TextField
              size="small"
              select
              sx={{ width: 100 }}
              label="Status"
              SelectProps={{ value: course?.is_active, onChange: (e) => handleStatusValue(e, course) }}
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Button
            component={Link}
            to="courses/view"
            state={{ id: course?.course_id }}
            size="medium"
            variant="contained"
            color="primary"
            sx={{ mt: 0.4, py: 0.8, width: 100 }}
          >
            View
          </Button>
        </CardActions>
      </Card>

      {/* Status Change Modal */}
      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change Status"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />

      {/* Delete Dialogue */}
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
    </Grid>
  );
};
CourseCard.propTypes = {
  course: PropTypes.any,
  sx: PropTypes.any,
  setCourseRefetch: PropTypes.any
};
export default CourseCard;

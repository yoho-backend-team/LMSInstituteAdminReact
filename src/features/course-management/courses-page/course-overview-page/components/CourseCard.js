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
import DeleteDialog from 'components/modal/DeleteModel';
import StatusChangeDialog from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateCourseStatus } from '../../services/courseServices';

const CourseCard = (props) => {
  const { sx, personName, course, setCourseRefetch } = props;
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

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

  return (
    <Grid item xs={12} sm={12} lg={4}>
      <Card sx={{ ...sx }}>
        <CardContent sx={{ pb: 0 }}>
          <CardMedia
            sx={{ position: 'relative', height: '12.5625rem', borderRadius: '5px', objectFit: 'cover' }}
            image={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${course?.logo}`}
          >
            <CustomChip
              sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
              skin="light"
              label={course?.learning_format}
              rounded
              color="primary"
              size="small"
              variant="outlined"
            />
          </CardMedia>
        </CardContent>
        <CardContent>
          <Box>
            <CustomChip
              skin="light"
              label={course?.course?.course_categories?.category_name}
              rounded
              color="secondary"
              size="small"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mr: 2, mt: 2, display: 'flex', flexDirection: 'column' }}>
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
              {course?.course_name}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '13px', pt: 0.7, fontWeight: '400', opacity: 0.9 }}>
              {personName}
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
              <Icon icon="ic:twotone-person" fontSize={20} />
              <Typography sx={{ color: 'text.secondary' }}>{course?.studentCount} Modules</Typography>
            </Grid>
            <Grid>
              <Typography sx={{ color: 'text.secondary' }}>₹ {course?.course_price}</Typography>
            </Grid>
          </Box>
        </CardContent>
        <CardActions className="demo-space-x" sx={{ pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid sx={{ mt: 1 }}>
            <TextField
              size="small"
              select
              width={100}
              label="Status"
              SelectProps={{ value: course?.is_active, onChange: (e) => handleStatusValue(e, course) }}
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Button component={Link} to="view" state={{ id: course?.course_id }} size="medium" variant="contained" color="primary">
            View Details
          </Button>
          {/* <Button component={Link} to={{ pathname: "view", state: { id: course?.course_id } }} size="medium" variant="contained" color="primary">
            View Details
          </Button> */}

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

export default CourseCard;

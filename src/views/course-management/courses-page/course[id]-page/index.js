import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Icon from 'components/icon';
import CourseDeleteModel from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import CourseEditModal from 'features/course-management/courses-page/course-overview-page/components/CourseEditModal';
import Notes from 'features/course-management/courses-page/course-overview-page/components/view-course/notes';
import StudyMaterials from 'features/course-management/courses-page/course-overview-page/components/view-course/studyMaterials';
import { deleteCourse, getCourseDetails } from 'features/course-management/courses-page/services/courseServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const CourseViewPage = () => {
  const [value, setValue] = useState('1');

  const location = useLocation();
  const courseId = location.state?.id;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [courseDeleteModelOpen, setCourseDeleteModelOpen] = useState(false);
  const [selectedCourseDeleteId, setSelectedCourseDeleteId] = useState(null);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [expanded, setExpanded] = useState(null);
  const [course, setCourse] = useState(null);

  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (courseId && selectedBranchId) {
      getCourseData(courseId);
    }
  }, [courseId, selectedBranchId]);

  console.log('course', course);

  const getCourseData = async (id) => {
    const data = {
      course_id: id
    };
    const result = await getCourseDetails(data);
    setCourse(result?.data?.data);
    setVideoUrl(result?.data?.data?.course_module[0].video_url);
  };

  const handleSwitch = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(handleChange);
  console.log(expanded);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = useCallback((itemId) => {
    setSelectedCourseDeleteId(itemId);
    setCourseDeleteModelOpen(true);
    setVideoUrl(null);
  }, []);

  const handleCourseDelete = async () => {
    const data = { id: selectedCourseDeleteId };
    const result = await deleteCourse(data);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const createAccordion = (item) => (
    <Box sx={{ padding: '0px 5px 0px 5px' }} className="courseAccordian">
      <Accordion sx={{ boxShadow: 'none', backgroundColor: '#124076', color: 'white' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} aria-controls="panel1-content" id="panel1-header">
          {item.title}
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'justify' }}>{item.description}</AccordionDetails>
        <AccordionActions>
          <Button
            onClick={() => setVideoUrl(item?.video_url)}
            color="primary"
            variant="contained"
            fullWidth
            sx={{ width: '100%', py: 1.5, borderRadius: '14px' }}
          >
            <PlayCircleIcon className="play-icon" sx={{ mr: 1 }} />
            Preview
          </Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );

  if (!course || !course.course_module) {
    return null;
  }

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={7.5}>
        <Card>
          <ReactPlayer
            style={{ aspectRatio: '12 / 6', objectFit: 'cover', width: '100%', backgroundColor: 'black' }}
            url={videoUrl}
            controls
            autoPlay
            loop
            width="100%"
            height={400}
          />

          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h3">{course?.institute_course_branch?.course_name}</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h5" mb={1}>
                  Description
                </Typography>
                <Typography sx={{ ml: 1 }}>{course?.institute_course_branch?.description}</Typography>
              </Box>
              <Box>
                <CustomChip label={course?.course_categories?.category_name} color="secondary" skin="light" size="small" sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography color="primary" variant="h5" alignItems="center" justifyContent="center" display="flex" gap={1}>
                    <Icon icon="mdi:clock-outline" />
                    <span style={{ marginTop: '4px' }}>Duration</span>
                  </Typography>
                  <Typography variant="h5" sx={{ ml: 1, mt: 0.5 }}>
                    {course?.institute_course_branch?.course_duration}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
                  <Typography sx={{ ml: 1 }} variant="h3">
                    ₹ {course?.institute_course_branch?.course_price}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton onClick={() => handleDelete(course?.id)} color="secondary">
                <Icon icon="mdi:delete-outline" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} lg={4.4}>
        <Card sx={{ pb: 1, backgroundColor: 'secondary.light' }} className="CourseModules-Card">
          <Button
            fullWidth
            onClick={() => handleEdit()}
            variant="contained"
            color="primary"
            startIcon={<Icon icon="mdi:pencil" />}
            sx={{ '&.MuiButtonBase-root': { borderRadius: 0, boxShadow: 'none', pb: 3, pt: 3, position: 'static' } }}
          >
            Edit Course
          </Button>
          <div style={{ overflow: 'auto', height: '73vh' }}>{course?.course_module?.map(createAccordion)}</div>
          {/* Edit Modal */}
          <CourseEditModal selectedBranchId={selectedBranchId} course={course} open={isEditModalOpen} handleEditClose={handleEditClose} />

          {/* Delete Modal */}
          <CourseDeleteModel
            open={courseDeleteModelOpen}
            setOpen={setCourseDeleteModelOpen}
            description="Are you sure you want to delete this Course? "
            title="Delete"
            handleSubmit={handleCourseDelete}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TabContext value={value}>
            <TabList variant="fullWidth" onChange={handleSwitch} aria-label="full width tabs example">
              <Tab value="1" label="Study Materials" />
              <Tab value="2" label="Notes" />
            </TabList>
            <TabPanel value="1">
              <StudyMaterials materials={course?.course_study_materials} />
            </TabPanel>

            <TabPanel value="2">
              <Notes notes={course?.course_notes} />
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseViewPage;

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Icon from 'components/icon';
import CourseEditModal from 'features/course-management/courses-page/course-overview-page/components/CourseEditModal';
import Notes from 'features/course-management/courses-page/course-overview-page/components/view-course/notes';
import StudyMaterials from 'features/course-management/courses-page/course-overview-page/components/view-course/studyMaterials';
import { getCourseDetails } from 'features/course-management/courses-page/services/courseServices';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
// import { deleteCourseCategory } from '../../services/courseCategoryServices';
import { deleteCourse } from 'features/course-management/courses-page/services/courseServices';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import CourseDeleteModel from 'components/modal/DeleteModel';

const CourseViewPage = () => {
  const [value, setValue] = useState('1');

  const location = useLocation();
  const courseId = location.state?.id;
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [courseDeleteModelOpen, setCourseDeleteModelOpen] = useState(false);

  const [selectedCourseDeleteId, setSelectedCourseDeleteId] = useState(null);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  // const [courseRefetch, setCourseRefetch] = useState(false);

  const [expanded, setExpanded] = useState(null);
  const [course, setCourse] = useState(null);

  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    console.log('hello');
    getCourseData(courseId);
  }, [courseId, selectedBranchId]);

  console.log('course', course);

  const getCourseData = async (id) => {
    const data = {
      course_id: id
    };
    const result = await getCourseDetails(data);
    setCourse(result?.data?.data);
  };

  const handleSwitch = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const handlePreview = (url) => {
  //   setVideoUrl(url);
  // };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = useCallback((itemId) => {
    setSelectedCourseDeleteId(itemId);
    setCourseDeleteModelOpen(true);
  }, []);


  // Handle branch deletion
  const handleCourseDelete = async () => {
    const data = { id: selectedCourseDeleteId };
    const result = await deleteCourse(data);
    if (result.success) {
      toast.success(result.message);
      // setCategoryRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };



  const createAccordion = (accordion) => (
    <Grid container xs={12} sx={{ p: 0, m: 0 }}>
      <Accordion
        key={accordion.id}
        expanded={expanded === accordion?.id}
        onChange={handleChange(accordion?.id)}
        sx={{ '&.MuiPaper-root': { borderRadius: '0.5rem', m: 0.5, background: 'none', boxShadow: 'none' } }}
      >
        <Grid item xs={12}>
          <AccordionSummary
            className="course-id-page"
            id={`customized-panel-header-${accordion?.id}`}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`customized-panel-content-${accordion?.id}`}
          >
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, p: 0 }}>
              <Typography variant="h5" sx={{ fontWeight: 100, textAlign: 'justify' }}>
                {accordion?.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <Divider />
        </Grid>

        <AccordionDetails sx={{ p: 0 }}>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'justify' }}>
                    {accordion?.description}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" sx={{ fontWeight: 50, textAlign: 'justify' }}>
                    {accordion?.video_url}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Button onClick={() => setVideoUrl(accordion?.video_url)} variant="tonal" color="primary" fullWidth>
                  <PlayCircleIcon className="play-icon" sx={{ color: 'primary.main' }} />
                  Preview
                </Button>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );

  if (!course || !course.course_module) {
    return null; // Or any other fallback UI
  }

  console.log(videoUrl);

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={12} sm={8}>
        <Card>
          <CardHeader title={course?.institute_course_branch?.course_name} />{' '}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* <video
              // controls
              autoPlay 
              loop
              muted 
              // style={{ aspectRatio: '12 / 6', objectFit: 'cover', width: '100%' }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video> */}
            <CardMedia component="video" controls autoPlay loop muted width="100%" height="auto">
              <source src={videoUrl} type="video/mp4" />
            </CardMedia>

            {/* <iframe
                    title="Your iFrame Title"
                    width="100%"
                    height="300"
                    src= {videoUrl}
                    frameBorder="0"
                    allowFullScreen
                    style={{ borderRadius: '10px' }}
                  ></iframe> */}
          </Box>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              {course?.institute_course_branch?.description}
              <Link to="" sx={{ TextDecoder: 'none', color: 'primary' }}>
                View more
              </Link>
            </Box>
            <Box>
              <IconButton
                onClick={() => handleDelete(course?.id)}
                color="secondary" // Adjust color as needed
              >
                <Icon icon="mdi:delete-outline" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{ pb: 1 }}>
          <Button
            fullWidth
            onClick={() => handleEdit()}
            variant="contained"
            color="primary"
            startIcon={<Icon icon="mdi:pencil" />}
            sx={{ '&.MuiButtonBase-root': { borderRadius: 0, boxShadow: 'none', pb: 3, pt: 3 } }}
          >
            Edit Course
          </Button>
          {course?.course_module?.map(createAccordion)}

          {/* Edit Modal */}
          <CourseEditModal
            selectedBranchId={selectedBranchId}
            // setCourseRefetch={setCourseRefetch}
            course={course}
            open={isEditModalOpen}
            handleEditClose={handleEditClose}
          />

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

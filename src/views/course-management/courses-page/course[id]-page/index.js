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
  CardHeader,
  // CardMedia,
  Grid,
  IconButton,
  Typography
  // List,
  // ListItem,
  // Typography
} from '@mui/material';
import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Icon from 'components/icon';
import CourseEditModal from 'features/course-management/courses-page/course-overview-page/components/CourseEditModal';
import Notes from 'features/course-management/courses-page/course-overview-page/components/view-course/notes';
import StudyMaterials from 'features/course-management/courses-page/course-overview-page/components/view-course/studyMaterials';
import { getCourseDetails } from 'features/course-management/courses-page/services/courseServices';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { deleteCourseCategory } from '../../services/courseCategoryServices';
import { deleteCourse } from 'features/course-management/courses-page/services/courseServices';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import CourseDeleteModel from 'components/modal/DeleteModel';
import ReactPlayer from 'react-player';

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

  const [videoUrl, setVideoUrl] = useState('');

  // useEffect(() => {
  //   console.log('hello');
  //   getCourseData(courseId);
  // }, [courseId, selectedBranchId]);

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
    setVideoUrl(null); // Reset video URL when deleting
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

  const createAccordion = (item) => (
    // <Grid container xs={12}>
    //   <Accordion
    //     key={accordion.id}
    //     expanded={expanded === accordion?.id}
    //     onChange={handleChange(accordion?.id)}
    //     sx={{ '&.MuiPaper-root': { borderRadius: '0.5rem', m: 0.5, background: 'none', boxShadow: 'none' } }}
    //   >
    //     <Grid item xs={12} sx={{ alignItems: 'center', display: 'flex' }}>
    //       <AccordionSummary
    //         className="course-id-page"
    //         id={`customized-panel-header-${accordion?.id}`}
    //         expandIcon={<ExpandMoreIcon />}
    //         aria-controls={`customized-panel-content-${accordion?.id}`}
    //         sx={{ px: 2 }}
    //       >
    //         <Divider />
    //       </AccordionSummary>

    //       <Box sx={{ px: 2 }}>
    //         <Typography variant="h5">{accordion?.title}</Typography>
    //       </Box>
    //     </Grid>

    //     <AccordionDetails sx={{ width: '100%' }}>
    //       <Grid container xs={12}>
    //         <Grid item xs={12}>
    //           <Typography>{accordion?.description}</Typography>
    //         </Grid>
    //         <Grid item xs={12} sx={{ backgroundColor: 'red', width: '100%' }}>
    //           <Button onClick={() => setVideoUrl(accordion?.video_url)} variant="tonal" color="primary" fullWidth sx={{ width: '100%' }}>
    //             <PlayCircleIcon className="play-icon" sx={{ color: 'primary.main' }} />
    //             Preview
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </AccordionDetails>
    //   </Accordion>
    // </Grid>
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          {item.title}
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'justify' }}>{item.description}</AccordionDetails>
        <AccordionActions>
          <Button onClick={() => setVideoUrl(item?.video_url)} variant="tonal" color="primary" fullWidth sx={{ width: '100%' }}>
            <PlayCircleIcon className="play-icon" sx={{ color: 'primary.main', mr: 1 }} />
            Preview
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );

  if (!course || !course.course_module) {
    return null; // Or any other fallback UI
  }

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={7.5}>
        <Card>
          <CardHeader title={course?.institute_course_branch?.course_name} />{' '}
          <Box>
            <ReactPlayer
              style={{ aspectRatio: '12 / 6', objectFit: 'cover', width: '100%', backgroundColor: 'black' }}
              url={videoUrl}
              controls
              autoPlay
              loop
              width="100%"
              height={400}
            />
          </Box>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end',mt:1 }}>
                <Typography variant="h5">Category:</Typography>
                <Typography sx={{ ml: 1 }}>{course?.course_categories?.category_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end',mt:1 }}>
                <Typography variant="h5">Course Price :</Typography>
                <Typography sx={{ ml: 1 }}>{course?.institute_course_branch?.course_price}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end',mt:1 }}>
                <Typography variant="h5">Course Duration :</Typography>
                <Typography sx={{ ml: 1 }}>{course?.institute_course_branch?.course_duration}</Typography>
              </Box>
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
      <Grid item xs={12} sm={12} lg={4.4}>
        <Card sx={{ pb: 1 }} className="CourseModules-Card">
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
          <div style={{ overflow: 'auto', height: '69vh' }}>{course?.course_module?.map(createAccordion)}</div>
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

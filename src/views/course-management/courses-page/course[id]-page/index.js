import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import CourseEditModal from 'features/course-management/courses-page/course-overview-page/components/CourseEditModal';
import { useState } from 'react';
import StudyMaterials from 'features/course-management/courses-page/course-overview-page/components/view-course/studyMaterials';
import Notes from 'features/course-management/courses-page/course-overview-page/components/view-course/notes';
import { useLocation } from 'react-router-dom';
import { getCourseDetails } from 'features/course-management/courses-page/services/courseServices';
import { useEffect } from 'react';

const CourseViewPage = () => {
  const [value, setValue] = useState('1');

  const location = useLocation();
  const courseId = location.state.id;

  const [expanded, setExpanded] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    console.log('hello');
    getCourseData(courseId);
  }, [courseId]);

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
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const createAccordion = (accordion) => (
    <Grid container xs={12} sx={{ p: 0, m: 0 }}>
      <Accordion
        key={accordion.id}
        expanded={expanded === accordion.id}
        onChange={handleChange(accordion.id)}
        sx={{ '&.MuiPaper-root': { borderRadius: '0.5rem', m: 0.5, background: 'none', boxShadow: 'none' } }}
      >
        <Grid item xs={12}>
          <AccordionSummary
            className="course-id-page"
            id={`customized-panel-header-${accordion.id}`}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`customized-panel-content-${accordion.id}`}
          >
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, p: 0 }}>
              <Typography variant="p">{accordion.title}</Typography>
            </Box>
          </AccordionSummary>
          <Divider />
        </Grid>

        <AccordionDetails sx={{ p: 0 }}>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <Typography variant="subtitle1" sx={{ color: 'dark.main', fontWeight: 50, textAlign: 'justify' }}>
                    {accordion?.description}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Button variant="tonal" color="primary" fullWidth>
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

  // console.log(course);

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={12} sm={8}>
        <Card>
          <CardHeader title={course?.institute_course_branch?.course_name} />{' '}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <video
              controls
              autoPlay
              loop
              muted
              poster="https://assets.codepen.io/6093409/river.jpg"
              style={{ aspectRatio: '12 / 6', objectFit: 'cover', width: '100%' }}
            >
              <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
            </video>
          </Box>
          <CardContent>
            {course?.institute_course_branch?.description}
            <Link to="" sx={{ TextDecoder: 'none', color: 'primary' }}>
              View more
            </Link>
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

          <CourseEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
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
              <Notes />
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseViewPage;

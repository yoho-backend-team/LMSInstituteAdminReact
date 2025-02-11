import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CodeIcon from '@mui/icons-material/Code';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardActions,
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
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from 'utils/imageUtils';

const CourseViewPage = () => {
  const [value, setValue] = useState('1');
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.id;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [courseDeleteModelOpen, setCourseDeleteModelOpen] = useState(false);
  const [selectedCourseDeleteId, setSelectedCourseDeleteId] = useState(null);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [refetch, setRefetch] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [course, setCourse] = useState(null);

  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (courseId && selectedBranchId) {
      getCourseData(courseId);
    }
  }, [courseId, selectedBranchId, refetch]);


  const getCourseData = async (id) => {
    const data = {
    id: id,
    category:"39cab3db-4c46-4685-aab8-99a4b4375d50"
    };
    const result = await getCourseDetails(data);
    setCourse(result?.data?.data);
    setVideoUrl(result?.data?.data?.course_module?result?.data?.data?.course_module[0]?.video_url:"https://youtu.be/7CqJlxBYj-M?si=FVmXcY6AODVxpu7V");
  };

  const handleSwitch = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = useCallback((course) => {
    setSelectedCourseDeleteId(course);
    setCourseDeleteModelOpen(true);
    setVideoUrl(null);
  }, []);

  const handleCourseDelete = async () => {
    const data = { id: course.uuid,category:course.category.uuid };
    const result = await deleteCourse(data);
    if (result.success) {
      toast.success(result.message);
      navigate(-1);
    } else {
      toast.error(result.message);
    }
  };

  const createAccordion = (item) => (
    <Box key={item.id} sx={{ padding: '0px 5px 0px 5px' }} className="courseAccordian">
      <Accordion sx={{ boxShadow: 'none', backgroundColor: '#124076', color: 'white' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} aria-controls="panel1-content" id="panel1-header">
          {item.title}
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'justify' }}>{item.description}</AccordionDetails>
        <AccordionActions>
          <Button
            onClick={() => setVideoUrl(item?.video)}
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

  // if (!course || !course.course_module) {
  //   return null;
  // }
  console.log(course,"course")
  return (
    <Grid container xs={12} item spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={7.5}>
      <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
  <Box sx={{ position: 'relative', backgroundColor: 'black' }}>
    {/* Video/Image Section */}
    <img
      alt={course?.course_name}
      loading="lazy"
      style={{ width: '100%', height: '300px', objectFit: 'cover' }}
      src={getImageUrl(course?.thumbnail ? course?.thumbnail : course?.image)}
    />
  </Box>

  <CardContent sx={{ padding: 3, position: 'relative' }}>

  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <Typography variant="h1" fontWeight="bold" gutterBottom>
      {course?.course_name}
    </Typography>

    <Typography variant="h3" color="primary" fontWeight="bold" sx={{mb:3}}>
        ₹ {course?.price ? course?.price : course?.current_price}
      </Typography>
        
    </Box>

    <Typography variant="h5" color="gray" gutterBottom>
      {course?.description}
    </Typography>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 2 }}>
      
       <CustomChip  icon={<CodeIcon fontSize="small" sx={{ mr: 0 }}/>} label={course?.category?.category_name} color="secondary" skin="light" size="small"  sx={{ '.MuiChip-label': { pl: 1 } }} />
    </Box>


      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 ,mt:2}}>
<Box sx={{display:'flex'}}>
        <Icon icon="mdi:clock-outline" style={{ fontSize: '20px'}} />
        <Typography variant="body1" color="text.secondary" sx={{ml:1 }}>
          Duration:
        </Typography>
        <Typography variant="body1" fontWeight="medium">
          {course?.duration}
        </Typography>
</Box>

<Box>
  <IconButton
      onClick={() => handleDelete(course)}
      color="error"
      sx={{ 
        backgroundColor: 'rgba(255,0,0,0.1)', 
        '&:hover': { backgroundColor: 'rgba(255,0,0,0.2)' } 
      }}
    >
      <Icon icon="mdi:delete-outline" style={{ fontSize: '20px' }} />
    </IconButton>
</Box>

      </Box>

    

  

  </CardContent>
</Card>

      </Grid>
       <Grid item xs={12}  sm={12} lg={4.4}>
        <Card sx={{ pb: 1, backgroundColor: 'secondary.light', height: "100%" }} className="CourseModules-Card">
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
          <div style={{ overflow: 'auto', height: 'auto' }}>{course?.coursemodules?.map(createAccordion)}</div>
          {/* Edit Modal */}
          <CourseEditModal
            setRefetch={setRefetch}
            selectedBranchId={selectedBranchId}
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
              <StudyMaterials materials={course?.studymaterials} />
            </TabPanel> 

            <TabPanel value="2">
              <Notes notes={course?.notes} />
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseViewPage;

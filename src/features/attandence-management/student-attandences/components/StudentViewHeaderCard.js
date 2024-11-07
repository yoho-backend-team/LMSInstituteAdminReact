import { IconButton } from '@mui/material';
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
import { MdOutlineOndemandVideo, MdAccessTime, MdDateRange, MdPerson, MdOutlineClass } from 'react-icons/md';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';

const iconBoxStyles = {
  width: 56,
  height: 56,
};

const iconStyles = {
  width : 38,
  height : 38
}

const containerStyles = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  borderRadius: '8px',
  p: "16px",
  backgroundColor: 'white',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease',
  "& .MuiGrid-item": { 
                    paddingLeft: "16px", 
                    paddingTop: "16px" 
                  },
  '&:hover': {
    transform: 'translateY(-5px)',
  },
};

const labelStyle = {
  color: '#676B7B',
  fontWeight: 500,
  mb: ".25rem"
};

const valueStyle = {
  mt: 1,
  color: '#666CFF',
  fontWeight: 'bold',
};

const backgroundColors = {
  course: '#E7E7FF',
  batch: '#E7F3FF',
  duration: '#FFF0E7',
  date: '#E7FFF4',
  instructor: '#FFE7E7',
  coordinator: '#FFF5E7',
  classType: '#E7E7FF',
};

const userRoleObj = {
  online: 'success',
  offline: 'secondary'
};

const StudentViewHeaderCard = ({ ClassData }) => {
  const naviate = useNavigate()

  const handleBack = () => {
    naviate(-1)
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center",pb: "24px"}}>
              <IconButton onClick={handleBack} sx={{ borderRadius: "50%", width: "56px", height: "56px"}} title='back'  >
                  <IoArrowBackCircleOutline style={{ width: 38, height: 38}} />
              </IconButton>
              <Typography variant='h3'>
                 {ClassData?.student_class?.class_name}
              </Typography>
          </Box>
            <Grid container spacing={4} sx={{ padding: "24px", gap: "24px"}}>
              {/* Course Section */}
              <Grid  xs={6} sm={4} md={1.793} sx={{ ...containerStyles, 
                              "&.MuiGrid-root .MuiGrid-item": { 
                    paddingLeft: "16px", 
                    paddingTop: "16px" 
                  }
                 }}>
                <Box
                  sx={{
                    ...iconBoxStyles,
                    backgroundColor: backgroundColors.course,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MdOutlineOndemandVideo style={iconStyles} color='#7479FF' />
                </Box>
                <Box>
                  <Typography variant="h5" sx={labelStyle}>
                    Course
                  </Typography>
                  <Typography variant="h5" sx={valueStyle}>
                    {ClassData?.student_class?.course?.course_name}
                  </Typography>
                </Box>
              </Grid>

              {/* Batch Section */}
              <Grid  xs={6} sm={4} md={1.793} sx={{ ...containerStyles }}>
                <Box
                  sx={{
                    ...iconBoxStyles,
                    backgroundColor: backgroundColors.batch,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MdOutlineClass style={iconStyles} color='#4CAF50' />
                </Box>
                <Box>
                  <Typography variant="h5" sx={labelStyle}>
                    Batch
                  </Typography>
                  <Typography variant="h5" sx={valueStyle}>
                    {ClassData?.student_class?.batch?.id}
                  </Typography>
                </Box>
              </Grid>

              {/* Duration Section */}
              <Grid  xs={6} sm={4} md={1.793} sx={{ ...containerStyles }}>
                <Box
                  sx={{
                    ...iconBoxStyles,
                    backgroundColor: backgroundColors.duration,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MdAccessTime style={iconStyles} color='#FF8A65' />
                </Box>
                <Box>
                  <Typography variant="h5" sx={labelStyle}>
                    Duration
                  </Typography>
                  <Typography variant="h5" sx={valueStyle}>
                    {ClassData?.student_class?.course?.duration}
                  </Typography>
                </Box>
              </Grid>

              {/* Date Section */}
              <Grid  xs={6} sm={4} md={1.793} sx={{ ...containerStyles }}>
                <Box
                  sx={{
                    ...iconBoxStyles,
                    backgroundColor: backgroundColors.date,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MdDateRange style={iconStyles} color='#4CAF50' />
                </Box>
                <Box>
                  <Typography variant="h5" sx={labelStyle}>
                    Date
                  </Typography>
                  <Typography variant="h5" sx={valueStyle}>
                    {ClassData?.student_class?.start_date}
                  </Typography>
                </Box>
              </Grid>

              {/* Instructor Section */}
              <Grid  xs={6} sm={4} md={1.793} sx={{ ...containerStyles }}>
                <Box
                  sx={{
                    ...iconBoxStyles,
                    backgroundColor: backgroundColors.instructor,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MdPerson style={iconStyles} color='#E57373' />
                </Box>
                <Box>
                  <Typography variant="h5" sx={labelStyle}>
                    Instructor
                  </Typography>
                  <AvatarGroup>
                    {ClassData?.student_class?.instructors.map((staff) => (
                      <Tooltip key={staff.id} title={staff.full_name}>
                        <Avatar src={staff.image} alt={staff.full_name} sx={{ width: 25, height: 25 }} />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </Box>
              </Grid>

              {/* Class Type Section */}
              <Grid  xs={6} sm={4} md={1.793} sx={{ ...containerStyles }}>
                <Box
                  sx={{
                    ...iconBoxStyles,
                    backgroundColor: backgroundColors.classType,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MdOutlineClass style={iconStyles} color='#7479FF' />
                </Box>
                <Box>
                  <Typography variant="h5" sx={labelStyle}>
                    Class Type
                  </Typography>
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={ClassData?.student_class?.course?.class_type?.[0]}
                    color={userRoleObj[ClassData?.student_class?.course?.class_type?.[0]]}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Grid>
            </Grid>
      </Grid>
    </Grid>
  );
};

StudentViewHeaderCard.propTypes = {
  ClassData: PropTypes.any,
};

export default StudentViewHeaderCard;

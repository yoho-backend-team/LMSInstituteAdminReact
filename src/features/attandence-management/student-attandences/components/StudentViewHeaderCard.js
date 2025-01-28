import React from 'react';
import { Box, Typography, IconButton, Grid, Avatar } from '@mui/material';
import { AvatarGroup } from '@mui/material';
import PropTypes from 'prop-types';
import { MdOutlineOndemandVideo, MdAccessTime, MdDateRange, MdPerson, MdOutlineClass } from 'react-icons/md';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import CustomChip from 'components/mui/chip';
import { borderRadius } from '@mui/system';

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '16px',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)'
  }
};

const iconBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  marginBottom: '8px'
};

const labelStyle = {
  color: 'black',
  fontWeight: 900,
  fontSize: 18,
  textAlign: 'center'
};

const valueStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#3F51B5',
  textAlign: 'center'
};

const backgroundColors = {
  course: '#E8F0FE',
  batch: '#E3F2FD',
  duration: '#FFF8E1',
  date: '#E8F5E9',
  instructor: '#FFEBEE',
  classType: '#EDE7F6'
};

const userRoleObj = {
  online: 'success',
  offline: 'secondary'
};

const StudentViewHeaderCard = ({ ClassData }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" marginBottom="24px" sx={{boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)'}}>
          <IconButton onClick={handleBack} title="Go Back">
            <IoArrowBackCircleOutline size={38} />
          </IconButton>
          <Typography variant="h4" style={{ marginLeft: '16px', fontWeight: 'bold' }}>
            {ClassData?.student_class?.class_name}
          </Typography>
        </Box>
      </Grid>

      <Grid container spacing={5}>
        {/* Course Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={containerStyles}>
            <Box sx={{ ...iconBoxStyles, backgroundColor: backgroundColors.course }}>
              <MdOutlineOndemandVideo size={32} color="#3F51B5" />
            </Box>
            <Typography sx={labelStyle}>Course</Typography>
            <Typography sx={valueStyle}>{ClassData?.student_class?.course?.course_name || 'N/A'}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={containerStyles}>
            <Box sx={{ ...iconBoxStyles, backgroundColor: backgroundColors.batch }}>
              <MdOutlineClass size={32} color="#4CAF50" />
            </Box>
            <Typography sx={labelStyle}>Batch</Typography>
            <Typography
              sx={{
                ...valueStyle,
                backgroundColor: 'lightskyblue',
                color:'purple',
                paddingTop: 1,
                paddingBottom: 1,
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 20
              }}
            >
              {ClassData?.student_class?.batch?.id || 'N/A'}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={containerStyles}>
            <Box sx={{ ...iconBoxStyles, backgroundColor: backgroundColors.duration }}>
              <MdAccessTime size={32} color="#FF8A65" />
            </Box>
            <Typography sx={labelStyle}>Duration</Typography>
            <Typography
              sx={{
                ...valueStyle,
                backgroundColor: 'lightskyblue',
                color:'purple',
                paddingTop: 1,
                paddingBottom: 1,
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 20
              }}
            >
              {ClassData?.student_class?.course?.duration || 'N/A'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={containerStyles}>
            <Box sx={{ ...iconBoxStyles, backgroundColor: backgroundColors.date }}>
              <MdDateRange size={32} color="#4CAF50" />
            </Box>
            <Typography sx={labelStyle} style={{ fontWeight: 'bold', fontSize: 15 }}>Start Date</Typography>
            <Typography sx={valueStyle} style={{ fontSize: 10 }}>{ClassData?.student_class?.start_date || 'N/A'}</Typography>
          </Box>
        </Grid>

        {/* Instructor Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={containerStyles}>
            <Box sx={{ ...iconBoxStyles, backgroundColor: backgroundColors.instructor }}>
              <MdPerson size={32} color="#E57373" />
            </Box>
            <Typography sx={labelStyle}>Instructor(s)</Typography>
            <AvatarGroup max={4}>
              {ClassData?.student_class?.instructors?.map((staff) => (
                <Avatar key={staff.id} alt={staff.full_name} src={staff.image} />
              ))}
            </AvatarGroup>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={containerStyles}>
            <Box sx={{ ...iconBoxStyles, backgroundColor: backgroundColors.classType }}>
              <MdOutlineClass size={32} color="#3F51B5" />
            </Box>
            <Typography sx={labelStyle}>Class Type</Typography>
            <CustomChip
              label={ClassData?.student_class?.course?.class_type?.[0] || 'N/A'}
              color={userRoleObj[ClassData?.student_class?.course?.class_type?.[0]] || 'default'}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

StudentViewHeaderCard.propTypes = {
  ClassData: PropTypes.object.isRequired
};

export default StudentViewHeaderCard;

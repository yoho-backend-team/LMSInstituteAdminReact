import MuiTimeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import OptionsMenu from 'components/option-menu';
import { useState, useEffect } from 'react';
import { getUserActivityLog } from 'features/user-management/users-page/services/userServices';
import Pagination from '@mui/material/Pagination';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Chip } from '@mui/material';

const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
});

const UserViewAccount = ({ id }) => {
  const [activityLog, setActivityLog] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number


  useEffect(() => {
    setCurrentPage(1);
    getUserLog(id, '1');
  }, [id]);

  const getUserLog = async (userId, page) => {
    console.log('User ID:', userId, 'Page:', page);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Authentication token is missing!');
        toast.error('Authentication token is missing!');
        return;
      }

      console.log('Token:', token);

      const response = await axios.get(`https://lms-node-backend-v1.onrender.com/api/institutes/user/activity`, {
        params: { user_id: userId, page: page },
        headers: { Authorization: `Bearer ${'Token ' + token}` }
      });
      console.log(response.data.pagination.totalPages);
      
      console.log(response.data.data);

      if (response.data.status === 'success') {
        setActivityLog(response.data); // Update your state
        setTotalPages(response.data.pagination.totalPages); // Total pages from API response
        setCurrentPage(page); // Update current page
        toast.success(response.data?.message);
        return;
      }
    } catch (error) {
      if (error.response) {
        console.error('Response Error:', error.response.data);
        console.error('Status:', error.response.status);
        toast.error(error.response.data?.message || 'Server responded with an error');
      } else if (error.request) {
        console.error('Request Error:', error.request);
        toast.error('No response received from the server');
      } else {
        console.error('Error Message:', error.message);
        toast.error('An error occurred: ' + error.message);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <Card>
          <CardHeader
            title="User Activity Timeline"
            action={
              <OptionsMenu
                options={['Share timeline', 'Suggest edits', 'Report bug']}
                iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
              />
            }
          />
          <CardContent sx={{ height: '24em',  overflow: 'scroll' }}>
            <Timeline>
              {activityLog?.data?.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="warning" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ mb: (theme) => `${theme.spacing(3)} !important` }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Chip  color='primary' label={item.title}/>                      
                      
                    </Box>
                    <Box
                      sx={{
                        p: 3, // Padding
                        border: '1px solid #e0e0e0', // Subtle border for structure
                        borderRadius: 4, // Rounded corners for modern look
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                        backgroundColor: '#ffffff', // Clean white background
                        maxWidth: '450px', // Restrict width for compactness
                        margin: 'auto', // Center alignment
                        mt: 3, // Margin-top for spacing
                        '&:hover': {
                          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' // Slight hover effect
                        }
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2, // Margin-bottom
                          color: '#3f51b5', // Primary color
                          fontWeight: 'bold' // Bold text
                        }}
                      >
                        {item.model}
                      </Typography>
                      <Typography variant="body1" sx={{
                          color: '#616161', // Neutral text color
                          lineHeight: 1.6 // Better readability
                        }}>
                        {item.action}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#616161', // Neutral text color
                          lineHeight: 1.6 // Better readability
                        }}
                      >
                        {item.details}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {new Date(item?.timestamp).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true // Use false for 24-hour format
                        })}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
            <Grid container justifyContent="center" mt={2}>
              <div className="demo-space-y">
              <Pagination
                count={totalPages} // Total pages from state
                page={currentPage} // Current page from state
                color="primary"
                onChange={(e, page) => {
                  setCurrentPage(page);
                  getUserLog(id, page); // Fetch new page data
                }}
              />
              </div>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserViewAccount;

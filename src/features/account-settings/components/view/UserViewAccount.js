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
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
});

const UserViewAccount = ({ id }) => {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
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

      const response = await axios.get('https://lms-node-backend-v1.onrender.com/api/institutes/user/activity', {
        params: { user_id: userId, page: page },
        headers: { Authorization: `Bearer ${'Token ' + token}` }
      });
      console.log(response.data.data);

      if (response.data.status === 'success') {
        setActivityLog(response.data); // Update your state
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
          <CardContent sx={{height:'24em', overflow:"scroll"}}>
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
                      <Typography variant="h5" sx={{ mr: 2 }}>
                        {item.action}
                      </Typography>
                      <Typography variant="" sx={{ mr: 2 }}>
                        {item.model}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {new Date(item?.updatedAt).toLocaleString('en-US', {
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
                    <Typography variant='body2'  sx={{ m: 1 }}>
                      {item.details}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
            <Grid container justifyContent="flex-end" mt={2}>
              <div className="demo-space-y">
                <Pagination
                  count={activityLog?.last_page}
                  color="primary"
                  onChange={async (e, page) => {
                    getUserLog(id, page);
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

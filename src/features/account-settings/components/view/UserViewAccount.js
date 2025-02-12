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
    try {
      const data = {
        user_id: userId,
        page: page
      };
      const result = await getUserActivityLog(data);
      if (result.success) {
        setActivityLog(result.data);
      } else {
        toast.error(result?.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
          <CardContent>
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
                      <Typography variant="h6" sx={{ mr: 2 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {item?.ago}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {item.description}
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

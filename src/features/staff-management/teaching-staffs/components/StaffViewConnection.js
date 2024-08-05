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
import  Pagination  from '@mui/material/Pagination';
import { getUserActivityLog , getStaffActivityLogs} from 'features/user-management/users-page/services/userServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
});

const UserViewConnection = ({ activity }) => {
  const [activityLog, setActivityLog] = useState(null);
  const [page,setPage] = useState(1)

  const getLogs = async (data) => {
    try {
      const response = await getStaffActivityLogs(data) 
      console.log(response,"response")
      setActivityLog(response) 
    } catch (error) {
      toast.error(error?.message)
    }
  }

  useEffect(() => {
    const params = { staff : activity}
    getLogs(params)
  },[])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="User Activity Timeline"
            // action={
            //   <OptionsMenu
            //     options={['Share timeline', 'Suggest edits', 'Report bug']}
            //     iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
            //   />
            // }
          />
          <CardContent>
            <Timeline>
              {activityLog?.logs?.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="success" />
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
                        {new Date(item?.timestamp).toLocaleDateString()+" - " + new Date(item.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      {item.details}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
          {
         activityLog?.last_page !== 1 && <Box 
          sx={{ display : "flex", justifyContent : "end", py: "10px"}}
          >
            <Pagination 
            count={activityLog?.last_page}
            onChange={async (e,page) => {
              setPage(page)
              const params = { staff : activity,page : page }
              await getLogs(params)
            }}
            />
          </Box>
          }
        </Card>
      </Grid>
    </Grid>
  );
};

UserViewConnection.propTypes = {
  id: PropTypes.any
};

export default UserViewConnection;

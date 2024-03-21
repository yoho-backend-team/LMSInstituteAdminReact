import { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from 'components/mui/avatar';
import { Box, Grid } from '@mui/material';
import { getAllNotificationsByAuth } from 'features/notification-management/all-notifications/services/allNotificationServices';
import { useSelector } from 'react-redux';

const AllNotifications = () => {
  // const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  // ** State
  const [value, setValue] = useState('1');
  const [allreadNotifications, setAllreadNotifications] = useState('');
  // const [readNotifications,setreadnotifications]=useState('')
  const [unreadNotifications, setUnreadNotifications] = useState('');
  const [allNotifcations, setAllNotifcations] = useState('');

  // Fetch course categories on component mount or when dependencies change

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      status: 'read'
    };
    getAllReadNotificationDataByAuth(data);
  }, [selectedBranchId]);

  const getAllReadNotificationDataByAuth = async (data) => {
    // setLoading(true)

    const result = await getAllNotificationsByAuth(data);
    if (result.success) {
      setAllreadNotifications(result?.data);
      // setLoading(false)
    }
    // setLoading(false)
  };
  console.log('allreadNotifications', allreadNotifications);

  //unreadNotifications
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      status: 'un-read'
    };
    getAllUnreadNotificationDataByAuth(data);
  }, [selectedBranchId]);

  const getAllUnreadNotificationDataByAuth = async (data) => {
    // setLoading(true)

    const result = await getAllNotificationsByAuth(data);
    if (result.success) {
      setUnreadNotifications(result?.data);
      // setLoading(false)
    }
    // setLoading(false)
  };
  console.log('unreadNotifications', unreadNotifications);

  //allNotifications
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      status: 'un-read'
    };
    getAllNotificationDataByAuth(data);
  }, [selectedBranchId]);

  const getAllNotificationDataByAuth = async (data) => {
    // setLoading(true)

    const result = await getAllNotificationsByAuth(data);
    if (result.success) {
      setAllNotifcations(result?.data);
      // setLoading(false)
    }
    // setLoading(false)
  };
  console.log('unreadNotifications', unreadNotifications);

  return (
    <>
      <Card>
        <CardHeader title="Notifications" />
        <CardContent sx={{ mt: 0, pt: 0 }}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="nav tabs example">
              <Tab value="1" label="Read" />
              <Tab value="2" label="Unread" />
              <Tab
                value="3"
                label="All"
                // allNotifications={allNotifications}
                // setLoading={setLoading}

                selectedBranchId={selectedBranchId}
              />
            </TabList>

            <TabPanel value="1">
              <Grid container spacing={3}>
                {[...allreadNotifications]?.map((item) => (
                  <Grid item xs={12} key={item}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src="/vuexy-nextjs-admin-template/demo-1/images/avatars/1.png" alt="Victor Anderson" />
                        <Box>
                          <Typography variant="h4">{item?.title}</Typography>
                          <Typography fontSize={12} variant="body2" sx={{ color: 'grey.500', mt: 1 }}>
                            {item?.body}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography fontSize={12} variant="body2">
                        33 minutes ago
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value="2">
              <Grid container spacing={3}>
                {[...unreadNotifications]?.map((item) => (
                  <Grid item xs={12} key={item}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src="/vuexy-nextjs-admin-template/demo-1/images/avatars/1.png" alt="Victor Anderson" />
                        <Box>
                          <Typography variant="h4">{item?.title}</Typography>
                          <Typography fontSize={12} variant="body2" sx={{ color: 'grey.500', mt: 1 }}>
                            {item?.body}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography fontSize={12} variant="body2">
                        33 minutes ago
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value="3">
              <Grid container spacing={3}>
                {[...allNotifcations].map((item) => (
                  <Grid item xs={12} key={item}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src="/vuexy-nextjs-admin-template/demo-1/images/avatars/1.png" alt="Victor Anderson" />
                        <Box>
                          <Typography variant="h4">{item.title}</Typography>
                          <Typography fontSize={12} variant="body2" sx={{ color: 'grey.500', mt: 1 }}>
                            {item.body}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography fontSize={12} variant="body2">
                        33 minutes ago
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  );
};

export default AllNotifications;

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
  const [allNotifications, setAllNotifications] = useState('');
  // const [readNotifications,setreadnotifications]=useState('')
  // const [unreadNotifications,setUnreadNotifications]=useState('')

  // Fetch course categories on component mount or when dependencies change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getAllNotificationDataByAuth(data);
  }, [selectedBranchId]);

  const getAllNotificationDataByAuth = async () => {
    // setLoading(true)
    const data = { branch_id: selectedBranchId };
    const result = await getAllNotificationsByAuth(data);
    if (result.success) {
      setAllNotifications(result.data);
      // setLoading(false)
    }
    // setLoading(false)
  };
  console.log('allNotifications', allNotifications);

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
                allNotifications={allNotifications}
                // setLoading={setLoading}

                selectedBranchId={selectedBranchId}
              />
            </TabList>

            <TabPanel value="1">
              <Grid container spacing={3}>
                {[...Array(10).keys()].map((item) => (
                  <Grid item xs={12} key={item}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src="/vuexy-nextjs-admin-template/demo-1/images/avatars/1.png" alt="Victor Anderson" />
                        <Box>
                          <Typography variant="h4">Michael just purchased</Typography>
                          <Typography fontSize={12} variant="body2" sx={{ color: 'grey.500', mt: 1 }}>
                            Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
                            cake caramels brownie gummies.
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
                {[...Array(5).keys()].map((item) => (
                  <Grid item xs={12} key={item}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src="/vuexy-nextjs-admin-template/demo-1/images/avatars/1.png" alt="Victor Anderson" />
                        <Box>
                          <Typography variant="h4">Michael just purchased</Typography>
                          <Typography fontSize={12} variant="body2" sx={{ color: 'grey.500', mt: 1 }}>
                            Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
                            cake caramels brownie gummies.
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
                {[...Array(5).keys()].map((item) => (
                  <Grid item xs={12} key={item}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src="/vuexy-nextjs-admin-template/demo-1/images/avatars/1.png" alt="Victor Anderson" />
                        <Box>
                          <Typography variant="h4">Michael just purchased</Typography>
                          <Typography fontSize={12} variant="body2" sx={{ color: 'grey.500', mt: 1 }}>
                            Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
                            cake caramels brownie gummies.
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

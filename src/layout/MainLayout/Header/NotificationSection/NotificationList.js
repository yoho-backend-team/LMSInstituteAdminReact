import { Avatar, Box, Button, Chip, Divider, Grid, List, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CustomChip from 'components/mui/chip';
import { getLastNotifications } from 'features/notification-management/all-notifications/services/allNotificationServices';
import { useEffect, useState } from 'react';

const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: theme.spacing(2),
  '&:hover': {
    background: theme.palette.primary.light
  }
}));

const NotificationList = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { status: ' ' };
        const result = await getLastNotifications(data);
        if (result.success) {
          setNotifications(result.data);
        } else {
          console.error('Failed to fetch notifications:', result.error);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    return status === 'unread' ? 'error' : 'success';
  };

  return (
    <List sx={{ width: '100%', maxWidth: 330, py: 0, borderRadius: '10px' }}>
      {notifications.map((notification, index) => (
        <ListItemWrapper key={index}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar>
                <Avatar src={notification.image || ''} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1">{notification.title}</Typography>
                <Typography variant="body2">{notification.body}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* <Typography variant="contained">{notification.status}</Typography> */}

              <CustomChip
                rounded
                variant="tonal"
                color={getStatusColor(notification.status)}
                skin="light"
                label={notification.status}
                sx={{ mb: 1, mt: 1 }}
                size="x-small"
              />
            </Box>
          </Box>
          <Grid container alignItems="center">
            {notification.chips &&
              notification.chips.map((chip, index) => (
                <Grid item key={index} sx={{ margin: theme.spacing(0.5) }}>
                  <Chip label={chip.label} />
                </Grid>
              ))}
            {notification.buttons && (
              <Grid item>
                <Button variant="contained">{notification.buttons.label}</Button>
              </Grid>
            )}
          </Grid>
          <Divider />
        </ListItemWrapper>
      ))}
    </List>
  );
};

export default NotificationList;

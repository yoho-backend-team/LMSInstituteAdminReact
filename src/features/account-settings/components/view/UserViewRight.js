import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import { useEffect, useState } from 'react';
import UserViewAccount from './UserViewAccount';
import UserViewSecurity from './UserViewSecurity';
import UserViewLeft from './UserViewLeft';
import TimelineIcon from '@mui/icons-material/Timeline';
import { fontSize } from '@mui/system';
import UserEditDialog from '../UserEditDialog';
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}));

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(2),
    margin: `${theme.spacing(1, 1, 1, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

const UserViewRight = ({ userData, id, setRefetch }) => {
  const tab = 'account';
  const [activeTab, setActiveTab] = useState('account');
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleChange = (event, value) => {
    setActiveTab(value);
  };
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <Grid container spacing={1}>
      <TabContext value={activeTab}>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Box
            sx={{
              ml: { xs: 0, sm: 2 },
              height: { xs: 'auto', sm: '75vh' },
              p: { xs: 2, sm: 3 }
            }}
          >
            <TabList
              orientation={isSmallScreen ? 'horizontal' : 'vertical'}
              variant={isSmallScreen ? 'scrollable' : 'none'}
              onChange={handleChange}
              aria-label="responsive tabs example"
              sx={{
                backgroundColor: 'white',
                height: { sm: '100%' },
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                borderRadius: 3
              }}
            >
              <Tab
                sx={{ mt: 1, backgroundColor: '#f3f4f6', mr: { sm: 2, md: 0 } }}
                value="account"
                label="Account"
                icon={<Icon fontSize="1.125rem" icon="tabler:user-check" />}
              />
              <Tab
                sx={{ mt: 1, ml: { xs: 2, sm: 0 }, backgroundColor: '#f3f4f6', mr: { sm: 2, md: 0 } }}
                value="security"
                label="Security"
                icon={<Icon fontSize="1.125rem" icon="tabler:lock" />}
              />
              <Tab
                sx={{ mt: 1, ml: { xs: 2, sm: 0 }, backgroundColor: '#f3f4f6', mr: { sm: 2, md: 0 } }}
                value="Timeline"
                label="Timeline"
                icon={<Icon fontSize="1.125rem" icon="mdi:chart-timeline-variant-shimmer" />}
              />
            </TabList>
          </Box>
        </Grid>

        {/* Content */}
        <Grid item xs={12} sm={8} md={9} mt={3}>
          <TabPanel value="account">
            <UserViewLeft id={id} userData={userData} setRefetch={setRefetch} />
          </TabPanel>
          <TabPanel value="security">
            <UserViewSecurity id={id} />
          </TabPanel>
          <TabPanel value="Timeline">
            <UserViewAccount id={id} />
          </TabPanel>
        </Grid>
      </TabContext>
    </Grid>
  );
};

export default UserViewRight;

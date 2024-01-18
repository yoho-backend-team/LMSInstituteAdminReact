// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';
import MuiTabList from '@mui/lab/TabList';

// ** Icon Imports
import Icon from 'components/icon';

import UserViewAccount from './UserViewAccount';
import UserViewSecurity from './UserViewSecurity';

// ** Styled Tab component
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
    padding: theme.spacing(1.25, 1, 1),
    margin: `${theme.spacing(-1, -1, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
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

const UserViewRight = ({ id }) => {
  // ** State
  const tab = 'account';
  const [activeTab, setActiveTab] = useState('account');

  // ** Hooks

  const handleChange = (event, value) => {
    setActiveTab(value);
  };
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <TabContext value={activeTab}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        aria-label="forced scroll tabs example"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value="account" label="Account" icon={<Icon fontSize="1.125rem" icon="tabler:user-check" />} />
        <Tab value="security" label="Security" icon={<Icon fontSize="1.125rem" icon="tabler:lock" />} />
      </TabList>
      <Box sx={{ mt: 4 }}>
        <TabPanel sx={{ p: 0 }} value="account">
          <UserViewAccount id={id} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="security">
          <UserViewSecurity id={id} />
        </TabPanel>
      </Box>
    </TabContext>
  );
};

export default UserViewRight;

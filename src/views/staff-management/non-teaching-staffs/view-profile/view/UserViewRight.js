// ** React Imports
import { useState, useEffect } from 'react';

// ** Next Import
// import { useRoutes } from 'react-router'
// ** MUI Imports
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography'
import MuiTab from '@mui/material/Tab';
import MuiTabList from '@mui/lab/TabList';
// import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'components/icon';

// ** Demo Components Imports
import UserViewAccount from './UserViewAccount';
import TeacherAttendance from './TeacherAttendance';


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
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
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

const UserViewRight = ({ tab, invoiceData }) => {
  // ** State
  const [activeTab, setActiveTab] = useState('account');
  // const [isLoading, setIsLoading] = useState(true)

  // ** Hooks
  // const router = useRoutes()

  const handleChange = (event, value) => {
    // setIsLoading(true)
    setActiveTab(value);
    // router
    //   .push({
    //     pathname: `/apps/user/view/${value.toLowerCase()}`
    //   })
    //   .then(() => setIsLoading(false))
  };
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  // useEffect(() => {
  //   if (invoiceData) {
  //     setIsLoading(false)
  //   }
  // }, [invoiceData])

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
        <Tab value="attendance" label="Attendance" icon={<Icon fontSize="1.125rem" icon="tabler:calendar-plus" />} />
      </TabList>
      <Box sx={{ mt: 4 }}>
        <>
          <TabPanel sx={{ p: 0 }} value="account">
            <UserViewAccount invoiceData={invoiceData} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="attendance">
            <TeacherAttendance />
          </TabPanel>
        </>
      </Box>
    </TabContext>
  );
};

export default UserViewRight;

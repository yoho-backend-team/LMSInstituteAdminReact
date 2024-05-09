import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';
import Icon from 'components/icon';
import NonTeachingViewBanner from 'features/staff-management/non-teaching-staffs/components/StaffViewLeft';
import { nonTeachingStaffById } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import TeacherAttendance from '../../../../features/staff-management/non-teaching-staffs/components/StaffAttendance';
import UserViewAccount from '../../../../features/staff-management/non-teaching-staffs/components/StaffViewAccount';

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

const UserViewRight = ({ tab, setRefetch }) => {
  const [activeTab, setActiveTab] = useState('account');

  const handleChange = (event, value) => {
    setActiveTab(value);
  };
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState('');
  const location = useLocation();
  const staffID = location.state.id;
  console.log('staffId:', staffID);
  useEffect(() => {
    getStaffData(staffID);
  }, [staffID]);

  const getStaffData = async (staffID) => {
    setLoading(true);
    const data = { id: staffID };
    const result = await nonTeachingStaffById(data);
    console.log(data);
    if (result.success) {
      setStaff(result.data);
      setLoading(false);
    }
    setLoading(false);
  };
  console.log('NON-Teaching-staff:', staff);

  function formattedDate(inputDate) {
    const [day, month, year] = inputDate.split('/');

    const dateObject = new Date(`${month}/${day}/${year}`);

    if (isNaN(dateObject)) {
      return 'Invalid Date';
    }

    const formattedDay = String(dateObject.getDate()).padStart(2, '0');
    const formattedMonth = String(dateObject.getMonth() + 1).padStart(2, '0');
    const formattedYear = dateObject.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }

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
        {loading ? (
          <StaffManagementView />
        ) : (
          <>
            <NonTeachingViewBanner staff={staff} formattedDate={formattedDate} />
            <TabPanel sx={{ p: 0 }} value="account">
              <UserViewAccount staff={staff} staffID={staffID} formattedDate={formattedDate} setRefetch={setRefetch} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="attendance">
              <TeacherAttendance attendance={staff?.teachingStaff?.attendance} />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  );
};

export default UserViewRight;

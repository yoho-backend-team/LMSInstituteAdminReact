// React Imports
import { useState } from 'react';

// MUI Imports
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import MainCard from 'components/cards/MainCard';
// Component Imports
import CustomTabList from '@mui/lab/TabList';
import { getAllStudentOpenTickets } from 'features/ticket-management/student/redux/open-tickets/studentOpenTicketThunks';

import { useEffect } from 'react';
import { selectStudentOpenTickets } from 'features/ticket-management/student/redux/open-tickets/studentOpenTicketSelectors';
import { selectStudentClosedTickets } from 'features/ticket-management/student/redux/closed-tickets/studentClosedTicketSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import OpenTicketCard from 'features/ticket-management/student/components/OpenTicketCard';
import ClosedTicketCard from 'features/ticket-management/student/components/ClosedTicketCard';
import TicketResolveDrawer from 'features/ticket-management/student/components/ResolveTicketDrawer';
import { getAllStudentClosedTickets } from 'features/ticket-management/student/redux/closed-tickets/studentClosedTicketThunks';
const StudentTicketsPage = () => {
  // States
  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectStudentOpenTickets);
  const studentClosedTickets = useSelector(selectStudentClosedTickets);
  const [openResolveDrawer, setOpenResolveDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});

  useEffect(() => {
    dispatch(getAllStudentOpenTickets({ branch_id: selectedBranchId, type: 'opened' }));
  }, [selectedBranchId, dispatch]);
  useEffect(() => {
    dispatch(getAllStudentClosedTickets({ branch_id: selectedBranchId, type: 'closed' }));
  }, [selectedBranchId, dispatch]);

  const handleCloseDrawer = () => {
    setOpenResolveDrawer((state) => !state);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTicket = (data) => {
    setSelectedTicket(data);
  };
  console.log(studentClosedTickets);

  return (
    <MainCard title="Student Tickets">
      <TabContext value={value}>
        <CustomTabList pill="true" onChange={handleChange} aria-label="customized tabs example">
          <Tab value="open" label="Opened Tickets" />
          <Tab value="close" label="Closed Tickets" />
        </CustomTabList>
        <TabPanel value="open" sx={{ pl: 0, pr: 0 }}>
          <Grid container spacing={2}>
            {studentOpenTickets?.map((ticket, index) => (
              <OpenTicketCard
                key={index}
                ticket={ticket}
                handleSelectedTicket={handleSelectedTicket}
                onClick={() => setOpenResolveDrawer(true)}
              />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value="close" sx={{ pl: 0, pr: 0 }}>
          <Grid container spacing={2}>
            {studentClosedTickets?.map((ticket, index) => (
              <ClosedTicketCard key={index} ticket={ticket} />
            ))}
          </Grid>
        </TabPanel>
      </TabContext>
      <TicketResolveDrawer open={openResolveDrawer} toggle={handleCloseDrawer} ticket={selectedTicket} />
    </MainCard>
  );
};

export default StudentTicketsPage;

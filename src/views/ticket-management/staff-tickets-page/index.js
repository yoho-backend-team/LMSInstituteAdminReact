// React Imports
import { useState } from 'react';

// MUI Imports
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import MainCard from 'components/cards/MainCard';
// Component Imports
import CustomTabList from '@mui/lab/TabList';

import { getAllStaffClosedTickets } from 'features/ticket-management/staff/redux/closed-tickets/staffClosedTicketThunks';
import { getAllStaffOpenTickets } from 'features/ticket-management/staff/redux/open-tickets/staffOpenTicketThunks';

import { useEffect } from 'react';
import { selectStaffClosedTickets } from 'features/ticket-management/staff/redux/closed-tickets/staffClosedTicketSelectors';
import { selectStaffOpenTickets } from 'features/ticket-management/staff/redux/open-tickets/staffOpenTicketSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import OpenTicketCard from 'features/ticket-management/staff/components/OpenTicketCard';
import ClosedTicketCard from 'features/ticket-management/staff/components/ClosedTicketCard';
import TicketResolveDrawer from 'features/ticket-management/staff/components/ResolveTicketDrawer';

const StaffTicketsPage = () => {
  // States
  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectStaffOpenTickets);
  const studentClosedTickets = useSelector(selectStaffClosedTickets);
  const [openResolveDrawer, setOpenResolveDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});

  useEffect(() => {
    dispatch(getAllStaffOpenTickets({ branch_id: selectedBranchId, type: 'opened' }));
  }, [selectedBranchId, dispatch]);
  useEffect(() => {
    dispatch(getAllStaffClosedTickets({ branch_id: selectedBranchId, type: 'closed' }));
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
    <MainCard title="Staff Tickets" sx={{ minHeight: '100vh' }}>
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

export default StaffTicketsPage;

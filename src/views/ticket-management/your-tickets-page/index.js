// React Imports
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
// MUI Imports
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import MainCard from 'components/cards/MainCard';
// Component Imports
import CustomTabList from '@mui/lab/TabList';

import { getAllClosedTickets } from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketThunks';
import { getAllOpenTickets } from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketThunks';

import TicketsCardsSkeleton from 'components/cards/Skeleton/TicketsCardsSkeleton';

import ClosedTicketCard from 'features/ticket-management/your-tickets/components/ClosedTicketCard';
import OpenTicketCard from 'features/ticket-management/your-tickets/components/OpenTicketCard';

import { selectClosedTickets } from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketSelectors';
import { selectLoading, selectOpenTickets } from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketSelectors';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateTicketDrawer from 'features/ticket-management/your-tickets/components/CreateTicketDrawer';

const YourTicketsPage = () => {
  // States

  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectOpenTickets);
  const studentClosedTickets = useSelector(selectClosedTickets);
  const studentLoading = useSelector(selectLoading);

  console.log(studentOpenTickets);

  const [openCreateTicketDrawer, setOpenCreateTicketDrawer] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState({});

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllOpenTickets({ branch_id: selectedBranchId, type: 'opened' }));
  }, [selectedBranchId, dispatch, refetch]);
  useEffect(() => {
    dispatch(getAllClosedTickets({ branch_id: selectedBranchId, type: 'closed' }));
  }, [selectedBranchId, dispatch, refetch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTicket = (data) => {
    setSelectedTicket(data);
  };
  console.log(studentClosedTickets);

  return (
    <MainCard>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h3">Your Tickets</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpenCreateTicketDrawer(true);
          }}
        >
          Create
        </Button>
      </Box>
      {studentLoading ? (
        <TicketsCardsSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid marginTop={5} item xs={12}>
            <TabContext value={value}>
              <CustomTabList pill="true" onChange={handleChange} aria-label="customized tabs example">
                <Tab value="open" label="Opened Tickets" />
                <Tab value="close" label="Closed Tickets" />
              </CustomTabList>
              <TabPanel value="open" sx={{ pl: 0, pr: 0 }}>
                <Grid container spacing={2}>
                  {studentOpenTickets?.map((ticket, index) => (
                    <OpenTicketCard key={index} ticket={ticket} handleSelectedTicket={handleSelectedTicket} />
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
          </Grid>
        </Grid>
      )}

      <CreateTicketDrawer
        open={openCreateTicketDrawer}
        toggle={() => setOpenCreateTicketDrawer(false)}
        setRefetch={setRefetch}
        ticket={selectedTicket}
      />
    </MainCard>
  );
};

export default YourTicketsPage;

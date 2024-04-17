import TabContext from '@mui/lab/TabContext';
import CustomTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Tab from '@mui/material/Tab';
import MainCard from 'components/cards/MainCard';
import TicketsCardsSkeleton from 'components/cards/Skeleton/TicketsCardsSkeleton';
import ClosedTicketCard from 'features/ticket-management/your-tickets/components/ClosedTicketCard';
import CreateTicketDrawer from 'features/ticket-management/your-tickets/components/CreateTicketDrawer';
import OpenTicketCard from 'features/ticket-management/your-tickets/components/OpenTicketCard';
import { selectClosedTickets } from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketSelectors';
import { getAllClosedTickets } from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketThunks';
import { selectLoading, selectOpenTickets } from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketSelectors';
import { getAllOpenTickets } from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const YourTicketsPage = () => {
  // States
  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectOpenTickets);
  const studentClosedTickets = useSelector(selectClosedTickets);
  const studentLoading = useSelector(selectLoading);
  const [openCreateTicketDrawer, setOpenCreateTicketDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [refetch, setRefetch] = useState(false);
  console.log(studentOpenTickets);

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
      <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Grid>
    </MainCard>
  );
};

export default YourTicketsPage;

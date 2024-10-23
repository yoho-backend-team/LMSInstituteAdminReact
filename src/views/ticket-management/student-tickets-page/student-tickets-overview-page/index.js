import TabContext from '@mui/lab/TabContext';
import CustomTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Tab from '@mui/material/Tab';
import MainCard from 'components/cards/MainCard';
import StudentTicketsCardsSkeleton from 'components/cards/Skeleton/StudentTicketSkeleton';
import TicketsCardsSkeleton from 'components/cards/Skeleton/TicketsCardsSkeleton';
import ClosedTicketCard from 'features/ticket-management/student/components/ClosedTicketCard';
import OpenTicketCard from 'features/ticket-management/student/components/OpenTicketCard';
import { selectStudentClosedTickets } from 'features/ticket-management/student/redux/closed-tickets/studentClosedTicketSelectors';
import { getAllStudentClosedTickets } from 'features/ticket-management/student/redux/closed-tickets/studentClosedTicketThunks';
import { selectLoading, selectStudentOpenTickets } from 'features/ticket-management/student/redux/open-tickets/studentOpenTicketSelectors';
import { getAllStudentOpenTickets } from 'features/ticket-management/student/redux/open-tickets/studentOpenTicketThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';

const StudentTicketsPage = () => {
  // States
  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectStudentOpenTickets);
  const studentClosedTickets = useSelector(selectStudentClosedTickets);
  const studentLoading = useSelector(selectLoading);
  const [openResolveDrawer, setOpenResolveDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllStudentOpenTickets({ branch_id: selectedBranchId,institute_id:useInstitute().getInstituteId(),status: 'opened' }));
  }, [selectedBranchId, dispatch, refetch]);
  useEffect(() => {
    dispatch(getAllStudentClosedTickets({ branch_id: selectedBranchId,institute_id:useInstitute().getInstituteId(),status: 'closed' }));
  }, [selectedBranchId, dispatch, refetch]);

  const handleCloseDrawer = () => {
    setOpenResolveDrawer((state) => !state);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTicket = (data) => {
    setSelectedTicket(data);
  };
  console.log(studentOpenTickets,"ticket")
  return (
    <MainCard title="Student Tickets" sx={{ minHeight: '100vh' }}>
      {studentLoading ? (
        <StudentTicketsCardsSkeleton/>
      ) : (
        <TabContext value={value}>
          <CustomTabList pill="true" onChange={handleChange} aria-label="customized tabs example">
            <Tab value="open" label="Opened Tickets" />
            <Tab value="close" label="Closed Tickets" />
          </CustomTabList>
          <TabPanel value="open" sx={{ pl: 0, pr: 0 }}>
            <Grid container spacing={2}>
              {studentOpenTickets?.data?.data?.map((ticket, index) => (
                <OpenTicketCard
                  key={index}
                  ticket={ticket}
                  handleSelectedTicket={handleSelectedTicket}
                  onClick={() => setOpenResolveDrawer(true)}
                />
              ))}
            </Grid>
            {studentOpenTickets?.data?.last_page !== 1 && (
                <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={studentOpenTickets?.data?.last_page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllStudentOpenTickets({ branch_id: selectedBranchId, page: page }));
                    }}
                  />
                </Grid>
              )}
          </TabPanel>
          <TabPanel value="close" sx={{ pl: 0, pr: 0 }}>
            <Grid container spacing={2}>
              {studentClosedTickets?.data?.data?.map((ticket, index) => (
                <ClosedTicketCard key={index} ticket={ticket} />
              ))}
              
            </Grid>
            {studentClosedTickets?.data?.last_page !== 1 && (
                <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={studentClosedTickets?.last_page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllStudentOpenTickets({ branch_id: selectedBranchId, page: page }));
                    }}
                  />
                </Grid>
              )}
          </TabPanel>
        </TabContext>
      )}


    </MainCard>
  );
};

export default StudentTicketsPage;

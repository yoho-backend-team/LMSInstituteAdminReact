import TicketResolveDrawer from 'features/ticket-management/student/components/ResolveTicketDrawer';
import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TicketResolutionPage = ({ ticket }) => {
  const [openResolveDrawer, setOpenResolveDrawer] = useState(true); 
  const getParams = useSearchParams()
  const {id} = useParams();
  console.log(getParams)
  console.log(id,"iddddd")
  console.log(ticket, "tickefs")
  const handleCloseDrawer = () => {
    setOpenResolveDrawer(false);
  };

  return (    
      <TicketResolveDrawer  open={openResolveDrawer} toggle={handleCloseDrawer} ticketId={id} />
     );
};

export default TicketResolutionPage;

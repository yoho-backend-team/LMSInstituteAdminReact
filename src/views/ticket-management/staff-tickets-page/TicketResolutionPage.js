import { useState } from 'react';
import TicketResolveDrawer from 'features/ticket-management/staff/components/ResolveTicketDrawer';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TicketResolutionPage = ({ ticket }) => {
  const [openResolveDrawer, setOpenResolveDrawer] = useState(true); 
  const getParams = useSearchParams()
  const {id} = useParams();

  
  const handleCloseDrawer = () => {
    setOpenResolveDrawer(false);
  };

  return (    
      <TicketResolveDrawer  open={openResolveDrawer} toggle={handleCloseDrawer} ticketId={id} />
     );
};

export default TicketResolutionPage;

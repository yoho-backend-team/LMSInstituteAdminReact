import TicketResolveDrawer from 'features/ticket-management/student/components/ResolveTicketDrawer';
import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import socket from 'utils/socket';

const TicketResolutionPage = () => {
  const [openResolveDrawer, setOpenResolveDrawer] = useState(true); 
  const getParams = useSearchParams()
  const {id} = useParams();
  const [ticket,setTicket] = useState('');
  
  useEffect(() => {
    socket.connect()
    socket.on("connect",() => {
     socket.emit("joinTicket",id)
     console.log("joined",id)
    })
 
    socket.on("receiveStudentTicketMessage",(new_message) => {
     console.log(new_message,"new_message")
      setTicket((prev) => ({...prev,messages:[...prev.messages,new_message]}))
    })
    return () => {
     socket.disconnect()
     socket.off("receiveStudentTicketMessage")
    }
   },[id])
  
  const handleCloseDrawer = () => {
    setOpenResolveDrawer(false);
  };

  return (    
      <TicketResolveDrawer ticket={ticket} setTicket={setTicket}  open={openResolveDrawer} toggle={handleCloseDrawer} ticketId={id} socket={socket} />
     );
};

export default TicketResolutionPage;

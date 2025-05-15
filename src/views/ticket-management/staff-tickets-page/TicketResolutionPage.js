import { useState } from 'react';
import TicketResolveDrawer from 'features/ticket-management/staff/components/ResolveTicketDrawer';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
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

   socket.on("receiveTeacherTicketMessage",(new_message) => {
    console.log(new_message,"new_message")
     setTicket((prev) => ({...prev,messages:[...prev.messages,new_message]}))
   })
   return () => {
    socket.disconnect()
    socket.off("receiveTeacherTicketMessage")
   }
  },[id])
  
  const handleCloseDrawer = () => {
    setOpenResolveDrawer(false);
  };
  console.log(ticket,"ticket")
  return (    
      <TicketResolveDrawer ticket={ticket} setTicket={setTicket}  open={openResolveDrawer} socket={socket} toggle={handleCloseDrawer} ticketId={id} />
     );
};

export default TicketResolutionPage;

import React, { useRef, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';
import { getUserDetails } from 'utils/check-auth-state';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { formatTime } from 'utils/formatDate';
import chatBg from "../../../assets/images/community/pattern.png"



const ChatLog = (props) => {
  const { data, hidden, currentUser, socket } = props; 
  const chatArea = useRef(null);
  const user = getUserDetails();

   const messageRefs = useRef(new Map());
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());

  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isWindowFocused) {
            const messageId = entry.target.getAttribute("data-id");
  
            if (!readMessages.has(messageId)) {
              setTimeout(() => {
                if (entry.isIntersecting && isWindowFocused) {
                  triggerMessageRead(messageId);
                }
              }, 1500);
            }
          }
        });
      },
      { threshold: 0.8 }
    );
  
    
    messageRefs.current.forEach((ref) => {
      if (ref instanceof Element) {
        observer.observe(ref);
      }
    });
  
    return () => {
      observer.disconnect();
    };
  }, [data, isWindowFocused, readMessages]);
  

  const triggerMessageRead = (messageId) => {
    const msg = data.find((m) => m._id === messageId);

    if (msg && !readMessages.has(messageId)) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      console.log(formattedTime, messageId, msg);
      socket.emit("messageRead",{ messageId: messageId, userId: instructor?._id})
      setReadMessages((prevReadMessages) => new Set([...prevReadMessages, messageId]));
    }
  };

  useEffect(() => {
    
    // socket.emit('messageRead', { messageId: data.group, userId: user?._id });
    if (data && data?.length) {
      scrollToBottom();
    }
  }, [data]);

  const scrollToBottom = () => {
    if (chatArea.current) {
      chatArea.current.scrollTop = chatArea.current.scrollHeight;
    }
  };

  // const triggerMessageRead = (messageId) => {
  //   const msg = data.find((m) => m._id === messageId);
  //   if (msg && !msg.read) {
  //     socket.emit('messageRead', { messageId: msg._id, userId: user?._id });
  //   }
  // };

  const isSamePreviousUser = (index) => {
    if(index === 0) return false;
    console.log(index,data[index].sender.toString()===data[index -1 ].sender.toString())
    return data[index].sender.toString() === data[index - 1].sender.toString()
  }
  console.log(user,"user")
  const renderChats = () => {
    if (data) {
       return  data.map((message, index) => {
        const isCurrentUser = message.sender === user?._id
        const isPreviousUser = isSamePreviousUser(index)
        console.log(isPreviousUser)
        return(
        <Box
          key={index}
          display="flex"
          flexDirection={isCurrentUser ? 'row-reverse' : 'row'}
          alignItems="flex-start"
          sx={{ 
            minWidth: "200px" ,
            
          }}
          mb={1}
        >
          {!isPreviousUser && <CustomAvatar src={message?.sender?.avatar} /> }
          <Box
            ml={isCurrentUser ? 0 : isPreviousUser ? "55px" : 2}
            mr={isCurrentUser && !isPreviousUser ? 2 : isPreviousUser ? "55px" : 0}
            p={1}
            borderRadius={1}
            sx={{ padding: '12px', fontSize: "0.9em", borderRadius: "10px", position: "relative", 
              display: 'flex',
              flexDirection: isCurrentUser ? "row" : "column",
              gap: isCurrentUser && "5px",
              "::before" : isCurrentUser && !isPreviousUser ? {
                content: '""',
                position: "absolute",
                top: "0",
                right: "-12px",
                width: "20px",
                height: "20px",
                background: `linear-gradient(
                 135deg,
                 #dcf8c6 0%,
                 #dcf8c6 50%,
                 transparent 50%,
                 transparent
             )`
              }
              :!isPreviousUser &&{
                content: '""',
                position: "absolute",
                top: 0,
                left: "-12px",
                width: "20px",
                height: "20px",
                background: `linear-gradient(
                             225deg,
                             #fff 0%,
                             #fff 50%,
                             transparent 50%,
                             transparent
                           )`
              }
             }}
            bgcolor={isCurrentUser ? '#dcf8c8' : '#fff'}
            color={ isCurrentUser ? 'black' : 'black'}
            maxWidth="70%"
          >
            {!isPreviousUser &&(
              <Typography variant="caption">
                {!isCurrentUser &&  message?.sender_name }
              </Typography>
            )}
            <Typography sx={{ fontSize: "0.925rem"}}>{message.message}</Typography>
            <Box sx={{ display: "flex", justifyContent: isCurrentUser ? "end" : "start", alignItems: "flex-end"}}>
            <Typography variant="caption" sx={{ color: '#727272'}}>
                {formatTime(message?.createdAt)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent:  message.sender === user?._id ? "end" : "start", mt: 1 }}>
              {isCurrentUser && (
                <Typography >
                  {message?.status?.some(s => s.delivered) && !message?.status?.every(s => s.delivered) && (
                    <DoneIcon sx={{  width: '17px', height: '17px' }} />
                  )}
                  {message?.status?.every(s => s.delivered) && !message?.status?.every(s => s.read) && (
                    <DoneAllIcon sx={{ width: '17px', height: '17px' }} />
                  )}
                  {message?.status?.every(s => s.read) && (
                    <DoneAllIcon sx={{  width: '17px', height: '17px' }} />
                  )}
                </Typography>
              )}
            </Box>
                     </Box>
        </Box>
      )});
    } else {
      return <Typography>No messages found</Typography>;
    }
  };

  return (
    <Box ref={chatArea} sx={{  
      height: 'calc(100% - 8.875rem)',
      overflowY: 'auto',
      position: 'relative',
      padding: "50px",
      background: `linear-gradient(
        rgba(229, 221, 213, 0.9), 
        rgba(229, 221, 213, 0.9)
      ), url(${chatBg})`,
      backgroundPosition: "center bottom",
      backgroundSize: "contain",
      backgroundAttachment: "fixed",
     }}>
      {renderChats()}
    </Box>
  );
};

ChatLog.propTypes = {
  data: PropTypes.array,
  hidden: PropTypes.bool,
  currentUser: PropTypes.string,
  socket: PropTypes.object.isRequired,
};

export default ChatLog;

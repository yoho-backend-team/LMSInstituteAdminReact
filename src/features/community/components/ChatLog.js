import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';
import { getUserDetails } from 'utils/check-auth-state';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { formatTime } from 'utils/formatDate';

const ChatLog = (props) => {
  const { data, hidden, currentUser, socket } = props; 
  const chatArea = useRef(null);
  const user = getUserDetails();

  useEffect(() => {
    if (data && data?.length) {
      scrollToBottom();
    }
  }, [data]);

  const scrollToBottom = () => {
    if (chatArea.current) {
      chatArea.current.scrollTop = chatArea.current.scrollHeight;
    }
  };

  const triggerMessageRead = (messageId) => {
    const msg = data.find((m) => m._id === messageId);
    if (msg && !msg.read) {
      socket.emit('messageRead', { messageId: msg._id, userId: user?._id });
    }
  };
  console.log(user,"user")
  const renderChats = () => {
    if (data) {
      return data.map((message, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection={message.sender === user?._id ? 'row-reverse' : 'row'}
          alignItems="center"
          sx={{ pl: '20px', minWidth: "200px" }}
          mb={1}
        >
          <CustomAvatar src={message?.sender?.avatar} />
          <Box
            ml={message.sender === user?._id ? 0 : 2}
            mr={message.sender === user?._id ? 2 : 0}
            p={1}
            borderRadius={1}
            sx={{ padding: '15px 20px' }}
            bgcolor={message.sender === user?._id ? '#61C554' : '#E8ECEF'}
            color={message.sender === user?._id ? 'white' : 'black'}
            maxWidth="70%"
          >
            {message.sender !== user?._id && (
              <Typography variant="caption">
                {message?.sender_name}
              </Typography>
            )}
            <Typography>{message.message}</Typography>
            <Box sx={{ display: 'flex', justifyContent:  message.sender === user?._id ? "end" : "start", mt: 1 }}>
              {message.sender === user?._id && (
                <Typography >
                  {message?.status?.some(s => s.delivered) && !message?.status?.every(s => s.delivered) && (
                    <DoneIcon sx={{ color: 'white', width: '17px', height: '17px' }} />
                  )}
                  {message?.status?.every(s => s.delivered) && !message?.status?.every(s => s.read) && (
                    <DoneAllIcon sx={{ color: 'white', width: '17px', height: '17px' }} />
                  )}
                  {message?.status?.every(s => s.read) && (
                    <DoneAllIcon sx={{ color: '#0D6EFD', width: '17px', height: '17px' }} />
                  )}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: message.sender === user?._id ? "end" : "start"}}>
            <Typography variant="caption" sx={{ color: '#727272'}}>
                {formatTime(message?.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      ));
    } else {
      return <Typography>No messages found</Typography>;
    }
  };

  return (
    <Box ref={chatArea} sx={{ height: 'calc(100% - 8.875rem)', overflowY: 'auto' }}>
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

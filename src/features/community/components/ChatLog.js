import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';
import { getUserDetails } from 'utils/check-auth-state';

const ChatLog = (props) => {
  const { data, hidden, currentUser } = props; 
  const chatArea = useRef(null);
  const user = getUserDetails()

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

  const renderChats = () => {
    if (data) {
      return data?.map((message, index) => (
        
        <Box 
          key={index} 
          display="flex" 
          flexDirection={message.sender === user?._id ? "row-reverse" : "row"} 
          alignItems="center" 
          sx={{ pl: "20px"}}
          mb={1}
        >
          <CustomAvatar src={message?.sender?.avatar} />
          <Box 
            ml={message.user === "admin" ? 0 : 2} 
            mr={message.user === "admin" ? 2 : 0}
            p={1} 
            borderRadius={1} 
            bgcolor={message.sender === user?._id ? "#61C554" : "#E8ECEF"}
            color={message.sender === user?._id ? "white" : "black"}
            maxWidth="70%"
          >
            <Typography>
              {message.message}
            </Typography>
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
};

export default ChatLog;

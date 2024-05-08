import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';

const ChatLog = (props) => {
  const { data, hidden } = props;
  const chatArea = useRef(null);

  var chats = []; // Define and initialize the chats variable
// Now you can use the chats variable

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
    if (chats) {
      return chats.map((message, index) => (
        <Box key={index} mb={3}>
          <CustomAvatar src={message.sender.avatar} />
          <Typography>{message.content}</Typography>
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
  hidden: PropTypes.bool
};

export default ChatLog;

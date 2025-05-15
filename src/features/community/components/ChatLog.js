import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';
import { getUserDetails } from 'utils/check-auth-state';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { formatTime } from 'utils/formatDate';
import chatBg from "../../../assets/images/community/pattern.png"

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ChatLog = (props) => {
  const { data, hidden, currentUser, socket } = props;
  const chatArea = useRef(null);
  const user = getUserDetails();

  const [messages, setMessages] = useState(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);


  const messageRefs = useRef(new Map());
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());

  // Handles opening the delete menu
  const handleMenuOpen = (event, messageId) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.top + window.scrollY, left: rect.left + rect.width + 5 });
    setAnchorEl(event.currentTarget);
    setSelectedMessage(messageId);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleDeleteMessage = () => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === selectedMessage ? { ...msg, deleted: true } : msg
      )
    );

    // Notify server
    socket.emit("deleteMessage", { messageId: selectedMessage, userId: user?._id });
    setSelectedMessage(null);
    handleMenuClose(); // Close menu after deletion
  };


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
      socket.emit("messageRead", { messageId: messageId, userId: instructor?._id })
      setReadMessages((prevReadMessages) => new Set([...prevReadMessages, messageId]));
    }
  };

  // useEffect(() => {

  //   // socket.emit('messageRead', { messageId: data.group, userId: user?._id });
  //   if (data && data?.length) {
  //     scrollToBottom();
  //   }
  // }, [data]);

  // const scrollToBottom = () => {
  //   if (chatArea.current) {
  //     chatArea.current.scrollTop = chatArea.current.scrollHeight;
  //   }
  // };

  // Ensure scrolling to the latest message
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

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
    if (index === 0) return false;
    console.log(index, data[index].sender.toString() === data[index - 1].sender.toString())
    return data[index].sender.toString() === data[index - 1].sender.toString()
  }

  console.log(user, "user")


  const renderChats = () => {
    return messages.map((message, index) => {
      const isCurrentUser = message.sender === user?._id;
      const isPreviousUser = isSamePreviousUser(index);

      return (
        <Box
          key={message._id}
          display="flex"
          flexDirection={isCurrentUser ? "row-reverse" : "row"}
          alignItems="flex-start"
          sx={{ minWidth: "200px" }}
          mb={1}
          onMouseEnter={() => setHoveredMessage(message._id)}
          onMouseLeave={() => setHoveredMessage(null)}
        >

          {!isPreviousUser && <CustomAvatar src={message?.sender?.avatar} />}

          <Box
            ml={isCurrentUser ? 0 : isPreviousUser ? "55px" : 2}
            mr={isCurrentUser && !isPreviousUser ? 2 : isPreviousUser ? "55px" : 0}
            p={1}
            borderRadius={1}
            sx={{
              padding: "12px",
              fontSize: "0.9em",
              borderRadius: "10px",
              position: "relative",
              display: "flex",
              flexDirection: isCurrentUser ? "row" : "column",
              gap: isCurrentUser && "5px",
              "&:hover .delete-btn": { display: "block" },
            }}
            bgcolor={isCurrentUser ? "#dcf8c8" : "#fff"}
            color={"black"}
            maxWidth="70%"
          >

            {!isPreviousUser && (
              <Typography variant="caption">
                {!isCurrentUser && message?.sender_name}
              </Typography>
            )}


            <Typography sx={{ fontSize: "0.925rem", fontStyle: message.deleted ? "italic" : "normal" }}>
              {message.deleted ? "This message was deleted" : message.message}
            </Typography>


            <Box sx={{ display: "flex", justifyContent: isCurrentUser ? "end" : "start" }}>
              <Typography variant="caption" sx={{ color: "#727272" }}>
                {formatTime(message?.createdAt)}
              </Typography>
            </Box>


            {isCurrentUser && (
              <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                {message?.status?.some((s) => s.delivered) &&
                  !message?.status?.every((s) => s.delivered) && (
                    <DoneIcon sx={{ width: "17px", height: "17px" }} />
                  )}
                {message?.status?.every((s) => s.delivered) &&
                  !message?.status?.every((s) => s.read) && (
                    <DoneAllIcon sx={{ width: "17px", height: "17px" }} />
                  )}
                {message?.status?.every((s) => s.read) && (
                  <DoneAllIcon sx={{ width: "17px", height: "17px" }} />
                )}
              </Box>
            )}


            {isCurrentUser && !message.deleted && (
              <>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: "-5px",
                    right: "-6.5px",
                    color: "gray",
                    display: hoveredMessage === message._id ? "block" : "none",
                  }}
                  onClick={(event) => handleMenuOpen(event, message._id)}
                >
                  < KeyboardArrowDownIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && selectedMessage === message._id)}
                  onClose={handleMenuClose}
                  anchorReference="anchorPosition"
                  anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
                  sx={{
                    "& .MuiPaper-root": {
                      width: "80px",
                      padding: "1px",
                      borderRadius: "6px",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                      textAlign: "center",
                      position: "absolute",
                      backgroundColor: "white",
                      marginLeft: '1px'
                    },
                  }}
                >
                  <MenuItem onClick={handleDeleteMessage} sx={{
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                    display: "flex",
                    textAlign: "center",
                    backgroundColor: "transparent !important",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04) !important", 
      color: "black !important",
    },
    "&.Mui-selected": {
      backgroundColor: "transparent !important",
      color: "black !important",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "transparent !important",
      color: "black !important",
    },
  }}>Delete</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
      );
    });
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

import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getStaffTicketWithId, updateStaffTicket } from "../services/staffTicketService";
import { useSpinner } from "context/spinnerContext";
import { formatDate } from "utils/format";
import { formatTime } from "utils/formatDate";
import PdfViewer from "./PdfViewer";
import { getUserDetails } from "utils/check-auth-state";
import { useRef } from "react";

function TicketResolveDrawer({ ticketId, ticket, setTicket, socket }) {
  const [fileView, setFileView] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { show, hide } = useSpinner();
  const user = getUserDetails();
  const endOfMessageRef = useRef(null);

  const navigate = useNavigate();

  const statusColor = {
    opened: "#7367F0",
    closed: "#EBA13A",
  };

  const handleFileOpen = (file) => {
    setFile(file);
    setFileView(true);
  };

  const handleFileViewClose = () => {
    setFile(null);
    setFileView(false);
  };

  const handleback = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        show();
        const res = await getStaffTicketWithId({ id: ticketId });
        setTicket(res?.ticket);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        hide();
      }
    };
    fetchTicket();
  }, []);

  const handleCloseTicket = async () => {
    try {
      show();
      const uuid = ticketId;
      await updateStaffTicket({ id: uuid });
      setTicket(prevTicket => ({ ...prevTicket, status: "closed" }));
    } catch (error) {
      console.error("Error closing ticket:", error);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    if (endOfMessageRef.current) {
      endOfMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ticket]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        ticket_id: ticket?.uuid,
        text: message,
        senderType: "InstituteAdmin",
        user: user?._id
      };
      console.log(newMessage);
      socket.emit("sendTeacherTicketMessage", newMessage);
      setMessage("");
    } else {
      toast.error("Message cannot be empty");
    }
  };

  const MessageBox = () => {
    return (
      <>
        {ticket?.messages?.map((message, index) => {
          const currentUser = user?._id === message?.sender;

          return (
            <Box key={message?._id + index} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: currentUser ? 'row' : 'row',
                  justifyContent: currentUser ? 'flex-end' : 'flex-start'
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    backgroundColor: currentUser ? '#E1FFC7' : '#DFC7FF',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: currentUser ? '0px 0px 8px rgba(0, 200, 83, 0.5)' : '0px 0px 8px rgba(223, 199, 255, 0.5)',
                    marginBottom: '10px',
                    minWidth: "250px"
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      pb: '5px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: currentUser ? '#005700' : '#051732',
                        fontWeight: 700,
                        lineHeight: '24px',
                      }}
                    >
                      {currentUser ? `${user?.first_name} ${user?.last_name}` : "Oliver Smith"}
                    </Typography>
                    <Typography
                      sx={{
                        color: currentUser ? '#005700' : '#051732',
                        fontSize: '10px',
                        fontWeight: 400,
                        lineHeight: '15px',
                      }}
                    >
                      {formatDate(message?.createdAt)}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: currentUser ? '#2A2A2A' : '#72767D',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '15px',
                    }}
                  >
                    {message?.content}
                  </Typography>
                </Box>
              </Box>
              {currentUser && index + 1 === ticket?.messages.length && !ticket?.resolved && ticket?.status !== "closed" &&
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "20px",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleCloseTicket()}
                    sx={{
                      border: "1.5px solid #FF0000",
                      borderRadius: "7px",
                      padding: "10px",
                      color: "red",
                      background: "white",
                    }}
                  >
                    Solved
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0D6EFD",
                      color: "white",
                      borderRadius: "7px",
                      padding: "10px",
                    }}
                  >
                    No Related
                  </Button>
                </Box>
              }
            </Box>
          );
        })}
        <div ref={endOfMessageRef} />
      </>
    );
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <IconButton onClick={handleback}>
              <ArrowBackIcon sx={{ color: "#000000" }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{ display: "inline-flex", alignItems: "center", gap: "37px" }}
            >
              <Typography
                sx={{ fontSize: "24px", lineHeight: "22px", fontWeight: 700 }}
              >
                Ticket
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                Ticket ID: Ticket #{ticket?.ticket_id}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              {ticket.status === 'opened' && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    color: "white",
                    borderRadius: "8px",
                    boxShadow: "0px 3px 20px -8px #0D6EFD",
                    padding: "9px 24px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                  onClick={handleCloseTicket}
                >
                  Close Ticket
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ width: "100%" }}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "700",
                  lineHeight: "24px",
                }}
              >
                #{ticket?.id} {ticket?.query}
              </Typography>
              <Box sx={{ display: 'flex', gap: "21px" }}>
                <Typography
                  sx={{ fontSize: "14px", color: "#495057", fontWeight: 700 }}
                >
                  Raised Date & time:
                </Typography>
                <Typography
                  sx={{
                    color: "#5611B1",
                    fontSize: "15px",
                    fontWeight: "600",
                    lineHeight: "14px",
                  }}
                >
                  {formatDate(ticket?.createdAt)}{" "}{formatTime(ticket?.createdAt)}
                </Typography>
              </Box>
            </Box>

            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 2, mb: 2 }}>
                    {/* Chat Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px",
                        borderBottom: "1px solid #E8E8E8",
                        mb: 2,
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#7367F0" }}>O</Avatar>
                      <Box>
                        <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                          Oliver Smith
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#6C757D" }}>
                          {ticket?.status === "opened" ? "Active Now" : "Closed"}
                        </Typography>
                      </Box>
                    </Box>

                   
                    <Box sx={{ height: "400px", overflowY: "scroll" }}>
                      {MessageBox()}
                    </Box>

                 
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingTop: "20px",
                      }}
                    >
                      <IconButton onClick={""}>
                        <AttachFileIcon sx={{ color: "#78787C", rotate: "35deg" }} />
                      </IconButton>
                      <TextField
                        variant="outlined"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{
                          backgroundColor: "#E8E8E8",
                          px: "24px",
                          mr: "10px",
                          borderRadius: "24px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "transparent",
                            },
                            "&:hover fieldset": {
                              borderColor: "transparent",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "transparent",
                            },
                          },
                        }}
                        placeholder="Say Something..."
                      />
                      <IconButton onClick={handleSendMessage}>
                        <SendIcon sx={{ color: "black" }} />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: "40px",
                    }}
                  >
                    {/* Ticket Details */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 800,
                          lineHeight: "24px",
                        }}
                      >
                        Issue Description:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "22px",
                          color: "#6C757D",
                        }}
                      >
                        {ticket?.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 800,
                          lineHeight: "24px",
                        }}
                      >
                        Issue Category:{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "22px",
                          color: "#6C757D",
                        }}
                      >
                        {ticket?.category}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 800,
                          lineHeight: "24px",
                        }}
                      >
                        Attachments:
                      </Typography>
                      <Box
                        sx={{
                          color: "#6C757D",
                          fontSize: "15px",
                          fontWeight: 600
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "22px",
                            color: "#6C757D",
                          }}
                        >
                          {ticket?.file?.split("/")[2]}
                        </Typography>
                        <Typography
                          onClick={() => handleFileOpen(ticket?.file)}
                          sx={{ color: "#5611B1", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}
                        >
                          View
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 800,
                          lineHeight: "24px",
                        }}
                      >
                        Status:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "22px",
                          color: "#6C757D",
                        }}
                      >
                        <Button
                          size="small"
                          sx={{
                            color: "white",
                            backgroundColor: statusColor[ticket?.status],
                            border: "1px solid #DEE2E6",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: 700,
                            lineHeight: "22px",
                            padding: "9px 24px",
                          }}
                        >
                          {ticket?.status}
                        </Button>
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <PdfViewer open={fileView} pdf={file} handleViewClose={handleFileViewClose} />
    </>
  );
}

export default TicketResolveDrawer;
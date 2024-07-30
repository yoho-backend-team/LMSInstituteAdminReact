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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getStaffTicketWithId } from "../services/staffTicketService";
import { useSpinner } from "context/spinnerContext";
import { formatDate } from "utils/format";
import { formatTime } from "utils/formatDate";
import PdfViewer from "./PdfViewer";


  function TicketResolveDrawer({ticketId}) {
    const [ticket,setTicket] = useState('');
    const [fileView,setFileView] = useState(false)
    const [file,setFile] = useState(null)
    const { show, hide} = useSpinner()

    const navigate = useNavigate();

    const statusColor = {
      opened: "#008375",
      closed: "#EBA13A",
    };

    const handleFileOpen = (file) => {
      setFile(file)
      setFileView(true)
    }

    const handleFileViewClose = () => {
      setFile(null)
      setFileView(false)
    }

    const handleback = () => {
      navigate(-1)
    }
    
    useEffect(() => {
      const fetchTicket = async () => {
        try {
          show()
          const res = await getStaffTicketWithId({id:ticketId});
          setTicket(res?.ticket);
        } catch (error) {
          console.error("Error fetching ticket:", error);
        }finally{
          hide()
        }
      };
      fetchTicket();
    }, []);


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
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#008375",
                  color: "white",
                  borderRadius: "8px",
                  boxShadow: "0px 6px 34px -8px #0D6EFD",
                  padding: "9px 24px",
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor: "#008375",
                  },
                  fontWeight: 500,
                }}
              >
               Close Ticket
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card>
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
              {/* <Typography
                sx={{
                  color: "black",
                  fontSize: "12px",
                  fontWeight: "700",
                  lineHeight: "24px",
                }}
              >
                Show activates
              </Typography>
              */}
              <Box sx={{ display: 'flex', gap: "21px"}} >
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
                    <Box>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            pb: "15px",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "14px",
                              fontWeight: 700,
                              lineHeight: "24px",
                            }}
                          >
                            Oliver Smith
                          </Typography>
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "10px",
                              fontWeight: 400,
                              lineHeight: "15px",
                            }}
                          >
                            Monday May, 2023 3:00 PM. 9 days ago
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#898989",
                              fontSize: "12px",
                              fontWeight: "500",
                              lineHeight: "15px",
                              pb: "40px",
                            }}
                          >
                            Concerns have been raised regarding attendance
                            inconsistencies, requiring attention for resolution.
                            Concerns have been raised regarding attendance
                            inconsistencies, requiring attention for resolution.
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "#DFC7FF",
                            borderRadius: "8px",
                            padding: "18px 13px 18px 30px",
                            mb: "40px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              pb: "15px",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#051732",
                                fontSize: "14px",
                                fontWeight: 700,
                                lineHeight: "24px",
                              }}
                            >
                              Oliver Smith
                            </Typography>
                            <Typography
                              sx={{
                                color: "#051732",
                                fontSize: "10px",
                                fontWeight: 400,
                                lineHeight: "15px",
                              }}
                            >
                              Monday May, 2023 3:00 PM. 9 days ago
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              color: "#72767D",
                              fontSize: "12px",
                              fontWeight: "500",
                              lineHeight: "15px",
                            }}
                          >
                            Checked the log and found the customer paid the
                            subscription for 1 year. order ID. #1234
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            pb: "15px",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "14px",
                              fontWeight: 700,
                              lineHeight: "24px",
                            }}
                          >
                            Oliver Smith
                          </Typography>
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "10px",
                              fontWeight: 400,
                              lineHeight: "15px",
                            }}
                          >
                            Monday May, 2023 3:00 PM. 9 days ago
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#898989",
                              fontSize: "12px",
                              fontWeight: "500",
                              lineHeight: "15px",
                              pb: "40px",
                            }}
                          >
                            Concerns have been raised regarding attendance
                            inconsistencies, requiring attention for resolution.
                            Concerns have been raised regarding attendance
                            inconsistencies, requiring attention for resolution.
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            gap: "20px",
                          }}
                        >
                          <Button
                            variant="outlined"
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
                      </Box>
                    </Box>
                  <Box
                      sx={{
                        display: "flex",
                        alignItems: "end",
                        paddingTop: "80px",
                      }}
                    >
                      <Box
                      sx={{
                        display : "none"
                      }}
                      >
                        <AddBoxOutlinedIcon
                          sx={{
                            color: "#0D6EFD",
                            "& path:first-of-type": {
                              color: "#130F26",
                            },
                          }}
                        />
                      </Box>
                      <TextField
                        variant="outlined"
                        fullWidth
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
                        InputProps={{
                          endAdornment: (
                            <AttachFileIcon
                              sx={{ color: "#78787C", rotate: "35deg" }}
                            />
                          ),
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          pl: "20px",
                        }}
                      >
                        <IconButton>
                          <SendIcon sx={{ color: "black" }} />
                        </IconButton>
                      </Box>
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
                        color : "#6C757D",
                        fontSize : "15px",
                        fontWeight : 600
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
                      <Typography onClick={()=>handleFileOpen} sx={{ color: "#5611B1", fontSize: "15px",fontWeight:600,cursor:"pointer"}} >
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
                    <Box
                      sx={{
                        display: "none",
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
                        Attempt:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "22px",
                          color: "#6C757D",
                        }}
                      >
                        1
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


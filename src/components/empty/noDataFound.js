import { useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import NoDataImage from "../../assets/images/no-data/no-data1.png";
import { getUserDetails } from "utils/check-auth-state";

const NoDataFoundComponent = ({ title, description, buttonText, onAdd }) => {
  const componentRef = useRef(null);
  const user = getUserDetails()

  
  useEffect(() => {
    componentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Box
      ref={componentRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        py: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <img
          src={NoDataImage}
          alt="no-data"
          style={{
            width: "300px",
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" gutterBottom>Hi, {user?.first_name + user?.last_name}!</Typography>
        <Typography component={"p"} sx={{ color: "gray", fontSize: "20px"}}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onAdd}
          sx={{
            textTransform: "none",
            width: "200px",
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default NoDataFoundComponent;

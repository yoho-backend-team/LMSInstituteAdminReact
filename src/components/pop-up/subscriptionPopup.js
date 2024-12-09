import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { CheckCircle, Close, InfoOutlined } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/system";

const Overlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(15, 15, 18, 0.7)",
  backdropFilter: "blur(8px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1300,
});

const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "32px",
  padding: "20px",
  width: "50%",
  maxWidth: "1000px",
  color: "#ffffff",
});

const TextSection = styled(Box)({
  flex: 1,
  textAlign: "center",
  padding: "20px",
  display: 'flex',
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "350px"
});

const UpgradeCard = styled(Box)({
  flex: 1,
  backgroundColor: "#19191F",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  border: "1px solid #1C1C21",
  position: "relative",
  color: "#ffffff",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
  color: "#707086",
});

const SubscriptionUpgradePrompt = ({ onClose, onUpgrade }) => {
  return (
    <Overlay>
      <ContentContainer
        sx={{
          backgroundColor: "#0F0F12",
          borderRadius: "8px",
          border: "1px solid #17171B",
        }}
      >
        {/* Left Text Section */}
        <TextSection>
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
            mb={2}
            sx={{
              backgroundColor: "#1F1F25",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #2E2E33",
              textAlign: "justify",alignItems: "flex-start" 
            }}
          > 
            <Tooltip
              title="You have reached the maximum feature usage allowed in your current plan. Upgrade to access more features and increase your usage limits."
              arrow
              placement="top"
            >
              <IconButton size="small" sx={{ color: "#F44336" }} >
                <InfoOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body1"
              sx={{ color: "#F44336", fontWeight: "bold"}}
            >
              Your current subscription plan limit has been reached.
            </Typography>
          </Box>
          <Box>
          <Typography
            variant="h5"
            mb={2}
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
              letterSpacing: "0.5px",
              background: "linear-gradient(90deg, #0CCE7F, #304FFE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
            }}
          >
            Unlock Your LMS Potential with the Pro Plan!
          </Typography>
          </Box>
        </TextSection>

        {/* Right Upgrade Card Section */}
        <UpgradeCard>
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>

          

          <Typography variant="h3" sx={{ color: "white" }} mb={2}>
            Upgrade Your Plan
          </Typography>

          {/* Feature List */}
          <List>
            <ListItem disableGutters>
              <ListItemIcon>
                <CheckIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Unlimited Course Creation" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <CheckIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Advanced Analytics & Reporting" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <CheckIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Enhanced Collaboration Tools" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <CheckIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Priority Customer Support" />
            </ListItem>
          </List>

          {/* Upgrade Button */}
          <Button
            variant="contained"
            onClick={()=>onUpgrade()}
            fullWidth
            sx={{
              marginTop: "16px",
              backgroundColor: "#0CCE7F",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Upgrade Now
          </Button>
        </UpgradeCard>
      </ContentContainer>
    </Overlay>
  );
};

export default SubscriptionUpgradePrompt;

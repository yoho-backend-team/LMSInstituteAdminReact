import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Close, School, BarChart, Group, Insights, Upgrade } from "@mui/icons-material";
import { styled } from "@mui/system";

const Overlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(14, 14, 14, 0.7)",
  backdropFilter: "blur(10px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1300,
});

const ContentBox = styled(Box)({
  width: "50%",
  maxWidth: "800px",
  backgroundColor: "white",
  color: "#fff",
  padding: "32px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
  position: "relative",
  border: "1px solid rgba(255, 255, 255, 0.2)",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "20px",
  right: "20px",
  color: "#C2C4C6",
});

const FeaturesSection = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  marginTop: "24px",
});

const FeatureBox = styled(Box)({
  width: "100px",
  textAlign: "center",
  marginBottom: "20px",
});

const IconBox = styled(Box)({
  fontSize: "40px",
  marginBottom: "10px",
  color: "#65686A",
});

const UpgradeButton = styled(Button)({
  marginTop: "24px",
  backgroundColor: "#87CEFA",
  color: "#fff",
  fontWeight: "bold",
  padding: "12px 24px",
  width: "100%",
  borderRadius: "8px",
  '&:hover': {
    backgroundColor: "#76BFEA",
  },
});

const UpgradePrompt = ({ onClose, onUpgrade }) => {
  return (
    <Overlay>
      <ContentBox>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>

        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          color={"#47546C"}
          mb={2}
        >
          Your Free Trial Has Expired
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          sx={{ color: "#8082A5", fontSize: "1.1rem", mb: 3 }}
        >
          Unlock the full potential of your LMS platform with our Pro Plan! Continue enjoying premium features to elevate your learning experience.
        </Typography>

        <FeaturesSection>
          <FeatureBox>
            <IconBox>
              <School />
            </IconBox>
            <Typography variant="body1" sx={{ color : "#6A6C6E"}}>
              Unlimited Courses
            </Typography>
          </FeatureBox>
          <FeatureBox>
            <IconBox>
              <BarChart />
            </IconBox>
            <Typography variant="body1" sx={{ color : "#6A6C6E"}} >
              Detailed Analytics
            </Typography>
          </FeatureBox>
          <FeatureBox>
            <IconBox>
              <Group />
            </IconBox>
            <Typography variant="body2" sx={{ color : "#6A6C6E"}} >
              Student Tracking
            </Typography>
          </FeatureBox>
          <FeatureBox>
            <IconBox>
              <Insights />
            </IconBox>
            <Typography variant="body2" sx={{ color : "#6A6C6E"}}>
              Insights & Reports
            </Typography>
          </FeatureBox>
          <FeatureBox>
            <IconBox>
              <Upgrade />
            </IconBox>
            <Typography variant="body2" sx={{ color : "#6A6C6E"}}>
              Premium Support
            </Typography>
          </FeatureBox>
        </FeaturesSection>

        <UpgradeButton onClick={onUpgrade}>
          Upgrade Now
        </UpgradeButton>
      </ContentBox>
    </Overlay>
  );
};

export default UpgradePrompt;

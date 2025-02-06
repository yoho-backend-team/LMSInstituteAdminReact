import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AllActivity from './card/Allactivity';
import CardData from './card/CardData';
import CardPopularCourse from './card/CardPopularCourse';
import CardProjectStatus from './card/CardProjectStatus';
import CardStatsVertical from './card/CardStatsVertical';
import RevenueReport from './card/RevenueReport';
import CardSupportTracker from './card/CardSupportTracker';
import DashboardSkeleton from 'components/cards/Skeleton/DashboardSkeleton';
import client from 'api/client';
import { useSpinner } from 'context/spinnerContext';
import toast from 'react-hot-toast';
import Tour from 'components/tour/Tour';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [Reports, setReports] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const { show, hide } = useSpinner();

  const steps = [
    {
      target: '.header',
      content: 'This is the header section, where you can navigate to other pages.',
      tooltipStyle: {
        top: '50px',
        left: '50px',
        backgroundColor: '#ff8c00', // Custom tooltip color
      },
      highlightStyle: {
        border: '2px solid #ff8c00',
        position: 'absolute',
        top: '50px',
        left: '50px',
        width: '100%',
        height: '100px',
        zIndex: 10,
      },
    },
    {
      target: '.features',
      content: 'Explore our features here. This is where all the action happens!',
      tooltipStyle: {
        top: '200px',
        left: '50px',
        backgroundColor: '#0CCE7F', // Green tooltip
      },
      highlightStyle: {
        border: '2px solid #0CCE7F',
        position: 'absolute',
        top: '200px',
        left: '50px',
        width: '80%',
        height: '120px',
        zIndex: 10,
      },
    },]

  useEffect(() => {
    const getReports = async (props) => {
      try {
        show();
        const response = await client.reports.get(props);
        setReports(response);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        hide();
      }
    };
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    const data = { branch: selectedBranchId };
    getReports(data);
    return () => clearTimeout(timer);
  }, [selectedBranchId]);

  return (
    <Grid container spacing={2} className="match-height">
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <Grid container spacing={2} sx={{ pt: "22px", pl: "22px" }}>
      {/* <div>
      <header className="header">
        <h1>Welcome to Our Website</h1>
      </header>
      <section className="features">
        <h2>Features</h2>
        <p>Learn more about what we offer.</p>
      </section>
          
      <Tour steps={steps} onTourComplete={() => alert('Tour Completed!')} />
    </div> */}
          {/* Top Stack Cards - Full Width */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardStatsVertical
                  stats={Reports?.totalBalance}
                  // bg={"#e0f7fa"}
                  chipText="-12.2%"
                  chipColor="default"
                  iconBg="#00796b"
                  avatarColor="#004d40"
                  title="Total Earnings"
                  subtitle="Last week"
                  avatarIcon="healthicons:money-bag"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardStatsVertical
                  // bg={"#e3f2fd"}
                  stats={Reports?.totalPaidAmount}
                  chipText="+25.2%"
                  iconBg="#1976d2"
                  avatarColor="#0d47a1"
                  chipColor="default"
                  title="Payouts"
                  subtitle="Last week"
                  avatarIcon="material-symbols:paid-outline"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardStatsVertical
                  // bg={"#f1f8e9"}
                  stats={Reports?.TeachingstaffCount}
                  chipText="-12.2%"
                  iconBg="#689f38"
                  chipColor="default"
                  avatarColor="#33691e"
                  title="Instructor"
                  subtitle="Last week"
                  avatarIcon="mdi:teacher"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardStatsVertical
                  // bg={"#fff3e0"}
                  stats={Reports?.studentCount}
                  chipText="+25.2%"
                  iconBg="#fb8c00"
                  avatarColor="#e65100"
                  chipColor="default"
                  title="Students"
                  subtitle="Last week"
                  avatarIcon="ph:student"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4} >
                <CardStatsVertical
                  bg={"#d81b60"}
                  stats={Reports?.courseCount}
                  chipText="+25.2%"
                  avatarColor="#880e4f"
                  chipColor="default"
                  title="Courses"
                  subtitle="Last week"
                  avatarIcon="tabler:books"
                />
              </Grid>
            </Grid>
          </Grid>
          
          {/* Card Data Section */}
          {/* <Grid item xs={8.5}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <CardData
                  sx={{ boxShadow: 'none' }}
                  stats={Reports?.mainCategory}
                  chipText="-12.2%"
                  chipColor="default"
                  avatarColor="error"
                  title="Main"
                  subtitle="Last week"
                  avatarIcon="healthicons:money-bag"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardData
                  sx={{ boxShadow: 'none' }}
                  stats={Reports?.categoryCount}
                  chipText="-12.2%"
                  chipColor="default"
                  avatarColor="error"
                  title="Category"
                  subtitle="Last week"
                  avatarIcon="ic:baseline-money"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardData
                  sx={{ boxShadow: 'none' }}
                  stats={Reports?.courseCount}
                  chipText="+25.2%"
                  avatarColor="info"
                  chipColor="default"
                  title="Courses"
                  subtitle="Last week"
                  avatarIcon="mingcute:wallet-fill"
                />
              </Grid>
            </Grid>
            
          </Grid> */}
          <Grid item xs={12} md={8.5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <RevenueReport revenue={Reports?.revenue} />
              </Grid>
              <Grid item xs={12} md={5}>
                <CardPopularCourse courses={Reports?.popularCourses} />
              </Grid>
            </Grid>
          </Grid>

             {/* AllActivity Section */}
          <Grid item xs={12} md={3.5}>
            {/* <AllActivity /> */}
          </Grid>

          {/* Revenue and Popular Course */}
          

          {/* Project Status and Support Tracker */}
          <Grid item xs={12} md={6}>
            <CardProjectStatus />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardSupportTracker />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;

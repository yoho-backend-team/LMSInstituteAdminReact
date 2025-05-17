import { Box, Button, Grid,Typography ,Tabs,Tab} from '@mui/material';
import { useState } from 'react';
import RevenueReport from './RevenueReport';
import ExpenseReport from './ExpenseReport';

const FlipChart = ({ revenue, expense }) => {
  const [chartType, setChartType] = useState('revenue'); // Default: Revenue

  return (
    <Grid container spacing={2} justifyContent="center" sx={{mt:0.5}}>
      {/* Buttons & Chart in Same Grid */}
      <Grid item xs={12} md={10} lg={8} sx={{mt:-1.5}}>
        <Box sx={{ width: '100%', textAlign: 'center'  }}>


          {/* Tabs Buttons */}
          
          <Tabs
            value={chartType}
            onChange={(e, newValue) => setChartType(newValue)}
            centered
            sx={{
            
              "& .MuiTab-root": {
                fontSize: "0.95rem", // Increase tab font size
                fontWeight: "bold",
                textTransform: "none",
              },
              "& .Mui-selected": {
                color: "#1976D2", // Highlight active tab
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1976D2", // Indicator color
              },
            }}
          >
            <Tab label="Revenue" value="revenue" />
            <Tab label="Expense" value="expense" />
          </Tabs>
        </Box>

        {/* Flip Animation Container */}
        <Box sx={{ perspective: '1000px', width: '150%', display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              right:'23%',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: chartType === 'revenue' ? 'rotateY(0deg)' : 'rotateY(180deg)',
            }}
          >
            {/* Revenue Chart */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                backfaceVisibility: 'hidden',
              }}
            >
              <RevenueReport revenue={revenue} />
            </Box>

            {/* Expense Chart (Flipped) */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}
            >
              <ExpenseReport expense={expense} />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FlipChart;

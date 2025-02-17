import { Box, Button, Grid,Typography } from '@mui/material';
import { useState } from 'react';
import RevenueReport from './RevenueReport';
import ExpenseReport from './ExpenseReport';

const FlipChart = ({ revenue, expense }) => {
  const [chartType, setChartType] = useState('revenue'); // Default: Revenue

  return (
    <Grid container spacing={2} justifyContent="center" sx={{mt:0.5}}>
      {/* Buttons & Chart in Same Grid */}
      <Grid item xs={12} md={10} lg={8}>
        <Box sx={{ width: '100%', textAlign: 'center'  }}>
          {/* Toggle Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Typography
              onClick={() => setChartType('revenue')}
              sx={{
                cursor: 'pointer',
                fontWeight: chartType === 'revenue' ? 'bold' : 'normal',
                textDecoration: chartType === 'revenue' ? 'underline' : 'none',
              }}
            >
              Revenue
            </Typography>
            <Typography
              onClick={() => setChartType('expense')}
              sx={{
                cursor: 'pointer',
                fontWeight: chartType === 'expense' ? 'bold' : 'normal',
                textDecoration: chartType === 'expense' ? 'underline' : 'none',
              }}
            >
              Expense
            </Typography>
          </Box>
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

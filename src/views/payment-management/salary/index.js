// material-ui
import { Grid } from '@mui/material';
import { useState,useEffect } from 'react';

// project imports
import SalaryTable from 'features/payment-management/salaries/components/SalaryTable';
import PaymentSalarySkeleton from 'components/cards/Skeleton/PaymentSalarySkeleton';
// ==============================|| SAMPLE PAGE ||============================== //

const Salary = () => {
 
  const [loading, setLoading] = useState(true);

  // Simulate loading delay with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     <Grid>
      <Grid spacing={1} className="match-height">
        {loading ? (
          // If data is still loading, display skeleton
          <PaymentSalarySkeleton />
        ) : (
          // Once data is loaded, display actual FeesTable component
          <SalaryTable />
        )}
      </Grid>
    </Grid>

    </>
  );
};

export default Salary;

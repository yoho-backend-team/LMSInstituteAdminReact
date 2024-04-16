import { Grid } from '@mui/material';
import SalaryTable from 'features/payment-management/salaries/components/SalaryTable';

const Salary = () => {
  return (
    <>
      <Grid container spacing={1} className="match-height">
        <Grid item xs={12} sm={12}>
          <SalaryTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Salary;

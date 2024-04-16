import { Grid } from '@mui/material';
import SalaryTable from 'features/payment-management/salaries/components/SalaryTable';

const Salary = () => {

  return (
    <>
      <Grid>
        <Grid container spacing={1} className="match-height">
           <SalaryTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Salary;

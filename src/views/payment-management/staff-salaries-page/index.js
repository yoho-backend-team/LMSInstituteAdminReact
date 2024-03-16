// material-ui
import { Grid } from '@mui/material';
// project imports
import SalaryTable from 'features/payment-management/salaries/components/SalaryTable';

const Salary = () => {

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
           <SalaryTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Salary;

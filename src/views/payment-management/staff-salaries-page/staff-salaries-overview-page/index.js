import { Button, Grid } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import SalaryTable from 'features/payment-management/salaries/components/SalaryTable';
import { useNavigate } from 'react-router';

const Salary = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={1} className="match-height">
        <Grid item xs={12} sm={12}>
          <Button sx={{ml:2,mt:2}} variant='contained' size="small" onClick={() => navigate('/payment-management/fees')}>
            <IconArrowLeft stroke={2}/>
          </Button>
          <SalaryTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Salary;

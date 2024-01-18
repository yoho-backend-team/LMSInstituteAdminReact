// material-ui
import { Grid } from '@mui/material';

// project imports
// import MainCard from 'components/cards/MainCard';
import CategoryCard from 'features/course-management/categories/components/CategoryCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Categories = () => (
  <Grid container spacing={2}>
    <Grid item xs={6} sm={3}>
      <CategoryCard
        stats="1.28k"
        chipText="-12.2%"
        chipColor="default"
        avatarColor="error"
        title="Total Profit"
        subtitle="Last week"
        avatarIcon="tabler:currency-dollar"
      />
    </Grid>
    <Grid item xs={6} sm={3}>
      <CategoryCard
        stats="1.28k"
        chipText="-12.2%"
        chipColor="default"
        avatarColor="error"
        title="Total Profit"
        subtitle="Last week"
        avatarIcon="tabler:currency-dollar"
      />
    </Grid>
    <Grid item xs={6} sm={3}>
      <CategoryCard
        stats="1.28k"
        chipText="-12.2%"
        chipColor="default"
        avatarColor="error"
        title="Total Profit"
        subtitle="Last week"
        avatarIcon="tabler:currency-dollar"
      />
    </Grid>
    <Grid item xs={6} sm={3}>
      <CategoryCard
        stats="1.28k"
        chipText="-12.2%"
        chipColor="default"
        avatarColor="error"
        title="Total Profit"
        subtitle="Last week"
        avatarIcon="tabler:currency-dollar"
      />
    </Grid>
  </Grid>
);

export default Categories;

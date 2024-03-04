// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
// ** Icon Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Icon from 'components/icon';

const FaqCategoriesTableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Faq Categories" />
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Grid container spacing={4}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      value={value}
                      label="Search Certificate"
                      sx={{}}
                      placeholder="Search"
                      onChange={(e) => handleFilter(e.target.value)}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                      <Icon fontSize="1.125rem" icon="tabler:plus" />
                      Add Faq Categories
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FaqCategoriesTableHeader;

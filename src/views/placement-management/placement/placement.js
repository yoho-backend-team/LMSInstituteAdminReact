import { Grid } from '@mui/material';
import AddPlacement from 'features/placement/add-placement';
import PalacementHeader from 'features/placement/placement-header.js'
const Placement = () => {
  return (
    <>
      <Grid container spacing={1} className="match-height">
        <Grid item xs={12} sm={12}>
          <PalacementHeader/>
        </Grid>
      </Grid>
    </>
  );
};

export default Placement;

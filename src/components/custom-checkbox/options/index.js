// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
// import Typography from '@mui/material/Typography';
// import { StepLabel } from '@mui/material/StepLabel';
// import CustomTextField from 'components/mui/text-field';
import { TextField } from '@mui/material';

const CustomCheckbox = (props) => {
  // ** Props
  const { data, name, selected, gridProps, handleChange, color = 'primary' } = props;
  const { value } = data;

  const renderData = () => {
    return <TextField label="Enter option" value="" fullWidth />;
  };

  const renderComponent = () => {
    return (
      <Grid item {...gridProps}>
        <Box
          sx={{
            p: 4,
            height: '100%',
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            position: 'relative',
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            ...(selected.includes(value)
              ? { borderColor: `${color}.main` }
              : { '&:hover': { borderColor: (theme) => `rgba(${theme.palette.customColors.main}, 0.25)` } })
          }}
        >
          <Checkbox
            size="small"
            color={color}
            name={`${name}-${value}`}
            checked={selected.includes(value)}
            sx={{ ml: -2.75 }}
            onChange={() => handleChange(value)}
          />
          {renderData()}
        </Box>
      </Grid>
    );
  };

  return data ? renderComponent() : null;
};

export default CustomCheckbox;

// ** MUI Imports
import MuiChip from '@mui/material/Chip';

// ** Third Party Imports
import clsx from 'clsx';

const Chip = (props) => {
  // ** Props
  const { sx, skin, rounded, ...otherProps } = props;

  return (
    <MuiChip
      {...otherProps}
      variant="filled"
      className={clsx({
        'MuiChip-rounded': rounded,
        'MuiChip-light': skin === 'light'
      })}
      sx={sx}
    />
  );
};

export default Chip;

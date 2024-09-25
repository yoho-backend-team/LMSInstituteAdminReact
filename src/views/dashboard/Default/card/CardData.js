import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const CardData = (props) => {
  const { sx, stats, title } = props;
  return (
    <Card sx={{ ...sx, minHeight: '100%', border : "1px solid #E5E7EB", borderRadius: "8px" }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pb: 0 }}>
        <Typography variant="h4" sx={{ mb: 1, color: 'text.primary', fontWeight: 'bold' }}>
          {stats}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.disabled', fontWeight: '500', fontSize: 13 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};
CardData.propTypes = {
  sx: PropTypes.any,
  stats: PropTypes.any,
  title: PropTypes.any
};
export default CardData;

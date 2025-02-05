import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import SubscriptionDetails from './SubscriptionDetails';
import Slider from 'react-slick';
import { IconCaretRightFilled,IconCaretLeftFilled} from '@tabler/icons-react';
import { Button } from '@mui/material';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Button
      onClick={onClick}
      className={className}
      style={{ ...style, display: 'block',color:"black", borderRadius: '50%', marginRight: 8,position:"absolute",top:'38%',zIndex:1}}
    >
      <IconCaretRightFilled stroke={2} size={60}/>
    </Button>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Button
      onClick={onClick}
      className={className}
      style={{ ...style, display: 'block',color:"black", borderRadius: '50%',marginRight:10,position:"absolute",top:'38%',zIndex:1}}
    >
      <IconCaretLeftFilled stroke={2} size={60}/>
    </Button>
  );
};

const SubscriptionPlans = (props) => {
  // ** Props
  const { plan, Subscriptions, data } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Slider {...settings}>
          {Subscriptions?.map((item) => (
            <div key={item?.id}>
              <SubscriptionDetails plan={data} data={item} />
            </div>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
};

SubscriptionPlans.propTypes = {
  plan: PropTypes.any,
  Subscriptions: PropTypes.any
};

export default SubscriptionPlans;

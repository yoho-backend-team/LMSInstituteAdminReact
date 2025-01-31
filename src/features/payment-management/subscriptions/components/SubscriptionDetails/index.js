import { Card, CardActionArea, CardContent, CardMedia, Modal } from '@mui/material'; // Added Modal here
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { hexToRGBA } from 'utils/hex-to-rgba';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';
import { IconCircleCheck } from '@tabler/icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { IconSquareX } from '@tabler/icons';
import { useDispatch } from 'react-redux';
import { setUpgrade } from '../../redux/slices';

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius
}));

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& > :not(:last-child)': {
    marginBottom: theme.spacing(2.5)
  }
}));

const SubscriptionDetails = (props) => {
  const dispatch = useDispatch();
  // ** Props
  const { data, plan } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpgrade, setIsUpgrade] = useState(false);
  const [cancel, setCancel] = useState(false);

  const renderFeatures = () => {
    if (!Array.isArray(data?.features)) {
      return null;
    }

    return data.features.map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ display: 'inline-flex', color: 'text.secondary', mr: 2.5 }}>
          <IconCircleCheck stroke={2} color="violet" />
        </Box>
        <Typography sx={{ color: 'text.secondary' }}>{item?.feature?.identity}</Typography>
      </Box>
    ));
  };

  const handlePopup = () => {
    setModalOpen(!modalOpen);
  };

  const handleUpgrade = () => {
    const userConfirmed = window.confirm('Are you sure you want to upgrade?');
    if (userConfirmed) {
      setIsUpgrade(true);
      alert('Upgrade in progress...');
      dispatch(setUpgrade(data));
    }
  };
  const handleClose = () => {
    const userCancel = window.confirm('Are you sure Want to cancel?');
    if (userCancel) {
      setCancel(true);
      setIsUpgrade(false)
      alert('cancel request has submitted.');
    }
  };

  return (
    <BoxWrapper>
      {data?.is_popular ? (
        <CustomChip
          rounded
          size="small"
          skin="light"
          label="Popular"
          color="primary"
          sx={{
            top: 24,
            right: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 500,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null}
      <Box>
        <Card
          sx={{
            width: '100%',
            transition: 'all 0.3s ease-in-out',
            '&:focus-within': {
              outline: '3px solid green',
              boxShadow: 6,
              transform: 'scale(1.05)'
            }
          }}
        >
          <CardActionArea>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
              <CardMedia
                component="img"
                height="100"
                image={`${data?.image ? getImageUrl(data?.image) : imagePlaceholder}`}
                alt={`${data?.identity}-plan-img`}
                sx={{ objectFit: 'contain', maxWidth: '150px' }}
              />
            </Box>
          </CardActionArea>
          <Box sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography sx={{ mb: 1.5, fontWeight: 500, lineHeight: 1.385, fontSize: '1.625rem', textTransform: 'uppercase' }}>
                {data?.identity.length > 10 ? `${data.identity.substring(0, 7)}...` : data.identity}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{data?.description}</Typography>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Typography sx={{ mt: 2.5, mr: 0.5, fontWeight: 500, color: 'primary.main', alignSelf: 'flex-start' }}>₹</Typography>
                  <Typography variant="h1" sx={{ color: 'primary.main', fontSize: '3rem', lineHeight: 1.4168 }}>
                    {data?.price || '2000'}
                  </Typography>
                  <Typography sx={{ mb: 1.5, alignSelf: 'flex-end', color: 'text.disabled' }}>/{data?.duration?.unit}</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 5, boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)', borderRadius: 2, py: 1 }}>
                <Typography variant="h4" sx={{ textAlign: 'left', pl: 3, textDecoration: 'underline' }}>
                  Features
                </Typography>
                <Box sx={{ display: 'flex', pl: 3, mt: 2 }}>
                  <Box>{renderFeatures()}</Box>
                </Box>
              </Box>
            </CardContent>
          </Box>
          <Button
            disabled={isUpgrade}
            onClick={handlePopup}
            fullWidth
            color={data?.currentPlan ? 'success' : 'primary'}
            variant={data?.popularPlan ? 'contained' : 'tonal'}
            sx={{
              ...(isUpgrade && {
                backgroundColor: 'grey',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'darkgrey'
                }
              }),
              ...(!isUpgrade && {
                '&:disabled': {
                  backgroundColor: 'lightgrey',
                  color: 'white'
                },
                ...(cancel && {
                  '&:disabled': {
                    backgroundColor: 'lightgrey',
                    color: 'white'
                  }
                })
              })
            }}
          >
            {data?._id === plan?.[0]?.subscriptionId?._id ? 'Your Current Plan' : 'Select'}
          </Button>
        </Card>
      </Box>

      <Modal open={modalOpen} onClose={handlePopup}>
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            right: '5%',
            bottom: '5%',

            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 5
          }}
        >
          <Button
            onClick={handlePopup}
            size="small"
            variant="contained"
            sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red' }}
          >
            <IconSquareX stroke={2} />
          </Button>
          <Box sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)', height: '100%', borderRadius: 2, my: 1, mb: 2 }}>
            <Box
              sx={{
                backgroundColor: 'darkslateblue',
                height: '30%',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                pt: 4
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 50, fontWeight: 'bold', color: 'white', textTransform: 'upperCase' }}>
                  {data?.identity}
                </Typography>
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{data?.description}</Typography>
              </Box>
              <Box sx={{ width: '30%', mt: 10, height: '100%' }}>
                <Card sx={{ width: '100%', height: '500px' }}>
                  <CardActionArea>
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={`${data?.image ? getImageUrl(data?.image) : imagePlaceholder}`}
                        alt={`${data?.identity}-plan-img`}
                        sx={{ objectFit: 'contain', maxWidth: '150px' }}
                      />
                    </Box>
                  </CardActionArea>
                  <CardContent>
                    <Box>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>
                        Course Type:
                        <span style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize', marginLeft: 10, color: 'black' }} F>
                          {data?.identity}
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>
                        About course:
                        <span style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize', marginLeft: 10, color: 'black' }} F>
                          {data?.description}
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>
                        couse price:
                        <span style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize', marginLeft: 10, color: 'black' }} F>
                          ${data?.price}
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 15 }}>
                      <Box>
                        {data?._id === plan?.[0]?.subscriptionId?._id ? (
                          <Button
                            variant="contained"
                            onClick={() => alert('renewing is Under processing once completed you got the message')}
                          >
                            Renew
                          </Button>
                        ) : (
                          <Button variant="contained" onClick={handleUpgrade}>
                            Upgrade
                          </Button>
                        )}
                      </Box>
                      <Box>
                      {isUpgrade?
                        <Button onClick={handleClose} variant="contained">
                          Cancel
                        </Button>:<Button onClick={handlePopup} variant="contained">
                          Cancel
                        </Button>
                      }
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box
              sx={{
                boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
                width: '50%',
                height: '50%',
                ml: '2%',
                mt: '5%',
                pt: 1,
                pl: 3,
                borderRadius: 10
              }}
            >
              <Typography variant="h4" sx={{ textAlign: 'left', mb: 3, mt: 2, textDecoration: 'underline', fontSize: 20, ml: 1 }}>
                Features
              </Typography>
              <Typography>{renderFeatures()}</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </BoxWrapper>
  );
};

SubscriptionDetails.propTypes = {
  data: PropTypes.any,
  plan: PropTypes.any
};

export default SubscriptionDetails;

import React from 'react';
import Image from 'components/image';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UserProfile from 'features/course-management/courses/components/user-profile/UserProfile';

const CourseViewPage = () => {
  return (
    <div>
      <Grid container padding={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: 'relative',
            p: 2
          }}
        >
          <Typography variant="h1" style={{ fontSize: '43px', marginTop: '10px' }}>
            Professional Certificate Course In AI And Machine Learning
          </Typography>
          <Typography style={{ fontSize: '20px', marginTop: '20px' }}>
            This machine learning course will equip you with highly coveted skills in ML, deep learning, NLP, generative AI, prompt
            engineering, ChatGPT, and much more. Through live classes by industry experts, masterclasses from IIT Kanpur faculty, and
            hands-on projects, you will stay ahead in the field of AI.
          </Typography>
          <Stack spacing={2} direction="row" sx={{ mt: 5 }}>
            <Button variant="contained" size="large">
              Apply Now
            </Button>
            <Button variant="outlined" size="large">
              Download Syllabus
            </Button>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: 'relative',
            display: { xs: 'none', md: 'block' }
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(87.1deg, #7A3029 2.57%, #402B2A 71.55%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 20%)'
            }}
          ></div>
          <Image
            src="https://www.simplilearn.com/ice9/banners/IITkanpurblockhain.jpg"
            alt="Insititue image"
            style={{ objectFit: 'cover', width: '100%', height: '100%', padding: '40px', position: 'relative' }}
          />
        </Grid>
      </Grid>
      <Grid container paddingLeft={2} paddingRight={2}>
        <Card sx={{ width: '100%', display: 'flex', padding: '25px' }}>
          <Grid container>
            <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center" flexDirection={'column'}>
              <Typography variant="subtitle1" style={{ fontSize: '16px' }}>
                Next Cohort starts
              </Typography>
              <Typography variant="h3" pt={1}>
                2 Feb, 2024
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center" flexDirection={'column'}>
              <Typography variant="subtitle1" style={{ fontSize: '16px' }}>
                Program Duration
              </Typography>
              <Typography variant="h3" pt={1}>
                11 Months
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center" flexDirection={'column'}>
              <Typography variant="subtitle1" style={{ fontSize: '16px' }}>
                Learning Format
              </Typography>
              <Typography variant="h3" pt={1}>
                Online Bootcamp
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid container padding={2} marginTop={5}>
        <Grid>
          <Typography variant="h2">World’s #1 Online Bootcamp</Typography>
        </Grid>

        <Grid container marginTop={2}>
          <Grid item xs={12} md={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h2" pt={1}>
              4.5
            </Typography>
            <Image
              style={{ objectFit: 'cover', width: '150px', paddingLeft: '15px' }}
              src="https://www.simplilearn.com/ice9/assets/pg-page/switchup.png"
            />
          </Grid>
          <Grid item xs={12} md={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h2" pt={1}>
              4.3
            </Typography>
            <Image
              style={{ objectFit: 'cover', width: '150px', paddingLeft: '15px' }}
              src="https://www.simplilearn.com/ice9/assets/pg-page/course-report.png"
            />
          </Grid>
          <Grid item xs={12} md={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h2" pt={1}>
              4.1
            </Typography>
            <Image
              style={{ objectFit: 'cover', width: '150px', paddingLeft: '15px' }}
              src="https://upload.wikimedia.org/wikipedia/commons/9/96/Zoho-logo.png?20190620054740"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container padding={2} marginTop={3}>
        <Grid>
          <Typography variant="h2">Why Join this Program</Typography>
        </Grid>
        <Grid container marginTop={3} spacing={2}>
          <Grid item md={3}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ padding: '0px', display: 'flex', flexGrow: 1 }}>
                <Typography style={{ backgroundColor: '#974EC3', width: '10px', height: '30px', marginTop: '20px' }}></Typography>
                <CardContent style={{ borderBottom: '5px solid #974EC3', flexGrow: 1 }}>
                  <Typography gutterBottom variant="h3" component="div">
                    IIT Kanpur’s Advantage
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Live classes by industry experts along with Masterclasses by distinguished IIT-Kanpur faculty
                  </Typography>
                </CardContent>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ padding: '0px', display: 'flex', flexGrow: 1 }}>
                <Typography style={{ backgroundColor: '#974EC3', width: '10px', height: '30px', marginTop: '20px' }}></Typography>
                <CardContent style={{ borderBottom: '5px solid #974EC3', flexGrow: 1 }}>
                  <Typography gutterBottom variant="h3" component="div">
                    Exposure to Latest AI Trends
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Live online classes for generative AI, prompt engineering, explainable AI, ChatGPT, and much more
                  </Typography>
                </CardContent>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ padding: '0px', display: 'flex', flexGrow: 1 }}>
                <Typography style={{ backgroundColor: '#974EC3', width: '10px', height: '30px', marginTop: '20px' }}></Typography>
                <CardContent style={{ borderBottom: '5px solid #974EC3', flexGrow: 1 }}>
                  <Typography gutterBottom variant="h3" component="div">
                    Hands-on Experience
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gain experience through 25+ hands-on projects and 20+ tools with seamless access to integrated labs
                  </Typography>
                </CardContent>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ padding: '0px', display: 'flex', flexGrow: 1 }}>
                <Typography style={{ backgroundColor: '#974EC3', width: '10px', height: '30px', marginTop: '20px' }}></Typography>
                <CardContent style={{ borderBottom: '5px solid #974EC3', flexGrow: 1 }}>
                  <Typography gutterBottom variant="h3" component="div">
                    Simplilearn Career Assistance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Resume-building and profile-highlighting assistance with valuable insights from industry experts
                  </Typography>
                </CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid container padding={2} marginTop={3}>
        <Grid>
          <Typography variant="h2">Fast-track Your Career</Typography>
        </Grid>
        <Grid container marginTop={2}>
          <Typography variant="body2" style={{ fontSize: '17px' }}>
            After completing Simplilearn courses, learners have made successful career transitions, boosted career growth, and got salary
            hikes.
          </Typography>
        </Grid>
      </Grid>

      <Grid container padding={2} marginTop={3}>
        <Grid>
          <Typography variant="h2">Our Alumni In Top Companies</Typography>
        </Grid>
        <Grid container marginTop={2} spacing={4}>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/Amazon.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/Microsoft.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/Google.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/LinkedIn.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/Adobe.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/Deloitte.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/Netflix.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://upload.wikimedia.org/wikipedia/commons/9/96/Zoho-logo.png?20190620054740" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/JPMorgan-Chase.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/HSBC.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/Deutsche.png?w=200&dpr=1" />
          </Grid>
          <Grid item md={3} xs={6}>
            <Image style={{ width: '120px' }} src="https://www.simplilearn.com/ice9/logos/Airbus.png?w=200&dpr=1" />
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <UserProfile />
      </Grid>
    </div>
  );
};

export default CourseViewPage;

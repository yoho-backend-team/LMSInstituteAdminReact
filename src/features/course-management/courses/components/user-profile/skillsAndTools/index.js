// ** MUI Components
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Icon from 'components/icon';
import Image from 'components/image';


// Styled component for the "Preview" button
const PreviewButton = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& .tick-icon': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main
  }
}));

const SkillsAndTools = () => {
  const skillsData = [
    'Generative AI',
    'Machine Learning',
    'Data Science',
    'Web Development',
    'UI/UX Design',
    'Mobile App Development',
    'Cloud Computing',
    'Blockchain',
    'Cybersecurity',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Reinforcement Learning',
    'Speech Recognition',
    ' Statistics'
  ];

  return (
    <Grid padding={2}>
      <Grid>
        <Typography variant="h2">Skills</Typography>
      </Grid>
      <Grid container spacing={4} sx={{mt:2}}>
        {skillsData.map((skill, index) => (
          <Grid key={index} item xs={6} md={4}>
            <PreviewButton variant="h4">
              <Icon className="tick-icon" icon="fa-regular:check-circle" /> {skill}
            </PreviewButton>
          </Grid>
        ))}
      </Grid>

      <Grid container marginTop={5}>
        <Grid>
          <Typography variant="h2">Tools</Typography>
        </Grid>
        <Grid container marginTop={1} spacing={4}>
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
    </Grid>
  );
};

export default SkillsAndTools;

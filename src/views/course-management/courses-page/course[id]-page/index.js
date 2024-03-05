import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import CourseEditModal from 'features/course-management/courses-page/course-overview-page/components/CourseEditModal';
import { useState } from 'react';

const CourseViewPage = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const accordionData = [
    {
      id: 'panel1',
      title: 'Accordion 1',
      content: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        'Cupcake sesame snaps sweet tart dessert biscuit.',
        'Topping soufflé tart sweet croissant.'
      ]
    },
    {
      id: 'panel2',
      title: 'Accordion 2',
      content: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        'Cupcake sesame snaps sweet tart dessert biscuit.',
        'Topping soufflé tart sweet croissant.'
      ]
    },
    {
      id: 'panel3',
      title: 'Accordion 3',
      content: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'
      ]
    },
    {
      id: 'panel3',
      title: 'Accordion 3',
      content: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'
      ]
    },
    {
      id: 'panel3',
      title: 'Accordion 3',
      content: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'
      ]
    },
    {
      id: 'panel3',
      title: 'Accordion 3',
      content: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'
      ]
    }
  ];

  const createAccordion = (accordion) => (
    <Grid container xs={12} sx={{ p: 0, m: 0 }}>
      <Accordion
        key={accordion.id}
        expanded={expanded === accordion.id}
        onChange={handleChange(accordion.id)}
        sx={{ '&.MuiPaper-root': { borderRadius: '0.5rem', m: 0.5, background: 'none', boxShadow: 'none' } }}
      >
        <Grid item xs={12}>
          <AccordionSummary
           className='course-id-page'
            id={`customized-panel-header-${accordion.id}`}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`customized-panel-content-${accordion.id}`}
          >
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, p: 0 }}>
              <Typography variant="p">{accordion.title}</Typography>

              {/* previewbox */}
              {/* {expanded !== accordion.id && (
                <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', mr: 2, transformStyle: 'flat' }}>
                  <Button variant="tonal" color="primary" >
                    <PlayCircleIcon className="play-icon" sx={{ color: 'primary.main' }} />
                    <Typography variant="p" color="primary" sx={{ ml: 1 }}>
                      Preview
                    </Typography>
                  </Button>
                </Box>
              )} */}
            </Box>
          </AccordionSummary>
          <Divider />
        </Grid>

        <AccordionDetails sx={{ p: 0 }}>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <List>
                {accordion.content.map((item, index) => (
                  <ListItem key={index}>
                    <Typography variant="subtitle2" sx={{ fontSize: '16px', textAlign: 'justify' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Button variant="tonal" color="primary" fullWidth>
                  <PlayCircleIcon className="play-icon" sx={{ color: 'primary.main' }} />
                  Preview
                </Button>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={12} sm={8}>
        <Card>
          <CardHeader title="New course" />{' '}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <video
              controls
              autoPlay
              loop
              muted
              poster="https://assets.codepen.io/6093409/river.jpg"
              style={{ aspectRatio: '12 / 6', objectFit: 'cover', width: '100%' }}
            >
              <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
            </video>
          </Box>
          <CardContent>
            Each and every day, people are earning passive income through teaching their valuable skills online. If you`&apos;ve been
            looking for a way to develop passive income, look no further! This course will take you from absolute beginner to online video
            course rockstar in no time flat. Every method shown in this course has been developed and refined over the last 3 years to get
            long-lasting income results.
            <Button size="medium" sx={{ p: 0 }}>
              View more
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{ pb: 2 }}>
          <Button
            fullWidth
            onClick={() => handleEdit()}
            variant="contained"
            color="primary"
            startIcon={<Icon icon="mdi:pencil" />}
            sx={{ '&.MuiButtonBase-root': { borderRadius: 0, boxShadow: 'none', pb: 3, pt: 3 } }}
          >
            Edit Course
          </Button>
          {accordionData.map(createAccordion)}

          <CourseEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseViewPage;

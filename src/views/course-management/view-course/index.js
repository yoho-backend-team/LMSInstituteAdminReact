// import * as React from 'react';
// import Box from '@mui/joy/Box';
// import Card from '@mui/joy/Card';
// import CardCover from '@mui/joy/CardCover';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';

import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Typography, Grid, List, ListItem } from '@mui/material';

const CourseViewPage = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        'Sugar plum sesame snaps caramels.',
        'Cake pie tart fruitcake sesame snaps donut cupcake macaroon.',
        'Gingerbread pudding cheesecake pie ice cream.'
      ]
    },
    {
      id: 'panel3',
      title: 'Accordion 3',
      content: [
        'Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu.',
        'Jelly pie cake.',
        'Sweet roll dessert sweet pastry powder.'
      ]
    }
  ];

  const createAccordion = (accordion) => (
    <Accordion
      key={accordion.id}
      expanded={expanded === accordion.id}
      onChange={handleChange(accordion.id)}
      sx={{ padding: 0, margin: '5px' }}
    >
      <AccordionSummary
        id={`customized-panel-header-${accordion.id}`}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`customized-panel-content-${accordion.id}`}
      >
        <Typography variant="h3">{accordion.title}</Typography>
        {/* previewbox */}
        {expanded !== accordion.id && (
          <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', mr: 2 }}>
            <PlayCircleIcon className="play-icon" sx={{ color: 'primary.main' }} />
            <Typography variant="h4" color="primary" sx={{ ml: 1 }}>
              Preview
            </Typography>
          </Box>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <List>
              {accordion.content.map((item, index) => (
                <ListItem key={index}>
                  <Typography variant="subtitle2" sx={{ fontSize: '16px' }}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <PlayCircleIcon className="play-icon" sx={{ color: 'primary.main' }} />
              </Grid>
              <Grid item>
                <Typography variant="h4" color="primary">
                  Preview
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Card sx={{ minWidth: 200, flexGrow: 1 }}>
          <video
            controls
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
            style={{ width: '100%', aspectRatio: '10 / 4' }}
          >
            <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
          </video>
        </Card>
      </Box>
      <Grid spacing={2} sx={{ mt: 2 }}>
        {accordionData.map(createAccordion)}
      </Grid>
    </div>
  );
};

export default CourseViewPage;

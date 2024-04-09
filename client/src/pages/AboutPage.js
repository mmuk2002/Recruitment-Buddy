import * as React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { features } from '../constants/index';
import gradientTextStyle from '../components/fontStyle';

const FeatureSection = () => {
  return (
    <Box sx={{ mt: 15, position: 'relative' }}>
      <Container maxWidth="xl">
      <Typography variant="h2" component="h2" my={{ xs: 6, lg: 10 }} style={gradientTextStyle} >
        Featrures
      </Typography>
      <Grid container spacing={2} sx={{ mt: { xs: 10, lg: 15 } }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Box sx={{ display: 'flex', mx: 3 }}>
              <Box sx={{ display: 'flex', mx: 3, height: 40, width: 30, p: 1, backgroundColor: 'neutral.900', color: 'orange.700', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>
                {feature.icon}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ mt: 1, mb: 2, fontSize: '1.25rem' }}>{feature.text}</Typography>
                <Typography variant="body1" sx={{ p: 2, mb: 5, color: 'neutral.500' }}>{feature.description}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;

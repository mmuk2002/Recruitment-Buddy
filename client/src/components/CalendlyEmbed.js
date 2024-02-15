// src/components/CalendlyEmbed.js

import React from 'react';

const CalendlyEmbed = ({ url }) => {
  return (
    <iframe src={url} width="100%" height="1000" frameborder="0"></iframe>
  );
};

export default CalendlyEmbed;
import React, { useEffect } from 'react';

const CalendlyWidget = ({ url }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => document.body.removeChild(script);
  }, [url]);

  if (!url) return null;

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: '320px', height: '630px' }}
    />
  );
};

export default CalendlyWidget;

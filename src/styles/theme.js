// Theme configuration for the e-commerce website

const theme = {
  colors: {
    primary: '#e63946',     // Changed to a vibrant red
    secondary: '#f1faee',   // Changed to a light cream color
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    light: '#ffffff',
    dark: '#212121',
    darkGray: '#757575',
    lightGray: '#e0e0e0',
    lightBg: '#f5f5f5'
  },
  fonts: {
    body: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    heading: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%'
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    desktop: '1200px'
  },
  transitions: {
    short: '0.3s',
    medium: '0.5s',
    long: '0.7s'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)'
  }
};

export default theme;
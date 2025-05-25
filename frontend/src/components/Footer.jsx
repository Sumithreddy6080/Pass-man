// components/Footer.jsx
import React from 'react';

const Footer = ({ themeClasses }) => {
  return (
    <footer className={` fixed bottom-4 left-1/2 transform z-20 -translate-x-1/2 text-black text-md  ${themeClasses.textSecondary}`}>
{/*       Made with ❤️ by SingiReddy Sumith Reddy */}
    </footer>
  );
};

export default Footer;

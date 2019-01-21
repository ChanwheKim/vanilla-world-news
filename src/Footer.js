import React from 'react';

const styles = {
  textAlign: 'center',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.2rem',
  borderTop: '1px solid #E0DDD9',
  marginTop: '10rem',
};

export default function Footer() {
  return <footer style={styles}><p>© 2019 Vanilla Times - All Rights Reserved</p></footer>;
}

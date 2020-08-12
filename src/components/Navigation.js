import React from 'react';

function Navigation() {
  return (
    <div
      style={{
        height: '95px',
        textAlign: 'center',
        color: '#e43f5a',
        fontSize: '1.5rem',
        fontFamily: "'Rowdies', cursive",
      }}
    >
      <i
        style={{ fontSize: '5rem', paddingTop: '1rem' }}
        class='fas fa-head-side-mask'
      ></i>
      <h1>
        Massive <strong style={{ color: 'white' }}>Covid</strong> Update
      </h1>
    </div>
  );
}

export default Navigation;

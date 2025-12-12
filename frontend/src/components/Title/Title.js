import React from 'react';

//component to display title with customizable font size and margin
export default function Title({ title, fontSize, margin }) {
  return <h1 style={{ fontSize, margin, color: '#616161' }}>{title}</h1>;
}

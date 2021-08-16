import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TopSection from './TopSection';

function Home(props) {
  return (
    <>
      <Navbar />
      <TopSection {...props} />
    </>
  );
}

export default Home;

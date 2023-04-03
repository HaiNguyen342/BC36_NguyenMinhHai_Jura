import React from "react";
import style from './Home.module.css'

const Home = () => {
  return (
    <div className={`${style['homeBody']}`}>
      <h1 className="text-center">
        WELCOME TO{" "}
        <span className="text-purple-500">JURA</span>
      </h1>
    </div>
  );
};

export default Home;

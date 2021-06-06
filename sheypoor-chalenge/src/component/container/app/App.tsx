import React from "react";
import { Footer } from "../Footer";
import { CreateUser } from "../user/Create";
import style from "./app.module.scss";

function App() {
  return (
    <div className={style.appWrapper}>
      
      <CreateUser />
      <Footer/>
    </div>
  );
}

export default App;

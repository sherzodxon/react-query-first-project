import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router";
import AddPost from "./screens/add-post/add-post";
import { Home } from "./screens/home";
import Id from "./screens/id";
import User from "./screens/user/users";
function App() {


  return (
    <div className="App">
    
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/id" element={<Id />} /> */}
          <Route path="/new-post" element={<AddPost />} />
          <Route path={`/user/:id`} element={<User />} />
        </Routes>
   
      {/* <h2>Succesfull</h2>
      {data.map((item, key) => (
        <h3 key={key}>{item.name }</h3>
      ))} */}
      
    </div>
  );
    
}

export default App;

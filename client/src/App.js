import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";



import Navbar from "./components/navbar";
import LoginScreen from "./components/loginscreen";
import Profile from "./components/profile";
import ViewProjects from "./components/viewProjects"
import CreateProject from "./components/createProject";
import SearchProfile from "./components/searchProfile";
import OtherProfile from "./components/otherProfile";
import Project from "./components/project";
import Settings from "./components/settings";

const App = () => {

 return (
   <div>
     <Navbar/>
     <Routes>
      <Route exact path="/" element={<LoginScreen/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="/createproject" element={<CreateProject/>} />
      <Route path="/projects" element={<ViewProjects/>} />
      <Route path="/createproject" element={<CreateProject/>} />
      <Route path="/searchProfile" element={<SearchProfile/>} /> 
      <Route path="/otherProfile/:id" element={<OtherProfile/>} />
      <Route path="/projects/project/:id" element={<Project/>} />
     </Routes>
   </div>
 );
};
 
export default App;
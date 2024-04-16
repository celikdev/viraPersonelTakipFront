import React, { createContext, useState } from "react";
import { LeaderCard, LeaderCarousel } from "./components/Leader";
import Button from "./components/Button";

import { timelineContext } from "./Context/Timeline";
import Best from "./components/Best";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Admin, Home } from "./screens";
import { AddUser, Dashboard } from "./screens/Admin/";

const App = () => {
  const [timeline, setTimeline] = useState("daily");
  return (
    <timelineContext.Provider value={{ timeline, setTimeline }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/admin" exact>
            <Admin />
          </Route>
          {/* {sessionStorage.getItem("authStatus") === "true" && ( */}

          <Route path="/admin/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/admin/dashboard/add" exact>
            <AddUser />
          </Route>

          {/* )} */}
          <Route path="*" exact>
            <div className="flex w-1/3 transition-all duration-300 mx-auto flex-col items-center justify-center mt-96">
              <h1 className="font-black text-center text-8xl transition-all duration-300 hover:scale-110 hover:text-blue-600 select-none  hover:tracking-widest">
                404
              </h1>
            </div>
          </Route>
        </Switch>
      </Router>
    </timelineContext.Provider>
  );
};

export default App;

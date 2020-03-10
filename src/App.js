import React from "react";
import "./App.css";
import Routing from "./components/Routing";

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;

// questions for teacher:
/* - how to use lodash to group and sum arrays
   - from architectural standpoint is it ok if I make an api call on every page or
     should there only be done once in app.js file
   - is it possible to show times in shcedule (probably not because there is only one time value in training object) */

import React from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Battle from "./Components/Battle";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Battle />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;

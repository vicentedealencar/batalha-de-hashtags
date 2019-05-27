import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Battle from "./components/Battle";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="content">
        <Battle />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;

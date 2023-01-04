import React from "react";
import "./App.scss"
import {
  Route,
  Routes,
} from "react-router-dom";
import {HomePage, ContactPage, DetailPage} from "./pages/index";
import {Header, Footer} from "./components/index";
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <div className="d-flex flex-column site-container">
      <Header/>
      <main>
        <Container className="mt-3">
          <Routes>
            { ["/","/home"].map(e=>
              <Route key={e} path={e} element={<HomePage/>} />
            )}
            <Route path="/product/:slug" element={<DetailPage/>}></Route>
            <Route path="/contact" element={<ContactPage/>}></Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;

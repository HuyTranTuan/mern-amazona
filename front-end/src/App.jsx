import React from "react";
import "./App.scss"
import {
  Route,
  Routes,
} from "react-router-dom";
import {HomePage, ContactPage, DetailPage} from "./pages/index";
import {Header, Footer} from "./components/index";
import Container from 'react-bootstrap/Container';
import CartPage from "./pages/Cart/CartPage";
import SignInPage from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import PolicyPage from "./pages/Policy/PolicyPage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position="top-right" limit={1} theme="colored" hideProgressBar={true}></ToastContainer>
      <Header/>
      <main>
        <Container className="mt-3">
          <Routes>
            { ["/","/home"].map(e=>
              <Route key={e} path={e} element={<HomePage/>} />
            )}
            <Route path="/product/:slug" element={<DetailPage/>}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/contact" element={<ContactPage/>}></Route>
            <Route path="/signin" element={<SignInPage/>}></Route>
            <Route path="/signup" element={<SignUpPage/>}></Route>
            <Route path="/policy" element={<PolicyPage/>}></Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;

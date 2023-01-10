import React from "react";
import "./App.scss"
import {
  Route,
  Routes,
} from "react-router-dom";
import {HomePage, ContactPage, DetailPage} from "./pages/index";
import {Header, Footer} from "./components/index";
import Container from 'react-bootstrap/Container';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';
import CartPage from "./pages/Cart/CartPage";
import SignInPage from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import PolicyPage from "./pages/Policy/PolicyPage";
import ShippingPage from "./pages/Shipping/ShippingPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderPage from "./pages/Order/OrderPage";
import OrderHistoryPage from "./pages/OrderHistory/OrderHistoryPage";
import ProfilePage from "./pages/Profile/ProfilePage";


function App() {
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position="top-right" limit={3} theme="colored" hideProgressBar={true}></ToastContainer>
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
            <Route path="/shipping" element={<ShippingPage/>}></Route>
            <Route path="/payment" element={<PaymentPage/>}></Route>
            <Route path="/placeorder" element={<PlaceOrder/>}></Route>
            <Route path="/order/:id" element={<OrderPage/>}></Route>
            <Route path="/orderhistory" element={<OrderHistoryPage/>}></Route>
            <Route path="/profile" element={<ProfilePage/>}></Route>
            <Route path="/policy" element={<PolicyPage/>}></Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;

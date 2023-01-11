import React, { useEffect, useState } from "react";
import "./App.scss"
import {
  Route,
  Routes,
} from "react-router-dom";
import {HomePage, ContactPage, DetailPage} from "./pages/index";
import {Header, Footer} from "./components/index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {toast, ToastContainer} from 'react-toastify';
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
import { LinkContainer } from "react-router-bootstrap";
import { getErrorMessage } from "./ulti";
import axios from "axios";
import SearchPage from "./pages/Search/SearchPage";


function App() {
  const [isSidebarOpen, setIsSidebarOpen]  = useState(false);
  const [categories, setCategories]  = useState([]);

  useEffect(() => {
    ;(async function fetchCategories() {
      try {
        const {data} = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    })()
  }, []);
  return (
    <div className={ 
      isSidebarOpen 
      ? "d-flex flex-column site-container active-cont"
      : "d-flex flex-column site-container"
    }>
      <ToastContainer position="top-right" limit={3} theme="colored" hideProgressBar={true}></ToastContainer>
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <div 
        className={
          isSidebarOpen 
          ? 'active-nav sidebar-nav d-flex justify-content-between flex-wrap flex-column'
          : 'sidebar-nav d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <Nav className='flex-column text-white w-100 p-2'>
          <Nav.Item>
            <strong>Categories</strong>
          {categories.map(category => (
            <Nav.Item key={category}>
              <LinkContainer
                to={{
                  pathname: "/search",
                  search: `?category=${category}`,
                }}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
          </Nav.Item>
        </Nav>
      </div>
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
            <Route path="/search" element={<SearchPage/>}></Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;

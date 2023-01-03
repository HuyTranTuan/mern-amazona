import "./App.css"
import {
  Route,
  Routes,
} from "react-router-dom";
import {HomePage, ContactPage, DetailPage} from "./pages/index";
import {Header, Footer} from "./components/index";


function App() {
  return (
    <>
      <Header/>
      <Routes>
        { ["/","/home"].map(e=>
          <Route key={e} path={e} element={<HomePage/>} />
        )}
        <Route path="/product/:slug" element={<DetailPage/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

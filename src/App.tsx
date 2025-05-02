import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartPage from "./components/Cart";
import Landing from "./pages/landingpage/Landing";
import CheckoutPage from "./pages/CheckoutPage";
import Thankyou from "./pages/landingpage/Thankyou";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

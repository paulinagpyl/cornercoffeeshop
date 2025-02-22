import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./views/Login";
import CoffeeDetail from "./views/CoffeeDetail";
import NotFound from "./views/NotFound";
import Galeria from "./views/Galeria";
import Footer from "./components/Footer";
import Header from "./views/Header";
import AuthGuard from "./guard/AuthGuard";
import Register from "./views/Register";
import Profile from "./views/Profile";
import ShoppingCart from "./views/ShoppingCart";

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/catalogo" element={<Galeria />} />
        <Route
          path="/registrarse"
          element={<Register />}
          // element={
          //   <AuthGuard requiresAuth={false}><Registro /></AuthGuard>}
        />
        <Route
          path="/login"
          element={<Login />}
          //   element={
          //     <AuthGuard requiresAuth={false}><Registro /></AuthGuard>}
        />
        <Route
          path="/profile"
          element={
            // <AuthGuard requiresAuth>
            <Profile />
            // </AuthGuard>
          }
        />
        <Route path="/*" element={<NotFound />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/cafes/:id" element={<CoffeeDetail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

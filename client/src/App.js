import "./styles/App.css";
import { AuthProvider } from './AuthContext';
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/registration/Signup";
import Login from "./components/registration/Login";
import About from "./components/about/About";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import TourPackage from "./components/TourPackage/TourPackage";
import CustomizeTour from "./components/TourPackage/CustomizeTour";

import ProfilePage from "./components/user/Profile";
import UserPacakge from "./components/user/UserPackage";
<<<<<<< HEAD

import Chat from "./components/chat/Chat";
//import SelectedPackage from "./components/TourPackage/SelectedPackage";
// import CustomerDetail from "./components/admin/CustomerDetail";
=======
import CustomizeOwnTour from "./components/user/CustomizeOwnTour";

import Chat from "./components/chat/Chat";
>>>>>>> main

import Success from "./components/TourPackage/Success";
import Cancel from "./components/TourPackage/Cancel";
import ViewCustomizedPackage from "./components/TourPackage/ViewCustomizedPackage";

import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const user = true;
  return user ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tour" element={<TourPackage />} />
        <Route path="/tour/:id" element={<CustomizeTour />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
        {/* <Route path="/tour-package" element={<SelectedPackage />} /> */}
        <Route
          path="/view-customized-package"
          element={<ViewCustomizedPackage />}
        />
=======
        
        <Route path="/view-customized-package" element={<ViewCustomizedPackage />}/>
>>>>>>> main

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/userpackage" element={<UserPacakge />} />
<<<<<<< HEAD
=======
          <Route path="/customize-own-tour" element={<CustomizeOwnTour />} />
>>>>>>> main
          {/* <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add" element={<AddPackages />} />
          <Route path="/edit/:id" element={<EditPackages />} />
          <Route path="/addnew" element={<AddNew />} />
          <Route path="/edit-area/:id" element={<AddNewEdit />} />
          <Route path="/addedpackage" element={<AddedPackage />} />
          <Route path="/addedlocation" element={<AddedLocation />} />
          <Route path="/addhotel" element={<AddHotel />} />
          <Route path="/addedhotel" element={<AddedHotel />} />
          <Route path="/edit-hotel/:id" element={<EditHotel />} />
          <Route path="/edit-area/:id" element={<EditArea />} /> */}
          {/* <Route path="/customer" element={<CustomerDetail />} /> */}
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
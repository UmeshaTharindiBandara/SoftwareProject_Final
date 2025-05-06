<<<<<<< HEAD
import "./App.css";
=======

>>>>>>> main
import Header from "./components/header/Header";

import AdminDashboard from "./components/admin/AdminDashboard";
import AddPackages from "./components/admin/AddPackages";
import EditPackages from "./components/admin/EditPackages";
import AddNew from "./components/admin/AddNew";
import AddNewEdit from "./components/admin/AddNewEdit";
import AddedPackage from "./components/admin/AddedPackage";
import AddedLocation from "./components/admin/AddedLocation";
import AddHotel from "./components/admin/AddHotel";
import AddedHotel from "./components/admin/AddedHotel";
import EditHotel from "./components/admin/AddHotelEdit";
import Signup from "./components/registration/Signup";
import Login from "./components/registration/Login";
import EditArea from "./components/admin/EditArea";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======

import CustomizeTour from "./components/TourPackage/CustomizeTour";
import Success from "./components/TourPackage/Success";
import Cancel from "./components/TourPackage/Cancel";
import ViewCustomizedPackage from "./components/TourPackage/ViewCustomizedPackage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDetail from "./components/admin/CustomerDetail";
>>>>>>> main

function App() {
  return (
    <Router>
      <Header />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add" element={<AddPackages />} />
<<<<<<< HEAD
=======
        
        <Route path="/tour/:id" element={<CustomizeTour />} />
>>>>>>> main
        <Route path="/edit/:id" element={<EditPackages />} />
        <Route path="/addnew" element={<AddNew />} />
        <Route path="/edit-area/:id" element={<AddNewEdit />} />
        <Route path="/addedpackage" element={<AddedPackage />} />
        <Route path="/addedlocation" element={<AddedLocation />} />
        <Route path="/addhotel" element={<AddHotel />} />
        <Route path="/addedhotel" element={<AddedHotel />} />
        <Route path="/edit-hotel/:id" element={<EditHotel />} />
        <Route path="/edit-area/:id" element={<EditArea />} />
<<<<<<< HEAD
=======
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/customer" element={<CustomerDetail />} />

        <Route path="/view-customized-package" element={<ViewCustomizedPackage />}/>

>>>>>>> main
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> main

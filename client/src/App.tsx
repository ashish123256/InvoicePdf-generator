import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"
import Profile from "./pages/Profile"
import ProductPage from "./pages/ProductPage"


function App() {


  return (
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/" element = {<Register/>} />
      <Route path="/sign-in" element={<Login/>} />
      <Route element= {<PrivateRoute/>}>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/add-product" element={<ProductPage/>} />
      </Route>
     </Routes>

    </BrowserRouter>
   
     
    
  )
}

export default App

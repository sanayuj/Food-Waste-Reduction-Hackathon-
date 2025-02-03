import {BrowserRouter,Routes,Route  } from "react-router-dom";
import UserRouters from './Routers/UserRouter'
import AdminRouters from './Routers/AdminRouter'
import NgoRouter from "./Routers/NgoRouter";
import RestaurantRouter from "./Routers/RestaurantRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
  

   <BrowserRouter>
    <Routes>
      <Route path="/*" element={<UserRouters/>}/>
      <Route path="/admin/*" element={<AdminRouters/>}/>
      <Route path="/ngo/*" element={<NgoRouter/>}/>
      <Route path="/Restaurant/*" element={<RestaurantRouter/>}/>
    </Routes>
    <ToastContainer/>
   </BrowserRouter>

  
  );
}

export default App;

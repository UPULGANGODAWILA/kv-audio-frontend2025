
  import AdminPage from "./pages/admin/adminPage";
  import { BrowserRouter,Route,Routes } from "react-router-dom";
  import HomePage from "./pages/home/homePage";
  import LoginPage from "./pages/login/login.jsx";
  import { Toaster } from "react-hot-toast";
  import RegisterPage from "./pages/register/register.jsx";
  import Testing from "./components/testing";
  import { GoogleOAuthProvider } from "@react-oauth/google";
  import VerifyEmail from "./pages/verifyEmail/verifyEmail";
  import AdminDashboard from "./pages/admin/adminReviews.jsx";
  
  function App() {
    return (
    <GoogleOAuthProvider clientId="13905091148-1jmgglbedli5mdutc1f0d18v94a7iri2.apps.googleusercontent.com" >
        <BrowserRouter> 
        <Toaster position="top-right"/>
        <Routes path="/*">
        <Route path="/testing" element={<Testing/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
       
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/AdmimReviews" element={<AdminDashboard/>}/>
        <Route path="/*" element={<HomePage/>}/>
      
        </Routes>
        </BrowserRouter>
    
        </GoogleOAuthProvider>
  );
  }

  export default App
                  

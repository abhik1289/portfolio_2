import { createContext, useReducer, useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./Pages/Home-Page";
import AboutPage from "./Pages/About-Page";
import ServicesPage from "./Pages/Service-Page";
import ContactPage from "./Pages/Contact-Page";
import BlogPage from "./Pages/Blog-Page";
import Dashboard from "./Pages/Dashboard";
import ErrorPage from "./Pages/404";
import SocalMediaPage from "./Pages/SocalMedia-Page";
import ProfilePage from "./Pages/Profile-page";
import OrderPage from "./Pages/Order-Page";
import Login from "./Pages/Login";
import EditPage from "./Pages/EditPage";
import OrderEditPage from "./Pages/OrderEditPage";
import BlogPostUser from "./Pages/BlogPostUser";
import AdduserPage from "./Pages/AddUserPage";
import DisplayUserPage from "./Pages/DisplayUser";
import Verify from "./components/Verify";
import ChangePassword from "./components/ChangePassword";
import MyBlogpage from "./Pages/MyBlogPage";
import BlogEditPage from "./Pages/BlogEditPage";
import AllBlogPage from "./Pages/AllBlogPage";
import { initialState, reducer } from './reducer/reducer';
import ReadBlog from './components/ReadBlog';

export const UserContext = createContext();
let roll = localStorage.getItem('roll');
const getAdmin = () => {
  if (roll === "modarator") {
   return( <>
    <Route path="/admin/socalMedia" element={<SocalMediaPage />} exact /> //
    <Route path="/admin/profilePage" element={<ProfilePage />} exact /> //
    <Route path="/admin/blogPost" element={<BlogPostUser />} exact /> //
    <Route path="/admin/myblog" element={<MyBlogpage />} exact /> //
    <Route path="/admin/edit" element={<EditPage />} exact />
    <Route path="/admin/blogedit/:id" element={<BlogEditPage />} exact />
    <Route path="/admin/changePassword" element={<ChangePassword />} exact />
  </>)
  } else if(roll === "admin"){
    return (<>
      <Route path="/admin/socalMedia" element={<SocalMediaPage />} exact /> //
      <Route path="/admin/profilePage" element={<ProfilePage />} exact /> //
      <Route path="/admin/orderPage" element={<OrderPage />} exact />
      <Route path="/admin/edit" element={<EditPage />} exact />
      <Route path="/admin/orderEdit" element={<OrderEditPage />} exact />
      <Route path="/admin/blogPost" element={<BlogPostUser />} exact /> //
      <Route path="/admin/users" element={<DisplayUserPage />} exact />
      <Route path="/admin/changePassword" element={<ChangePassword />} exact />
      <Route path="/admin/myblog" element={<MyBlogpage />} exact /> //
      <Route path="//admin/blogedit/:id" element={<BlogEditPage />} exact />
      <Route path="/admin/allblog" element={<AllBlogPage />} exact /></>)
  }else{
    return (<>
      <Route path="/admin/socalMedia" element={<SocalMediaPage />} exact /> //
      <Route path="/admin/profilePage" element={<ProfilePage />} exact /> //
      <Route path="/admin/orderPage" element={<OrderPage />} exact />
      <Route path="/admin/edit" element={<EditPage />} exact />
      <Route path="/admin/orderEdit" element={<OrderEditPage />} exact />
      <Route path="/admin/blogPost" element={<BlogPostUser />} exact /> //
      <Route path="/admin/adduser" element={<AdduserPage />} exact />
      <Route path="/admin/users" element={<DisplayUserPage />} exact />
      <Route path="/admin/verify" element={<Verify />} exact />
      <Route path="/admin/changePassword" element={<ChangePassword />} exact />
      <Route path="/admin/myblog" element={<MyBlogpage />} exact /> //
      <Route path="/admin/blogedit/:id" element={<BlogEditPage />} exact />
      <Route path="/admin/allblog" element={<AllBlogPage />} exact /></>)
  }
}
function App() {
  const [login, setlogin] = useState(false);
  useEffect(() => {
    let result = JSON.parse(localStorage.getItem('isLogin'));
    if (result) { setlogin(true); }
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route path="/about" element={<AboutPage />} exact />
          <Route path="/services" element={<ServicesPage />} exact />
          <Route path="/contact" element={<ContactPage />} exact />
          <Route path="/blog" element={<BlogPage />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="*" element={<ErrorPage />} exact />
          <Route path="/readBlog/:id" element={<ReadBlog />} exact />
         

          
          <Route path="/admin" element={<Dashboard />} exact />
          {
            login ? getAdmin() : <Route path="/admin/*" element={<Login />} exact />
          }
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
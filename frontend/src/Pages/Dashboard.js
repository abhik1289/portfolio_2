import AdminHeader from "../components/Admin-Header";
import AdminHome from "../components/Admin-Home";
function getFaviconEl() {
    return document.getElementById("favicon");
  }
function Dashboard() {
    document.title = "Admin Panel"
    const favicon = getFaviconEl(); // Accessing favicon element
    favicon.href = process.env.REACT_APP_IMGURL+ localStorage.getItem("logo");
    return (<>
    
    <AdminHeader />
    <AdminHome/>
    </>);
}

export default Dashboard;
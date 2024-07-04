import { useContext } from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';
import { AiOutlineLogout, AiFillBell } from 'react-icons/ai';
import { MdDashboard, MdMessage, MdPersonAdd } from 'react-icons/md';
import { SiBuymeacoffee } from 'react-icons/si';
import { TiSocialInstagramCircular } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { ImBlogger } from 'react-icons/im';
import { FaUsers, FaWallet } from 'react-icons/fa';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { UserContext } from '../App';

import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
function AdminHeader() {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const handleDropdown = () => {
        setDropDown(!dropDown);
    }

    const handleSideBar = () => {
        setSideBar(!sideBar);
    }
    const handleLogout = () => {
        swal("Are you sure to log out from admin panel",{
            title:"Log Out",
            buttons:true
        })
.then((value) => {
  if(value){
    fetch("/api/auth/logout").then((res) => {
        if (res.status == 200) {
            localStorage.removeItem("name")
            localStorage.removeItem("gender")
            localStorage.removeItem("roll")
            localStorage.removeItem("isLogin");
            localStorage.removeItem("logo");
            localStorage.removeItem("jwttoken");
            localStorage.removeItem("imgSrc")
            navigate("/login")
        }
    })
  }
});
       
    }
    //get data from local storage
    let gender = localStorage.getItem("gender")
    let roll = localStorage.getItem("roll")
    let respect;
    if (gender == "male") {
        respect = "Mr"
    } else if (gender == "female") {
        respect = "Mrs"
    } else {
        respect = "Dear"
    }
    const siderBars =()=>{
        if(roll==="modarator"){
            return(<div className={!sideBar ? "side-bar fixed w-[230px] h-screen bg-[#f1f2f6] left-0 top-0 shadow-[1px 9px 13px 4px #d1caca] -translate-x-full transition-transform pt-24 px-3 z-10" : "side-bar fixed w-[230px] h-screen bg-[#f1f2f6] left-0 top-0 shadow-[1px 9px 13px 4px #d1caca] translate-x-0 transition-transform pt-24 z-10"}>
            <Link to="/admin">
                <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><MdDashboard className='mr-2' />Home</button></Link>
            <Link to="/admin/socalMedia"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><TiSocialInstagramCircular className='mr-2' />Basic Change</button></Link>
            <Link to="/admin/blogPost">
                <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><ImBlogger className='mr-2' />Blog Post</button></Link>
            <Link to="/admin/myblog">
                <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><BsFillFileEarmarkPostFill className='mr-2' />My Blogs</button></Link>
            
            <Link to="/admin/profilePage"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><FaUserCircle className="mr-2" />Profile</button></Link>
        </div>)
        }else if(roll==="admin"){
        return(<div className={!sideBar ? "side-bar fixed w-[230px] h-screen bg-[#f1f2f6] left-0 top-0 shadow-[1px 9px 13px 4px #d1caca] -translate-x-full transition-transform pt-24 px-3 z-10 overflow-scroll" : "side-bar fixed w-[230px] h-screen bg-[#f1f2f6] left-0 top-0 shadow-[1px 9px 13px 4px #d1caca] translate-x-0 transition-transform pt-24 z-10 overflow-scroll"}>
        <Link to="/admin">
            <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><MdDashboard className='mr-2' />Home</button></Link>
            <Link to="/admin/socalMedia"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><TiSocialInstagramCircular className='mr-2' />Basic Change</button></Link>
        <Link to="/admin/orderPage"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><SiBuymeacoffee className='mr-2' />Order</button></Link>
        <Link to="/admin/socalMedia"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><TiSocialInstagramCircular className='mr-2' />Basic Change</button></Link>
        <Link to="/admin/blogPost">
            <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><ImBlogger className='mr-2' />Blog Post</button></Link>
        <Link to="/admin/myblog">
            <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><BsFillFileEarmarkPostFill className='mr-2' />My Blogs</button></Link>
        <Link to="/admin/allblog">
            <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><FaWallet className='mr-2' />All Blogs</button></Link>
        <Link to="/admin/users">   <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><FaUsers className='mr-2' />Users</button></Link>
        <Link to="/admin/profilePage"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><FaUserCircle className="mr-2" />Profile</button></Link>
    </div>)
    }else{
        return(<div className={!sideBar ? "side-bar fixed overflow-y-scroll w-[230px] h-screen bg-[#f1f2f6] left-0 top-0  shadow-[1px 9px 13px 4px #d1caca] -translate-x-full transition-transform pt-24 px-3 z-10" : "side-bar fixed overflow-y-scroll w-[230px] h-screen bg-[#f1f2f6] left-0 top-0  shadow-[1px 9px 13px 4px #d1caca] translate-x-0 transition-transform pt-24 z-10"}>
        <Link to="/admin">
            <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><MdDashboard className='mr-2' />Home</button></Link>
            <Link to="/admin/socalMedia"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><TiSocialInstagramCircular className='mr-2' />Basic Change</button></Link>
        <Link to="/admin/orderPage"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><SiBuymeacoffee className='mr-2' />Order</button></Link>
        <Link to="/admin/socalMedia"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><TiSocialInstagramCircular className='mr-2' />Basic Change</button></Link>
        <Link to="/admin/blogPost">
            <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><ImBlogger className='mr-2' />Blog Post</button></Link>
        <Link to="/admin/myblog">
            <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><BsFillFileEarmarkPostFill className='mr-2' />My Blogs</button></Link>
        <Link to="/admin/allblog">
            <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><FaWallet className='mr-2' />All Blogs</button></Link>
        <Link to="/admin/adduser">   <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'>
            <MdPersonAdd className='mr-2' />
            Add Users</button></Link>
        <Link to="/admin/users">   <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><FaUsers className='mr-2' />Users</button></Link>
        <Link to="/admin/profilePage"> <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><FaUserCircle className="mr-2" />Profile</button></Link>
    </div>)
    }

}
 
    return (<><section className="w-full  bg-slate-100 shadow-lg relative">
        <div className="mainBX bg-slate-100 w-screen relative z-20 shadow-lg">
            <div className="main w-5/6 mx-auto min-h-[90px] flex justify-between items-center relative bg-slate-100 z-30">
                <div className="rightPart flex">
                    <div className="button w-[40px] h-[40px] rounded-full flex justify-center items-center mr-4 cursor-pointer hover:bg-slate-200" onClick={handleSideBar}>
                        <HiMenuAlt2 className='text-xl' />
                    </div>
                    <Link to="/admin">  <div className="logo font-bold font-secondary md:text-3xl text-[20px]">
                        Dash<span className="text-blue-600">Board</span>
              </div></Link>
                </div>
                <div className="rightPart flex items-center">
                    <div className="notification w-[40px] h-[40px] rounded-full flex justify-center items-center mr-4 cursor-pointer hover:bg-slate-200">
                        <AiFillBell onClick={handleDropdown} className='text-2xl text-slate-500 ' />
                    </div>
                    <div id="dropdown" className={dropDown ? "z-10 bg-white divide-y divide-gray-100 rounded shadow-xl w-3/12  absolute right-0 top-[6rem] translate-y-0 transition-transform block border border-slate-300" : "z-10 bg-white divide-y divide-gray-100 rounded shadow-xl w-3/12  absolute right-0 top-[6rem] translate-y-full transition-transform hidden"}>
                        <div className="box py-2 px-2 flex items-center">
                            <div className="leftPrt">
                                <div className="iconBX bg-gray-800 w-[40px] h-[40px] rounded-full flex justify-center items-center mr-2">
                                    <MdMessage className='text-2xl text-white' />
                                </div>
                            </div>
                            <div className="rightPrt">
                                <div className="title font-main text-[25px]">
                                    Aws Projetc
                                </div>
                                <div className="name font-main">ab@gmail.com</div>
                            </div>
                        </div>
                    </div>
                    <Link to="/admin/profilePage">
                        <div className="profileDesBX flex">
                            <div className="name font-main mr-2">
                               <span className='md:inline-block hidden'> {respect}</span> {localStorage.getItem("name")}
                                <div className="role font-secondary capitalize leading-none text-[15px] text-blue-500">
                                    {roll}
                                </div>
                            </div>
                            <div className="profile w-[50px] h-[50px] border rounded-full overflow-hidden">
                                <img src={localStorage.getItem("imgSrc") == "" ? process.env.REACT_APP_IMGURL + "def.png" : process.env.REACT_APP_IMGURL + localStorage.getItem("imgSrc")} alt="profileImg" className="w-full h-full" srcset="" />
                            </div>
                        </div>
                    </Link>
                    <div className="logOut w-[40px] h-[40px] rounded-full flex justify-center items-center ml-4 cursor-pointer hover:bg-slate-200">
                        <AiOutlineLogout className='text-2xl text-slate-500 ' onClick={handleLogout} />
                    </div>
                </div>
            </div>
        </div>
        {
            siderBars()
        }
    </section>


    </>
    );
}

export default AdminHeader;
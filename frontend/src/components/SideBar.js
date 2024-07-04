import { MdDashboard, MdMessage, MdPersonAdd } from 'react-icons/md';
import { SiBuymeacoffee } from 'react-icons/si';
import { TiSocialInstagramCircular } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { ImBlogger } from 'react-icons/im';
import { FaUsers, FaWallet } from 'react-icons/fa';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
function SideBar() {
    const [sideBar, setSideBar] = useState(false);

    return (<>        <div className={!sideBar ? "side-bar absolute w-[230px] h-screen bg-[#f1f2f6] left-0 top-0 shadow-[1px 9px 13px 4px #d1caca] -translate-x-full transition-transform pt-24 px-3 z-10" : "side-bar absolute w-[230px] h-screen bg-[#f1f2f6] left-0 top-0 shadow-[1px 9px 13px 4px #d1caca] translate-x-0 transition-transform pt-24 z-10"}>
    <Link to="/admin">
        <button className='relative flex items-center font-main py-3 hover:bg-blue-400 hover:text-white transition-all  w-full text-left pl-4 mt-2'><MdDashboard className='mr-2' />Home</button></Link>
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
</div></>);
}

export default SideBar;
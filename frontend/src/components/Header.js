import logo from '../asset/images/logo.png';
import { useEffect, useState } from 'react';
import WOW from 'wow.js';
import { AiOutlineArrowUp } from 'react-icons/ai';
import {
  Link
} from "react-router-dom";
function Header() {
  useEffect(() => {
    new WOW().init();
  }, []);
  const [mobileMenu, setmobileMenu] = useState(false);
  const [displayTop, setDisplayTop] = useState(false);
  const [changeMEnuBg, SetchangeMEnuBg] = useState(false);

  const toogleDisplay = () => {
    const scroll = document.documentElement.scrollTop;

    if (scroll > 500) {
      setDisplayTop(true);
      SetchangeMEnuBg(true);
    } else {
      setDisplayTop(false)
      SetchangeMEnuBg(false);
    }
  }
  window.addEventListener('scroll', toogleDisplay);
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const toogleClick = () => {
    setmobileMenu(!mobileMenu);
  }
  return (
    <>
      <section className={!changeMEnuBg ? "py-5 fixed top-0 left-0 z-40 w-screen bg-[#487eb05d]" : "py-5 fixed top-0 left-0 z-40 w-screen bg-[#dcdde1] shadow-[7px 12px 41px -7px rgba(0,0,0,0.8)]"}>
        <div className="w-5/6 mx-auto flex justify-between items-center flex-wrap">
          <div className="logo w-[50px] cursor-pointer">
            <Link to="/"> <img src={process.env.REACT_APP_IMGURL + localStorage.getItem("logo")} alt="" /></Link>
          </div>
          <button onClick={toogleClick} data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div class={mobileMenu ? "w-full md:block md:w-auto" : "hidden w-full md:block md:w-auto"} id="mobile-menu">
            <ul class={!changeMEnuBg ? "flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm  text-white font-main text-center" : "flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm  text-black font-main text-center"}>
              <Link to="/" class="block py-2 pr-4 pl-3">Home</Link>
              <Link to="/about" class="block py-2 pr-4 pl-3">About me</Link>
              <Link to="/services" class="block py-2 pr-4 pl-3">Services</Link>
              <Link to="/contact" class="block py-2 pr-4 pl-3">Contact</Link>
              <Link to="/blog" class="block py-2 pr-4 pl-3">Blog</Link>
            </ul>
          </div>
        </div>
      </section>

      {displayTop ? <div onClick={goTop} className="gotoTop cursor-pointer flex justify-center items-center fixed bottom-5  right-5 w-[50px] h-[50px] bg-slate-600 rounded-full z-50">
        <AiOutlineArrowUp className='text-2xl text-white' /> </div> : ""}
    </>);
}

export default Header;
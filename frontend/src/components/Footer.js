import { FaFacebook, FaInstagramSquare,FaTwitter} from 'react-icons/fa';
import {useEffect,useState} from 'react';


function Footer() {
    useEffect(() => {
      getData();
    }, []);
    function getFaviconEl() {
        return document.getElementById("favicon");
      }
    const [links,setLinks] = useState({fb:"",tw:"",in:""})
    const getData =async()=>{
        try {
            const res = await fetch("/api/socalMedia/displayLinks", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data =await res.json();
            if(res.status==200){
                document.title =data.title;
                localStorage.setItem("title",data.title)
                localStorage.setItem("logo",data.logo)
                const favicon = getFaviconEl(); // Accessing favicon element
                favicon.href = process.env.REACT_APP_IMGURL+ data.favicon;
                setLinks({
                    fb:data.fburl,
                    tw:data.twurl,
                    in:data.inurl,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (<section className="footer py-3 bg-slate-600">
        <div className="main w-5/6 flex justify-between mx-auto">
<div className="text font-main text-white">
© All Rights Reserved by Abhik
</div>
<div className="socal flex">
    <ul className='flex text-white'>
  
  
    <a href={`${links.fb}`} target="_blank" > <li className='ml-3 cursor-pointer'><FaFacebook/></li>
    </a>
    <a href={`${links.tw}`} target="_blank" >
         <li className='ml-3 cursor-pointer' ><FaTwitter/></li> 
   </a>
   <a href={`${links.in}`} target="_blank" >
   <li className='ml-3 cursor-pointer'><FaInstagramSquare/></li> 
   </a>
  

    </ul>
</div>
        </div>
    </section>);
}

export default Footer;
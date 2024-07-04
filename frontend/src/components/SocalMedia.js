import { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const axios = require('axios')
const imgUrl = process.env.REACT_APP_IMGURL;

function SocalMedia() {
    useEffect(() => {
        getData();
    }, []);
    const chooseFav = useRef(null);
    const chooseLogo = useRef(null);
    const [links, setLinks] = useState({ fb: "", tw: "", in: "", id: '', title: "", favicon: "", logo: "" })
    const [image, setImage] = useState(true);
    const [imageSrc, setImageSrc] = useState("");
    const [fav, setfav] = useState(true);
    const [favSrc, setfavSrc] = useState("");
    const getData = async () => {
        try {
            const res = await fetch("/api/socalMedia/displayLinks", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await res.json();
            if (res.status == 200) {
                setLinks({
                    fb: data.fburl,
                    tw: data.twurl,
                    in: data.inurl,
                    id: data._id,
                    title: data.title,
                    favicon: data.favicon,
                    logo: data.logo,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleInput = (e) => {
        setLinks({ ...links, [e.target.name]: e.target.value });
    }
const handleSubmit=async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    console.log(links.tw)
    formData.append('fb', links.fb);
    formData.append('insUrl', links.in);
    formData.append('tw', links.tw);
    formData.append('logo', links.logo);
    formData.append('favicon', links.favicon);
    formData.append('title', links.title);

    const res = await axios.put(`/api/socalMedia/editLinks/${links.id}`, formData);
    if(res.status==200){
        toast.success('Successfully Updated!');
        // localStorage.setItem("name",data.name.split(" ")[1])
        // localStorage.setItem("gender",data.gender)
        // localStorage.setItem("role",data.roll)
        // localStorage.setItem("imgSrc",data.file)
       }else{
        toast.error('Data not Updated!')

       }
}


    return (<section>
        <div className="main w-5/6 mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap">
                    <div className="md:w-6/12">
                        <div className="mainBX px-9">
                            <div className="heading font-main text-slate-600 text-2xl capitalize font-semibold my-2">
                                customize yourSocal Media Links & Title
                            </div >
                            <div className="formBx">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Facebook URL</label>
                                <input  onChange={handleInput} name="fb" value={links.fb} type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" />
                            </div>
                            <div className="formBx">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900  mt-3">Twitter URL</label>
                                <input onChange={handleInput} name="tw" value={links.tw} type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" />
                            </div>
                            <div className="formBx">
                                <label for="password"  class="block mb-2 text-sm font-medium text-gray-900  mt-3">Instagram URL</label>
                                <input name="in" onChange={handleInput} value={links.in} type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" />
                            </div>
                            <div className="formBx">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900  mt-3">Website Title</label>
                                <input name="title" onChange={handleInput} value={links.title} type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-6/12">
                        <div className="mainBx px-5">
                            <div className="heading font-main text-slate-600 text-2xl capitalize font-semibold my-2">
                                Favicon & Logo
                            </div >
                            <div className="flex">

                                <div className="imagesBX  mr-7">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900  mt-3">Choose Favicon</label>
                                    <div className="favicon w-[80px] h-[80px] border border-slate-300 rounded cursor-pointer" onClick={() => {
                                        chooseFav.current.click();

                                    }}>
                                         {fav?<img data-image={image} src={process.env.REACT_APP_IMGURL+links.favicon} alt="profileImg" className="w-full rounded-full h-full" />:<img data-image={image}  alt="profileImg" src={favSrc} id='img-prview' className="w-full rounded-full h-full"/>}
               
                                    </div>
                                    <input onChange={(event) => {
                            let file = event.target.files[0];
                            if(file){
                                setfav(false)
                           }
                         
                            setLinks({...links,favicon:file})
                            let src = URL.createObjectURL(event.target.files[0]);
                            setfavSrc(src)
                           
                         
                           
                        }} type="file" ref={chooseFav} name="favicon" hidden />

                                </div>
                                <div className="imagesBX">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900  mt-3">Choose Logo</label>
                                    <div onClick={() => {
                                        chooseLogo.current.click();
                                    }} className="favicon w-[80px] h-[80px] border border-slate-300 rounded cursor-pointer">
                                       {image?<img data-image={image} src={process.env.REACT_APP_IMGURL+links.logo} alt="profileImg" className="w-full rounded-full h-full" />:<img data-image={image}  alt="profileImg" src={imageSrc} id='img-prview' className="w-full rounded-full h-full"/>}
                                    </div>
                                    <input type="file" ref={chooseLogo} hidden name="file" id=""  onChange={(event) => {
                            let file = event.target.files[0];
                            if(file){
                                setImage(false)
                           }
                            setLinks({...links,logo:file})
                            let src = URL.createObjectURL(event.target.files[0]);
                           setImageSrc(src)
                           
                         
                           
                        }} />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
               <div className="buttonBx flex justify-center items-center">
               <button type="submit" className="px-4 mt-4 py-1 font-main text-white bg-blue-500 hover:bg-blue-700 transition">Set Up</button>
               </div>
            </form>
            <Toaster
  position="bottom-center"
  reverseOrder={true}
/>
        </div>
    </section>);
}

export default SocalMedia;
import { useRef, useState, useEffect } from 'react';
import { GrFormEdit } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const axios = require('axios')
function Edit() {
    const navigate = useNavigate();
  
    useEffect(() => {
        getData();
    }, []);
   
    const [userInfo, setuserInfo] = useState({
        name: "", mobile: "", gender: "", file: ""
    })
    const [image, setImage] = useState(true);
    const [imageSrc, setImageSrc] = useState("");

    const fileTarget = useRef(null);
    let userData;
    const getData = async () => {
        const res = await fetch("/api/auth/fetchUser", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        userData = await res.json();
        if (res.status == 200) {
            setuserInfo({
                name: userData.name,
                mobile: userData.mobile,
                gender: userData.gender,
                file: userData.file
            })
        } else {
            navigate("/login")
        }
    }




    
    let name
    const handleInput = (e) => {
        name = e.target.name;
        setuserInfo({ ...userInfo, [name]: e.target.value })
    }
    const handleSubmit =async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', userInfo.name);
        formData.append('mobile', userInfo.mobile);
        formData.append('gender', userInfo.gender);
        formData.append('file', userInfo.file);
        console.log(formData)
       
        try {
           const res = await axios.put(`/api/auth/editUser`, formData)
           
           if(res.status==200){
            toast.success('Successfully Updated!');
            const res = await fetch("/api/auth/fetchUser", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data =await res.json();
            if(res.status==200){
                localStorage.removeItem("name")
                localStorage.removeItem("imgSrc")
                localStorage.setItem("name", data.name.split(" ")[1])
            localStorage.setItem("imgSrc", data.file);
            }

           }else{
            toast.error('Data not Updated!')

           }
        } catch (error) {
            console.log(error)
        }
    }

    return (<section className="editBx">

        <div className="mainBx md:w-5/12 sm:w-full px-2 py-3 mx-auto">
            <div className="heading font-main text-2xl capitalize font-semibold my-2">
                customize your Basic details
            </div >


            <form onSubmit={handleSubmit}>
                <div className="mainFrmBx flex justify-center items-center flex-col">
                    <div className="propfileImg w-[150px] h-[150px]  rounded-full border-4 border-blue-300 relative">
                        <div className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] absolute z-20 bottom-4 right-0 flex justify-center items-center cursor-pointer hover:bg-slate-400">
                            <GrFormEdit className='text-xl text-slate-700' onClick={() => fileTarget.current.click()} />
                        </div>
                        <input type="file" ref={fileTarget} hidden name="file" id=""  onChange={(event) => {
                            let file = event.target.files[0];
                            if(file){
                                 setImage(false)
                            }
                            console.log("file is", event.target.value)
                            setuserInfo({ ...userInfo, file: file })
                            let src = URL.createObjectURL(event.target.files[0]);
                           setImageSrc(src)
                           
                        }} />
                     
                        {console.log(image)}
                        {image?<img data-image={image} src={process.env.REACT_APP_IMGURL+userInfo.file} alt="profileImg" className="w-full rounded-full h-full" />:<img data-image={image}  alt="profileImg" src={imageSrc} id='img-prview' className="w-full rounded-full h-full"/>}
               
                        
                    </div>
                    <div className="box w-full font-main my-2">
                        <label className="block">Name</label>
                        <input type="text" className="outline-none w-full border border-slate-300 focus:border-blue-500 px-2 py-1" name="name" id="" value={userInfo.name} onChange={handleInput} />

                    </div>
                    <div className="box w-full font-main my-2">
                        <label className="block">Mobile</label>
                        <input value={userInfo.mobile} onChange={handleInput} type="text" className="outline-none w-full border border-slate-300 focus:border-blue-500 px-2 py-1" name="mobile" id="" />

                    </div>
                    <div className="frmClm w-full flex justify-between">
                        <div className="box w-5/12 font-main my-2">
                            <label className="block">Gender</label>
                            <select name="gender" value={userInfo.gender} onChange={handleInput} className='outline-none w-full border border-slate-300 focus:border-blue-500 px-2 py-1'>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="custom">Custom</option>
                            </select>

                        </div>
                    </div>
                    <button type="submit" className="px-4 mt-4 py-1 font-main text-white bg-blue-500 hover:bg-blue-700 transition">Update</button>
                </div>
            </form>
            <Toaster
  position="bottom-center"
  reverseOrder={true}
/>
        </div>
    </section>);
}

export default Edit;
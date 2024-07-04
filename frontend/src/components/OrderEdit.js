import toast, { Toaster } from 'react-hot-toast';
import { GrFormEdit } from 'react-icons/gr';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
const axios = require('axios');
function OrderEdit() {
    useEffect(() => {
        getData();
    }, []);
    const fileTarget = useRef(null);
    const navigate = useNavigate();

    const location = useLocation();
    let id;
    try {
        id = location.state.id;
        if (location.state) {
        } else {
            navigate("/admin/orderPage")
        }
    } catch (error) {
        navigate("/admin/orderPage")
    }
    const [data, setData] = useState({ name: "", email: "", message: "", type: "", complete: "", file: '' });
    const getData = async () => {
        const res = await fetch(`/api/order/displaySeficOrder/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json()
        if (res.status == 200) {
            setData({
                name: data.name,
                email: data.email,
                message: data.message,
                type: data.type,
                complete: data.complete
            });

        }
    }
    const handleChange = (even) => {
        setData({ ...data, [even.target.name]: even.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        console.log(formData)
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('message', data.message);
        formData.append('type', data.type);
        formData.append('complete', data.complete);
        formData.append('file', data.file);

        const res = await axios.post(`/api/order/editOrder/${id}`, formData);
        if (res.status == 200) {
            toast.success('Successfully Updated!');
        } else {
            toast.error('Not Updated');
        }
    }
    return (<section className="orderEdit">
        <div className="main w-5/6 mx-auto">
            <div className="heading font-main text-2xl capitalize font-semibold my-2">
                customize your Order details
            </div>
            <form onSubmit={handleSubmit}>
                <div className="orderFrom md:w-8/12 sm:w-full mx-auto  flex justify-center flex-col items-center">
                    <div className="propfileImg w-[150px] h-[150px]  rounded-full border-4 border-blue-300 relative">
                        <div className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] absolute z-20 bottom-4 right-0 flex justify-center items-center cursor-pointer hover:bg-slate-400">
                            <GrFormEdit onClick={() => fileTarget.current.click()} className='text-xl text-slate-700' />
                            <input type="file" ref={fileTarget} onChange={
                                (even) => {
                                    let file = even.target.files[0]
                                    if (file) {
                                        toast.success('File Selected');
                                        setData({ ...data, file: even.target.files[0] }); 
                                    }
                                }
                            } name="file" hidden id="" />
                        </div>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/792/small/Basic_Ui__28178_29.jpg" alt="profileImg" className="w-full rounded-full" srcset="" />
                    </div>
                    <div className="frmClm font-main mt-2 w-full">
                        <label>Name</label>
                        <input onChange={handleChange} value={data.name} type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="name" id="" />
                    </div>
                    <div className="frmClm font-main mt-2 w-full" w-full>
                        <label>Email</label>
                        <input onChange={handleChange} value={data.email} type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="email" id="" />
                    </div>
                    <div className="frmClm font-main mt-2 w-full">
                        <label>Message</label>
                        <textarea onChange={handleChange} value={data.message} type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="message" id="" />
                    </div>
                    <div className="nextclm flex w-full">
                        <div className="type w-6/12 frmClm font-main mt-2 mr-3">
                            <label>Type</label>
                            <select onChange={handleChange} value={data.type} className='w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500' name="type" id="">
                                <option value="app">App Devlopment</option>
                                <option value="web">Website</option>
                                <option value="aws">Aws</option>
                                <option value="ui-ux">UI/UX</option>

                            </select>
                        </div>
                        <div className="type w-6/12 frmClm font-main mt-2">
                            <option value="app">Complete</option>
                            <select onChange={handleChange} value={data.complete} className='w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500' name="complete" id="">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>

                        </div>
                    </div>
                    <button type="submit" className="px-4 my-3 py-1 font-main text-white bg-blue-500 hover:bg-blue-700 transition">Edit Order</button>
                </div>
            </form>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </div>

    </section>);
}

export default OrderEdit;
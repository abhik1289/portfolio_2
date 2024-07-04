import { AiFillCheckCircle, AiFillDelete, } from 'react-icons/ai';
import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import {useNavigate} from 'react-router-dom';
function Order() {
    useEffect(() => {
        getData();
    }, [])
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const getData = async () => {
        const res = await fetch("/api/order/displayOrder", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },

        });
        const data = await res.json()
      
        if (res.status == 200) {
            setData(data);
        }
    }
    const handleOrder =async (id) => {
        const res = await fetch(`/api/order/confirmOrder/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (res.status == 200) {
        getData();
            toast.success('Order Confirmed')
        }
    }
    const handleDlete = async (id) => {
        const res = await fetch(`/api/order/delOrder/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },

        });
        if (res.status == 200) {
        getData();

            toast.success('Deleted')
        }
    }
    const handleSerach=async(e)=>{
   let searchval = e.target.value;
   const res = await fetch(`/api/order/searchOrder/${searchval}`, {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },

});
const data = await res.json()

if (res.status == 200) {
    setData(data);
}else{
    
}
    }
    const handlecategoryValue=async(e)=>{
        let searchval = e.target.value;
        console.log(searchval)
        const res = await fetch(`/api/order/serchCategory/${searchval}`, {
         method: "POST",
         headers: {
             "Content-type": "application/json",
         },
     
     });
     const data = await res.json()
     
     if (res.status == 200) {
         setData(data);
     }else{
         
     }
    }
    const roll = localStorage.getItem("roll");
    const getHandle =(element)=>{

        if(roll==="admin"){
            return( <td class=" border-slate-700 flex border-none justify-center items-center h-full relative">
            <hr />
     
             
             <div className="box w-[35px] cursor-pointer h-[35px] rounded-full  bg-green-500   flex justify-center items-center text-white hover:bg-green-600 transition">
                 <MdModeEdit onClick={()=>{navigate("/admin/orderEdit",{
                     state:{
                         id:element._id
                     }
                 })}} />
             </div></td>)
        }else if(roll==="super admin"){
            return( <td class=" border-slate-700 flex border-none justify-center items-center h-full relative">
            <hr />
     
              <div onClick={() => {
                 handleDlete(element._id);
             }} className="box w-[35px] cursor-pointer h-[35px] bg-red-600 hover:bg-red-800  flex justify-center items-center mr-2 rounded-full text-white">
    
                 <AiFillDelete />
    
             </div>
       
             
             <div className="box w-[35px] cursor-pointer h-[35px] rounded-full  bg-green-500   flex justify-center items-center text-white hover:bg-green-600 transition">
                 <MdModeEdit onClick={()=>{navigate("/admin/orderEdit",{
                     state:{
                         id:element._id
                     }
                 })}} />
             </div></td>)
        }

      
    }
    return (<section className="orderBox">
        <div className="main w-5/6 mx-auto font-main overflow-x-auto">
            <div className="serachArea h-[50px] py-2 flex">
<div className="seracHBx w-4/12 flex">
<input onKeyUp={handleSerach} onKeyDown={getData} className='px-2 border w-full border-slate-500 relative py-1 h-full focus:border-blue-500 rounded outline-none ' type="text" name="" id="" />
</div>
<button className='bg-slate-500 px-2 py-1 ml-2 rounded'>Serach</button>
<div className="typeSerach">
 
    <select onChange={handlecategoryValue}  className='w-full border border-slate-500 outline-none px-2 py-1 ml-3 focus:border-blue-500' name="type" id="">
                                <option value="all">All</option>
                                <option value="app">App Devlopment</option>
                                <option value="web">Website</option>
                                <option value="aws">Aws</option>
                                <option value="ui-ux">UI/UX</option>

                            </select>
</div>
            </div>
            <table class="border-collapse border border-slate-500 my-3">
                <thead>
                    <tr>
                    <th class="border border-slate-600 ...">Sl. No</th>

                        <th class="border border-slate-600 ...">Name</th>
                        <th class="border border-slate-600 ...">Email</th>
                        <th class="border border-slate-600 ...">Message</th>
                        <th class="border border-slate-600 ...">Attachement</th>
                        <th class="border border-slate-600 ...">Conformed</th>
                        <th class="border border-slate-600 ...">Type</th>
                        <th class="border border-slate-600 ...">Date</th>
                        <th class="border border-slate-600 ...">Complete</th>
                        
                        <th class="border border-slate-600 ...">Coustomize</th>


                    </tr>
                </thead>
                {
                    data.map((element,i) => {
                        let getid = element._id;
                        return (<tbody>
                            <tr>
                            <td class="border border-slate-700 ...">{i+1}</td>

                                <td class="border border-slate-700 ...">{element.name}</td>
                                <td class="border border-slate-700 ...">{element.email}</td>
                                <td class="border border-slate-700 ...">{element.message}</td>
                                <td class="border border-slate-700 ...">{element.file == "" ? "No" : "Yes"}</td>

                                <td class="border border-slate-700"><AiFillCheckCircle onClick={()=>handleOrder(element._id)} className={element.conformed?"text-green-600 text-3xl cursor-pointer":"cursor-pointer text-3xl"} /></td>
                                <td class="border border-slate-700 ...">{element.type}</td>
                                <td class="border border-slate-700 ...">{element.date}</td>

                                <td class="border border-slate-700 ...">{element.complete == false ? "No" : "Yes"}</td>
                               {
                                   getHandle(element)
                               }
                            </tr>


                        </tbody>)
                    })
                }
            </table>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </div>
    </section>);
}

export default Order;
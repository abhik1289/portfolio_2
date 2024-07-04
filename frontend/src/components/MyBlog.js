import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { AiFillDelete} from 'react-icons/ai';
import { MdOutlineVisibility,MdOutlineVisibilityOff} from 'react-icons/md';

import toast, { Toaster } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
const parse = require('html-react-parser');
function MyBlog() {
    const naviagate = useNavigate();
    useEffect(() => {
        getData();
    }, []);
    const [blog, setBlog] = useState([]);
    const getData = async () => {
        try {
            const res = await fetch("/api/blog/displaySpeficBlog", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await res.json();
            if (res.status == 200) {
                setBlog(data);
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDel=async(id)=>{
        const res = await fetch(`/api/blog/delBlog/${id}`, {
            method: "delete",
            headers: {
                "Content-type": "application/json",
            },
        });
        if(res.status==200){
            toast.success("User Deleted");
            getData();
           }else{
            toast.error('User not deleted');
           }
    }
    const showHideControl=async(id)=>{
        const res = await fetch(`/api/blog/showHide/${id}`, {
            method: "put",
            headers: {
                "Content-type": "application/json",
            },
        });
const data = await res.json();
        if(res.status==200){
            console.log(data)
            toast.success(data.message=="show"?"Blog Unhide":"Hide");
            getData();
           }else{
            toast.error('Problem');
           }
    }
  
    return (<section>
        <div className="main w-5/6 mx-auto">
            <div className="heading font-main text-2xl capitalize font-semibold my-2">
                View your all blogs
            </div >
            <div className="blog flex flex-wrap">
                {
                    blog.map((element,index) => {
             
                      return(<div key={element._id} className='blogContent md:w-4/12 p-2 cursor-pointer relative'>
                          <div className="number absolute top-3 right-4 font-secondary text-5xl text-slate-300 rotate-6">
                        { index+1}
                           </div>
                          <div   className="mainBX shadow-md border-slate-200 rounded-sm border p-4">
                              <div className="mainContentPart" onClick={()=>naviagate(`/admin/blogedit/${element._id}`,{
                          state:{
                              id:element._id
                          }
                      })}>
<div className="iconBx w-[50px] h-[50px] bg-[#34495e] rounded-full flex justify-center items-center text-white text-xl">
                              <BsFillFileEarmarkPostFill/>
                          </div>
                          <div className="desBx font-main my-2" >
                              <li className='list-none'>
                                  Content-Type: Blog Post
                              </li>
                              <li className='list-none'>
                                 Date: {element.date}
                              </li>
                              <li className='list-none'>
                                 Time: {element.time}
                              </li>
                              <li className='list-none'>
                                 Last Modify: {element.lastModify}
                              </li>
                              <li className='list-none' data-abc={element.vissable}>
                                 Vissable: {""+element.vissable}
                              </li>
                              <li className='list-none'>
                                 Lock: {""+element.lock}
                                 </li> 
                          </div>
                      </div>
                          <div className="bottomPart flex justify-end">
                          <div onClick={()=>showHideControl(element._id)} className="icon w-[30px] h-[30px] flex justify-center items-center rounded-full mr-2 text-slate-200 bg-slate-400 transition-all hover:bg-red-500" data-r={ element.vissable}>
                             {
                                 element.vissable?<MdOutlineVisibilityOff/>:<MdOutlineVisibility/>
                             }
                              
                              </div>
                          <div onClick={()=>handleDel(element._id)} className="icon w-[30px] h-[30px] flex justify-center items-center rounded-full text-slate-200 bg-slate-400 transition-all hover:bg-red-500">
                                  <AiFillDelete/>
                              </div>
                             
                          </div>
                          </div>
                      </div>)
                    })
                }
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </div>
    </section>);
}

export default MyBlog;
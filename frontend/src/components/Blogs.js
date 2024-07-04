import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/ClipLoader";
const parse = require('html-react-parser');
function Blogs() {
    const navigate =useNavigate();
    const [blog,setBlog] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
       getData();
    }, []);
    const getData=async()=>{
        try {
            const res = await fetch("/api/blog/displayBlog",{
                method:"GET"
            });
            const data = await res.json();
           if(res.status===200){
               setBlog(data);
               setLoading(false);
           }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="blogs py-6 mt-4">
        {
            loading? <div className="flex justify-center items-center w-screen h-screen">
                <DotLoader size={60}/>
            </div>:<div className="main w-5/6 mx-auto">
            <div className="heading pb-9 text-center">
                <div className="subTxt uppercase text-[#00a8ff] font-secondary">
                    Research
                </div>
                <div className="mainTxt font-main font-bold text-3xl capitalize">
                    our some blogs for you
                </div>
            </div>
            <div className="blogs flex flex-wrap">
                {
                    blog.map((element)=>{
                        return(<div className="md:w-4/12 sm:w-full p-3">
                        <div class="square relative w-full hover:shadow-xl py-2">
                            <div className="imgBX  h-[250px] relative">
                                <img src={process.env.REACT_APP_IMGURL+ element.file} class="mask w-full h-full" />
                                <div className="date absolute px-2 py-1 bg-slate-700 font-main text-white bottom-4 right-2">
                                   {element.date}
                                </div>
                            </div>
                            <div className="readpRt pl-1">
                            <div class="h1 font-main text-2xl">{element.title}</div>
                            <p className="font-secondary">{
                            parse(element.text.slice(0,150)+"....")
                            }</p>
                            <button onClick={()=>navigate(`/readBlog/${element._id}`)} className="font-main px-4 py-1 bg-blue-400 text-white my-1">Read More</button>
                            </div>
                        </div>
                    </div>)
                    })
                }
            </div>
          
        </div>
        }
    </section> 
    );
}

export default Blogs;
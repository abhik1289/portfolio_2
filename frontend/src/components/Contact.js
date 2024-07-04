import { AiOutlineCloudUpload } from 'react-icons/ai';
import {useRef} from 'react';
import {Form,Formik,ErrorMessage,Field} from 'formik';
import toast, { Toaster } from 'react-hot-toast';

import * as Yup from 'yup';
const axios = require('axios')

function Contact() {
  

    const ref = useRef(null);
    const initialValues ={name:"",email:"",message:"",filter1:"",file:""};
    
    const submitFRom=async(values)=>{
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('message', values.message);
        formData.append('type', values.filter1);
        formData.append('file', values.file);
       const res = await axios.post("/api/order/sendOrder",formData);
    
     if(res.status==200){
         toast.success('Order Placed');
         values.name =""
         values.email =""
         values.message =""
         values.filter1 =""
         values.file =""
     }else{
        toast.success('problem Something');
     }

    }
    const validationSchema = Yup.object({
        name: Yup.string().min(3).max(15).required(),
        email: Yup.string().email().required(),
        message:Yup.string().max(150),
        filter1:Yup.string().required(),
    });

    return (<>
    <section className="contact w-screen min-h-[80vh] py-6 flex items-center my-4">
        <div className="main mx-auto w-5/6 flex flex-wrap items-center">
            <div className="md:w-6/12 sm:w-full py-2 font-main text-4xl text-white font-bold">
                Have any project ? <br /> I would love to help
            </div>
            <div className="md:w-6/12 sm:w-full px-3">
                <div className="contactBx rounded w-full h-[400px] p-4 bg-white">
                    <div className="title font-secondary text-gray-600">
                        I'm interested in..
                    </div>
                    <Formik
                    initialValues={initialValues}
                    onSubmit={submitFRom}
                    validationSchema={validationSchema}
                    >
                        {
                            ({setFieldValue})=>{
                                return(
<Form>
                    <div className="checkBoxes flex flex-col  bg-gray-100">
                        <ul id="filter1" class="filter-switch flex flex-wrap relative h-10 p-1 space-x-1 rounded-md capitalize  text-slate-800 my-4 font-main">
                            <li class="filter-switch-item flex relative h-8 bg-gray-300x">
                                <Field type="radio" name="filter1"  value="ui-ux" id="filter1-0" class="sr-only" checked />
                                <label for="filter1-0" class="h-8 py-1 px-2 text-sm leading-6 text-gray-600 hover:text-gray-800 bg-white  shadow border border-slate-600">
                                    ui/ux design
                                </label>
                                <div aria-hidden="true" class="filter-active"></div>
                            </li>
                            <li class="filter-switch-item flex relative h-8 bg-gray-300x">
                                <Field type="radio" name="filter1" value="app"  id="filter1-1" class="sr-only" />
                                <label for="filter1-1" class="h-8 py-1 px-2 text-sm leading-6 text-gray-600 hover:text-gray-800 bg-white  shadow border border-slate-600">
                                    app development
                                </label>
                            </li>
                            <li class="filter-switch-item flex relative h-8 bg-gray-300x">
                                <Field type="radio" name="filter1" value="web"  id="filter1-2" class="sr-only" />
                                <label for="filter1-2" class="h-8 py-1 px-2 text-sm leading-6 text-gray-600 hover:text-gray-800 bg-white  shadow border border-slate-600">
                                    web devlopment
                                </label>
                            </li>
                            <li class="filter-switch-item flex relative h-8 bg-gray-300x">
                                <Field type="radio" name="filter1"  value="aws"  id="filter1-3" class="sr-only" />
                                <label for="filter1-3" class="h-8 py-1 px-2 text-sm leading-6 text-gray-600 hover:text-gray-800 bg-white  shadow border border-slate-600">
                                    aws
                                </label>
                            </li>
                        </ul>
                    </div>
                   <div className="inputBx">
               
                    <div className="inputFiled">
                            <Field type="text" placeholder="Your Name" name="name" className="font-secondary focus:border-b-blue-400 outline-none placeholder:font-main border-b border-b-gray-300 w-full relative mt-4 py-1 px-2" />
                        </div>
                        <div className="inputFiled">
                            <Field type="text" name="email" placeholder="Your Email" className="font-secondary focus:border-b-blue-400 outline-none placeholder:font-main border-b border-b-gray-300 w-full relative mt-4 py-1 px-2" />
                        </div>
                        <div className="inputFiled">
                            <Field as="textarea" name="message" placeholder="Tell me about your projects" className="font-secondary focus:border-b-blue-400 outline-none placeholder:font-main border-b border-b-gray-300 w-full relative mt-4 py-1 px-2" />
                        </div>
                        <input ref={ref} onChange={(event)=>{
                            setFieldValue("file",event.currentTarget.files[0])
                        }} type="file" name="file" hidden id="" />
                        <label onClick={()=>ref.current.click()}  className='flex items-center py-3 cursor-pointer hover:text-blue-500'><AiOutlineCloudUpload/><div className="text font-main ml-2">Add a attachement</div></label>
                        <button type="submit" className="px-4 py-1 my-2 bg-blue-600 font-main text-white">Submit Order</button>
              
                    </div>
                    

                        </Form>
                                )
                            }
                        }
                        
                    </Formik>
                </div>
                <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
            </div>
        </div>
    </section>
   
    </>);
}

export default Contact;
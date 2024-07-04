import { BiCodeBlock } from 'react-icons/bi';
import WOW from 'wow.js';
import { useEffect } from 'react';

// import '../node_modules/wow.js/css/libs/animate.css';

function Service() {
    useEffect(() => {
        new WOW().init();
    }, []);
    return (
      
    <section className="service relative w-5/6 mx-auto my-4">
        <div className="heading py-5">
            <div className="subTxt uppercase text-[#00a8ff] font-secondary wow fadeInDown">
                My Services
            </div>
            <div className="mainTxt font-main font-bold text-3xl capitalize wow fadeInUp" data-wow-delay=".2s">
                Transform Your Ideas into reality
            </div>

        </div>
        <div className="services flex flex-wrap">
            <div className="servicesBx md:w-4/12 sm:w-full h-[200px] flex justify-center  flex-col text-center cursor-pointer  hover:shadow-md my-4 wow fadeInLeft">
                <div className="iconBx flex justify-center items-center">
                    <div className="iconBlock w-[50px] h-[50px] bg-blue-500 rounded-full flex justify-center items-center">
                        <BiCodeBlock className='text-2xl text-white' />
                    </div>
                </div>
                <div className="title font-main text-slate-700 text-2xl">
                    Web Devlopment
                </div>
                <div className="txt font-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quam laborum accusantium incidunt tempore doloribus perferendis ipsa repellat nihil commodi.
                </div>
            </div>
         
            <div className="servicesBx md:w-4/12 sm:w-full h-[200px] flex justify-center  flex-col text-center cursor-pointer  hover:shadow-md my-4 wow fadeInUp">
                <div className="iconBx flex justify-center items-center">
                    <div className="iconBlock w-[50px] h-[50px] bg-blue-500 rounded-full flex justify-center items-center">
                        <BiCodeBlock className='text-2xl text-white' />
                    </div>
                </div>
                <div className="title font-main text-slate-700 text-2xl">
                    Web Devlopment
                </div>
                <div className="txt font-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quam laborum accusantium incidunt tempore doloribus perferendis ipsa repellat nihil commodi.
                </div>
            </div>
            <div className="servicesBx md:w-4/12 sm:w-full h-[200px] flex justify-center  flex-col text-center cursor-pointer  hover:shadow-md my-4 wow fadeInRight">
                <div className="iconBx flex justify-center items-center">
                    <div className="iconBlock w-[50px] h-[50px] bg-blue-500 rounded-full flex justify-center items-center">
                        <BiCodeBlock className='text-2xl text-white' />
                    </div>
                </div>
                <div className="title font-main text-slate-700 text-2xl">
                    Web Devlopment
                </div>
                <div className="txt font-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quam laborum accusantium incidunt tempore doloribus perferendis ipsa repellat nihil commodi.
                </div>
            </div>
       
        </div>
    </section>
    
    );
}

export default Service;
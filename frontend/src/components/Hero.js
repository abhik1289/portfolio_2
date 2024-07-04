import {useEffect } from 'react';
import WOW from 'wow.js';

function Hero() {
    useEffect(() => {
        new WOW().init();
    }, []);

    return (<>
        <section className="hero relative w-screen h-screen">
            <div className="w-5/6 mx-auto flex h-full relative items-center">
                <div className="box">
                    <div className="txtBX md:w-6/12 sm:w-10/12">
                        <div className="mainTXt text-white text-5xl  font-medium font-main capitalize">
                            a merchant platfrom  you can build  your success
                        </div>
                        <div className="subTxt font-secondary text-slate-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quibusdam natus, accusantium quaerat cum commodi impedit nulla assumenda obcaecati corrupti id. Quam magnam numquam consequatur.
                        </div>
                    </div>
                    <div className="buttonBx mt-6 wow fadeInLeft">
                        <button class="button-86 font-main" >Hire Me</button>
                    </div>
                </div>
            </div>

            <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,224L48,229.3C96,235,192,245,288,250.7C384,256,480,256,576,224C672,192,768,128,864,133.3C960,139,1056,213,1152,234.7C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </section>
       
       
    </>
    )
}



export default Hero;
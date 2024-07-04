import img from '../asset/images/about.jpg';
import { useEffect } from 'react';
import WOW from 'wow.js';

function About() {
    useEffect(() => {
        new WOW().init();
    }, []);
    return (<section className="about relative">
    <div className="w-5/6 mx-auto flex flex-wrap">
        <div className="md:w-6/12 sm:w-full">
            <div className="img">
                <img className='w-full' src={img} alt="" />
            </div>
        </div>
        <div className="md:w-6/12 sm:w-full my-auto flex justify-start flex-col">
            <div className="heading">
                <div className="subTxt uppercase text-[#00a8ff] font-secondary">
                    about
                </div>
                <div className="mainTxt font-main font-bold text-3xl  capitalize">
                    some information <span className='text-[#00a8ff]'>about me</span>
                </div>
            </div>
            <div className="text font-main mt-8">
                <p className='wow fadeInUp' data-wow-delay=".2s">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quo architecto et recusandae inventore eveniet sunt modi, repellendus minus aut natus labore explicabo. Facere labore praesentium ea illo magni esse.
                </p>
                <p className='wow fadeInUp' data-wow-delay=".4s">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quo architecto et recusandae inventore eveniet sunt modi, repellendus minus aut natus labore explicabo. Facere labore praesentium ea illo magni esse.
                </p>
            </div>
            <div className="buttonBx mt-6">
        <button class="button-86 font-main wow fadeInRight" role="button">Hire Me</button>
        </div>
        </div>
    </div>

</section>);
}

export default About;
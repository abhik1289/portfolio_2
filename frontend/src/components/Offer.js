import { useEffect } from 'react';
import img from '../asset/images/offer.png';
import { FcMoneyTransfer } from 'react-icons/fc';
import WOW from 'wow.js';

function Offer() {
    useEffect(() => {
        new WOW().init();
    }, []);
    return (<section className="offer relative py-4">
        <div className="mainBx w-5/6 flex flex-wrap mx-auto items-center">
            <div className="leftSide md:w-6/12 sm:w-full">
            <div className="heading pb-9">
                    <div className="subTxt uppercase text-[#00a8ff] font-secondary wow fadeInLeft">
                        Features
                    </div>
                    <div className="mainTxt font-main font-bold text-3xl capitalize wow fadeInRight" data-wow-delay=".2s">
                        Why you choose us
                    </div>
                </div>
               
                <div className="mainFetures ">
                    <div className="block">
                        <div className="icon pt-1 px-1 wow rotateInDownLeft" data-wow-delay=".2s">
                            <FcMoneyTransfer className='text-3xl' />
                        </div>
                        <div className="title font-main text-slate-700 font-medium text-[22px]">
                            Value For monney
                        </div>
                        <div className="subTxt font-secondary">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus magni sunt.
                        </div>
                    </div>
                    
                    <div className="block">
                        <div className="icon pt-1 px-1 wow rotateInDownLeft" data-wow-delay=".4s">
                            <FcMoneyTransfer className='text-3xl' />
                        </div>
                        <div className="title font-main text-slate-700 font-medium text-[22px]">
                            Value For monney
                        </div>
                        <div className="subTxt font-secondary">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus magni sunt.
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightSide md:w-6/12 sm:w-full wow fadeInRight" data-wow-delay=".4s">
                <img src={img} className="w-full" alt="" />
            </div>
        </div>
    </section>);
}

export default Offer;
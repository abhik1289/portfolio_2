import { useEffect, useState,useContext } from 'react';
import { IoMdCompass } from 'react-icons/io';
import { AiOutlineFileDone } from 'react-icons/ai';
import { HiOutlineNewspaper } from 'react-icons/hi';
import DisplayBox from './DisplayBox';
import { useNavigate } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import {UserContext} from '../App';

function AdminHome() {
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        getGraph();
        checkAuth();
    }, []);

    const [web, setWeb] = useState({ ui: "", aws: "", app: "", web: "" })
    const getGraph = async () => {
        const res = await fetch("/api/order/graph", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
    
        if (res.status === 200) {
            setWeb({ ui: data.uil, aws: data.awsl, app: data.appl, web: 1 });
        } else {
            console.log("Problem")
        }
    }
    const checkAuth = async () => {
        const res = await fetch("/api/auth/fetchUser", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        if (res.status == 200) {
         console.log("login")
        } else {
            navigate("/login");
        }
    }



    return (<section className="AdminHome">
        <div className="main w-5/6 mx-auto mt-2 flex my-2 flex-wrap">
            {/* upper part */}
            <div className="topView flex w-full flex-wrap">
                <div className="md:w-4/12 w-full">
                    <DisplayBox number={40} title={"Total Order"} icon={<IoMdCompass />} />
                </div>
                <div className="md:w-4/12 w-full">
                    <DisplayBox number={30} title={"Success Projets"} icon={<AiOutlineFileDone />} />
                </div>
                <div className="md:w-4/12 w-full">
                    <DisplayBox number={4} title={"New Order"} icon={<HiOutlineNewspaper />} />
                </div>
            </div>
            <div className="heading font-main text-2xl capitalize font-semibold my-2">
                Overview
            </div>
            <div className="chartView w-full flex mt-5 ">

                <div className="md:w-4/12 w-full px-2 pb-4 my-2">
                    <p className='font-secondary my-3'>Project order type</p>
<div className="pieChart">
<PieChart
animate
                        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                        labelStyle={(index) => ({
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        })}
                        data={[
                            { title: 'aws', value: web.aws, color: '#E38627', },
                            { title: 'ui', value: web.ui, color: '#C13C37' },
                            { title: 'web', value: web.app, color: '#6A2135' },
                            { title: 'app', value: web.web, color: '#e74c3c' },
                        ]}
                    />
</div>
                    <div className="instruction my-2">
                        <ul className='flex font-secondary mb-5'>
                            <li className='flex mr-3'><div className="div mr-2 w-[20px] h-[20px] bg-[#E38627]"></div>Aws</li>
                            <li className='flex mr-3'><div className="div mr-2 w-[20px] h-[20px] bg-[#C13C37]"></div>Ui</li>
                            <li className='flex mr-3'><div className="div mr-2 w-[20px] h-[20px] bg-[#6A2135]"></div>Website</li>
                            <li className='flex mr-3'><div className="div mr-2 w-[20px] h-[20px] bg-[#e74c3c]"></div>App</li>

                        </ul>
                    </div>
                </div>
                <div className="w-4/12">

                </div>
            </div>
        </div>
    </section>);
}

export default AdminHome;
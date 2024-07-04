import { useEffect, useState } from 'react';
import { BiBlock } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';


import { MdOutlineModeEditOutline } from 'react-icons/md';

import toast, { Toaster } from 'react-hot-toast';
function Users() {
    useEffect(() => {
        getData();
    }, [])

    const [data, setData] = useState([]);
    const [popup, setpopup] = useState(false);
    const [roll, changeRoll] = useState('');
    const [id, setID] = useState('');



    const handleRoll = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        const res = await fetch("/api/admin/displayUser", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },

        });
        const data = await res.json()
        if (res.status == 200) {
            setData(data)
        }
    }
    const getEditRollInfo = async (id) => {
        try {
            const res = await fetch("/api/auth/fetchUserRoll", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id })
            });
            const data = await res.json()

            if (res.status == 200) {

                changeRoll(data.roll);
                setID(data._id);

            }

        } catch (error) {

        }
    }
    const handleBlock = async (id) => {

        const res = await fetch(`/api/admin/blockUser/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
        });

        if (res.status == 200) {
            toast.success("Updated");
            getData();

        } else {
            toast.error('Problem Something');

        }
    }
    const handelSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`/api/admin/changeRoll/${id}`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ roll })
        });
        if (res.status == 200) {
            toast.success("Updated");
            getData();
        } else {
            toast.error('Problem Something');
        }

    }
    const delUser = async (id) => {
        const res = await fetch(`/api/admin/delUser/${id}`, {
            method: "delete",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (res.status == 200) {
            toast.success("User Deleted");
            getData();
        } else {
            toast.error('User not deleted');
        }
    }
    const userRoll = localStorage.getItem("roll");
    const getBottompart = (element) => {

        if (userRoll === "super admin") {
            return (<div className="bottomPart flex justify-end p-5">
                <div className="editBX w-[20px] h-[20px]">
                    {
                        element.token != localStorage.getItem("jwttoken") ? <MdOutlineModeEditOutline className='cursor-pointer' onClick={() => {
                            setpopup(true)
                            getEditRollInfo(element._id)
                        }} /> : ""
                    }

                </div>
                <div className="editBX w-[20px] h-[20px]">
                    {
                        element.token != localStorage.getItem("jwttoken") ? <AiFillDelete className='cursor-pointer' onClick={() => {
                            delUser(element._id)
                        }} /> : ""
                    }

                </div>
                <div className="editBX w-[20px] h-[20px]">
                    {
                        element.token != localStorage.getItem("jwttoken") ? <BiBlock className={element.block ? "cursor-pointer text-red-500" : "cursor-pointer"} onClick={() => {
                            handleBlock(element._id)
                        }} /> : ""
                    }

                </div>
            </div>)
        } else if (userRoll === "admin") {
            return (<div className="bottomPart flex justify-end p-5">
                <div className="editBX w-[20px] h-[20px]">
                    {
                        element.roll != "super admin" ? element.token != localStorage.getItem("jwttoken") ? <BiBlock className={element.block ? "cursor-pointer text-red-500" : "cursor-pointer"} onClick={() => {
                            handleBlock(element._id)
                        }} /> : "" : ""
                    }
                </div>
            </div>)

        }

    }
    return (<section className="users">
        <div className="main w-5/6 mx-auto">
            <div className="heading font-main text-2xl capitalize font-semibold my-2">
                All users
            </div>
            <div className="userSBX flex mt-4 flex-wrap">
                {
                    data.map((element) => {
                        return (<div className="md:w-4/12 sm:w-full p-4" key={element._id}>
                            <div class="mx-auto flex border border-slate-300 p-2 flex-col w-full justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
                                <div className="imgBx w-[80px] h-[80px] rounded-full overflow-hidden relative">
                                    <img className="w-full h-full" src={process.env.REACT_APP_IMGURL + element.file} />
                                </div>

                                <div class="p-4">

                                    <small class="text-blue-400 text-xs capitalize">{element.roll}{element.token == localStorage.getItem("jwttoken") ? " [You] " : ""}</small>
                                    <h1 class="text-2xl font-medium text-slate-600 pb-1">{"Name: " + element.name}</h1>
                                    <p class="text-slate-600 font-main">{"Email is: " + element.email}</p>
                                    <p class="text-slate-600 font-main">{"Mobile is: " + element.mobile}</p>
                                    <p class="text-slate-600 font-main">{"Gender is: " + element.gender}</p>
                                    <p class="text-slate-600 font-main">{"Last Modify: " + element.lastModify}</p>





                                </div>
                                {
                                    getBottompart(element)
                                }
                            </div>
                        </div>)
                    })
                }

                <div id="popup-modal" tabindex="-1" class={popup ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-screen flex justify-center items-center bg-[#80808066]" : "overflow-y-auto hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"}>
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div class="relative bg-white rounded-lg shadow">
                            <button onClick={() => {
                                setpopup(false)
                            }} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  " data-modal-toggle="popup-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                            <div class="p-6">
                                <div className="upperIcon flex justify-center text-5xl text-slate-500">
                                    <FaUserEdit />


                                </div>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 font-main">Change user Roll</h3>
                                <form onSubmit={handelSubmit}>
                                    <select value={roll} onChange={(e) => changeRoll(e.target.value)} className='w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500 my-3 font-main' name="roll" id="">
                                        <option value="modarator">Modarator</option>
                                        <option value="admin">Admin</option>
                                        <option value="super admin">Super Admin</option>

                                    </select>
                                    <button className='px-4 py-1 font-main text-white bg-blue-500 hover:bg-blue-700 transition'>Update Roll</button>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </div>
    </section>);
}

export default Users;
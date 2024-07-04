import { GrFormEdit } from 'react-icons/gr';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form } from 'formik';

function Profile() {
    const [dialuge, setDialuge] = useState(false);
    const [userData, setUserData] = useState([]);
    const handlePwd = () => {
        setDialuge(!dialuge);
    }
    const navigate = useNavigate();
    useEffect(() => {
        checkAuth();
    }, []);
    const checkAuth = async () => {
        const res = await fetch("/api/auth/fetchUser", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        const userInfo = await res.json();

        if (res.status == 200) {
            setUserData(userInfo);
        }
    }
    const goToEdit = () => {
        navigate("/admin/edit", { state: { data: userData } });
    }
    const initialvalues = { email: "", password: "" };

    const submitForm = async (value) => {
        // console.log(value)
        // navigate("/admin/changePassword")
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email: value.email, password: value.password })
        });
        if (res.status == 200) {
            navigate("/admin/changePassword", {
                state: {
                    email: value.email
                }
            })
        } else {
            toast.error("Wrong Password");
        }
    }
    const validationshema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).max(10).required(),
    })
    return (<><section className="profilePage my-2">
        <div className="main w-5/6 mx-auto">
            <div className="profileBox md:w-5/12 sm:w-full mx-auto py-6 bg-[#dbe1e6b6] flex justify-center flex-col px-2 items-center rounded">
                <div className="propfileImg w-[150px] h-[150px]  rounded-full border-4 border-blue-300 relative">
                    <div className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] absolute z-20 bottom-4 right-0 flex justify-center items-center cursor-pointer hover:bg-slate-400">
                        <GrFormEdit className='text-xl text-slate-700' onClick={goToEdit} />
                    </div>
                    <img alt="profileImg" src={process.env.REACT_APP_IMGURL + userData.file} className="w-full rounded-full h-full" srcset="" />
                </div>
                <div className="inforBx w-full px-5 mt-4">
                    <div className="title font-secondary my-2 capitalize text-2xl">
                        basic Info
                    </div>
                    <div className="box flex font-main justify-between mt-5">
                        <div className="title">
                            Name
                        </div>
                        <div className="content">
                            {userData.name}
                        </div>
                        <div className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] flex justify-center items-center cursor-pointer hover:bg-slate-400">
                            <GrFormEdit className='text-xl text-slate-700' onClick={goToEdit} />
                        </div>
                    </div>
                    <div className="box flex font-main justify-between mt-5">
                        <div className="title">
                            Email
                        </div>
                        <div className="content">
                            {userData.email}

                        </div>
                        <div className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] flex justify-center items-center cursor-pointer hover:bg-slate-400">
                            <GrFormEdit className='text-xl text-slate-700' onClick={goToEdit} />
                        </div>
                    </div>
                    <div className="box flex font-main justify-between mt-5">
                        <div className="title">
                            Mobile
                        </div>
                        <div className="content">
                            {userData.mobile}

                        </div>
                        <div className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] flex justify-center items-center cursor-pointer hover:bg-slate-400">
                            <GrFormEdit className='text-xl text-slate-700' onClick={goToEdit} />
                        </div>
                    </div>
                    <div className="box flex font-main justify-between mt-5">
                        <div className="title">
                            Roll
                        </div>
                        <div className="content">
                            {userData.roll}

                        </div>
                        <div className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] flex justify-center items-center cursor-pointer hover:bg-slate-400">
                            <GrFormEdit className='text-xl text-slate-700' onClick={goToEdit} />
                        </div>
                    </div>
                    <div className="box flex font-main justify-between mt-5">
                        <div className="title">
                            Gender
                        </div>
                        <div className="content">
                            {userData.gender}

                        </div>
                        <div className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] flex justify-center items-center cursor-pointer hover:bg-slate-400">
                            <GrFormEdit className='text-xl text-slate-700' onClick={goToEdit} />
                        </div>
                    </div>
                    <div className="title font-secondary my-2 capitalize text-2xl">
                        Security
                    </div>
                    <div className="box flex font-main justify-between mt-5">
                        <div className="title">
                            Password
                        </div>
                        <div className="content">
                            ********1245
                        </div>
                        <div onClick={handlePwd} className="editButton rounded-full w-[30px] h-[30px] bg-[#cccdd3] flex justify-center items-center cursor-pointer hover:bg-slate-400">
                            <GrFormEdit className='text-xl text-slate-700' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className={dialuge ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-screen flex justify-center items-center font-main" : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-screen  justify-center items-center font-main hidden"}>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto ">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={handlePwd} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                    <div className="py-6 px-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white capitalize">type your password again</h3>
                        <Formik
                            initialValues={initialvalues}
                            onSubmit={submitForm}
                            validateOnMount
                            validationSchema={validationshema}
                        >
                            {(formik) => {

                                return (
                                    <Form>
                                        <div className="frmClm font-main mt-2">
                                            <label className='text-slate-300'>Email</label>
                                            <Field type="text" className=" w-full border border-slate-500 outline-none px-2 py-2 focus:border-blue-500 rounded" name="email" id="" />
                                        </div>
                                        <div className="frmClm font-main mt-2">
                                            <label className='text-slate-300'>Password</label>
                                            <Field name="password" type="password" className="rounded w-full border border-slate-500 outline-none px-2 py-2 focus:border-blue-500" id="" />

                                        </div>
                                        <button type="submit" disabled={!formik.isValid} className="my-2 w-full text-clip bg-blue-600 font-main text-white py-2 disabled:bg-blue-400">Sign Up</button>
                                    </Form>

                                );
                            }}

                        </Formik>
                        <ToastContainer
                            position="bottom-center"
                            hideProgressBar
                            closeButton={false}
                            autoClose={2000}
                        />
                    </div>
                </div>
            </div>
        </div></>);
}

export default Profile;
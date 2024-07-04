import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';
function Login() {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [hidePWd, setHidePWd] = useState(true);
    const tooglePWd = () => {
        setHidePWd(!hidePWd)
    }
    const initialvalues = { email: "", password: "" };
    const submitForm = async (value) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email: value.email, password: value.password })
        });
        const data = await res.json();
        if (res.status == 200) {



            localStorage.setItem("jwttoken", data.token);
            localStorage.setItem("name", data.name.split(" ")[1])
            localStorage.setItem("gender", data.gender)
            localStorage.setItem("imgSrc", data.file);
            localStorage.setItem("roll", data.roll);
            localStorage.setItem("isLogin", JSON.stringify({ LOGIN: true }));
            navigate("/admin");
            window.location.reload();

            dispatch({ type: "USER", payload: true });
        } else {
            toast.error("Wrong Password")
        }
    }
    const validationshema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).max(10).required(),
    })
    return (<section className="w-screen h-screen flex justify-center bg-slate-300 items-center">
        <div className="main-box w-[300px] h-[400px] rounded shadow-md bg-slate-100 p-4">
            <div className="top-bar">
                <div className="title font-main text-3xl font-semibold">
                    Sign in Now
                </div>
                <div className="subTitle font-secondary text-slate-400">
                    Sign in with your Information
                </div>
            </div>
            <div className="formBx mt-4">
                <Formik
                    initialValues={initialvalues}
                    validationSchema={validationshema}
                    onSubmit={submitForm}
                    validateOnMount
                >
                    {(formik) => {

                        return (
                            <Form>

                                <div className="frmClm font-main mt-2">
                                    <label>Email</label>
                                    <Field type="text" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" name="email" id="" />


                                </div>

                                <div className="frmClm font-main mt-2 ">
                                    <label>Password</label>
                                    <Field name="password" type={hidePWd ? "password" : "text"} className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500" id="" />
                                    <div className="tooglepWd text-right cursor-pointer my-1" onClick={tooglePWd}>
                                        {hidePWd ? "Show" : "Hide"}
                                    </div>

                                </div>
                                <button type="submit" disabled={!formik.isValid} className="w-full text-clip bg-blue-600 font-main text-white py-2 disabled:bg-blue-400">Sign Up</button>


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
    </section>);
}

export default Login;
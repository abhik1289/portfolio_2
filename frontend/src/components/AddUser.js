import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
function Adduser() {
    const [hidePWd, setHidePWd] = useState(true);
    const [chidePWd, csetHidePWd] = useState(true);
    const navigate = useNavigate();
    const initialValues = { name: "", email: "", mobile: "", password: "", roll: "", gender: "" };
    const onSubmit =async (value) => {
    const res = await fetch("/api/auth/adduser",{
        headers:{
            'Content-type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify({name:value.name,email:value.email,mobile:value.mobile,roll:value.roll,gender:value.gender,password:value.password})
    });
    if(res.status==200){
        navigate("/admin/verify",{state:{email:value.email,editMode:false}});
    }
    }
    const handlePwdContrller = () => {
        setHidePWd(!hidePWd);
    }
    const chandlePwdContrller = () => {
        csetHidePWd(!chidePWd);
    }
    const rolls = ["super admin","admin", "modarator"];
    const genders = ["male", "female", "custom"];

    const validationSchema = Yup.object({
        name: Yup.string().min(3).max(15).required(),
        email: Yup.string().email().required(),
        mobile: Yup.number().required(),
        password: Yup.string().min(6).max(10).required(),
        cpassword: Yup.string().oneOf([Yup.ref('password')],"Password not match").required("Confirm password required"),
        roll: Yup.string().required().oneOf(rolls),
        gender: Yup.string().required().oneOf(genders)
    });
    const rollOption = rolls.map((product, key) => (
        <option value={product} key={key}>
            {product}
        </option>
    ));
    const genderOption = genders.map((product, key) => (
        <option value={product} key={key}>
            {product}
        </option>
    ));

   
    return (<section className="addUser">
        <div className="main w-5/6 mx-auto mt-4">
            <div className="heading font-main text-2xl capitalize font-semibold my-2">
                Add user page
            </div>
            <div className="formBx md:w-8/12 sm:w-full">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form >
                        <div className="box w-full font-main my-2">
                            <label className="block">Name</label>
                            <Field type="text" className="outline-none w-full border border-slate-300 focus:border-blue-500 px-2 py-1" name="name" id="" />
                            <div className="errorMsg text-red-500 font-main">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                      
                        <div className="box w-full font-main my-2">
                            <label className="block">Email</label>
                            <Field  type="text" className="outline-none w-full border border-slate-300 focus:border-blue-500 px-2 py-1" name="email" id="" />
                            <div className="errorMsg text-red-500 font-main">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div className="box w-full font-main my-2">
                            <label className="block">Mobile</label>
                            <Field type="text" className="outline-none w-full border border-slate-300 focus:border-blue-500 px-2 py-1" name="mobile" id="" />
                            <div className="errorMsg text-red-500 font-main">
                           
                            <div className="errorMsg text-red-500 font-main">
                                <ErrorMessage name="mobile" />
                            </div>
                            </div>
                        </div>
                        <div className="box w-full font-main my-2">
                            <label className="block">Password</label>
                            <Field type={hidePWd ? "password" : "text"}  className="outline-none w-full border border-slate-300 focus:border-blue-500 px-2 py-1" name="password" id="" />
                            <div className="changePwd float-right my-2 cursor-pointer" onClick={handlePwdContrller}>{hidePWd ? "Show" : "Hide"}</div>
                            <div className="errorMsg text-red-500 font-main">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <div className="box w-full font-main my-2">
                            <label className="block">Confirm Password</label>
                            <Field type={chidePWd ? "password" : "text"} className="outline-none w-full border border-slate-300 focus:border-blue-500 px-2 py-1" name="cpassword" id="" />
                            <div className="changePwd float-right my-2 cursor-pointer" onClick={chandlePwdContrller}>{chidePWd ? "Show" : "Hide"}</div>
                            <div className="errorMsg text-red-500 font-main">
                                <ErrorMessage name="cpassword" />
                            </div>
                        </div>
                        <div className="frmClm w-full flex justify-between">
                            <div className="box w-5/12 font-main my-2">
                                <label className="block">Roll</label>
                                <Field name="roll" as="select" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500">
                                    <option value={""}>Select roll</option>
                                    {rollOption}
                                </Field>

                                <div className="errorMsg text-red-500 font-main">
                                    <ErrorMessage name="roll" />
                                </div>
                            </div>
                            <div className="box w-5/12 font-main my-2">
                                <label className="block">Gender</label>
                                <Field name="gender" as="select" className="w-full border border-slate-500 outline-none px-2 py-1 focus:border-blue-500">
                                    <option value={""}>Select gender</option>
                                    {genderOption}
                                </Field>
                                <div className="errorMsg text-red-500 font-main">
                                    <ErrorMessage name="gender" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="px-4 py-1 font-main text-white bg-blue-500 hover:bg-blue-700 transition">Add User</button>
                    </Form>
                </Formik>

            </div>
        </div>
    </section>);
}

export default Adduser;
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useParams, useNavigate } from 'react-router-dom'
import { css } from "@emotion/react";
import HashLoader
    from "react-spinners/ClipLoader";
const parse = require('html-react-parser');

function ReadBlog() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(true);
    if (!id) {
        navigate("/blog")
    }
    useEffect(() => {
        getData()
    }, []);
    const getData = async () => {
        try {
            const res = await fetch(`/api/blog/edisplayBlog/${id}`, {
                method: "GET"
            });
            const data = await res.json();
            if (res.status === 200) {
                setLoading(false);
                setText(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (<>
        <Header />
        {
            loading ? <div className="flex justify-center items-center w-screen h-screen">
                <HashLoader size={60} />
            </div> : <div className="mainBody mx-auto">
                <div className="imgBx h-[400px] overflow-hidden w-5/6 mx-auto">
                    <img className="w-full" src={process.env.REACT_APP_IMGURL + text.file} class="mask w-full h-full" />
                </div>
                <div className="main w-5/6 mx-auto">
                    <div className="title font-main text-3xl my-3">
                        {
                            text.title
                        }
                    </div>
                    <div className="text">
                        {
                            text.text ? parse(text.text) : ""
                        }
                    </div>
                </div>
            </div>
        }
        <Footer />
    </>);
}

export default ReadBlog;
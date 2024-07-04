import React, { useState, useRef, useEffect } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
const axios = require('axios')
const parse = require('html-react-parser');
function App() {
    const { id } = useParams();
    useEffect(() => {
        getData()
    }, []);
    const [blogtext, setBlogText] = useState({
        text: "", file: "", title: ""
    });
    const file = useRef(null);
    const [image, setImage] = useState(true);
    const [imageSrc, setImageSrc] = useState("");



    const handleChnage = (event, editor) => {
        const data = editor.getData();
       
        setBlogText({ ...blogtext, text: data });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', blogtext.text);
        formData.append('file', blogtext.file);
        formData.append('title', blogtext.title);
        const res = await axios.put(`/api/blog/upBlog/${id}`, formData);
        if (res.status === 200) {
            console.log(res.status)
            toast.success('Successfully Added');
        } else {
            toast.error('Problem');
        }
    }
    const getData = async () => {
        try {
            const res = await fetch(`/api/blog/edisplayBlog/${id}`, {
                method: "GET"
            });
            const data = await res.json();
            if (res.status === 200) {
                setBlogText({
                    title: data.title,
                    text: data.text,
                    file: data.file
                })
            }
        } catch (error) {
            console.log(error);
        }
    }





    return (
        <div className="App main mx-auto w-5/6">
            <div className="heading font-main text-2xl capitalize font-semibold my-2">
                Post your blogs for users
            </div >
            <form>
                <input onChange={(e)=>{
                     setBlogText({ ...blogtext, title: e.target.value });
                }} value={blogtext.title} type="text" name="title" className='w-full border border-slate-500 focus:border-blue-400 outline-none py-1 px-3 my-2' placeholder='Blog Title' id="" />
                <CKEditor
                    editor={Editor}
                    data={blogtext.text}
                    value="aa"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={handleChnage}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                <div className="addBlogPostImg">
                    {/* <div className="preview-image w-[300px] h-[300px] overflow-hidden my-1 border border-slate-500">
                        {
                            image ? <img className='w-full' src={src} alt="" /> : <div className='flex justify-center items-center h-full relative font-main'>Choose Image</div>
                        }
                    </div> */}
                    {/* <input required type="file" ref={file} name="file" onChange={(e) => {
                        let file = e.target.files[0];
                        setBlogText({ ...blogtext, file: file })
                        if (file) {
                            setImage(true);
                        }
                        let imgSrc = URL.createObjectURL(file);
                        setSrc(imgSrc);
                    }} hidden id="" /> */}
                    <input type="file" ref={file} hidden name="file" id="" onChange={(event) => {
                        let file = event.target.files[0];
                        console.log(file)
                        if (file) {
                            setImage(false)
                        }
                        console.log("file is", event.target.value)
                        setBlogText({ ...blogtext, file: file })
                        let src = URL.createObjectURL(event.target.files[0]);
                        setImageSrc(src)

                    }} />

                    {console.log(image)}
                    <div className="img-preview w-[500px] my-2">
                        {image ? <img data-image={image} src={process.env.REACT_APP_IMGURL + blogtext.file} alt="profileImg" className="w-full h-full" /> : <img data-image={image} alt="profileImg" src={imageSrc} id='img-prview' className="w-full h-full" />}
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        file.current.click()
                    }} className=' px-4 py-1 font-main text-white bg-yellow-500 hover:bg-yellow-700 transition'>Add Front Image</button>
                </div>
                <button onClick={handleSubmit} type="submit" className="mt-5 px-4 py-1 font-main text-white bg-blue-500 hover:bg-blue-700 transition">Update</button>
            </form>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </div>
    );
}

export default App;



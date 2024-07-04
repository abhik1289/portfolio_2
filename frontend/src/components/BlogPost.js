import React, { useState ,useRef} from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import toast, { Toaster } from 'react-hot-toast';

const axios = require('axios')
function App() {
	const file = useRef(null);
    const [blogtext, setBlogText] = useState({
		text:"",file:"",title:""
	});
    const [image, setImage] = useState(false);
    const [src, setSrc] = useState("");


    
    const handleChnage = (event, editor) => {
        const data = editor.getData();
        setBlogText({...blogtext,text:data});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
		const formData = new FormData();
        formData.append('text', blogtext.text);
        formData.append('file', blogtext.file);
        formData.append('title', blogtext.title);

        const res = await axios.post("/api/blog/postBlog", formData);
        if(res.status ===200){
            toast.success('Successfully Added');
        }else{
            toast.error('Problem');
        }
    }
  

   
    return (
        <div className="App main mx-auto w-5/6">
            <div className="heading font-main text-2xl capitalize font-semibold my-2">
                Post your blogs for users
            </div >
            <form>
                <input type="text" onChange={(e)=>{
                    setBlogText({...blogtext,[e.target.name]:e.target.value});
                    console.log(blogtext.title)
                }} name="title" className='w-full border border-slate-500 focus:border-blue-400 outline-none py-1 px-3 my-2' placeholder='Blog Title' id="" />
                <CKEditor
                    editor={Editor}
                    data="<p>Hello from CKEditor 5!</p>"
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
                    <div className="preview-image w-[300px] h-[300px] overflow-hidden my-1 border border-slate-500">
                   {
					   image?<img className='w-full' src={src} alt="" />:<div className='flex justify-center items-center h-full relative font-main'>Choose Image</div>
				   }
                    </div>
                    <input required type="file" ref={file} name="file" onChange={(e)=>{
let file = e.target.files[0];
setBlogText({ ...blogtext, file: file })
if(file){
	setImage(true);
}
let imgSrc = URL.createObjectURL(file);
setSrc(imgSrc);
					}} hidden id="" />
                    <button  onClick={()=>{file.current.click()}} className=' px-4 py-1 font-main text-white bg-yellow-500 hover:bg-yellow-700 transition'>Add Front Image</button>
                </div>
                <button onClick={handleSubmit} type="submit" className="mt-5 px-4 py-1 font-main text-white bg-blue-500 hover:bg-blue-700 transition">Add User</button>
            </form>
            <Toaster
  position="bottom-center"
  reverseOrder={true}
/>
        </div>
    );
}

export default App;





function DisplayBox(props) {
    return (
    <div className="p-3">
       <div className="mainBx flex items-center border justify-start py-2 rounded px-2 bg-slate-200 box">
       <div className="icon bg-blue-500 w-[50px] h-[50px] rounded-full flex justify-center items-center text-white text-2xl">
            {props.icon}
        </div>
        <div className="text ml-2 font-main">
            <div className="title">
                {props.title}
            </div>
            <div className="number text-4xl">
            {props.number}
            </div>
        </div>
       </div>
    
</div>);
}

export default DisplayBox;
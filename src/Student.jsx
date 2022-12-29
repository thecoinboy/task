import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Student = () => {
    const [collegeData, setCollegeData] = useState([""])
    const [load, setLoad] = useState(false)
    const [data, setData] = useState({ fname: "", lname: "", Rollnumber: "", admissionDate: "", college:"select" })
    const manageData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {
        setLoad(true)
        e.preventDefault();
        const { fname, lname, Rollnumber, admissionDate, college } = data;
        await axios.post('https://task-server-r0wo.onrender.com/ragister', {fname, lname, Rollnumber, admissionDate, college }).then((res) => {
            toast(res.data.message)
            setLoad(false)
            setData({...data, fname:"", lname:"",Rollnumber:"",admissionDate:"", college:"select"})
        }).catch((err) => {
            console.log(err)
            setLoad(false)
        })
    }

    useEffect(() => {
        try {
            axios.get('https://task-server-r0wo.onrender.com/getcollege').then((res)=>{
                const CollegeData = res.data.college
                setCollegeData(CollegeData)
            })
        } catch (error) {
            console.log(error)
        }
    },[])
    
    return (
        <div className='flex justify-center items-center flex-col'>
            <h1 className='mt-10 font-bold text-red-700 text-4xl'> Hello Student </h1>
            <div className="mx-auto w-auto h-auto">
                <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 relative w-[500px] px-24 py-10'>
                    <ToastContainer />
                    <input placeholder='FirstName' type="text" name="fname" id="" className='input border-2 border-red-400 rounded-sm outline-none my-3 px-2' onChange={manageData} value={data.fname} />
                    <input placeholder='LastName' type="text" name="lname" id="" className='input border-2 border-red-400 rounded-sm outline-none my-3 px-2' onChange={manageData} value={data.lname} />
                    <input type="text" placeholder='RollNumber' name="Rollnumber" id="" className='input border-2 border-red-400 rounded-sm outline-none my-3 px-2' onChange={manageData} value={data.Rollnumber} />
                    <input type="date" name="admissionDate" placeholder='AdmissionDate' id="" className='input border-2 border-red-400 rounded-sm outline-none my-3 px-2' onChange={manageData} value={data.admissionDate} />
                    <select name="college" id="" className='text-sm py-1 px-1 border-red-400 rounded-sm border-2'   onChange={manageData} value={data.college}>
                        {
                            collegeData.map((items, i)=>( <option className='text-sm bg-white' value={items.name} key={i} > {items.name} </option>))
                        }
                    </select>
                    <input type="submit" name="Submit" id="" className='bg-red-600 py-2 text-white font-semibold rounded hover:bg-red-700 transition-all cursor-pointer' />
                    { load ? <h1 className='absolute top-[40%] z-10 left-[34%] text-red-800 text-4xl font-bold text-center'> Loading... </h1> : "" }
                </form>
            </div>
        </div>
    )
}

export default Student;

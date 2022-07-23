import React from 'react';
import {useState} from 'react';
import { Todo } from './TodoList';

export const Form = ({type}) => {
    const [job, setJob] = useState('');
    const [jobs, setJobs] = useState([]);
    const [edit, setEdit] = useState();
    const [show, setShow] = useState(true)
    
    const handleAdd = () => {
        setJobs(prev => [...prev,job]);
        setJob('');
        const lastChild = document.querySelector(".todoList").lastChild;
        if(lastChild){
            lastChild.scrollIntoView({
                behavior: "smooth",
                block: "end"
            })
        }
    }
    const handleKey = (e) => {
        if(e.key === "Enter" && show) {
            handleAdd();
        }
        if(e.key === "Enter" && !show){
            handleSave();
        }
    }
    const handleCheck = (e) => {
        e.target.classList.toggle("complete");
        e.target.classList.toggle("job-color");
    }

    const handleDelete = (idx) => {
        const newJobs = jobs.filter(job => job !== jobs[idx]);
        setJobs(newJobs);
    }

    const handleEdit = (idx) => {
        setShow(!show);
        const editJob = jobs[idx];
        setJob(editJob);
        setEdit(idx);
    }

    const handleSave = () => {
        jobs[edit] = job;
        setJobs([...jobs])
        setShow(!show)
        setJob(""); 
    }
  return (
    <div className="form-input">
        {show && (
            <React.Fragment>
            <div>
                <input type="text" placeholder='Add a Jobs' value={job} onChange={(e) => {setJob(e.target.value)}} onKeyDown={handleKey}/>
                <button onClick={handleAdd}>Add</button>
            </div>
        
            <div className="todoList">
                {jobs.map((item,idx) => (
                        <Todo   key={idx}
                                job={item}
                                handleCheck={handleCheck}
                                handleDelete={() => handleDelete(idx)}
                                handleEdit={() => handleEdit(idx)}
                        />
                        
                ))}
            </div>
            </React.Fragment>
            )
        }
        {!show && (
            <div>
                <h1 style={{color: "grey"}}>Edit your's task here....</h1>
                <input type="text" value={job} onChange={(e) => {setJob(e.target.value)}} onKeyDown={handleKey}/>
                <button id="save-btn" onClick={handleSave}>Save</button>
            </div>
        )}
    </div>
  )
}

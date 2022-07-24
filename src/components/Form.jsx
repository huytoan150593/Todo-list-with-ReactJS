import React from 'react';
import {useState} from 'react';
import { Todo } from './Todo';

export const Form = ({type}) => {

    const [job, setJob] = useState('');
    const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem("TODOLIST")) || []);
    const [edit, setEdit] = useState();
    const [show, setShow] = useState(true)
    
    localStorage.setItem("TODOLIST", JSON.stringify(jobs));

    const handleAdd = () => {
        setJobs(prev => [...prev,job]);
        setJob('');
        let lastChild = document.querySelector(".todoList").lastChild;
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

    const handleDelete = (e, idx) => {
        // const row = e.target.closest(".job-row");
        // const box = e.target.closest(".icons").previousSibling.previousSibling
        const newJobs = jobs.filter(job => job !== jobs[idx]);
        setJobs(newJobs);
    }
    const handleCheck = (e) => {
        e.target.closest("div").classList.toggle("complete");
        e.target.closest("div").classList.toggle("job-color");
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
        localStorage.setItem("TODOLIST", JSON.stringify(jobs));
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
                                handleDelete={(e) => handleDelete(e, idx)}
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

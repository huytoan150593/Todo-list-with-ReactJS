import React from 'react'
import { RiDeleteBin6Line, RiEdit2Line} from 'react-icons/ri';

export const Todo = ({job,handleCheck, handleDelete, handleEdit}) => {
  return (
    <div className="job-row job-color">
        <input type="checkbox" onChange={handleCheck}/>
            {job}
        <div className="icons">
            <RiEdit2Line className='react-icon' size={28} onClick={handleEdit}/>
            <RiDeleteBin6Line className='react-icon' size={28} onClick={handleDelete}/>
        </div>
    </div>
  )
}

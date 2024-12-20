import React, { useState } from 'react'

const Todos = ({completed, label, remove, id, onChecked, changeLabel}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(label);

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }

  const cancelEditing = () => {
    setIsEditing(!isEditing);
    setInputValue(label);
  }

  const saveEditing = () => {
    setIsEditing(!isEditing);
    changeLabel(id, inputValue);
  }

  return (
    <div className="todo">
        <div>
            <input className='checkbox' onChange={() => onChecked(id)} type='checkbox' id={id} />
            {
              !isEditing
              ? <label htmlFor={id} className={`item ${completed ? "item-completed" : ""}`}>{label}</label>
              : <input type='text' value={inputValue} onChange={onChangeInput}/>
            }

            
        </div>
        <div>
        {
                isEditing 
                ? (
                  <div className='todo-actions'>
                    <button onClick={saveEditing}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>                  
                  </div>
                )
                : (
                  <div className='todo-actions'>
                    <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                    <button onClick={(remove)}>X</button>
                  </div>
                )
              }
        </div>
    </div>
  )
}

export default Todos
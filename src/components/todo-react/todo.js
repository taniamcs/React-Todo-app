import React, {useState,useEffect}from 'react'
import './style.css'

//get local storage data
const getLocalData= ()=>{
  const Lists= localStorage.getItem("mytodoList");
  if(Lists){
    return JSON.parse(Lists);
  }
  else{
    return([]);
  }
}

const Todo = () => {

  const [inputdata, setInputData] = useState("");
  const [items, setItems] =useState(getLocalData());
  const[isEditItem, setIsEditItem]=useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //add items function
const addItem = ()=>{
if(!inputdata){
  alert('Enter values');
}
else if(inputdata && toggleButton){
setItems(
  items.map((curElem)=>{
if(curElem.id===isEditItem){
  return{...curElem, name:inputdata}
}
return(curElem);
  })
)
    setInputData([]);
    setIsEditItem(null);
    setToggleButton(false);
}
else{
  const myNewInputData={
    id: new Date().getTime().toString(),
    name:inputdata
  }
  setItems([...items, myNewInputData]);
  setInputData("");
}
  };

  //edit items code
  const editItem=(index)=>{
    const item_todo_edited= items.find((curElem)=>{
    return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);

  }

  //delete item code
  const deleteItem=(index)=>{
   const updatedItems= items.filter((curElem)=>{
    return curElem.id !== index;
   });
   setItems(updatedItems);
  };

  //remove all items code
  const removeAll=()=>{
    setItems([]);
  }

  //adding local storage function
  useEffect(()=>{
    localStorage.setItem("mytodoList", JSON.stringify(items));

  },[items]);

  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./images/todo.svg" alt="todologo" />
                <figcaption>Add Your List Here ✌</figcaption>
            </figure>
            <div className='addItems'>
              <input type="text"
               placeholder="✍ Add Items"
               className="form-control"
               value={inputdata}
               onChange={(event)=>setInputData(event.target.value)}
               />
               {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) :
               (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
              
            </div>

            <div className='showItems'>
              {items.map((curElem)=>{
                return(
                  <div className='eachItem' key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className='todo-btn'>
                  <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                  <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                  </div>
                </div>
                )

              })}
          
            </div>

            <div className='showItems'>
              <button className='btn effect04' data-sm-link-text="REMOVE All" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Todo
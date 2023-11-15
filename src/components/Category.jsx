

import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { addCategory, getAVideo, getAllcategory, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row } from 'react-bootstrap';
import VideoCard from './VideoCard'

function Category() {
   //for body
  const [categoryName , setCategoryName] =useState({})
  const [AllCategory , setAllCategory] =useState([])  //catrgory ne purat axcess cheyan state create chytu


  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function to add category
  const handleAddcategory =async()=>{
      console.log(categoryName);
    if(categoryName){
      let body ={
        categoryName,
        allVideos :[]
      }
         // make api call
       const response = await addCategory(body)  
       console.log(response);
       if(response.status>=200 && response.status<300){
         toast.success('category successfully added')
         //to make the state null after successfully addition
         setCategoryName("")

         //to close modal
        handleClose()
    }

    else{
      console.log(response);
      toast.error('something went wrong please try again later')
    }
  }
      else{
        toast.warning('please fill the category name')
      }

  } 


  
  //function to get all category
   const allCategory = async()=>{
    const {data} = await getAllcategory()
   /* console.log(data);*/
    setAllCategory(data)  
   }
    console.log(AllCategory);
    
    //dragover eventListner
     const  dragover =(e)=>{
    //this will prevent reload so that data we send from videoCard.jsx wont be lost  
      e.preventDefault()  //refresh cheyunat nashtapdum so evntlistener il prevent default kodtu.
      console.log('inside dragover');
     }
     
     const videoDrop =async(e,categoryId)=>{
       console.log(`droped inside the categoryid ${categoryId}`);  //id kaanan
      //to get the videoid that is send from videocard compont using GET data.
       const videoid= e.dataTransfer.getData("videoID")
      console.log(videoid);

      //to get the perticular  video that is dragged
       const {data} = await getAVideo(videoid)
       console.log(data);   

       //to find the perticular category with the specified id
      let selectedCategory = AllCategory?.find(item=>item.id===categoryId)  //checkin the id which match  to ours
      console.log(selectedCategory);
      //data is added to the allvideos array in the perticular category with the specified id
      selectedCategory.allVideos.push(data)
      console.log(selectedCategory);
   
     
      await updateCategory(categoryId,selectedCategory)
      getAllcategory()

    }

  useEffect(()=>{
    allCategory()
  },[])  //dependency aiit empty error



  return (
  
    <>
  
   <div>
        <button
         onClick={handleShow} 
         className='btn btn-warning' 
         style={{width:'250px'}}
         >
          Add new Category
          </button>
         
          </div>
{  AllCategory?.length>0?
   AllCategory?.map((item)=>(<div className='m-5 border border-secondary rounded p-3 '>
   <div className='d-flex justify-content-between align-items-center' droppable onDragOver={(e)=> dragover(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
     <h6>{item.categoryName}</h6>
     <button  className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></button> 
   </div>
   <Row>
    <Col sm={12} > 
    {
      item.allVideos?.length> 0?
      item.allVideos.map(Card=> ( <VideoCard displayVideo={Card}/>))
      : <p>Nothing to display</p>
    }
    </Col>
   </Row>
   </div> ))
  
     : <p>Nothing to display</p>   
}
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="fa-solid fa-pencil me-2 text-warning"></i>Add New Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <form className="border border-secondary p-3 rounded">
              
            <Form.Group className="mb-3" controlId="formBasicEmail">
             <Form.Label>Category Name</Form.Label> 
            </Form.Group>
              <Form.Control type="text" placeholder="Enter Category Name" onChange={(e)=>setCategoryName(e.target.value)}/>
          

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddcategory} variant="warning">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
      
     </> 

  )
}

export default Category
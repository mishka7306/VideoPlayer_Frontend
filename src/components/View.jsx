import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard"
import { Col, Row } from "react-bootstrap";
import { getAllVideos } from "../services/allAPI";


function View({uploadVideoStatus}) {

  const [allvideo, setAllVideo] = useState([])

  const[deleteVideoStatus ,setDeleteVideoStatus] =useState(false)



  const getAllUploadedVideos = async() => {//'' call avmbo functn add avund
    const response = await getAllVideos()
    const {data} = response
    setAllVideo(data) 
  }
  console.log(allvideo);

  useEffect(() =>{
    getAllUploadedVideos()
    setDeleteVideoStatus(false)
  },[uploadVideoStatus ,deleteVideoStatus])//''

  return (
    <>
 
      <Row>
    { allvideo.length>0?
    allvideo?.map((video) => (<Col sm={12} md={6} lg={4} xl={3}>
          <VideoCard  displayVideo={video} setDeleteVideoStatus ={setDeleteVideoStatus} />
        </Col>))
             :
        <p>Nothing to display</p>
     } 
      </Row>
      </>
    
  )
}

export default View

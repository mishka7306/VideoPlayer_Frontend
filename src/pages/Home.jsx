

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Add from '../components/Add'
import Category from '../components/Category'
import View from '../components/View'



function Home() {
//create state to do state-lifting
  const [uploadVideoStatus , setUploadVideoStatus] =useState({})
  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <div>        
          <Add  setUploadVideoStatus={setUploadVideoStatus}/>
        </div>
        <Link to={'/watch-history'} style={{color:'white',textDecoration:'none'}}><h5 className='me-5'>Watch History</h5></Link>
      </div>
      
     <div className='d-flex justify-content-between'>
        <div>
          <h3 className='ms-5 mb-2'>All videos</h3>
          <View uploadVideoStatus={uploadVideoStatus} />
        </div>
        <div>
          <Category/>
        </div>
     </div>
    </>
  )
}

export default Home
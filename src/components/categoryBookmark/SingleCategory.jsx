import React from 'react'
import { useParams } from 'react-router-dom';


const SingleCategory = () => {
  const {id} = useParams();
  return (
    <div>{`SingleCategory is ${id}`}</div>
  )
}

export default SingleCategory;
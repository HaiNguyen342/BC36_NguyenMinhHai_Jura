import React from 'react'
import { history } from '../../App'

const Error = () => {
  return (
    <div className='container'>
        <h1 className='text-center'>404 NOT FOUND</h1>
        <div className='flex justify-center'>
        <button className='btn btn-primary' onClick={() => {
            history.push('/home')
        }}>Back to HOME</button>
        </div>
    </div>
  )
}

export default Error
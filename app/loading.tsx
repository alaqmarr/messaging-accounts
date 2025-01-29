import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">data</span>
            <span className="word">transactions</span>
            <span className="word">messages</span>
            <span className="word">cards</span>
            <span className="word">buttons</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default loading

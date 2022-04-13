import React from 'react'
import "./css/Request.css"

export default function Request({ request, acceptRequests }) {
  function handleClick() {
      acceptRequests(request.id)
  }
  return (
    <div>
        <label className='Request-eachThreadRequest'>
            <input type="checkbox" checked={request.accepted} onChange={handleClick} />
            {request.title}
            <br></br>
            Will Moderate: {request.willModerate}
            <br></br>
            Friends to Moderate: {request.friendsWillModerate}
            <br></br>
            Reason for request: {request.reason}
        </label>
    </div>
  )
}
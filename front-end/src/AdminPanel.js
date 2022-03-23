import React, { useState, useRef, useEffect } from 'react'
import ThreadRequestList from './ThreadRequestList'
import mockRequests from './mockRequests'

const LOCAL_STORAGE_KEY = 'adminPanelApp.threadRequests'

const AdminPanel = () => {
  const [threadRequests, setThreadRequests] = useState(mockRequests)

  useEffect(() => {
    const storedThreadRequests = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedThreadRequests) setThreadRequests(storedThreadRequests)
  }, mockRequests)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(threadRequests))
  }, [threadRequests])

  function acceptRequests(id) {
    const newThreadRequests = [...threadRequests]
    const request = newThreadRequests.find(request => request.id === id)
    request.accepted = !request.accepted
    setThreadRequests(newThreadRequests)
  }

  return (
    <main className="AdminPanel">
      <div clasName="AdminPanel-reminderDiv">
        <p><b>Admin Panel</b></p>
        Check a game to mark it as accepted.
      </div>
      <div className="AdminPanel-threadRequestsList">
        <ThreadRequestList threadRequests={threadRequests} acceptRequests={acceptRequests} />
      </div>
    </main>
  )
}

export default AdminPanel
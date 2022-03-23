import React, { useState, useRef, useEffect } from 'react';
import ThreadRequestList from './ThreadRequestList'
import mockRequests from './mockRequests';


const LOCAL_STORAGE_KEY = 'adminPanelApp.threadRequests'

function AdminPanel() {

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
      <header className="header">
        header here
      </header>
      <div clasName="AdminPanelDetails">
        Check a game to mark it as accepted.
      </div>
      <div className="ListThreadRequests">
        <ThreadRequestList threadRequests={threadRequests} acceptRequests={acceptRequests} />
      </div>
    </main>
  )
}

export default AdminPanel;

import React from "react"
import Request from "./Request"

export default function ThreadRequestList({ threadRequests, acceptRequests }) {
  return threadRequests.map((request) => {
    return (
      <Request
        key={request.title}
        request={request}
        acceptRequests={acceptRequests}
      />
    )
  })
}
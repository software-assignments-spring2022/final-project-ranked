import React from 'react'

export default function mockRequests() {
  return (
    [   
    { 
        "title":"Valorant", 
        id:1, 
        "willModerate":"yes", 
        "friendsWillModerate":"yes",
        "reason":"more lorem ipsum", 
        "accepted":true }, 

    { 
        "title":"Call of Duty", 
        id:2, 
        "willModerate":"yes", 
        "friendsWillModerate":"no", 
        "reason":"umm", 
        "accepted":false},

    { 
        "title":"Other Game", 
        id:3, 
        "willModerate":"no", 
        "friendsWillModerate":"yes", 
        "reason":"fun", 
        "accepted":false}
]
  )
}

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import CommentSection from "./CommentSection"
import Post from "./Post"
import backupData from "./mock-backupPosts.json"
// import comment_info from "./mock-comment-section.json"
import "./Subthread.css"

const Subthread = props => {
    // start a state varaible with a blank array
    const [data, setData] = useState([]) 

    // from the website link
    const {gameId} = useParams()
    const {postId} = useParams() 

    //   the following side-effect will be called once upon initial render
    useEffect(() => {
        // fetch some mock data about animals for sale
        // the id of the animal that was clicked on is passed as a part of the match field of the props
        console.log(`fetching post id=${postId}...`)
        axios(`http://localhost:4000/megathread/${gameId}/subthread/${postId}/post`)
            .then(response => {
                // extract the data from the server response
                setData(response.data.sub_post)
            })
            .catch(err => {
                // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
                console.log(`Sorry, buster.  No more requests allowed today!`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!

                setData(backupData[postId-1])
            })
    }, [postId])

    //   if the user is not logged in, redirect them to the login route
    //   if (!props.user || !props.user.success) {
    //     return <Navigate to="/login?error=protected" />
    //   }

    return (
        <div className="Subthread">
            {/* <button className="back-button" onClick={goBack}> Back </button> */}
            <Post user={props.user} post={data}></Post>
            <div className="CommentSection">
                <CommentSection user={props.user} postId={postId}/>
            </div>
        </div>
    ) 
} 

export default Subthread 

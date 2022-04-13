import { React, useState } from 'react'
// pick up tags.json data
// import data from "./ListData.json"

// this brings in all the tags id's
// e.g. filters thru all of the tag titles
// import data from "../../../back-end/tags.json"

const List = props => {
    // create a new array by filtering the original array
    // filteredData --> element.id
    // this will return the "game-name" of each tag

    // replace 'data' with the 
    const filteredData = data.filter((el) => {
        //if no input the return the original
        // in order to hide the suggested tags before any text appears, 
            // i may !== the conditional
            // on Change
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        // with new tags.json data
        // use the "id" param to index thru game-name items
        else {
            return el.id.toLowerCase().includes(props.input)
        }
    })

    // call this within the return()
    // app.get("/subthread/get-posts")
    useEffect(() => {
        // fetch some mock data about animals for sasle
        // the id of the animal that was clicked on is passed as a part of the match field of the props
        console.log(`fetching post id=${id}...`)
        axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/search`)        // empty file for .get() requests
            .then(response => {
                // extract the data from the server response
                setData(response.data[id])      // i changed the param to 'id'
            })
            .catch(err => {
                // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
                console.log(`Sorry, buster.  No more requests allowed today!`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!

                setData(backupData[id])
            })
    }, [id])

    return (
        <ul>
            {filteredData.map((item) => (
                // with tags.json, feed back relevant posts
                // may need to index thru the array of posts

                // original code
                // this returns the game-name,posts
                <li key={item.id}>{item.posts}</li>
            ))}
        </ul>
    )
}

export default List
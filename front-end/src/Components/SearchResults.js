import { React, useState } from 'react'
// pick up tags.json data
import data from "./SearchResultData.json"
// import data from "../../../back-end/tags.json"

import './../css/SearchResults.css'


function List(props) {
    // create a new array by filtering the original array
    // filteredData --> element.id
    // this will return the "game-name" of each tag

    // replace 'data' with the 
    const filteredData = data.filter((el) => {
        //if no input the return the original
        // in order to hide the suggested tags before any text appears, 
            // i may !== the conditional
        if (props.input === '') {
            // return 'hello';
            console.log('empty');
            // return el
        }
        //return the item which contains the user input
        // with new tags.json data
        // use the "id" param to index thru game-name items
        else {
            // return el.text
            console.log('not empty');
            console.log(el.tag)
            return el.tag.toLowerCase().includes(props.input)
            // return el.text.toLowerCase().includes(props.input)
        }
    })

    // // call this within the return()
    // // app.get("/subthread/get-posts")
    // useEffect(() => {
    //     // fetch some mock data about animals for sasle
    //     // the id of the animal that was clicked on is passed as a part of the match field of the props
    //     console.log(`fetching post id=${id}...`)
    //     axios("/subthread/get-tags")        // empty file for .get() requests
    //         .then(response => {
    //             // extract the data from the server response
    //             setData(response.data[id])      // i changed the param to 'id'
    //         })
    //         .catch(err => {
    //             // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
    //             console.log(`Sorry, buster.  No more requests allowed today!`)
    //             console.error(err) // the server returned an error... probably too many requests... until we pay!

    //             setData(backupData[id])
    //         })
    // }, [id])

    return (
        <ul>
            {filteredData.map((item) => (
                // with tags.json, feed back relevant posts
                // may need to index thru the array of posts

                // original code
                // this returns the game-name,posts
                <li className="search-result" key={item.id}>{item.tag}</li>
            ))}
        </ul>
    )
}


export default List
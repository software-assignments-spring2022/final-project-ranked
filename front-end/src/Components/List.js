import { React, useState } from 'react'
import data from "./ListData.json"


// this is the standin List file 
// later on, this will take in data from the ListData.JSON file
// right now, that file has dummy data for testing
// when implemented, it'll hold the "id"s of all the tags on the discover/home page
// these "tags" will be the content that our search abr searches through

function List(props) {
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

export default List
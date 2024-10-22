import React from 'react';
import ListItem from './ListItem'; // Import the ListItem component
import '../styles/HorizontalList.css'// Import custom CSS for the list

function HorizontalList(params) {
    const items = params.homeIds
    return (
        <div className="horizontal-list-container" style={{minWidth:"50px"}}>
            <hr/>
            <ul className="horizontal-list" style={{minWidth:"800px"}}>
                {items.map((item, index) => (
                    <li key={index} className="list-item-wrapper">
                        <ListItem item={item} head={"Home"} setRoomIdsArray={params.setRoomIdsArray}/>
                    </li>
                ))}
            </ul>
            <hr/>
        </div>
    );
}

export default HorizontalList;
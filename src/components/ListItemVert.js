import React from 'react';
import '../styles/ListItem.css'; // Import CSS if necessary

function ListItem(params) {
    function onClickItem() {

    }

    return (
        <div className="list-item-content" onClick={onClickItem}>
            <h3>{params.head}</h3>
            <p>{params.item}</p>
        </div>
    );
}

export default ListItem;

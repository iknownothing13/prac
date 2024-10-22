import React from 'react';
import '../styles/ListItem.css'; // Import CSS if necessary

function ListItem(params) {
    async function onClickHome() {
        try {
            const response = await fetch('http://localhost:3000/api/home/show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: params.item })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const data = await response.json();
                const rooms = data.response.roomIdsArr;
                console.log(rooms)
                params.setRoomIdsArray(rooms);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="list-item-content" onClick={onClickHome}>
            <h3>{params.head}</h3>
            <p>{params.item}</p>
        </div>
    );
}

export default ListItem;

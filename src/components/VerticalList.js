import React from 'react';
import '../styles/VerticalList.css';
import ListItemVert from "./ListItemVert";

function VerticalList({ roomIds, onRoomSelect }) {
    async function onClickRoom(index) {
        //roomIds[index]
        try {
            const response = await fetch('http://localhost:3000/api/room/show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: roomIds[index] })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const roomData = await response.json();
            console.log(roomData.response.nodeIdsArr[0]);
            onRoomSelect(roomData.response.nodeIdsArr[0]);

        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (

        <div className="vertical-list-container" style={{ height: '100vh', paddingTop: '1rem' }}>
            <ul className="vertical-list">
                {roomIds.map((item, index) => (
                    <li
                        key={index}
                        className="list-item-wrapper"
                        onClick={() => onClickRoom(index)}
                        style={{ cursor: 'pointer' }}
                    >
                        <ListItemVert item={item} head={"Room"} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VerticalList;

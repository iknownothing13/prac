import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LoginBox from './components/LoginBox';
import HorizontalList from './components/HorizontalList';
import VerticalList from './components/VerticalList';
import GraphAndTable from './components/GraphAndTable';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [homeIdsArray, setHomeIdsArray] = useState([]);
    const [roomIdsArray, setRoomIdsArray] = useState([]);
    const [activityArr, setActivityArr] = useState([]);
    const [predictionArr, setPredictionArr] = useState([]);
    const [probabilityArr, setProbabilityArr] = useState([]);

    const fetchNodeData = async (nodeId) => {
        try {
            const response = await fetch('http://localhost:3000/api/node/show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: nodeId})
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const nodeData = await response.json();
            console.log(nodeData)
            setActivityArr(nodeData.response.activityArr);
            setPredictionArr(nodeData.response.predictionArr);
            setProbabilityArr(nodeData.response.probabilityArr);

        } catch (error) {
            console.error('Error:', error);
        }
        // fetch(`/node-data/${roomId}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setActivityArr(data.activityArr);
        //         setPredictionArr(data.predictionArr);
        //         setProbabilityArr(data.probabilityArr);
        //     })
        //     .catch(error => console.error('Error fetching node data:', error));
    };

    return (
        React.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', height: '100vh' } },
            !loggedIn ? (
                React.createElement(
                    'div',
                    { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' } },
                    React.createElement('h3', { style: { textAlign: 'center' } }, 'LOGIN'),
                    React.createElement(LoginBox, { setLoggedIn: setLoggedIn, setHomeIdsArray: setHomeIdsArray }),
                )
            ) : (
                React.createElement(
                    'div',
                    { style: { display: 'flex', flexDirection: 'column', height: '100vh' } },
                    React.createElement(
                        'div',
                        { style: { flex: '0 1 auto' } },
                        React.createElement(HorizontalList, { homeIds: homeIdsArray, setRoomIdsArray: setRoomIdsArray })
                    ),
                    React.createElement('hr'),
                    React.createElement(
                        'div',
                        { style: { display: 'flex', flex: '1 1 auto' } },
                        React.createElement(
                            'div',
                            { style: { flex: '0 1 300px', overflow: 'auto', padding: '1rem' } },
                            React.createElement(VerticalList, {
                                roomIds: roomIdsArray,
                                onRoomSelect: fetchNodeData
                            })
                        ),
                        React.createElement(
                            'div',
                            { style: { flex: '1 1 auto', padding: '1rem', display: 'flex', flexDirection: 'column', overflow: 'auto' } },
                            activityArr.length > 0 && React.createElement(GraphAndTable, {
                                activityArr: activityArr,
                                predictionArr: predictionArr,
                                probabilityArr: probabilityArr
                            })
                        )
                    )
                )
            )
        )
    );
}

export default App;

ReactDOM.render(React.createElement(App), document.getElementById('root'));

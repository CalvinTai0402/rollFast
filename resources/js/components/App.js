import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/Sidebar'
import '../../css/App.css';

function App() {
    return (
        <div>
            <Sidebar />
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

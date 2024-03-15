import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Client from './pages/Clients/Client';
import AddClient from './pages/Clients/AddClient';
import EditClient from './pages/Clients/EditClient';
import ViewClient from './pages/Clients/ViewClient';
import NoMatch from './pages/NoMatch';

function App() {
    return (
        <>
            <Routes>
                <Route index element={<Home />} />
                <Route path='client' element={<Client />}>
                    <Route index element={<AddClient />} />
                    <Route path='edit/:id' element={<EditClient />} />
                    <Route path='view' element={<ViewClient />} />
                </Route>
                <Route path='*' element={<NoMatch />} />
            </Routes>
        </>
    );
}

export default App;

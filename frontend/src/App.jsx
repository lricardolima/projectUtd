import { Routes, Route } from 'react-router-dom';
import Home from './pages/CartCheck/Home';
import CartChecks from './pages/CartCheck/CartChecks';
import AddCartCheck from './pages/CartCheck/AddCartCheck';
import EditCartCheck from './pages/CartCheck/EditCartCheck';
import ViewCartCheck from './pages/CartCheck/ViewCartCheck';
import NoMatch from './pages/NoMatch';

function App() {
    return (
        <>
            <Routes>
                <Route index element={<Home />} />
                <Route path='cart-check' element={<CartChecks />}>
                    <Route index element={<AddCartCheck />} />
                    <Route path='edit/:id' element={<EditCartCheck />} />
                    <Route path='view/:id' element={<ViewCartCheck />} />
                </Route>
                <Route path='*' element={<NoMatch />} />
            </Routes>
        </>
    );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PayreqsList from './features/payreqs/PayreqsList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="payreqs">
          <Route index element={<PayreqsList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

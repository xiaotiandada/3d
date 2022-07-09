import { Route, Routes } from 'react-router-dom';

import Comic from './pages/comic';
import Home from './pages/home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comic" element={<Comic />} />
      </Routes>
    </>
  );
}

export default App;

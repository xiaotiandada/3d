import { Route, Routes } from 'react-router-dom';

import Comics from './components/Comics';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Comics />} />
        <Route path="/comic" element={<Comics />} />
      </Routes>
    </>
  );
}

export default App;

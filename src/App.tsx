import { Route, Routes } from 'react-router-dom';

import Comic from './pages/comic';
import Home from './pages/home';
import Webgl_animation_keyframes from './pages/webgl_animation_keyframes';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comic" element={<Comic />} />
        <Route
          path="/webgl_animation_keyframes"
          element={<Webgl_animation_keyframes />}
        />
      </Routes>
    </>
  );
}

export default App;

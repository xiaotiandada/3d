import { Route, Routes } from 'react-router-dom'

import Comic from './pages/comic'
import Home from './pages/home'
import Scrollcontrols from './pages/scrollcontrols'
import Webgl_animation_keyframes from './pages/webgl_animation_keyframes'
import Webgl_loader_fbx from './pages/webgl_loader_fbx'
import Webgl_loader_obj from './pages/webgl_loader_obj'

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
        <Route path="/webgl_loader_fbx" element={<Webgl_loader_fbx />} />
        <Route path="/webgl_loader_obj" element={<Webgl_loader_obj />} />
        <Route path="/scrollcontrols" element={<Scrollcontrols />} />
      </Routes>
    </>
  )
}

export default App

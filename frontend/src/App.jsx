import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Mainlayout from './layout/Mainlayout';
import Homepage from './pages/Homepage';

function App() {
  const routes = createRoutesFromElements(
    <Route path='/' element={<Mainlayout/>}>
      <Route index element={<Homepage/>}/>
    </Route>
  )
  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App

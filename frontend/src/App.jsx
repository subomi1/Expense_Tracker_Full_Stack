import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Mainlayout from './layout/Mainlayout';
import Homepage from './pages/Homepage';
import ExpensesPage from './pages/ExpensesPage';
import CategoriesPage from './pages/CategoriesPage';

function App() {
  const routes = createRoutesFromElements(
    <Route path='/' element={<Mainlayout/>}>
      <Route path='/dashboard' element={<Homepage/>}/>
      <Route path='/expenses' element={<ExpensesPage/>}/>
      <Route path='/categories' element={<CategoriesPage/>}/>
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

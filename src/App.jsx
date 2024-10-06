import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormContainer from './layouts/FormContainer'
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      { index: true, element: <FormContainer/>},
      { path: 'home', element:<HomePage/>},
    ]
  }
])

function App() {
  return (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App

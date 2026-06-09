import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from "./pages/Profile";
import ProtectedRoutes from './components/ProtectedRoutes';
import SearchMentors from './pages/SearchMentors';
function App(){
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
         />

        <Route
           path="/profile"
          element={
            <ProtectedRoutes>
      <Profile />
    </ProtectedRoutes>
  }
/>
<Route
  path="/search"
  element={
    <ProtectedRoutes>
      <SearchMentors />
    </ProtectedRoutes>
  }
/>
        
      </Routes>
    </BrowserRouter>
  )
}
export default App;
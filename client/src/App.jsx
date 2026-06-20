import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from "./pages/Profile";
import ProtectedRoutes from './components/ProtectedRoutes';
import SearchMentors from './pages/SearchMentors';
import Sessions from './pages/Sessions';
import Credits from './pages/Credits';
import Reviews from './pages/Reviews';
import OAuthSuccess from './pages/OAuthSuccess';
import VideoRoom from './pages/VideoRoom';
import Notifications from './pages/Notifications';
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
<Route
  path="/oauth-success"
  element={<OAuthSuccess />}
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
      <Route
  path="/sessions"
  element={
    <ProtectedRoutes>
      <Sessions />
    </ProtectedRoutes>
  }
/>  
<Route
  path="/credits"
  element={
    <ProtectedRoutes>
      <Credits />
    </ProtectedRoutes>
  }
/>
<Route
  path="/reviews/:sessionId"
  element={
    <ProtectedRoutes>
      <Reviews />
    </ProtectedRoutes>
  }
/>

<Route
  path="/notifications"
  element={<Notifications />}
/>

<Route
  path="/video/:roomId"
  element={<VideoRoom />}
/>
      </Routes>
    </BrowserRouter>
    
  )
}
export default App;
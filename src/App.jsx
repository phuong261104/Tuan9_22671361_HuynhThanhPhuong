import { useSelector } from "react-redux"
import Welcome from "./pages/auth/Welcome"
import Login from "./pages/auth/Login"


function App() {
  const { isLoggedIn } = useSelector(state => state.auth)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoggedIn ? <Welcome /> : <Login />}
    </div>
  )
}

export default App

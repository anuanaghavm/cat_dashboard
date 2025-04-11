import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Approutes from './componenets/routes/routesindex'
// import UserRoute from './components/routesindex'
// import { ToastContainer } from 'react-toastify'
// import UserRoute from './componenets/routes/routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Approutes/>
    {/* <ToastContainer/> */}
    </>
  )
}

export default App
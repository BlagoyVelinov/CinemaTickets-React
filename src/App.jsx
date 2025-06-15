import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <Router {...router}>
    </Router>
  )
}

export default App

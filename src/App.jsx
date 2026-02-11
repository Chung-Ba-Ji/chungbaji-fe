import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Header, Footer가 필요한 페이지는 이 안에 위치 */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Route>

        {/* Header, Footer가 필요하지 않은 페이지는 밖에 위치 */}
        {/* <Route path="/error" element={<ErrorPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

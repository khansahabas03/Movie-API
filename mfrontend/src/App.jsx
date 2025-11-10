import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/add-movie" element={<MovieForm />} />
        <Route path="/edit-movie/:id" element={<MovieForm />} />
      </Routes>

    </Router>
  );
}

export default App;

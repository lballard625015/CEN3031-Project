import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </Router>
  </ApolloProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Pages/Home';
import Movie from './Pages/Movie';
import Layout from './Components/Layout'

const App = () => {
  return (
    <Layout>
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/movie/:id' component={Movie} />
      </Router>
    </Layout>
  )
}

export default App;




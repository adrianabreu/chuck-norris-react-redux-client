import * as React from 'react';
import './App.css';
import { Header } from './components/Header';
import Sentence from './containers/Sentence';

class App extends React.Component {
  render() {
    return (
      <div className="cn">
        <Header />
        <div className="cn-sentence">
          <Sentence />
        </div>
      </div>
    );
  }
}

export default App;

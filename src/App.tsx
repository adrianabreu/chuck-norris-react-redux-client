import * as React from 'react';
import './App.scss';
import { Header } from './components/Header';
import Sentence from './containers/Sentence';
import Historical from './containers/Historical';

class App extends React.Component {
  render() {
    return (
      <div className="cn">
        <Header />
        <div className="cn-sentence">
          <Sentence />
        </div>
        <Historical />
      </div>
    );
  }
}

export default App;

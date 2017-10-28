import * as React from 'react';
import './App.scss';
import { Header } from './components/Header';
import SentenceContainer from './containers/SentenceContainer';
import HistoricalContainer from './containers/HistoricalContainer';

export class App extends React.Component {
  render() {
    return (
      <div className="cn">
        <Header />
        <SentenceContainer />
        <HistoricalContainer />
      </div>
    );
  }
}

export default App;

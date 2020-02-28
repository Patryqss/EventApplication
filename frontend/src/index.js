import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'semantic-ui-react';

import Application from './components/Application';

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

const App = () => {
  return (
    <Container>
      <Application />
    </Container>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

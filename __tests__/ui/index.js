import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../lib/css/spectre.css';
import '../../lib/css/styles.css';
import { EzFormExample } from '../../lib';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>ez-form</h1>
        <EzFormExample />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#app'));

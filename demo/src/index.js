import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles.css';

// import '../../lib/css/bootstrap4.css';
import '../../lib/css/spectre.css';
import '../../lib/css/styles.css'; // default Theme
import { BasicExample, DynamicFormExample, EventHandlerExample, FieldTypeExample } from '../../lib';

const Views = {
  BasicExample,
  FieldTypeExample,
  DynamicFormExample,
  EventHandlerExample
};

class Demo extends Component {
  state = { view: 'BasicExample' };

  show = ev => {
    this.setState({ view: ev.target.dataset.name });
  };

  render() {
    const View = Views[this.state.view];
    return (
      <div style={{ width: '70%' }}>
        <h1>ez-react-form</h1>

        <nav>
          {Object.keys(Views).map(v => {
            return (
              <a href="javascript:;" data-name={v} onClick={this.show} style={{ marginRight: 20 }}>
                {v}
              </a>
            );
          })}
        </nav>

        <View />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));

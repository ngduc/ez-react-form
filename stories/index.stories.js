import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import '../lib/css/spectre.css';
import '../lib/css/styles.css'; // default Theme
import { EzFormExample, DynamicFormExample } from '../lib';

storiesOf('ez-react-form', module)
  .add('Basic', () => <EzFormExample />)
  .add('Dynamic Form', () => <DynamicFormExample />);

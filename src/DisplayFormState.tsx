import * as React from 'react';

export default (props: any) => (
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem'
      }}
    >
      <strong>values</strong> = {JSON.stringify(props.values, null, 2)}
    </pre>
  </div>
);


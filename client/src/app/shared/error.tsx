import React from 'react';

import './error.scss';

export const Error = ({ message }: { message?: string }) =>
  <div id='error'>
    <p>Something has gone terribly wrong...</p>
    <p>Your request could not be loaded.</p>

    {message &&
      <p>
        Error: <code>{message}</code>
      </p>
    }
  </div>;


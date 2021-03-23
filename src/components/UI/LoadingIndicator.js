import React from 'react';

import './LoadingIndicator.scss';

const LoadingIndicator = () => (
  <section className="section">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <figure style={{textAlign: 'center'}}>
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </figure>
        </div>
      </div>
    </div>
  </section>
);

export default LoadingIndicator;

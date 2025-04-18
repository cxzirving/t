import React from 'react';

export default function Header() {
  return (
    <header className="container mt-4 mb-4 text-center">
      <div className="site-logo-container">
        <img className="site-logo" alt="Site logo" src="/assets/img/logo.svg" />
      </div>
      <h1 className="site-title">Les grands plats</h1>
    </header>
  );
}

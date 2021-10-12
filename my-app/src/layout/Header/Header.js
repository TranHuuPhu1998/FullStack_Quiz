import React from 'react';

const Header = () => {
  return (
    <nav className='navbar-absolute fixed-top navbar-transparent navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <div className='navbar-wrapper'>
          <a href='#pablo' className='navbar-brand'>
            Login Page
          </a>
        </div>
        <button
          aria-controls='navigation-index'
          aria-expanded='false'
          aria-label='Toggle navigation'
          className='navbar-toggler'
          data-toggle='collapse'
          type='button'
        >
          <span className='navbar-toggler-bar navbar-kebab' />
          <span className='navbar-toggler-bar navbar-kebab' />
          <span className='navbar-toggler-bar navbar-kebab' />
        </button>
        <div className='collapse navbar-collapse'>
          <ul className='ml-auto navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link text-primary' href='/admin/dashboard'>
                <i className='tim-icons icon-minimal-left' /> Back to Dashboard
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/register'>
                <i className='tim-icons icon-laptop' /> Register
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link active' href='/' aria-current='page'>
                <i className='tim-icons icon-single-02' /> Login
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#/auth/pricing'>
                <i className='tim-icons icon-coins' /> Pricing
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#/auth/lock-screen'>
                <i className='tim-icons icon-lock-circle' /> Lock
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

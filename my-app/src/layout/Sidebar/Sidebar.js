import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from '../../components';
import navLink from './nav';

const navsRouteSite = navLink();

function Sidebar(props) {
  return (
    <div className='sidebar'>
      <div className='sidebar-wrapper'>
        <Nav>
          {navsRouteSite?.map((item, key) => {
            return (
              <li
                key={key}
                className='ml-2 d-flex justify-content-start align-items-center'
              >
                <i className='tim-icons icon-spaceship' />
                <NavLink
                  to={item.to}
                  exact={!!item.exact}
                  className='nav-link'
                  activeClassName='active'
                >
                  <p>{item.title_const}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;

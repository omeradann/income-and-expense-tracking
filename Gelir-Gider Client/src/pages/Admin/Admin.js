import React from 'react'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom';

function Admin() {
  return (
    <div>
        <nav>
            <ul className='admin-menu'>
                <li>
                    <Link to="/">Admin panel</Link>
                </li>

            </ul>
        </nav>
    </div>
  )
}

export default Admin
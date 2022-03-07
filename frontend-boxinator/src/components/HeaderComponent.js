import React from 'react'
import { Link, useNavigate } from "react-router-dom";


const HeaderComponent = () => {


    return (
        <div>
            <header>
                <div className="headerContainer">
                    <Link to="/">
                        <h1>
                            Boxinator
                        </h1>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to ="/addbox">Add box</Link>
                            </li>
                            <li>
                                <Link to ="/listbox">Boxlist</Link>
                            </li>
                        </ul>
                    </nav>

                    
                </div>
            </header>
        </div>
    )
}

export default HeaderComponent

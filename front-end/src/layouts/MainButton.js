import React from 'react';
import {Link} from "react-router-dom";


const MainButton = () => <div style={{float: 'left', fontFamily: 'Consolas', fontSize: '12px'}}>
                              <Link to="/"><button style={{marginTop: '10px'}}>Back to main</button></Link>
                         </div>;

export default MainButton;
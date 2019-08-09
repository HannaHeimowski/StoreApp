import React from 'react';
import PropTypes from 'prop-types';

// class Header extends React.Component {
//     render() {
//         return (
//             <header className="top">
//                 <h1>
//                     Catch 
//                     <span className="ofThe">
//                         <span className="of">of</span>
//                         <span className="the">the</span>
//                     </span> 
//                     Day
//                 </h1>
//             <h3 className="tagline">
//                 <span>{this.props.tagline}</span>
//             </h3>
//             </header>
//         );
//     }
// }
// // _________________________________________________________

// // a stateless functional Component
// function Header(props){
//     return(
//         <header className="top">
//         <h1>
//             Catch 
//             <span className="ofThe">
//                 <span className="of">of</span>
//                 <span className="the">the</span>
//             </span> 
//             Day
//         </h1>
//     <h3 className="tagline">
//         <span>{props.tagline}</span>
//     </h3>
//     </header>
//     )
// }
// // _________________________________________________________


// a stateless functional Component Arrowfunction (saves code and performance)
const Header= (props)=> (
        <header className="top">
        <h1>
            Catch 
            <span className="ofThe">
                <span className="of">of</span>
                <span className="the">the</span>
            </span> 
            Day
        </h1>
    <h3 className="tagline">
        <span>{props.tagline}</span>
    </h3>
    </header>
)
// _________________________________________________________


// // distructure into variables
// const Header= ({ tagline, age })=> (
//     <header className="top">
//     <h1>
//         Catch 
//         <span className="ofThe">
//             <span className="of">of</span>
//             <span className="the">the</span>
//         </span> 
//         Day
//     </h1>
// <h3 className="tagline">
//     <span>{tagline}</span>
// </h3>
// </header>
// )
// // _________________________________________________________


Header.propTypes = {
    tagline: PropTypes.string.isRequired
}

export default Header;


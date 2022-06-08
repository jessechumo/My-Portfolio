import React from "react";
import { Wave } from "react-animated-text";


export const Wave1 = () => (
  <Wave text="Download CV" effect="fadeOut" />
);

// export class Wave2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { paused: true };
//     this.togglePause = this.togglePause.bind(this);
//     this.reset = this.reset.bind(this);
//   }

//   togglePause() {
//     this.setState(prevState => ({ paused: !prevState.paused }));
//   }

//   reset() {
//     this.setState("paused", true);
//   }

//   render() {
//     return (
//       <div >
//         <a onClick={this.togglePause} style={{ cursor: "pointer" }}>
//           <Wave
//             text="Click Me"
//             effect="verticalFadeOut"
//             effectChange={2.5}
//             effectDirection="down"
//             iterations={1}
//             paused={this.state.paused}
//           />

//         </a>
//         <br />
//         <button  onClick={this.togglePause}>
//           Reset
//         </button>

//         <div >
//           <pre >
//             &lt;Wave
//             <br />
//             &nbsp;&nbsp;text="Click Me"
//             <br />
//             &nbsp;&nbsp;effect="verticalFadeOut"
//             <br />
//             &nbsp;&nbsp;effectChange=&#123;2.5
//             <br />
//             &nbsp;&nbsp;effectDirection='down'
//             <br />
//             &nbsp;&nbsp;iterations=&#123;1
//             <br />
//             &nbsp;&nbsp;paused=&#123;this.state.paused
//             <br />
            
//           </pre>
//         </div>
//       </div>
//     );
//   }
// }
  
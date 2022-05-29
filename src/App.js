import './App.css';


function App() {
  return (
    <div className="App">
     <header className ="App-header"></header>
     
      <section id ="IntroPage"> 
        <div  className="float-container" >
        <div className="float-child" id = 'leftHalf'></div>
        <div className="float-child" id = 'RightHalf'>

          <h1  id = 'intro' > Hello there, Welcome to my Portfolio ! </h1>

          <p id = "paragraph">
            I'm a software developer whose primary goal is to apply technical expertise all throughout the full software life cycle to ensure  the  production and delivery  of world products and services that meet client specifications. Along with a competent software developing team, and with strong personal knowledge,  skills,  and experience  in  software engineering, I am positive that this goal can be achieved. My experience as a junior software developer enhanced my abilities in designing,implementing, testing, and upgrading software. One of my objectives is to keep
            updated with the latest tech trends. I am confident that if given the opportunity, I can be a useful talent to the company.
          </p>
          <p id = "Regards">Regards, <br/>Jesse Bett</p>
        </div>
        </div>
        </section>

        <hr/>

        <section id="Projects">
           <h1 className="pageTitle"> My Projects</h1>
           <div className='project-div-container'>

             <div className='project-div' id ="Treep">
             <div className='screenshot' ></div>
             <div className='project-details'>
               <h2> Treep </h2>
               <p> A social media web app.</p>
               <button>Home</button>
               <button>Code</button>
             </div>
             </div>

             <div className='project-div' id="Todo-App">
             <div className='screenshot'></div>
             <div className='project-details'>
             <h2> To-Do App </h2>
             <p>Basic javaScript to-do app.</p>
             <button>Home</button>
             <button>Code</button>
             </div>
             </div>

             <div className='project-div' id ="Mountaineer">
             <div className='screenshot'></div>
             <div className='project-details'>
             <h2> Mountaineer </h2>
             <p> An e-commerce web app on hiking and the hiking community.</p>
             <button>Home</button>
             <button>Code</button>
             </div>
             </div>
           
           </div>
        </section>

        <hr/>
  
    </div> 
    
  );
}

export default App;
  
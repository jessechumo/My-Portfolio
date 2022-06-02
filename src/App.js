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
                <button> <a href='http://treep-inc.herokuapp.com/' alt='website link' target="_blank" rel="noreferrer" >Home</a></button>
               <button><a href='https://github.com/Jesse-Bett/Treep' alt='website link' target="_blank" rel="noreferrer" >Code</a></button>
             </div>
             </div>

             <div className='project-div' id="Todo-App">
             <div className='screenshot'></div>
             <div className='project-details'>
             <h2> To-Do App </h2>
             <p>Basic javaScript to-do app.<br/> username : todoapp <br/> password : javascript</p>
             <button><a href='https://remote-to-do-app.herokuapp.com/' alt='website link' target="_blank" rel="noreferrer" >Home</a></button>
             <button><a href='https://github.com/Jesse-Bett/Simple-todo-app' alt='website link' target="_blank" rel="noreferrer" >Code</a></button>
             </div>
             </div>

             <div className='project-div' id ="Mountaineer">
             <div className='screenshot'></div>
             <div className='project-details'>
             <h2> Mountaineer </h2>
             <p> An e-commerce web app on hiking and the hiking community. This project is in it's design phase.</p>
             <button><a href='https://www.figma.com/' alt='website link' target="_blank" rel="noreferrer" >Design</a></button>
             <button><a href='https://github.com/Jesse-Bett/Mountaineer' alt='website link' target="_blank" rel="noreferrer" >Code</a></button>
             </div>
             </div>
           
           </div>
        </section>

        <hr/>

        <section id="Education-Skills">
          <div className='float-page3-container'>
          <div id = 'Education'>
            <h2>Education</h2>
            <h3>BSc Information Technology </h3>
            <h4>Kabarak University</h4> <p>  May 2018 - Dec 2021</p>
          </div>
          
        <div id = 'Skills'>
          <h2>Skills</h2>
          <h3>javaScript</h3>
          <h3>HTML5 & CSS3</h3>
          <h3>Reactjs</h3>
          <h3>Nodejs</h3>
          <h3>Expressjs</h3>
          <h3>Ejs</h3>
          <h3>SQL</h3>
          <h3>Mongo DB</h3>
          <h3>Heroku</h3>
          <h3>Git & GitHub</h3>
          </div>
          </div>
        </section>

        <hr/>

        <section id="Experience">
          <h1 className="pageTitle">Experience</h1>
          <div id = "Experience-Text">
          <div className='company'>
          <h2>Company</h2>
          <h3 className='experience-paragraph'>NHIF</h3>
          <p className='experience-paragraph'>September - October 2021</p>
          </div>
          <div className='duties'>
          <h2>Duties</h2>
          <p className='experience-paragraph'>
          - Network connectivity of client computers both to the LocalAreaNetwork and the Internet.  <br/>
          - Configuration of new PCs and Servers on an acquisition. <br/>
          - Performing updates on current system requirements for the institution. <br/>
          - Setting up of ad-hoc networks during conferences and Multimedia set up and support. <br/>
          - Hardware repairs, maintenance and peripheral devices installation. <br/>
          - Data recovery, User assistance, User Support. <br/>
          </p>
          </div>
          </div>
        </section>
        
        <div id = "footer" >
          <hr id = "footer-hr1"/>
          <div id = "contacts">
          <h2>Contact Me</h2>
          <p>
          <a href='mailto:jessekip21@gmail.com' alt='website link' target="_blank" rel="noreferrer">jessekip21@gmail.com </a> <br/>
          <a rel="noreferrer" >+254798790147 </a>  <br/>
          <a href='https://www.google.com/maps/place/Nairobi/@-1.3031934,36.5672003,10z/data=!3m1!4b1!4m5!3m4!1s0x182f1172d84d49a7:0xf7cf0254b297924c!8m2!3d-1.2920659!4d36.8219462' alt='website link' target="_blank" rel="noreferrer" > Nairobi, Kenya </a> <br/>
          </p>
          </div>
          <div id = "links">
          <h2>Links</h2>
            <p>
            <a href='https://www.linkedin.com/in/jesse-bett-74b3411a7/' alt='website link' target="_blank" rel="noreferrer" >LinkedIn</a> <br/>
            <a href='https://github.com/Jesse-Bett' alt='website link' target="_blank" rel="noreferrer" > GitHub</a> <br/>
            <a href='https://twitter.com/@BettJesse' alt='website link' target="_blank" rel="noreferrer" > Twitter</a> <br/>
            </p>
          </div>

          <div id = "cv">
          <a href ="https://drive.google.com/file/d/1KJu_fsjqY3AkbJuglQhzExPJMOpGc0Pk/view?usp=sharing" target="_blank" download>
          <h2>Download CV</h2>
          </a>
          </div>
          <hr id ="footer-hr"/>
          <p id="bottom-text"> JesseBett © 2022</p>
        </div>

    </div> 
    
  );
}

export default App;
  
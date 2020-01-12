import React from 'react'
import ProjectSummary from './ProjectSummary'
// import { Jumbotron, Button } from 
 
const ProjectList = ({projects}) => {
     return (

        //  <div className="project-list section">

        //     {projects && projects.map(project => {
        //         return (
        //             <ProjectSummary project={project} key={project.id} />
        //         )
        //     })} 

        //     {/* <ProjectSummary />
        //     <ProjectSummary />
        //     <ProjectSummary />
        //     <ProjectSummary /> */}
     
        //  </div>
            <div style={{backgroundColor: "#7fb4c7"}}>
                <div class="jumbotron jumbotron-fluid" >
                    <div class="container" >
                        <h1 class="display-4">Optical Character Recognition</h1>
                        <p class="lead"> This website enabling you to scan text documents and recognise the printed text charactors</p>
                    </div>
                </div>
            </div>
        
        
     )
 }

 export default ProjectList
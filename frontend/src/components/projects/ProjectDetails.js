import React from 'react'

const ProjectDetails = (props) => {
    const id = props.match.params.id;
    return (
        <div className="container section project-details">
            <div className="container">
                <div className="card-content">
                    <span className="card-title">
                        Project Title - {id}
                    </span>
                    <p>Lorem ipsum fasdfaf</p>
                </div>
                <div className="card-action gret lighten-4 grey-text">
                    <div>Posted by the The Net Ninja</div>
                    <div>2nd September</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails

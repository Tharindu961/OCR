import React, {Component} from 'react'
import {connect} from 'react-redux'
import Content from '../content/Content';
import '../../index.css'
//import {connect} from 'enzyme, react-mock-store'


class Dashboard extends Component {
    render() {
        //console.log(this.props);
        const {projects} = this.props;

        return (
            <div className="dashboard-container">
                <div className="row">
                    <div className="col s12 m6">
                        <Content />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.project.projects
    }
}

export default connect(mapStateToProps)(Dashboard)
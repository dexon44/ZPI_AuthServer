import React from "react";
import { connect } from "react-redux";
import { aGetServices, aDeleteService, aGetService } from "../actions"
import history from "../history"

class ServicesList extends React.Component {

    onDelete = (service) => {
        const a = {auth: { username: this.props.username, password: this.props.password }};
        this.props.aDeleteService(a, service)
      };

      onEdit = (service) => {
        const a = {auth: { username: this.props.username, password: this.props.password }};
        this.props.aGetService(a, service.service_name)
      };

    componentDidMount() {
        const a = {auth: { username: this.props.username, password: this.props.password }};
        if (a) {
        this.props.aGetServices(a);
        }
    }

    renderList() {
    while (!this.props.services) {
        return <div>LOADING</div>
    }
        const u = Object.values(this.props.services);
        return u.map(service => {
            return(
                <div className="item" key={service.id}>
                    <div className="right floated content">
                        <button className="ui button primary" onClick={()=>{this.onEdit(service)}}>Edit</button>
                        <button className="ui button negative" onClick={()=>{this.onDelete(service)}}>Delete</button>
                    </div>
                    <div className="left floated content">
                    <i className="large middle aligned icon user"/>
                    <i className="content">{service.id}</i>
                    <i className="content">{service.service_name}</i>
                    <i className="content">{service.creator_id}</i>
                    <i className="content">{service.connection_ip}</i>
                    <i className="content">{service.created_date}</i>
                    </div>
                </div>
            )
        })
        
    }

    componentDidUpdate() {
        console.log("services update")
        return(
            <div>
                <div>
                <h2>Services</h2>
                <button className="right floated content ui button primary " onClick={()=>{history.push("/dashboard/admin/services/create")}}>Create Service</button>
                </div>
                <div>
                    <i className="content">ID</i>
                    <i className="content">Service</i>
                    <i className="content">Creator</i>
                    <i className="content">IP</i>
                    <i className="content">Create Date</i>
                </div>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
          );
    }

    render() {
        return(
            <div>
                <div>
                <h2>Services</h2>
                <button className="right floated content ui button primary " onClick={()=>{history.push("/dashboard/admin/services/create")}}>Create Service</button>
                </div>
                <div>
                    <i className="content">ID</i>
                    <i className="content">Service</i>
                    <i className="content">Creator</i>
                    <i className="content">IP</i>
                    <i className="content">Create Date</i>
                </div>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
          );
    }
}

const mapStateToProps = state => {
    return {
        services: state.service.services,
        username: state.sign.username,
        password: state.sign.password
      };
}

export default connect(mapStateToProps, {aGetServices, aDeleteService, aGetService})(ServicesList);

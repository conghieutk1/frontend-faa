import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../containers/Header/Header';
import DashBoard from '../containers/System/DashBoard';
import Views from '../containers/System/Views';
import ManageEvents from '../containers/System/ManageEvents';
import ManageUsers from '../containers/System/ManageUsers';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/dashboard" component={DashBoard} />
                            <Route path="/system/views" component={Views} />
                            <Route path="/system/manage-users" component={ManageUsers} />
                            <Route path="/system/manage-events" component={ManageEvents} />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);

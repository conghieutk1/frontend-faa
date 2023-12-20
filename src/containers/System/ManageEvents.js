import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageEvents.scss';
import AssignLabel from './Modal/AssignLabel';
class ManageEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalAssignLabel: false,
        };
    }

    async componentDidMount() {}

    openModalAssignLabel = async () => {
        this.setState({
            isOpenModalAssignLabel: true,
        });
    };

    toggleModalAssignLabel = () => {
        this.setState({
            isOpenModalAssignLabel: !this.state.isOpenModalAssignLabel,
        });
    };
    assignLabel = () => {
        try {
            console.log('this is function assignLabel');
        } catch (e) {
            console.log(e);
        }
    };
    render() {
        // console.log("check state user ", this.state);
        // console.log("id ", this.state.arrUsers);

        return (
            <>
                <AssignLabel
                    isOpen={this.state.isOpenModalAssignLabel}
                    toggleFromParent={this.toggleModalAssignLabel}
                    handleAssignLabelFromParent={this.assignLabel}
                />
                <div className="title">Manage Events</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3 connectVMS" onClick={() => this.openModalAssignLabel()}>
                        <i className="fas fa-plus px-2"></i>
                        Assign label for objects
                    </button>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvents);

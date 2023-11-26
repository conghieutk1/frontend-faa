import React, { Component } from "react";
import "./MoreInforPatientModal.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./MoreInforPatientModal.scss";
import moment from "moment/moment";

class MoreInforPatientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };
    render() {
        let {
            isOpen,
            closeBooking,
            language,
            dataModal,
            closeMoreInfoPatientModal,
        } = this.props;
        let dobPatient = moment
            .unix(+dataModal.dob / 1000)
            .format("DD/MM/YYYY");
        return (
            <Modal
                isOpen={isOpen}
                className={"booking-modal"}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.modal-moreinfo-patient.title" />
                        </span>
                        <span
                            className="right"
                            onClick={closeMoreInfoPatientModal}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-moreinfo-patient.name" />
                                </label>
                                <input
                                    className="form-control"
                                    value={
                                        dataModal?.patientData?.firstName || ""
                                    }
                                    disabled="disabled"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-moreinfo-patient.gender" />
                                </label>
                                <input
                                    className="form-control"
                                    value={
                                        language === LANGUAGES.VI
                                            ? dataModal?.patientData?.genderData
                                                  ?.valueVi || "" // Kiểm tra genderData và valueVi
                                            : dataModal?.patientData?.genderData
                                                  ?.valueEn || "" // Kiểm tra genderData và valueEn
                                    }
                                    disabled="disabled"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-moreinfo-patient.dob" />
                                </label>
                                <input
                                    className="form-control"
                                    value={dobPatient}
                                    disabled="disabled"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-moreinfo-patient.phonenumber" />
                                </label>
                                <input
                                    className="form-control"
                                    value={
                                        dataModal?.patientData?.phonenumber ||
                                        ""
                                    }
                                    disabled="disabled"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-moreinfo-patient.address" />
                                </label>
                                <input
                                    className="form-control"
                                    value={
                                        dataModal?.patientData?.address || ""
                                    }
                                    disabled="disabled"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-moreinfo-patient.email" />
                                </label>
                                <input
                                    className="form-control"
                                    value={dataModal?.patientData?.email || ""}
                                    disabled="disabled"
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-moreinfo-patient.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    value={dataModal?.reason}
                                    disabled="disabled"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-cancel"
                            onClick={closeMoreInfoPatientModal}
                        >
                            <FormattedMessage id="patient.modal-moreinfo-patient.btn-cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoreInforPatientModal);

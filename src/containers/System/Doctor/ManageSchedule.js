import React, { Component } from "react";
import { connect } from "react-redux";
//import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currenDate: "",
            rangeTime: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map((item) => ({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data,
            });
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: dataSelect,
        //     });
        // }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption,
        });
        // let res = await getDetailInforDoctor(selectedOption.value);
        // if (res && res.errCode === 0 && res.data && res.data.Markdown) {
        //     let markdown = res.data.Markdown;
        //     this.setState({
        //         contentMarkdown: markdown.contentMarkdown,
        //         contentHTML: markdown.contentHTML,
        //         description: markdown.description,
        //         hasOldData: true,
        //     });
        // } else {
        //     this.setState({
        //         contentMarkdown: "",
        //         contentHTML: "",
        //         description: "",
        //         hasOldData: false,
        //     });
        // }
        // console.log("check ", res);
    };

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currenDate: date[0],
        });
    };

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            });
            this.setState({
                rangeTime: rangeTime,
            });
        }
    };
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currenDate } = this.state;
        let result = [];
        //console.log("check rangeTime: ", this.state);

        if (!currenDate) {
            toast.error("Invalid date!");
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor!");
            return;
        }
        //format theo chuan
        // let formattedDate = moment(currenDate).format(
        //     dateFormat.SEND_TO_SERVER
        // );
        //format theo unix
        let formattedDate = new Date(currenDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(
                (item) => item.isSelected === true
            );
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                });
            } else {
                toast.error("Invalid selected time!");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            currenDate: formattedDate,
        });
        // console.log("check res saveBulkScheduleDoctor: ", res);
        // console.log("check result: ", result);

        if (res && res.errCode === 0) {
            toast.success("Save infor succed!");
        } else {
            toast.error("Error saveBulkScheduleDoctor!");
            console.log("Error saveBulkScheduleDoctor res: ", res);
        }
    };
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        //console.log("check rangeTime: ", rangeTime);
        return (
            <div className="manage-schedule-ccontainer">
                <div className="title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label className="text">
                                {" "}
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label className="text">
                                {" "}
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currenDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={
                                                item.isSelected === true
                                                    ? "btn btn-schedule active"
                                                    : "btn btn-schedule"
                                            }
                                            key={index}
                                            onClick={() =>
                                                this.handleClickBtnTime(item)
                                            }
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                        <div className="col-12">
                            <button
                                className="save-schedule-doctor"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="interface.btn-save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

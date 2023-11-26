import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";

class MedicalFacility extends Component {
    render() {
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-medical-facility" />
                        </span>
                        <button className="button-section">
                            {" "}
                            <FormattedMessage id="homepage.moreinfo" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                        <div className="section-customize">
                                <div className="bg-img4"></div>
                                <div className="text-img">
                                    Trung tâm xét nghiệm Diag Laboratories
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img1"></div>
                                <div className="text-img">
                                    Bệnh viện Hữu nghị Việt Đức
                                </div>
                            </div>
                            
                            <div className="section-customize">
                                <div className="bg-img3"></div>
                                <div className="text-img">
                                    Bệnh viện Trung ương Quân đội 108
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img8"></div>
                                <div className="text-img">
                                Bệnh viện Mắt quốc tế DND
                                    
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img5"></div>
                                <div className="text-img">
                                    Phòng khám Quốc tế EXSON
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img6"></div>
                                <div className="text-img">
                                    Bệnh viện Y học cổ truyền Trung ương
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img7"></div>
                                <div className="text-img">
                                    Phòng khám Đa khoa Meditec
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img2"></div>
                                <div className="text-img">
                                Bệnh viện Chợ Rẫy
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);

import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
// import specialtyImg1 from "../../../assets/specialty/co-xuong-khop.jpg";
// import specialtyImg2 from "../../../assets/specialty/chuyen-khoa-mat.jpg";
// import specialtyImg3 from "../../../assets/specialty/y-hoc-co-truyen.jpg";
// import specialtyImg4 from "../../../assets/specialty/kham-tong-quat.jpg";
// import specialtyImg5 from "../../../assets/specialty/tai-mui-hong.jpg";
// import specialtyImg6 from "../../../assets/specialty/than-kinh.jpg";
// import specialtyImg7 from "../../../assets/specialty/tim-mach.jpg";
// import specialtyImg8 from "../../../assets/specialty/noi-khoa.jpg";
// import specialtyImg9 from "../../../assets/specialty/da-lieu.jpg";
class Specialty extends Component {
    render() {
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.popular-specialties" />
                        </span>
                        <button className="button-section">
                            {" "}
                            <FormattedMessage id="homepage.moreinfo" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-img1"></div>
                                <div className="text-img">Cơ xương khớp</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img2"></div>
                                <div className="text-img">Chuyên khoa Mắt</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img3"></div>
                                <div className="text-img">Y học cổ truyền</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img4"></div>
                                <div className="text-img">Khám tổng quát</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img5"></div>
                                <div className="text-img">Tai - Mũi - Họng</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img6"></div>
                                <div className="text-img">Thần kinh</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img7"></div>
                                <div className="text-img">Tim mạch</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img8"></div>
                                <div className="text-img">Nội khoa</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img9"></div>
                                <div className="text-img">Da liễu</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

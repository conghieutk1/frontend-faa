import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Liveviews.scss';
import { disconnectVMS } from '../../helper/vms';
import StreamVideo from '../../components/StreamVideo'
// import { createRoot } from 'react-dom/client';


class Liveviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //     isOpenModalConnectVMSServer: false,
            //     arrCameras: [],
            //     arrAddedCameras: [],
            //     dataServer: [],
            isConnect: false,
        };
    }


    componentDidMount() { }

    componentWillUnmount() {
        if (this.state.isConnect) {
            disconnectVMS();
        }
    }

    render() {
        console.log("Render live view")
        const camera = {
            cameraInfo: {
                Id: "07b4683f-284d-49fd-988a-56fec856e29c",
                Name: "Axis 1",
            },
            id: 1,
        }
        return (
            <div className="liveviewsContainer">
                <StreamVideo
                    // connected
                    cameraId={camera.cameraInfo?.Id}
                    cameraName={camera.cameraInfo?.Name}
                    id={camera.id}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Liveviews);

import React, { Component, useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Group, Line, Rect } from 'react-konva';
import './AssignLabel.scss';
import { emitter } from '../../../utils/emitter';

class AssignLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server: '',
            username: '',
            password: '',
            points: [],
            curMousePos: [0, 0],
            isMouseOverStartPoint: false,
            isFinished: false,
        };
        this.listenToEmitter();
    }

    componentDidMount() {
        console.log(window.innerHeight);
    }
    componentDidUpdate(prevProps, prevState) {
        // Kiểm tra xem state có thay đổi hay không
        if (this.state.points !== prevState.points) {
            console.log('Updated points:', this.state);
        }
        if (this.state.isFinished !== prevState.isFinished) console.log('Updated isFinished:', this.state);
    }
    componentWillUnmount() {
        this.setState({});
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA_ASSIGN_LABEL', () => {
            this.setState({
                points: [],
                isFinished: false,
                curMousePos: [],
            });
        });
    }
    clearModalData = () => {
        this.setState({
            points: [],
            isFinished: false,
            curMousePos: [],
        });
    };
    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['server', 'username', 'password'];
        // console.log('check data arrInput: ', this.state);
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    sendToManageEventComponent = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            this.props.handleAssignLabelFromParent(this.state);
            // console.log("check good state:", this.state);
        }
    };

    // Assign label for objects
    getMousePos = (stage) => {
        return [stage.getPointerPosition().x, stage.getPointerPosition().y];
    };
    handleClick = (event) => {
        const {
            state: { points, isMouseOverStartPoint, isFinished },
            getMousePos,
        } = this;
        const stage = event.target.getStage();
        const mousePos = getMousePos(stage);

        if (isFinished) {
            return;
        }
        if (isMouseOverStartPoint && points.length >= 3) {
            this.setState({
                isFinished: true,
            });
        } else {
            this.setState({
                points: [...points, mousePos],
            });
        }
    };
    handleMouseMove = (event) => {
        const { getMousePos } = this;
        const stage = event.target.getStage();
        const mousePos = getMousePos(stage);

        this.setState({
            curMousePos: mousePos,
        });
    };
    handleMouseOverStartPoint = (event) => {
        if (this.state.isFinished || this.state.points.length < 3) return;
        event.target.scale({ x: 2, y: 2 });
        this.setState({
            isMouseOverStartPoint: true,
        });
    };
    handleMouseOutStartPoint = (event) => {
        event.target.scale({ x: 1, y: 1 });
        this.setState({
            isMouseOverStartPoint: false,
        });
    };
    handleDragStartPoint = (event) => {
        console.log('start', event);
    };
    handleDragMovePoint = (event) => {
        const points = this.state.points;
        const index = event.target.index - 1;
        console.log(event.target);
        const pos = [event.target.attrs.x, event.target.attrs.y];
        console.log('move', event);
        console.log(pos);
        this.setState({
            points: [...points.slice(0, index), pos, ...points.slice(index + 1)],
        });
    };
    handleDragOutPoint = (event) => {
        console.log('end', event);
    };

    render() {
        const {
            state: { points, isFinished, curMousePos },
            handleClick,
            handleMouseMove,
            handleMouseOverStartPoint,
            handleMouseOutStartPoint,
            handleDragStartPoint,
            handleDragMovePoint,
            handleDragEndPoint,
        } = this;
        // [ [a, b], [c, d], ... ] to [ a, b, c, d, ...]
        const flattenedPoints = points.concat(isFinished ? [] : curMousePos).reduce((a, b) => a.concat(b), []);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Assign label for objects
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container-server">
                            <label>Server</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, 'server');
                                }}
                                value={this.state.server}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Username</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, 'username');
                                }}
                                value={this.state.username}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, 'password');
                                }}
                                value={this.state.vmsPassword}
                            />
                        </div>
                    </div>
                    <div className="assign-label">
                        <Stage
                            width={window.innerWidth}
                            height={window.innerHeight}
                            onMouseDown={handleClick}
                            onMouseMove={handleMouseMove}
                        >
                            <Layer>
                                <Line points={flattenedPoints} stroke="black" strokeWidth={1} closed={isFinished} />
                                {points.map((point, index) => {
                                    const width = 6;
                                    const x = point[0] - width / 2;
                                    const y = point[1] - width / 2;
                                    const startPointAttr =
                                        index === 0
                                            ? {
                                                  hitStrokeWidth: 3,
                                                  onMouseOver: handleMouseOverStartPoint,
                                                  onMouseOut: handleMouseOutStartPoint,
                                              }
                                            : null;
                                    return (
                                        <Rect
                                            key={index}
                                            x={x}
                                            y={y}
                                            width={width}
                                            height={width}
                                            fill="white"
                                            stroke="black"
                                            strokeWidth={3}
                                            onDragStart={handleDragStartPoint}
                                            onDragMove={handleDragMovePoint}
                                            onDragEnd={handleDragEndPoint}
                                            draggable
                                            {...startPointAttr}
                                        />
                                    );
                                })}
                            </Layer>
                        </Stage>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.sendToManageEventComponent();
                        }}
                        className="px-3"
                    >
                        Save
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.clearModalData();
                        }}
                        className="px-3"
                    >
                        Clear
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

// render(<App />, document.getElementById('root'));
export default AssignLabel;

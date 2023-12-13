import axios from '../axios';

const createListCameraFromServer = (data) => {
    return axios.post('/api/create-list-camera-from-server', data);
};

export { createListCameraFromServer };

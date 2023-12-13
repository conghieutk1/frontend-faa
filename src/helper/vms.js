let lastObserver;
window.vmsConnected = false;

export const loginXPMobileSDK = (username, password) => {
    window.XPMobileSDK.login(username, password, {
        SupportsAudioIn: 'Yes',
        SupportsAudioOut: 'Yes',
    });
};

export const getAllViews = (successCallback, errorCallback) => {
    window.XPMobileSDK.getAllViews(successCallback, errorCallback);
};

export const getViews = (cameraId, successCallback, errorCallback) => {
    window.XPMobileSDK.getViews(cameraId, successCallback, errorCallback);
};

export const promiseGetViews = (cameraId) => {
    return new Promise((resolve, reject) => {
        getViews(
            cameraId,
            () => {
                resolve(null);
            },
            () => {
                reject(null);
            }
        );
    });
};

export const connectVMS = (url, successCallback, errorCallback) => {
    if (!window.LoadMobileSdk) {
        errorCallback();
        return;
    }

    window.LoadMobileSdk(function () {
        if (!/^http/.test(url)) {
            url = 'http://' + url;
        }

        window.XPMobileSDKSettings.MobileServerURL = url;

        if (lastObserver) {
            window.XPMobileSDK.removeObserver(lastObserver);
        }

        lastObserver = {
            connectionDidConnect: () => {
                window.vmsConnected = true;
                successCallback();
            },
            connectionFailedToConnect: errorCallback,
        };

        window.XPMobileSDK.addObserver(lastObserver);
        window.XPMobileSDKSettings.MobileServerURL = url;

        window.XPMobileSDK.connect(url);
    });
};

export const loginVMSServer = (
    url,
    username,
    password,
    successCallback,
    errorCallback
) => {
    connectVMS(
        url,
        () => {
            if (lastObserver) {
                window.XPMobileSDK.removeObserver(lastObserver);
            }
            // Not optimal, but released last observer after multiple login
            lastObserver = {
                connectionDidLogIn: successCallback,
                connectionFailedToLogIn: errorCallback,
            };
            window.XPMobileSDK.addObserver(lastObserver);
            loginXPMobileSDK(username, password);
        },
        errorCallback
    );
};

export const disconnectVMS = () => {
    window.XPMobileSDK.disconnect();
    window.vmsConnected = false;
};

export const removeObserver = () => {
    window.XPMobileSDK.removeObserver(lastObserver);
};

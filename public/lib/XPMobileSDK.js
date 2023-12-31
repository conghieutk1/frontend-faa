var XPMobileSDKSettings = {
        fileName: 'XPMobileSDK.js',
        clientType: 'WebClient',
        communicationChanel: '/XProtectMobile/Communication',
        videoChanel: '/XProtectMobile/Video',
        audioChannel: '/XProtectMobile/Audio',
        MobileServerURL: '',
        defaultEncryptionPadding: 'Iso10126',
        primeLength: 1024,
        videoConnectionTimeout: 2e4,
        resamplingFactor: 1e-6,
        liveMessageMinimumInterval: 1e3,
        socketRestartMinimumInterval: 1e3,
        videoStreamRestartMinimumInterval: 2e4,
        supportsMultiThreaded: !1,
        supportsCarousels: !1,
        supportsFootages: !1,
        supportsCHAP: !0,
        DirectStreaming: !0,
        SupportsAudioIn: !0,
        SupportsAudioOut: !0,
        AudioCompressionLevel: 99,
        AudioCompressionLevelAudioAPI: 41,
        NoVideoTimeout: 5e3,
        EnableConsoleLog: !0,
        includes: ['XPMobileSDK.library.js'],
    },
    XPMobileSDK = new (function () {
        (this.onLoad = function () {}),
            (this.library = {}),
            (this.interfaces = {}),
            (this.features = {}),
            (this.initialize = function (e) {
                XPMobileSDK.library.Connection.initialize(e);
            }),
            (this.isLoaded = function () {
                return o;
            }),
            (this.addObserver = function (e) {
                XPMobileSDK.library.Connection.addObserver(e);
            }),
            (this.removeObserver = function (e) {
                XPMobileSDK.library.Connection.removeObserver(e);
            }),
            (this.cancelRequest = function (e) {
                XPMobileSDK.library.Connection.cancelRequest(e);
            }),
            (this.connect = function (e) {
                e && (XPMobileSDK.library.Connection.server = e);
                return new r(null);
            }),
            (this.Connect = r),
            (this.connectWithId = function (e, n) {
                XPMobileSDK.library.Connection.connectWithId(e, n);
            }),
            (this.login = function (e, n, t) {
                return ((t = t || {}).Username = e), (t.Password = n), new c(t);
            }),
            (this.Login = c),
            (this.requestCode = function (e, n) {
                return XPMobileSDK.library.Connection.requestCode(e, n);
            }),
            (this.verifyCode = function (e) {
                return XPMobileSDK.library.Connection.verifyCode(e);
            }),
            (this.disconnect = function () {
                XPMobileSDK.library.Connection.Disconnect();
            }),
            (this.Disconnect = function (e, n, t) {
                XPMobileSDK.library.Connection.Disconnect(e, n, t);
            }),
            (this.LiveMessage = function (e, n, t) {
                XPMobileSDK.library.Connection.LiveMessage(e, n, t);
            }),
            (this.getAllViews = function (e, n) {
                return (
                    XPMobileSDK.library.Connection.getAllViews(e, n) ||
                    XPMobileSDK.interfaces.ConnectionRequest
                );
            }),
            (this.getViews = function (e, n, t) {
                return (
                    XPMobileSDK.library.Connection.getViews(e, n, t) ||
                    XPMobileSDK.interfaces.ConnectionRequest
                );
            }),
            (this.requestStream = function (e, n, t, i, o) {
                return (
                    XPMobileSDK.library.Connection.requestStream(
                        e,
                        n,
                        t,
                        i,
                        o
                    ) || XPMobileSDK.interfaces.ConnectionRequest
                );
            }),
            (this.RequestStream = function (e, n, t) {
                XPMobileSDK.library.Connection.RequestStream(e, n, t);
            }),
            (this.RequestAudioStream = function (e, n, t) {
                XPMobileSDK.library.Connection.RequestAudioStream(e, n, t);
            }),
            (this.requestAudioStream = function (e, n, t, i) {
                return (
                    XPMobileSDK.library.Connection.requestAudioStream(
                        e,
                        n,
                        t,
                        i
                    ) || XPMobileSDK.interfaces.ConnectionRequest
                );
            }),
            (this.requestPushStream = function (e, n) {
                return XPMobileSDK.library.Connection.requestPushStream(e, n);
            }),
            (this.RequestAudioStreamIn = function (e, n, t) {
                return XPMobileSDK.library.Connection.RequestAudioStreamIn(
                    e,
                    n,
                    t
                );
            }),
            (this.requestAudioStreamIn = function (e, n, t, i) {
                return XPMobileSDK.library.Connection.requestAudioStreamIn(
                    e,
                    n,
                    t,
                    i
                );
            }),
            (this.requestFootageStream = function (e, n, t, i) {
                return (
                    XPMobileSDK.library.Connection.requestFootageStream(
                        e,
                        n,
                        t,
                        i
                    ) || XPMobileSDK.interfaces.ConnectionRequest
                );
            }),
            (this.changeStream = function (e, n, t, i, o) {
                return (
                    XPMobileSDK.library.Connection.changeStream(
                        e,
                        n,
                        t,
                        i,
                        o
                    ) || XPMobileSDK.interfaces.ConnectionRequest
                );
            }),
            (this.ChangeStream = function (e, n, t) {
                XPMobileSDK.library.Connection.ChangeStream(e, n, t);
            }),
            (this.closeStream = function (e) {
                return XPMobileSDK.library.Connection.closeStream(e);
            }),
            (this.closeAudioStream = function (e) {
                return XPMobileSDK.library.Connection.closeAudioStream(e);
            }),
            (this.CloseStream = function (e, n, t) {
                XPMobileSDK.library.Connection.CloseStream(e, n, t);
            }),
            (this.createVideoPushConnection = function (e, n, t) {
                return (
                    new XPMobileSDK.library.VideoPushConnection(e, n, t) ||
                    XPMobileSDK.interfaces.VideoPushConnection
                );
            }),
            (this.createAudioPushConnection = function (e, n, t, i) {
                return (
                    new XPMobileSDK.library.AudioPushConnection(e, n, t, i) ||
                    XPMobileSDK.interfaces.VideoPushConnection
                );
            }),
            (this.getOsmServerAddresses = function (e, n) {
                return XPMobileSDK.library.Connection.getOsmServerAddresses(
                    e,
                    n
                );
            }),
            (this.getGisMapCameras = function (e, n) {
                return XPMobileSDK.library.Connection.getGisMapCameras(e, n);
            }),
            (this.getGisMapLocations = function (e, n) {
                return XPMobileSDK.library.Connection.getGisMapLocations(e, n);
            }),
            (this.motionDetection = function (e, n) {
                return XPMobileSDK.library.Connection.motionDetection(e, n);
            }),
            (this.getPtzPresets = function (e, n, t) {
                return XPMobileSDK.library.Connection.getPtzPresets(e, n, t);
            }),
            (this.ptzPreset = function (e, n) {
                return XPMobileSDK.library.Connection.ptzPreset(e, n);
            }),
            (this.ptzMove = function (e, n) {
                return XPMobileSDK.library.Connection.ptzMove(e, n);
            }),
            (this.ptzTapAndHold = function (e, n, t) {
                return XPMobileSDK.library.Connection.ptzTapAndHold(e, n, t);
            }),
            (this.ptzSwipe = function (e, n) {
                return XPMobileSDK.library.Connection.ptzSwipe(e, n);
            }),
            (this.playbackSpeed = function (e, n) {
                return XPMobileSDK.library.Connection.playbackSpeed(e, n);
            }),
            (this.playbackSeek = function (e, n) {
                return XPMobileSDK.library.Connection.playbackSeek(e, n);
            }),
            (this.playbackGoTo = function (e, n, t, i, o) {
                return XPMobileSDK.library.Connection.playbackGoTo(
                    e,
                    n,
                    t,
                    i,
                    o
                );
            }),
            (this.getThumbnail = function (e, n, t) {
                return XPMobileSDK.library.Connection.getThumbnail(e, n, t);
            }),
            (this.getThumbnailByTime = function (e, n, t) {
                return XPMobileSDK.library.Connection.getThumbnailByTime(
                    e,
                    n,
                    t
                );
            }),
            (this.getDBStartTime = function (e, n, t) {
                return XPMobileSDK.library.Connection.getDBStartTime(e, n, t);
            }),
            (this.getNextSequence = function (e, n, t, i) {
                return XPMobileSDK.library.Connection.getNextSequence(
                    e,
                    n,
                    t,
                    i
                );
            }),
            (this.getPrevSequence = function (e, n, t, i) {
                return XPMobileSDK.library.Connection.getPrevSequence(
                    e,
                    n,
                    t,
                    i
                );
            }),
            (this.getSequencesInInterval = function (e, n, t, i, o) {
                return XPMobileSDK.library.Connection.getSequencesInInterval(
                    e,
                    n,
                    t,
                    i,
                    o
                );
            }),
            (this.startVideoExport = function (e, n, t, i, o) {
                return XPMobileSDK.library.Connection.startVideoExport(
                    e,
                    n,
                    t,
                    i,
                    o
                );
            }),
            (this.startImageExport = function (e, n, t, i) {
                return XPMobileSDK.library.Connection.startImageExport(
                    e,
                    n,
                    t,
                    i
                );
            }),
            (this.restartErroneousExport = function (e, n, t) {
                return XPMobileSDK.library.Connection.restartErroneousExport(
                    e,
                    n,
                    t
                );
            }),
            (this.getUserExports = function (e, n) {
                return XPMobileSDK.library.Connection.getUserExports(e, n);
            }),
            (this.getAllExports = function (e, n) {
                return XPMobileSDK.library.Connection.getAllExports(e, n);
            }),
            (this.getExport = function (e, n, t) {
                return XPMobileSDK.library.Connection.getExport(e, n, t);
            }),
            (this.deleteExport = function (e, n, t) {
                return XPMobileSDK.library.Connection.deleteExport(e, n, t);
            }),
            (this.getOutputsAndEvents = function (e, n) {
                return XPMobileSDK.library.Connection.getOutputsAndEvents(e, n);
            }),
            (this.getServerStatus = function (e, n) {
                return XPMobileSDK.library.Connection.getServerStatus(e, n);
            }),
            (this.triggerOutputOrEvent = function (e, n, t, i) {
                return XPMobileSDK.library.Connection.triggerOutputOrEvent(
                    e,
                    n,
                    t,
                    i
                );
            }),
            (this.getCameraCapabilities = function (e, n, t) {
                return XPMobileSDK.library.Connection.getCameraCapabilities(
                    e,
                    n,
                    t
                );
            }),
            (this.prepareUpload = function (e, n, t) {
                return XPMobileSDK.library.Connection.prepareUpload(e, n, t);
            }),
            (this.getUploadStatus = function (e, n, t) {
                return XPMobileSDK.library.Connection.getUploadStatus(e, n, t);
            }),
            (this.requestChallenges = function (e, n, t) {
                return XPMobileSDK.library.Connection.requestChallenges(
                    e,
                    n,
                    t
                );
            }),
            (this.createPlaybackController = function (e, n, t) {
                return XPMobileSDK.library.Connection.createPlaybackController(
                    e,
                    n,
                    t
                );
            }),
            (this.changeMultipleStreams = function (e, n, t) {
                return XPMobileSDK.library.Connection.changeMultipleStreams(
                    e,
                    n,
                    t
                );
            }),
            (this.getAllInvestigations = function (e, n) {
                return XPMobileSDK.library.Connection.getAllInvestigations(
                    e,
                    n
                );
            }),
            (this.getUserInvestigations = function (e, n) {
                return XPMobileSDK.library.Connection.getUserInvestigations(
                    e,
                    n
                );
            }),
            (this.getInvestigation = function (e, n, t) {
                return XPMobileSDK.library.Connection.getInvestigation(e, n, t);
            }),
            (this.createInvestigation = function (e, n, t) {
                return XPMobileSDK.library.Connection.createInvestigation(
                    e,
                    n,
                    t
                );
            }),
            (this.updateInvestigation = function (e, n, t) {
                return XPMobileSDK.library.Connection.updateInvestigation(
                    e,
                    n,
                    t
                );
            }),
            (this.updateInvestigationData = function (e, n, t) {
                return XPMobileSDK.library.Connection.updateInvestigationData(
                    e,
                    n,
                    t
                );
            }),
            (this.deleteInvestigation = function (e, n, t) {
                return XPMobileSDK.library.Connection.deleteInvestigation(
                    e,
                    n,
                    t
                );
            }),
            (this.cancelInvestigation = function (e) {
                return XPMobileSDK.library.Connection.cancelInvestigation(e);
            }),
            (this.startInvestigationExport = function (e, n, t, i, o) {
                return XPMobileSDK.library.Connection.startInvestigationExport(
                    e,
                    n,
                    t,
                    i,
                    o
                );
            }),
            (this.deleteInvestigationExport = function (e, n, t, i) {
                return XPMobileSDK.library.Connection.deleteInvestigationExport(
                    e,
                    n,
                    t,
                    i
                );
            }),
            (this.getAlarmList = function (e, n, t) {
                return XPMobileSDK.library.Connection.getAlarmList(e, n, t);
            }),
            (this.getAlarm = function (e, n, t) {
                return XPMobileSDK.library.Connection.getAlarm(e, n, t);
            }),
            (this.updateAlarm = function (e, n, t) {
                return XPMobileSDK.library.Connection.updateAlarm(e, n, t);
            }),
            (this.getAlarmDataSettings = function (e, n) {
                return XPMobileSDK.library.Connection.getAlarmDataSettings(
                    e,
                    n
                );
            }),
            (this.getAlarmUsers = function (e, n, t) {
                return XPMobileSDK.library.Connection.getAlarmUsers(e, n, t);
            }),
            (this.acknowledgeAlarm = function (e, n, t) {
                return XPMobileSDK.library.Connection.acknowledgeAlarm(e, n, t);
            }),
            (this.prevCarouselCamera = function (e) {
                return XPMobileSDK.library.Connection.prevCarouselCamera(e);
            }),
            (this.nextCarouselCamera = function (e) {
                return XPMobileSDK.library.Connection.nextCarouselCamera(e);
            }),
            (this.pauseCarousel = function (e) {
                return XPMobileSDK.library.Connection.pauseCarousel(e);
            }),
            (this.resumeCarousel = function (e) {
                return XPMobileSDK.library.Connection.resumeCarousel(e);
            }),
            (this.registerForNotifications = function (e, n, t) {
                return XPMobileSDK.library.Connection.registerForNotifications(
                    e,
                    n,
                    t
                );
            }),
            (this.RegisterForNotifications = function (e, n, t) {
                XPMobileSDK.library.Connection.RegisterForNotifications(
                    e,
                    n,
                    t
                );
            }),
            (this.getResamplingFactor = function () {
                return (
                    (XPMobileSDK.features.SupportsExtendedResamplingFactor &&
                        XPMobileSDKSettings.resamplingFactor) ||
                    1
                );
            }),
            (this.toggleWebSocket = function (e) {
                XPMobileSDK.library.Connection.toggleWebSocket(e);
            }),
            (this.toggleDirectStreaming = function (e) {
                XPMobileSDK.library.Connection.toggleDirectStreaming(e);
            }),
            (this.sendCommand = function (e, n, t, i, o) {
                XPMobileSDK.library.Connection.sendCommand(e, n, t, i, o);
            }),
            (this.destroy = function () {
                XPMobileSDK.library.Connection.destroy();
            });
        var e,
            n,
            t,
            i = function () {
                this.onLoad();
            }.bind(this),
            o = !1;
        function r(e, n, t) {
            return (
                ((e = e || {}).PublicKey =
                    XPMobileSDK.library.Connection.dh.createPublicKey()),
                XPMobileSDKSettings.primeLength &&
                    (e.PrimeLength = XPMobileSDKSettings.primeLength),
                XPMobileSDKSettings.defaultEncryptionPadding &&
                    (e.EncryptionPadding =
                        XPMobileSDKSettings.defaultEncryptionPadding.toUpperCase()),
                XPMobileSDK.library.Connection.Connect(e, n, t) ||
                    XPMobileSDK.interfaces.ConnectionRequest
            );
        }
        function c(e, n, t) {
            return (
                (e = e || {}),
                XPMobileSDK.library.Connection.PublicKey &&
                    ((e.Username =
                        XPMobileSDK.library.Connection.dh.encodeString(
                            e.Username
                        )),
                    (e.Password =
                        XPMobileSDK.library.Connection.dh.encodeString(
                            e.Password
                        ))),
                XPMobileSDKSettings.supportsCHAP &&
                    'Yes' == XPMobileSDK.library.Connection.CHAPSupported &&
                    (e.NumChallenges = e.NumChallenges || 100),
                (e.SupportsResampling = e.SupportsResampling || 'Yes'),
                (e.SupportsExtendedResamplingFactor =
                    e.SupportsExtendedResamplingFactor || 'Yes'),
                XPMobileSDKSettings.supportsCarousels &&
                    (e.SupportsCarousel = e.SupportsCarousel || 'Yes'),
                XPMobileSDKSettings.supportsFootages &&
                    (e.Footages = e.Footages || 'Yes'),
                XPMobileSDKSettings.clientType &&
                    (e.ClientType =
                        e.ClientType || XPMobileSDKSettings.clientType),
                XPMobileSDK.library.Connection.Login(e, n, t) ||
                    XPMobileSDK.interfaces.ConnectionRequest
            );
        }
        (t = document.querySelector(
            'script[src$="' + XPMobileSDKSettings.fileName + '"]'
        )),
            (n = t.src.replace(
                RegExp(XPMobileSDKSettings.fileName + '.*$'),
                ''
            )),
            (e = document.querySelector('head')),
            (function t(r) {
                var c = n + r.shift(),
                    s = document.createElement('script');
                s.addEventListener('load', function () {
                    r.length
                        ? t(r)
                        : ((XPMobileSDK.library.Connection = new Connection()),
                          XPMobileSDK.library.CHAP.initialize(),
                          XPMobileSDK.library.Connection.initialize(
                              XPMobileSDK.localStorage
                          ),
                          (o = !0),
                          i());
                }),
                    s.addEventListener('error', function () {
                        console.error('Script load error!');
                    }),
                    (s.src = c),
                    e.appendChild(s);
            })(XPMobileSDKSettings.includes.slice());
    })();
(XPMobileSDK.interfaces.ConnectionObserver = {
    connectionStateChanged: function () {},
    connectionDidConnect: function (e) {},
    connectionFailedToConnect: function (e) {},
    connectionFailedToConnectWithId: function (e) {},
    connectionRequiresCode: function (e) {},
    connectionCodeError: function () {},
    connectionDidLogIn: function () {},
    connectionFailedToLogIn: function (e) {},
    connectionLostConnection: function () {},
    connectionProcessingDisconnect: function () {},
    connectionDidDisconnect: function () {},
    connectionSwitchedToPull: function () {},
    connectionRequestSucceeded: function (e, n) {},
}),
    (XPMobileSDK.interfaces.VideoConnectionObserver = {
        videoConnectionReceivedSegment: function (e) {},
        videoConnectionReceivedFrame: function (e) {},
        videoConnectionFailed: function () {},
        videoConnectionTemporaryDown: function (e) {},
        videoConnectionRecovered: function () {},
        videoConnectionChangedState: function () {},
        videoConnectionStreamingError: function () {},
    }),
    (XPMobileSDK.interfaces.ConnectionRequest = {
        params: Object(),
        options: Object(),
        response: Object(),
        cancel: function () {},
    }),
    (XPMobileSDK.interfaces.VideoConnectionSignal = { live: 1, playback: 2 }),
    (XPMobileSDK.interfaces.VideoConnectionSize = {
        width: Number(),
        height: Number(),
    }),
    (XPMobileSDK.interfaces.VideoConnectionOptions = {
        signal: XPMobileSDK.interfaces.VideoConnectionSignal.live,
        time: Number(),
        jpegCompressionLevel: Number(),
        playbackControllerId: String(),
        keyFramesOnly: Boolean(),
        reuseConnection: Boolean(),
    }),
    (XPMobileSDK.interfaces.VideoConnectionCropping = {
        left: Number(),
        top: Number(),
        right: Number(),
        bottom: Number(),
        width: Number(),
        height: Number(),
    }),
    (XPMobileSDK.interfaces.VideoConnection = {
        videoId: String(),
        cameraId: String(),
        signalType: String(),
        isReusable: Boolean(),
        isPush: Boolean(),
        isSegmented: Boolean(),
        supportsPTZ: Boolean(),
        supportsPTZPresets: Boolean(),
        supportsPlayback: Boolean(),
        supportsExport: Boolean(),
        request: { parameters: Object(), options: Object() },
        response: { parameters: Object() },
        open: function () {},
        restart: function () {},
        close: function () {},
        addObserver: function (e) {},
        removeObserver: function (e) {},
        resetCommunication: function () {},
        destroy: function () {},
    }),
    (XPMobileSDK.interfaces.VideoPushConnection = {
        open: function (e, n) {},
        close: function () {},
        send: function (e) {},
        destroy: function () {},
        isOpen: function () {
            return Boolean();
        },
        getMediaStream: function () {
            return new MediaStream();
        },
    });
//# sourceMappingURL=maps/XPMobileSDK.js.map

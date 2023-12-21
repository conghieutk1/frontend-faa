import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress, Typography, Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { loginVMSServer, disconnectVMS } from "../helper/vms";
import { debounce } from "lodash";

const StreamVideo = ({ cameraId, cameraName, id, onRenderImage, className, onError, connected, onRenderCanvas }) => {
  // This code is called whenever user click draw the annotation
  // In fault setting screen, connected is undefined
  const ERR_VMS_LIVE_STREAM = "Không thể phát trực tiếp do có lỗi xảy ra"
  const [isRenderVideo, setIsRenderVideo] = useState(connected);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles({ isRenderVideo });


  useEffect(() => {
    if (isRenderVideo && !connected) {
      setIsRenderVideo(false)
    }
  }, [cameraId])

  useEffect(() => {
    if (connected) return;
    let mount = true;
    getCameraConnectionInfo(id)
      .then(connectionInfo => {
        console.log(connectionInfo)

        loginVMSServer(
          connectionInfo.ip,
          connectionInfo.username,
          connectionInfo.password,
          () => {
            if (mount) {
              setHasError(false);
              setIsRenderVideo(true);
            }
          },
          () => {
            if (mount) {
              setHasError(true);
              setIsRenderVideo(false);
            }
            onError && onError();
          }
        );
      })
      .catch(err => {
        if (mount) {
          setHasError(true);
          setIsRenderVideo(false);
        }
        onError && onError();
      });

    return () => {
      mount = false;
      if (!connected && window.vmsConnected) {
        disconnectVMS();
      }
    };

    // eslint-disable-next-line
  }, [cameraId]);

  useEffect(() => {
    if (!isRenderVideo) return;
    if (!window.vmsConnected) {
      setHasError(true);
      setIsRenderVideo(false);
      onError && onError();
      return;
    }
    // if isRenderVideo is false, canvas is not rendered
    var canvas = document.getElementById(getCanvasId(cameraId));
    var imageURL, videoController, streamRequest, image, canvasContext, canvasWidth, canvasHeight;
    var drawing = false;
    // Create callback event when received frame => stream video
    var videoConnectionObserver = {
      videoConnectionReceivedFrame: videoConnectionReceivedFrame,
    };

    // While canvas exist, request stream video
    var createStreamInterval = setInterval(() => {
      if (canvas) {
        canvasContext = canvas.getContext("2d");
        image = document.createElement("img");
        image.addEventListener("load", onImageLoad);
        image.addEventListener("error", onImageError);

        window.XPMobileSDK.library.Connection.webSocketBrowser = false;

        /**
         * Requesting a video stream.
         */
        streamRequest = window.XPMobileSDK.RequestStream(
          RequestStreamParams(cameraId, "Live"),
          requestStreamCallback,
          function (error) {
            setHasError(true);
            setIsRenderVideo(false);
            onError && onError();
          }
        );

        clearInterval(createStreamInterval);
      }
    }, 500);

    /**
     * Video stream request callback
     */
    function requestStreamCallback(videoConnection) {
      setHasError(false);
      videoController = videoConnection;
      videoConnection.addObserver(videoConnectionObserver);
      videoConnection.open();
    }

    /**
     * Executed on received frame.
     */
    function videoConnectionReceivedFrame(frame) {
      if (!drawing && frame.dataSize > 0) {
        drawing = true;

        if (frame.hasSizeInformation) {
          image.width = frame.sizeInfo.sourceSize.width;
          image.height = frame.sizeInfo.sourceSize.height;
          canvasWidth = image.width;
          canvasHeight = image.height;
          onRenderImage && handleRenderImage();
          onRenderCanvas && onRenderCanvas({ width: image.width, height: image.height });
        }

        if (imageURL) {
          window.URL.revokeObjectURL(imageURL);
        }

        imageURL = window.URL.createObjectURL(frame.blob);

        image.src = imageURL;
      }
    }

    const handleRenderImage = debounce(() => {
      const cameraWrapper = document.getElementById(cameraId);

      const ratio = cameraWrapper?.offsetWidth / canvasWidth;
      const width = cameraWrapper?.offsetWidth || canvasWidth;
      const height = canvasHeight * ratio || canvasHeight;
      if (onRenderImage) {
        onRenderImage({ width, height });
      }
      canvasWidth = width;
      canvasHeight = height;
    }, 50);

    /**
     * Executed on image load.
     */
    function onImageLoad(event) {
      canvas.width = image.width;
      canvas.height = image.height;
      canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);

      drawing = false;
    }

    function onImageError(event) {
      drawing = false;
    }
    /**
     * Stop camera stream
     */
    function stop() {
      if (videoController) {
        videoController.removeObserver(videoConnectionObserver);
        videoController.close();
        videoController = null;
      }

      if (streamRequest) {
        window.XPMobileSDK.cancelRequest(streamRequest);
        streamRequest = null;
      }
      if (createStreamInterval) {
        clearInterval(createStreamInterval);
      }
    }

    window.addEventListener("resize", handleRenderImage);

    return () => {
      stop();
      window.removeEventListener("resize", handleRenderImage);
    };
    // eslint-disable-next-line
  }, [isRenderVideo]);

  return (
    <Box id={cameraId} className={clsx("video", classes.root, className)}>
      {!!cameraName && (
        <Box position="absolute" top={0} left={0} width="100%" py={1} px={1.75}>
          <Typography component="h4" className="eclipse-1 ">
            {cameraName}
          </Typography>
        </Box>
      )}
      {hasError ? (
        <Typography
          variant="subtitle1"
          color="textSecondary"
          children={ERR_VMS_LIVE_STREAM}
          className={classes.errorLabel}
          align="center"
        />
      ) : isRenderVideo ? (
        <canvas id={getCanvasId(cameraId)} />
      ) : (
        <CircularProgress size={40} color="secondary" className={classes.loading} />
      )}
    </Box>
  );
};

export const getCanvasId = cameraId => "canvas" + cameraId;

export default memo(StreamVideo);

function RequestStreamParams(cameraId, signalType) {
  return {
    CameraId: cameraId,
    DestWidth: 1080,
    DestHeight: 1920,
    SignalType: signalType /*'Live' or 'Playback'*/,
    MethodType: "Push" /*'Pull'*/,
    Fps: 25, // This doesn't work for Pull mode, but we have to supply it anyway to keep the server happy
    ComprLevel: 71,
    KeyFramesOnly: "No" /*'Yes'*/, // Server will give only key frame thumb nails. This will reduce FPS
    RequestSize: "Yes",
    StreamType: "Transcoded",
  };
}

async function getCameraConnectionInfo(id) {
  // TODO: Update with real backend API
  const connectionInfo = {
    "ip": "http://117.0.39.150:38081",
    "username": "test",
    "password": "Ars@1234"
  }

  return connectionInfo
}

const useStyles = makeStyles(theme => ({
  root: {
    width: ({ isRenderVideo }) => (isRenderVideo ? "fit-content" : "100%"),
    maxWidth: "100%",
    maxHeight: "100%",
    "& canvas": {
      maxHeight: "700px",
      maxWidth: "100%",
      objectFit: "contain",
    },
  },
  loading: {
    margin: "auto",
  },
  errorLabel: {
    margin: "auto",
    padding: theme.spacing(0, 3),
  },
}));

'use strict';

var Video = require('twilio-video')
var debug = require('debug')('chat:conference')

var activeRoom;
var previewTracks;
var auth; // {identity, token}
var roomName;
var screenTrack;

var win = typeof window != 'undefined' ? window : global.window

var SCREEN_SHARE_EXTENSION_ID = 'ajhifddimkapgcifgcodmmfdlknahffk';

/** 
 * Generate a random room name (conference ID)
*/
export function getNewRoomName() {
  return generateRandomString()
}

/** 
 * Generate a random userId
*/
export function getNewUserId() {
  return generateRandomString()
}

/**
 * Join a room
 * @param String roomName 
 */
export function joinRoom(roomName, token, callback) {
  if (!roomName) {
    return new Error('Please enter a room name.')
  }
  if (!token) {
    return new Error('Please call getToken before joining a room')
  }

  debug('Joining room', roomName, 'with token', token);
  var connectOptions = {
    name: roomName,
    logLevel: 'debug'
  };

  if (previewTracks) {
    connectOptions.tracks = previewTracks;
  }

  // Join the Room with the token from the server and the
  // LocalParticipant's Tracks.
  Video.connect(token, connectOptions)
    .then(room => {
      roomJoined(room)
      typeof callback == 'function' && callback(room)
    }, error => debug('Twilio connect error: ' + error.message));
}

/**
 * Preview users local video
 */
export function previewLocalVideo() {
  var localTracksPromise = previewTracks
    ? Promise.resolve(previewTracks)
    : Video.createLocalTracks();

  localTracksPromise.then(
    function(tracks) {
      previewTracks = tracks;
      var previewContainer = document.getElementById('local-media');
      if (!previewContainer.querySelector('video')) {
        previewContainer.querySelector('i').style.display = 'none'
        attachTracks(tracks, previewContainer);
      }
    },
    function(error) {
      console.error('Unable to access local media', error);
      debug('Unable to access Camera and Microphone');
    }
  );
};

/**
 * Initialize
 */
export function startConference(userId, roomName, callback) {

  if (!userId) throw new Error('Parameter userId required')
  if (!roomName) throw new Error('Parameter roomName required')

  win.addEventListener('beforeunload', leaveRoomIfJoined);

  document.getElementById('button-share-screen').onclick = function() {
    getUserScreen().then(function(stream) {
      screenTrack = stream.getVideoTracks()[0];
      activeRoom.localParticipant.publishTrack(screenTrack);
      document.getElementById('button-share-screen').style.display = 'none';
      document.getElementById('button-unshare-screen').style.display = 'inline';
    });
  };

  document.getElementById('button-unshare-screen').onclick = function() {
    activeRoom.localParticipant.unpublishTrack(screenTrack);
    screenTrack = null;
    document.getElementById('button-share-screen').style.display = 'inline';
    document.getElementById('button-unshare-screen').style.display = 'none';
  };

  getToken(userId, function(auth) {
    joinRoom(roomName, auth)
  })
}

// Obtain a token from the server in order to connect to the Room.
function getToken(userId, cb) {
  var req = fetch('/token?identity=' + encodeURIComponent(userId))
  .then(resp => resp.json())
  .then(function(auth) {
    debug("Ready and connected as", auth.identity, "token", auth.token);
    cb && cb(auth.token)
  })
  .catch(e => {
    console.error('Error requesting token', e)
  })
  console.log('requesting token', req)
}

/**
 * Generate a random string
 * @param {Number} len 
 */
function generateRandomString(len) {
  return Math.ceil(Math.random() * Math.pow(10, 15)).toString(16).substr(0, len || 10)
}

function isFirefox() {
  var mediaSourceSupport = !!navigator.mediaDevices.getSupportedConstraints().mediaSource;
  var matchData = navigator.userAgent.match(/Firefox\/(\d+)/);
  var firefoxVersion = 0;
  if (matchData && matchData[1]) {
    firefoxVersion = parseInt(matchData[1], 10);
  }
  return mediaSourceSupport && firefoxVersion >= 52;
}

function isChrome() {
  return 'chrome' in win;
}

function canScreenShare() {
  return isFirefox() || isChrome();
}

function getUserScreen() {
  var extensionId = SCREEN_SHARE_EXTENSION_ID;
  if (!canScreenShare()) {
    return;
  }
  if (isChrome()) {
    return new Promise((resolve, reject) => {
      const request = {
        sources: ['screen']
      };
      // https://github.com/muaz-khan/Chrome-Extensions/tree/master/Screen-Capturing.js
      getScreenId(function (error, sourceId, screen_constraints) {
        if (error) {
          if (error == 'not-installed') {
            return showChromeExtensionNotification()
          }
          return reject(new Error('Could not get stream'));
        }
        resolve({ streamId: sourceId });
      });
    }).then(response => {
      return navigator.mediaDevices.getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: response.streamId
          }
        }
      });
    });
  } else if (isFirefox()) {
    return navigator.mediaDevices.getUserMedia({
      video: {
        mediaSource: 'screen'
      }
    });
  }
}

// Attach the Tracks to the DOM.
function attachTracks(tracks, container) {
  tracks.forEach(function(track) {
    container.appendChild(track.attach());
  });
}

// Attach the Participant's Tracks to the DOM.
function attachParticipantTracks(participant, container) {
  var tracks = Array.from(participant.tracks.values());
  attachTracks(tracks, container);
}

// Detach the Tracks from the DOM.
function detachTracks(tracks) {
  tracks.forEach(function(track) {
    track.detach().forEach(function(detachedElement) {
      detachedElement.remove();
    });
  });
}

// Detach the Participant's Tracks from the DOM.
function detachParticipantTracks(participant) {
  var tracks = Array.from(participant.tracks.values());
  detachTracks(tracks);
}

// Successfully connected!
function roomJoined(room) {
  activeRoom = room;

  debug('Joined room ', room, 'as', auth.identity);

  // Attach LocalParticipant's Tracks, if not already attached.
  var previewContainer = document.getElementById('local-media');
  if (!previewContainer.querySelector('video')) {
    previewContainer.querySelector('i').style.display = 'none'
    attachParticipantTracks(room.localParticipant, previewContainer);
  }

  // Attach the Tracks of the Room's Participants.
  room.participants.forEach(function(participant) {
    debug("Already in Room: '" + participant.identity + "'");
    var previewContainer = document.getElementById('remote-media');
    attachParticipantTracks(participant, previewContainer);
  });

  // When a Participant joins the Room, log the event.
  room.on('participantConnected', function(participant) {
    debug("Joining: '" + participant.identity + "'");
  });

  // When a Participant adds a Track, attach it to the DOM.
  room.on('trackAdded', function(track, participant) {
    debug(participant.identity + ' added track: ' + track.kind);
    var previewContainer = document.getElementById('remote-media');
    attachTracks([track], previewContainer);
  });

  // When a Participant removes a Track, detach it from the DOM.
  room.on('trackRemoved', function(track, participant) {
    debug(participant.identity + ' removed track: ' + track.kind);
    detachTracks([track]);
  });

  // When a Participant leaves the Room, detach its Tracks.
  room.on('participantDisconnected', function(participant) {
    debug("Participant '" + participant.identity + "' left the room");
    detachParticipantTracks(participant);
  });

  // Once the LocalParticipant leaves the room, detach the Tracks
  // of all Participants, including that of the LocalParticipant.
  room.on('disconnected', function() {
    debug('Left');
    if (previewTracks) {
      previewTracks.forEach(function(track) {
        track.stop();
      });
    }
    detachParticipantTracks(room.localParticipant);
    room.participants.forEach(detachParticipantTracks);
    activeRoom = null;
  });
}

// Leave Room.
function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}

function showChromeExtensionNotification() {
  toastr.success(
    'Please download the Chrome Extension linked below to enable screen sharing.', 
    'Screen Share Requirements');
  var url = 'https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk'
  var html = `<div class="alert alert-success alert-dismissable">
  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
  Please <a class="alert-link" href="${url}" target="_blank">Download Screen Share from Chrome App Store</a>
   to start sharing your screen. 
</div>`

  document.querySelector('#app-notifications').innerHTML = html
}

var client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
var localstream;
var uid = 1;
var user_type = 'lecturer';

client.init('1bad9247d5c44b28b40d2363c7c2ae53', function () {
  console.log("AgoraRTC client initialized");
}, function (err) {
  console.log("AgoraRTC client init failed", err);
});


client.join(null, 'lecture-2', null, function(uid) {
  console.log("User " + uid + " join channel successfully");
}, function(err) {
  console.log("Join channel failed", err);
});

// Set mode
if (user_type == 'lecturer') {
    client.setClientRole("host", function() {
      console.log("setHost success");
    }, function(e) {
      console.log("setHost failed", e);
    })
} else {
    client.setClientRole("audience", function() {
      console.log("setHost to audience success");
    }, function(e) {
      console.log("setHost failed", e);
    })
}


localStream = AgoraRTC.createStream({
  streamID: uid,
  audio: true,
  video: true,
  screen: false}
);

localStream.init(function() {
  console.log("getUserMedia successfully");
  localStream.play('agora_local');

}, function (err) {
  console.log("getUserMedia failed", err);
});

//publish local stream
client.publish(localStream, function (err) {
  console.log("Publish local stream error: " + err);
});

client.on('stream-published', function (evt) {
  console.log("Publish local stream successfully");
});

//subscribe remote stream
client.on('stream-added', function (evt) {
  var stream = evt.stream;
  console.log("New stream added: " + stream.getId());
  client.subscribe(stream, function (err) {
    console.log("Subscribe stream failed", err);
  });
});

client.on('stream-subscribed', function (evt) {
  var remoteStream = evt.stream;
  console.log("Subscribe remote stream successfully: " + remoteStream.getId());
  remoteStream.play('agora_remote' + remoteStream.getId());
})

client.leave(function () {
  console.log("Leave channel successfully");
}, function (err) {
  console.log("Leave channel failed");
});
var client = AgoraRTC.createClient({mode: 'live', codec: "h264"});


var localstream;
var uid = 1;
var user_type = 'audience';

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
client.setClientRole("audience", function() {
  console.log("setHost to audience success");
}, function(e) {
  console.log("setHost failed", e);
})


client.on('stream-subscribed', function (evt) {
  var remoteStream = evt.stream;
  console.log("Subscribe remote stream successfully: " + remoteStream.getId());
  if ($('div#video_remote #agora_remote'+stream.getId()).length === 0) {
      $('div#video_remote').append('<div id="agora_remote'+stream.getId()+'" style="float:left; width:810px;height:607px;display:inline-block;"></div>');
   }
  remoteStream.play('agora_remote' + remoteStream.getId());
})

client.leave(function () {
  console.log("Leave channel successfully");
}, function (err) {
  console.log("Leave channel failed");
});


angular
.module('mshack', ['ngMaterial', 'ngMessages', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state({
  	name: 'chat',
    url: '/',
    controller: 'chatCtrl',
    // templateUrl: '/assets/views/chat.html'
    template:
    `
    <div class="container">
    <div class="row">
        <div class="col-md-5">
            <h3> Lecture Chat </h3>
            <div class="chat__messages-panel">
                <div class="chat__container">
                    <div class="chat__bubble" ng-repeat="message in groupChat" ng-class="message.sender_id===currentUser.id ? 'chat__bubble--sent': 'chat__bubble--received'">
                        <div class="chat__bubble__name">
                        {{message.sender}}</div>
                        <div class="chat__bubble__message">
                        {{message.message}}</div>
                    </div>
                </div>
                <form class="chat__message__container" autocomplete="off" ng-submit="send(sendThisMessage)" ng-if="selectedChat">
                    <input type="text" name="message" class="chat__message" placeholder="Type a message" autocomplete="off" ng-model="sendThisMessage">
                </form>
            </div>
        </div>
        <div class="col-md-7">
        <h3> Lecture Video </h3>
        <div>
            <div id="video">
                <div id="agora_local" style="padding-top: 10px;"></div>
            </div>
            <div id="video_remote">
                <div id="agora_remote"></div>
            </div>
        </div>
        </div>
    </div>
    </div>
    `
  });
})
.run(function(){
	const config = {
        apiKey: "AIzaSyA5R-KdRQJC5uPWS8hp5ZNajPnVW7uJue8",
        authDomain: "educhat-243116.firebaseapp.com",
        databaseURL: "https://educhat-243116.firebaseio.com",
        projectId: "educhat-243116",
        storageBucket: "educhat-243116.appspot.com",
        messagingSenderId: "265199379822",
        appId: "1:265199379822:web:10198cc9e632d0b0"
	};
	firebase.initializeApp(config);

});
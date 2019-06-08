angular.module('mshack').controller('chatCtrl', function ($scope, dataService){
	$scope.safeApply = function(fn) {
	  let phase = this.$root.$$phase;
	  if(phase == '$apply' || phase == '$digest') {
	    if(fn && (typeof(fn) === 'function')) {
	      fn();
	    }
	  } else {
	    this.$apply(fn);
	  }
	};

    var lectureId = 2;
	dataService.getGroups(lectureId).once('value', function(snapshot) {
		$scope.safeApply(function(){
			$scope.allChats = snapshot.val();
			$scope.selectChat(0);
		})
	})

	$scope.currentUser = {
		name: $('#user-profile-name').html(),
		id: $('#user-profile-id').html()
	}

	$scope.selectChat = function(index){
		$scope.selectedChat = $scope.allChats['2-comments'];
		$scope.groupChat = [];
		console.log($scope.selectedChat);
		getChats($scope.selectedChat.id);
	}

	function getChats(id){
		dataService.getGroupChat(id).on('value', function(snapshot) {
		  let data = snapshot.val();
		  console.log(data.messages);
		  $scope.safeApply(function(){
		  	$scope.groupChat = data.messages;
		  })
		});
	}

	$scope.send = function(message){
		let payload = {
			"sender": $scope.currentUser.name,
            "sender_id": $scope.currentUser.id,
            "message": message,
            "timestamp": (new Date()).toJSON()
		}
		console.log(payload);
		dataService.sendChat($scope.selectedChat.id, payload).then(function(res){
			console.log(res);
		});
	}

});
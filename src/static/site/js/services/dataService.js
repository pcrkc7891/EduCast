angular.module('mshack').service('dataService', function (){
	const database = firebase.database();

	function getGroupChat(org){
		return firebase.database().ref(`chat/${org}`);
	}

	function sendChat(groupId, payload){
		return firebase.database().ref(`chat/${groupId}/messages`).push(payload);
	}

	function getGroups(lectureId){
		return firebase.database().ref(`/groups/${lectureId}`);
	}

	return {
		getGroupChat: getGroupChat,
		sendChat: sendChat,
		getGroups: getGroups
	}
});
'use strict';
angular
  .module('FileSync')
  .controller('SocialCtrl', ['$scope', 'SocketIOService', function($scope, SocketIOService) {
    this.viewers = [];
    this.messages = [];
    this.message = '';

    this.sendMessage = function() {
      console.log(this.message);
      SocketIOService.sendMessage(this.message);
    };

    function onMessagesUpdated(message) {
      function updateHTML(){
	document.getElementById('chatInput').value = "";
        var element = document.getElementById('chatText');
        element.scrollTop = element.scrollHeight;
      }
      this.messages.push(message);
      $scope.$apply();
      //setTimeout(function(){ var element = document.getElementById('chatText'); element.scrollTop = element.scrollHeight; }, 500);
      setTimeout(updateHTML, 200);
    }

    SocketIOService.onMessagesUpdated(onMessagesUpdated.bind(this));

    function onViewersUpdated(viewers) {
      this.viewers = viewers;
      $scope.$apply();
    }

    SocketIOService.onViewersUpdated(onViewersUpdated.bind(this));
  }]);

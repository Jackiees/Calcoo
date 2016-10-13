angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('FolderCtrl', function($scope,$state,$ionicModal,$ionicSlideBoxDelegate) {
  // $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService
  // $ionicPlatform.ready(function() {
  // $scope.images = FileService.images();
    // $scope.$apply();
  // });

  // $scope.image1 = $scope.images[0];

  // $scope.urlForImage = function(imageName) {
  //   var trueOrigin = cordova.file.dataDirectory + imageName;
  //   return trueOrigin;
  // }
  //
  // $scope.addMedia = function() {
  //   $scope.hideSheet = $ionicActionSheet.show({
  //     buttons: [
  //       { text: 'Take photo' },
  //       { text: 'Photo from library' }
  //     ],
  //     titleText: 'Add images',
  //     cancelText: 'Cancel',
  //     buttonClicked: function(index) {
  //       $scope.addImage(index);
  //     }
  //   });
  // }

  // $scope.addImage = function(type) {
  //   $scope.hideSheet();
  //   ImageService.handleMediaDialog(type).then(function() {
  //     $scope.$apply();
  //   });
  // }

  $scope.aImages = [{
      	'src' : 'img/jane.jpg',
      	'msg' : 'Swipe me to the left. Tap/click to close'
    	}, {
        'src' : 'img/chloe.jpg',
        'msg' : ''
      }, {
        'src' : 'img/mary.jpg',
        'msg' : ''
      }, {
        'src' : 'img/denise.jpg',
        'msg' : ''
      }, {
        'src' : 'img/doutzen.jpg',
        'msg' : ''
      }, {
        'src' : 'img/suzy.jpg',
        'msg' : ''
      }, {
        'src' : 'img/mary.jpg',
        'msg' : ''
      }
  ];

    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $ionicSlideBoxDelegate.slide(0);
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

  	$scope.goToSlide = function(index) {
      $scope.modal.show();
      $ionicSlideBoxDelegate.slide(index);
    }

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };

})

.controller('CalcoCtrl', function($scope,$state) {

  $scope.answer = 0;

  $scope.erase = function() {
    $scope.answer = 0;
  };

  var tempInput;
  var calculationType = {};
  var isInputed;
  var answered;

  $scope.input = function(input) {

    if($scope.answer === 0) {
      $scope.answer = input;
    } else if ($scope.answer > 100000000) {
      // do nothing
      console.log('hello');
    } else if (isInputed === true) {
      $scope.answer = input;
      isInputed = false;
    } else if (answered === true) {
        $scope.answer = input;
        answered = false;
    } else {
      console.log('voeg toe');
      $scope.answer = $scope.answer*10 + input;
    };

    // Calculations
    // Add
    $scope.add = function() {
      calculationType = "add";
      tempInput = $scope.answer;
      isInputed = true;
      console.log($scope.answer);
      // $scope.answer = 0;
      console.log(tempInput);
    };

    $scope.percentage = function() {
      if($scope.answer === 8) {
        $scope.answre = 0;
        $state.go('app.passwords');
      }
    }

    $scope.outcome = function() {
      console.log(calculationType);
      if (calculationType === "add") {
        console.log(tempInput);
        console.log($scope.answer);
        $scope.answer = $scope.answer + tempInput;
        answered = true;
      }
    };

  };

})

.controller('PasswordsCtrl', function($scope, $stateParams,$ionicModal) {

  $scope.usernameOK = false;
  $scope.passwordOK = false;

  $scope.check = function(username) {
    if(username.length > 7) {
      $scope.usernameOK = true;
    } else if (username.length < 8) {
      $scope.usernameOK = false;
    }
  };

  $scope.checkPass = function(password) {
    if(password.length > 7) {
      $scope.passwordOK = true;
    } else if (password.length < 8) {
      $scope.passwordOK = false;
    }
  };

  $scope.passwords = [
    {
      "image": "http://iosicongallery.com/img/512/google-2015.png",
      "service": "Gmail",
      "username": "jackie.lam85@gmail.com",
      "password": "password"
    },
    {
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/2000px-F_icon.svg.png",
      "service": "Facebook",
      "username": "c.h.lam@student.vu.nl",
      "password": "password",
      "open": false
    },
    {
      "image": "https://zapier.cachefly.net/storage/photos/69c6844b451096c2c85b905bd550d133.png",
      "service": "Evernote",
      "username": "jackie.lam85@gmail.com",
      "password": "password",
      "open": false
    },
    {
      "image": "https://5a5a57ff32a328601212-ee0df397c56b146e91fe14be42fa361d.ssl.cf1.rackcdn.com/icon/instagram_logos_app_icon/YyepHGHDvkl1wFkUHw8Y/Instagram-v051916_200.png",
      "service": "Instagram",
      "username": "Jackiees",
      "password": "password",
      "open": false
    }
  ];

  $scope.open = function(index) {
    $scope.passwords[index].open =  !$scope.passwords[index].open;
  };

  $scope.add = function() {
    $scope.modal.show();
  }

  $ionicModal.fromTemplateUrl('input-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $ionicSlideBoxDelegate.slide(0);
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hide', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  $scope.$on('modal.shown', function() {
    console.log('Modal is shown!');
  });

  $scope.save = function(service,username,password) {

    $scope.passwords.push({
      "image": "http://icons.iconarchive.com/icons/uiconstock/socialmedia/512/Apple-App-Store-icon.png",
      "service": service,
      "username": username,
      "password": password,
      "open": false
    });

    setTimeout(function () {

      $scope.modal.hide();
    }, 500);

  };


});

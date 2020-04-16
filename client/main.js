import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Session} from 'meteor/session';

import '../lib/collection.js';
import './main.html';

Session.set('headerFx',false);

$(document).ready(function() {
    var scrollLink = $('.scroll');

    //Smooth scrolling
    scrollLink.click(function(event) {
        event.preventDefault();//prevent the default action associated with the event from happening
        $('body,html').animate({//call the animate function on the contents of the body and html tags
            scrollTop: $(this.hash).offset().top//set scrollTop to the offset of the target location's top
        }, 1000)//complete the animation over 1s
    })
})


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
		if(!Session.get('headerFx')){
			// console.log("scrolldown -- ",document.documentElement.scrollTop,"||",document.documentElement.scrollTop);
			Session.set('headerFx',true);
			console.log("scrolldown -- ",document.documentElement.scrollTop,"||",document.documentElement.scrollTop);
			//document.getElementById("header").style.paddingTop="0.25rem";
			document.getElementById("header").style.backgroundColor = "black";
			var x = document.getElementsByClassName("shrink-a");
			for (var i =0; i< x.length;i++){
				//x[i].style.padding="1rem 0.5rem 1rem 0.5rem";
				x[i].style.color="white";
			}

            var k = document.getElementsByClassName("logo");
            for (var i =0; i< k.length;i++){
                //x[i].style.padding="1rem 0.5rem 1rem 0.5rem";
                k[i].style.color="white";
            }
		}
		
	} else {
		if(Session.get('headerFx')){
			console.log("top of page -- ",document.documentElement.scrollTop,"||",document.documentElement.scrollTop);
			Session.set('headerFx',false);
			// document.getElementById("header-logo").style.opacity="1";
			//document.getElementById("header-logo").style.transform="initial";
			// document.getElementById("header").style.paddingTop = "1rem";
			document.getElementById("header").style.backgroundColor = "initial";
			var x = document.getElementsByClassName("shrink-a");
			for (var i =0; i< x.length;i++){
				//x[i].style.padding="1rem 0.5rem 2rem 0.5rem";
				x[i].style.color="initial";
			}
            var k = document.getElementsByClassName("logo");
            for (var i =0; i< k.length;i++){
                //x[i].style.padding="1rem 0.5rem 1rem 0.5rem";
                k[i].style.color="initial";
            }
		}
	}
}

/*


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

getElementsByClassName


Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/

// UI.registerHelper('imagePath',function(key){
//     //Builds the Meteor.call url
//     var $host = document.location.host;
//     var $imgBaseUrl = '/images/Art';
//     var $assetPath = $imgBaseUrl + key + '/';
//     var idnum = 1;
//     var url = 'http://' + $host +$assetPath + idnum +'.jpg';

//     //Define the default image location
//     var $assetPathDefault = $imgBaseUrl + 'default.jpg';

//     //use meteor.call to make a client call a server-side method
//     Meteor.call('checkIfImageExists', url, function(error,result) {
//         if(false){
//             console.log('Error');
//             return $assetPathDefault;
//         } else {
//             console.log('Result: ' + result.statusCode);
//             console.log($assetPath);
//             return $assetPath;
//         };
//     });
// });

// Future = Npm.require('fibrrs/future');

// Meteor.methods({//Defines fuctions that can be invoked over the network by clients
//     checkIfImageExists: function(url){
//         check(url, String);
//         var fut = new Future();
//         this.unblock();
//         HTTP.get(url, function (error,result) {
//             if(!error) {
//                 console.log('Found a file!: ' + url);
//                 console.log('Result: ' + result.statusCode);
//                 fut.return(false);
//             } else {
//                 console.log(error);
//                 console.log('Error: ' + error);
//                 fut.return (false);
//             };
//         });
//         return fut.wait();
//     }
// })
  

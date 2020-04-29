import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Session} from 'meteor/session';

import '../lib/collection.js';
import './main.html';

Session.set('headerFx',false);

$(document).ready(function() {
    $('#splashscreen .splash').css('opacity', '1');
    $('#splashscreen .splash').css('transform', 'initial');
    $('#header').css('opacity', '1');
    $('#header').css('transform', 'initial');

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
    var splashLink = document.getElementById("splashscreen");
    console.log("top of page -- ",window.scrollY);
    if((window.scrollY > 620) && (window.scrollY < 1972)){
        console.log("change to black");
        if(!Session.get('headerFx')){
            Session.set('headerFx',true);
            document.getElementById("header").style.backgroundColor = "black";
            $("#header img.topImg").toggleClass("transparent");
            $("#header img.bottomImg").toggleClass("transparent");
            var x = document.getElementsByClassName("shrink-a");
            for (var i =0; i< x.length;i++){
                x[i].style.color="white";
            }

            var k = document.getElementsByClassName("logo");
            for (var i =0; i< k.length;i++){
                k[i].style.color="white";
            }
        }
    } else {
        console.log("change to white");
        if(Session.get('headerFx')){
            Session.set('headerFx',false);
            document.getElementById("header").style.backgroundColor = "initial";
            $("#header img.topImg").toggleClass("transparent");
            $("#header img.bottomImg").toggleClass("transparent");
            var x = document.getElementsByClassName("shrink-a");
            for (var i =0; i< x.length;i++){
                x[i].style.color="initial";
            }
            var k = document.getElementsByClassName("logo");
            for (var i =0; i< k.length;i++){
                k[i].style.color="initial";
            }
        }
	} 
}


// Template.splashScreen.onCreated(function splashOnCreated() {
//     document.getElementById("splashscreen").style.opacity="1";
//     document.getElementById("splashscreen").style.transform="initial";
// });
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
  

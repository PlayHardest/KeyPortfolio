import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Session} from 'meteor/session';

import '../lib/collection.js';
import './main.html';

Session.set('headerFx',false);
Session.set('currentPage',"home");

Router.configure({
    layoutTemplate: 'navBar'
});

Router.route('/Admin');
Router.route('/contact');
Router.route('/portfolio');
Router.route('/', {
    name: 'home',
    template: 'home'
});

// $('#dCarousel').on('slide.bs.carousel', function (event) {
//   var initiator = $(event.relatedTarget);
//   console.log("hhey" + initiator);
// })

// $('#dCarouselModal').on('show.bs.modal', function (event) {
//   var image = $(event.relatedTarget); // element that triggered the modal
//   console.log("executed by " + image);
//   //var recipient = button.data('whatever') // Extract info from data-* attributes
// })

// Template.navBar.onRendered( function navBarOnRendered() {
//     console.log("navbar rendered");
//     $('#header').css('opacity', '1');
//     $('#header').css('transform', 'initial');
// })


Template.home.onRendered( function homeOnRendered(){
    console.log("home rendered");
    $('#splashscreen .splash').css('opacity', '1');
    $('#splashscreen .splash').css('transform', 'initial');
})


Template.dPortfolio.events({
    'click .js-carousel'(e) {
        console.log(e.target);
        var number = Number(e.target.getAttribute('data-slide-to'));
        console.log(number);
        $('#dCarousel').carousel(number);
        console.log("destination is " + number);
    }
});



Template.Admin.events({
    'click .js-AddNew'(e){
        var img_val = $('#getImage1').val();
        console.log(img_val);
        $('#exampleimage').attr("src",img_val)
        e.preventDefault()
    }
})



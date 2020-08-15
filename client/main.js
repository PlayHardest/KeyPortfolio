import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Session} from 'meteor/session';
import {Email} from 'meteor/email';

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
    'click .js-dcarousel'(e) {
        console.log(e.target);
        var number = Number(e.target.getAttribute('data-slide-to'));
        console.log(number);
        $('#dCarousel').carousel(number);
        console.log("destination is " + number);
    }
});

Template.dPortfolio.helpers({
    AllDigital(){
        return artDB.find({'ArtMethod':'digital', 'InShop':false})
    }
})

Template.tPortfolio.events({
    'click .js-tcarousel'(e) {
        console.log(e.target);
        var number = Number(e.target.getAttribute('data-slide-to'));
        console.log(number);
        $('#tCarousel').carousel(number);
        console.log("destination is " + number);
    }
})

Template.tPortfolio.helpers({
    AllTraditional(){
        return artDB.find({'ArtMethod':'traditional', 'InShop':false})
    }
})


Template.contact.events({
    'click .js-email'(e){
        var contact_email = $('#ContacteeEmail').val();
        var contact_name = $('#ContacteeName').val();
        var message = $('#ContacteeBody').val();
        console.log("Email sending in progress - " + contact_email + " " + contact_name + " " + message);
        if(contact_name == "" || contact_email == "" || message == ""){
            alert("All fields must be filled to send a message");
            console.log("No message sent");
        } else {
            console.log("Message sent");
            $('#ContacteeEmail').val('');
            $('#ContacteeName').val('');
            $('#ContacteeBody').val('');
            Meteor.call(
                'sendEmail',
                'keeksartwork@gmail.com',
                'contact@keeksart.com',
                contact_name + " - " + contact_email,
                message
                );
        }
    }
})

//ADMIN PAGE FUNCTIONS
Template.Admin.helpers({
    PreviewAllDigital(){
        return artDB.find({'ArtMethod':'digital'})
    },
    PreviewAllTraditional(){
        return artDB.find({'ArtMethod':'traditional'})
    }
})


Template.Admin.events({
    'click .js-deactivateText'(e){
        var target = $('#NewArtworkName');
        if(target.attr('disabled')){
            target.attr('disabled', false);
        } else {
            target.val('');
            target.attr('disabled', true); 
        }
    },
    'click .js-deactivatePrice'(e){
        var target = $('#NewArtworkPrice');
        if(target.attr('disabled')){
            target.attr('disabled', false);
        } else {
            target.val('');
            target.attr('disabled', true); 
        }
    },
    'click .js-dcarousel'(e) {
        console.log(e.target);
        var number = Number(e.target.getAttribute('data-slide-to'));
        console.log(number);
        $('#dCarousel').carousel(number);
        console.log("destination is " + number);
    },
    'click .js-tcarousel'(e) {
        console.log(e.target);
        var number = Number(e.target.getAttribute('data-slide-to'));
        console.log(number);
        $('#tCarousel').carousel(number);
        console.log("destination is " + number);
    },
    'click .js-delete'(e){
        var idval = this._id;
        console.log("id is "+idval);
        $("#"+idval).fadeOut("slow","swing",function(){
            artDB.remove({_id:idval});
        });
        $("#modal"+idval).remove();
    },
    'click .js-emailTest'(e){
        // //to,from, subject,text
        console.log("Send email");
        Meteor.call(//use Meteor.call() to call a server method
        //Asynchronously send an email from the client
            'sendEmail',
            'keeksartwork@gmail.com',
            'contact@keeksart.com',
            'Hello from meteor!',
            'This is a test of Email.send'
        );
    },
    'click .js-AddNew'(e){
        var name = $('#NewArtworkName').val();
        var showName=false;
        var category;
        var catval=$('#setCategory').val();
        var img_val="";
        var img_target="";
        var price=$('#NewArtworkPrice').val();
        var inShop=false;
        if(price != undefined && price != "")
            inShop=true;
        if($('#NewArtworkName').attr('disabled') || name == undefined || name == "")
            name = "Untitled";
        else
            showName = true;
        switch(catval) {
            case "1":
                category="digital";
                break;
            case "2":
                category="traditional";
                break;
            default:
                alert("A category must be specified");
                return;
        }
        img_val = $('#getImage1').val();
        if(img_val == undefined||img_val == ""){
            alert("An image file must be supplied to create a valid entry");
            return;
        } else {
            var start = img_val.lastIndexOf("\\")+1;
            var end = (img_val.length);
            img_target = img_val.slice(start,end);
            console.log(start + "||" + end + "||" + img_target);
            img_target = "images\\Art\\" + category + "\\" + img_target;
            console.log("built URL : " + img_target);
        }
        var slide_id = artDB.find({ArtMethod:category}).count();
        e.preventDefault()
        artDB.insert({'Name':name, 'ShowName':showName, 'Image':img_target, 'ArtMethod':category, 'InShop':inShop, 'Price':price, 'SlideTo':slide_id, 'InStock':0});
    }
})



window.onload = function() {loadFunction()};

function loadFunction() {

}



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    // var splashLink = document.getElementById("splashscreen");
    // console.log("top of page -- ",window.scrollY,"::");
    // console.log($(".h-change1").offset().top,"---",$(".h-change2").offset().top);
    if(Session.get('currentPage')=="home"){
        console.log("You are on the homepage")
    }
    if((window.scrollY > ($(".h-change1").offset().top-200)) && (window.scrollY < ($(".h-change2").offset().top-200))){
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
            var y = document.getElementsByClassName("header_nav_child");
            for(var i=0;i<y.length;i++){
                y[i].style.backgroundColor=document.getElementById("header").style.backgroundColor;
            }
            var z = document.getElementsByClassName("header_nav_option");
            for(var i=0;i<z.length;i++){
                z[i].style.color="white";
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
            if(window.scrollY > ($(".h-change2").offset().top-200)){
                document.getElementById("header").style.backgroundColor = "white";
            }
            $("#header img.topImg").toggleClass("transparent");
            $("#header img.bottomImg").toggleClass("transparent");
            var x = document.getElementsByClassName("shrink-a");
            for (var i =0; i< x.length;i++){
                x[i].style.color="initial";
            }
            var y = document.getElementsByClassName("header_nav_child");
            for(var i=0;i<y.length;i++){
                y[i].style.backgroundColor=document.getElementById("header").style.backgroundColor;
            }
            var z = document.getElementsByClassName("header_nav_option");
            for(var i=0;i<z.length;i++){
                z[i].style.color="initial";
            }
            var k = document.getElementsByClassName("logo");
            for (var i =0; i< k.length;i++){
                k[i].style.color="initial";
            }
        }
    } 
}
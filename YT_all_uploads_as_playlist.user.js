// ==UserScript==
// @name        Youtube uploads as playlist
// @namespace   pk-scripts
// @version     1.5
// @date        2020-06-22
// @description Create playlist of all uploaded videos from user.
// @author      pK
// @copyright   pK 2020

// @license MIT https://opensource.org/licenses/MIT
// @match          *://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    if (document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer) {
        setInterval(function() {
            if (window.location.href.indexOf("watch?v=") < 0) {
                return false;
            }
            if (document.getElementById("count") && document.getElementById("show-all-videos-playlist") === null) {
                Addytpolymer();
            }
        }, 100);
    }

    function Addytpolymer() {
        var buttonDiv = document.createElement("span");
        buttonDiv.style.width = "100%";
        buttonDiv.id = "show-all-videos-playlist";
        var addButton = document.createElement("a");
        addButton.appendChild(document.createTextNode("📖 Create Playlist"));
        addButton.style.width = "100%";
        addButton.style.backgroundColor = "#15388c";
        addButton.style.color = "white";
        addButton.style.textAlign = "center";
        addButton.style.padding = "5px 10px";
        addButton.style.margin = "0px 10px";
        addButton.style.fontSize = "14px";
        addButton.style.border = "0";
        addButton.style.cursor = "pointer";
        addButton.style.borderRadius = "2px";
        addButton.style.fontFamily = "Roboto, Arial, sans-serif";
        addButton.style.textDecoration = "none";
        addButton.href = returnPLALISTURL();
        addButton.target = "_blank";
        buttonDiv.appendChild(addButton);
        var targetElement = document.querySelectorAll("[id='count']");
        for (var i = 0; i < targetElement.length; i++) {
            if (targetElement[i].className.indexOf("ytd-video-primary-info-renderer") > -1) {
                targetElement[i].appendChild(buttonDiv);
            }
        }
    }
    function returnPLALISTURL(){
        var regexik = /.*channel.[U][C]/gi;
        var channelid = null;
        var channel_id_elem = document.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string');
        for(var i=0;i<channel_id_elem.length;i++){
            if(channel_id_elem[i].href.includes("/channel/")){
                channelid = channel_id_elem[i].href.replace(regexik, '');
                break;
            }
        }

        if (window.location.href.indexOf("watch?v=") > -1) {
            var finalURL = "https://www.youtube.com/playlist?list=UU" + channelid;
            console.log(finalURL);
            return finalURL;
        }
    }
})();

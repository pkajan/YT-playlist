// ==UserScript==
// @name        Youtube uploads as playlist
// @namespace   pk-scripts
// @version     2.2
// @description Create playlist of all uploaded videos from user.
// @author      pK
// @copyright   pK 2023
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @match       *://*.youtube.com/*
// @downloadURL https://github.com/pkajan/YT-playlist/raw/master/YT_all_uploads_as_playlist.user.js
// @updateURL   https://github.com/pkajan/YT-playlist/raw/master/YT_all_uploads_as_playlist.user.js
// @grant       none
// ==/UserScript==

(function() {
    function addButton(Buttontext,cleanedID){
        var button = document.createElement("div");
        button.className = "playlistcreate";
        button.style.cssText = "color: #FFFFFF;";
        button.style.cssText += "margin-left: 10px;";
        button.style.cssText += "font-family: Roboto,Arial,sans-serif;";
        button.style.cssText += "border-radius: 20px;";
        button.style.cssText += "font-size: 14px;";
        button.style.cssText += "line-height: 15px;";
        button.style.cssText += "padding: 10px;";
        button.style.cssText += "font-weight: 500;";
        button.style.cssText += "background-color: #272727;";
        button.style.cssText += "text-decoration: none;";
        button.style.cssText += "display: inline-block;";
        button.style.cssText += "text-align: center;";
        button.style.cssText += "cursor: pointer;";

        button.innerHTML = Buttontext;
        button.onclick = function() {
            window.location.replace("https://www.youtube.com/playlist?list=UU" + cleanedID.substring(2, cleanedID.size));
        }
        document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[0].appendChild(button);
    }

    function doTheThing(){
        setTimeout(function() {
            async function fetchHTML() {
                const response = await fetch(window.location.href);
                // waits until the request completes...
                console.log(response.text().then(function (html) {
                    // This is the HTML from our response as a text string
                    var docHTML = html;
                    var idlocation = docHTML.search("externalChannelId"); //find location of externalChannelId
                    var extracted = docHTML.substring(idlocation,idlocation+60); // get only this part+-

                    var cleanedID = extracted.replace("externalChannelId\":\"", ""); //remove unnecesary part of string
                    cleanedID = cleanedID.substring(0,cleanedID.search("\",")); //remove unnecesary part of string

                    addButton("Playlist",cleanedID);
                    console.log("channel ID: " + cleanedID);
                    console.log("Playlist URL: https://www.youtube.com/playlist?list=UU" + cleanedID.substring(2, cleanedID.size));
                }));
            }
            fetchHTML();
        }, 5000);
    }

    var oldUrl = null;
    setInterval(function() {
        if(oldUrl != window.location.href){
            oldUrl = window.location.href;
            const element = document.getElementsByClassName('playlistcreate')[0];
            element.remove(); // Removes the div
            doTheThing();
        }
    }, 1000);

    doTheThing();
})();

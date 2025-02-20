
console.log("Hello Hello");

let pagetitle = document.querySelector("#page-title")

setTimeout(function(){
    document.querySelector("#page-title").style.color = "pink";
   // console.log("timeout worked!");
}, 3000)

document.querySelector("header").onclick = function() {
   // console.log("clicked header");
   document.querySelector("body").style.backgroundColor = "black";
}

document.addEventListener('DOMContentLoaded', loadHeader("../../header.html"), false);
function loadHeader(href)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    document.getElementById("header-container").innerHTML = xmlhttp.responseText;
}
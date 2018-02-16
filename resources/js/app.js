//Google Maps
var mlat = 0;
var mlon = 0;
var asn = null;

function initMap() {
    var location = {
        lat: mlat,
        lng: mlon
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.map,
        zoom: 13,
        center: location,
        disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: location,
        title: asn
    });
    marker.addListener('click', function toggleBounce() {
        marker.getAnimation() !== null ? marker.setAnimation(null) : marker.setAnimation(google.maps.Animation.BOUNCE);
    });
}
//Format text to CamelCase
function CamelCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}
//Get Table Data
function GetGeoData() {
    $("#wait").addClass("is-active");
    var uri = "https://ip.nf/";
    var ip = $("#ip").val();
    (ip == null) || (ip == "") ? uri += "me.json": uri = uri + ip + ".json";
    $.ajax({
        url: uri,
        dataType: 'json',
        type: 'get',
        success: CreateTable
    })
}
//Update Table
function CreateTable(data) {
    if (data.ip.ip !== null) {
        $("#aip").html("<b>" + data.ip.ip + "</b>");
        $("#aasn").html("<b>" + data.ip.asn + "</b>");
        $("#ahostname").html("<b>" + data.ip.hostname + "</b>");
        $("#alat").html("<b>" + data.ip.latitude + "</b>");
        $("#alon").html("<b>" + data.ip.longitude + "</b>");
        $("#acity").html("<b>" + data.ip.city + "</b>");
        $("#acountry").html("<b>" + data.ip.country + "</b>");
        $("#acountrycode").html("<b>" + data.ip.country_code + "</b>");
        $("#azipcode").html("<b>" + data.ip.post_code + "</b>");
        mlat = data.ip.latitude;
        mlon = data.ip.longitude;
        asn = data.ip.asn;
        $("#in").css("display", "auto");
        $("#in").css("height", "auto");
        $("#hero").show();
        initMap();
        $("#wait").removeClass("is-active");
    } else {
        var toast = document.querySelector("#message");
        $("#wait").removeClass("is-active");
        var msg = {
            message: CamelCase("oops...! Something went wrong")
        };
        toast.MaterialSnackbar.showSnackbar(msg);
    }
}
//If Offline
function isOffline() {
    var toast = document.querySelector("#warning");
    var msg = {
        message: "You are offline!"
    };
    toast.MaterialSnackbar.showSnackbar(msg);
}
//Events Handler
$(document).ready(function () {
    window.addEventListener('offline', isOffline, false);
    $("#locate").click(GetGeoData);
    var dialog = document.querySelector("dialog");
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    $("#help").click(function () {
        dialog.showModal();
    });
    $(".close").click(function () {
        dialog.close();
    });
});
//Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function (reg) {
        console.log('Service Worker segistered successfully', reg);
    }).catch(function (err) {
        console.warn('Error whilst registering Service Worker', err);
    });
}

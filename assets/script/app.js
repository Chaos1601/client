'use strict';

const system = document.getElementById('system');
const windows = document.getElementById('windows');
const batteryStatus = document.getElementById('battery-status');
const os = document.getElementById('os');
const language = document.getElementById('language');
const browser = document.getElementById('browser');
const pageW = document.getElementById('page-w');
const pageH = document.getElementById('page-h');
const orientation = document.getElementById('orientation');
const level = document.getElementById('level');
const status = document.getElementById('status');
const onlineStatus = document.getElementById('online-status');


// function onEvent(event, selector, callback) {
//     return selector.addEventListener(event, callback);
// }

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function create(element, parent = document) {
    return parent.createElement(element);
}


// System

// OS
let userAgent = navigator.userAgent;

// Check for the Windows operating system
if (userAgent.indexOf("Windows") !== -1) {
    if (userAgent.includes('Windows NT 10.0')) {
        os.innerText = 'OS: Windows';
    } else {
        os.innerText = 'OS: Mac/IOS';
    }
};

// Language
let browserLanguage = navigator.language;

language.innerText = `Language: ${browserLanguage}`;

// Browser
let browserUsed;

switch (true) {
    case /Edg/.test(userAgent):
    browserUsed = "Edge";
    break;
  case /Chrome/.test(userAgent):
    browserUsed = "Chrome";
    break;
  case /Firefox/.test(userAgent):
    browserUsed = "Firefox";
    break;
  default:
    browserUsed = "Unknown or Less Common Browser";
    break;
}

browser.innerText = `Browser: ${browserUsed}`;

// Windows
function setWindowDimensions() {
    pageW.innerText = `Window width: ${window.innerWidth}px`;
    pageH.innerText = `Window height: ${window.innerHeight}px`;
}

window.addEventListener('load', () => {
    setWindowDimensions();
});

window.addEventListener('resize', () => {
    setWindowDimensions();
});

// Orientation
if (window.innerWidth > window.innerHeight) {
    orientation.innerText = 'Orientation: landscape';
} else {
    orientation.innerText = 'Orientation: portrait';
};


if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
        batteryStatus.innerText = 'Battery';
        level.innerText = `Level: ${battery.level * 100}%`;
        status.innerText = `Status: ${battery.charging ? 'plugged in' : 'unplugged'}`;
        
        battery.addEventListener('chargingchange', function() {
            status.innerText = `Status: ${battery.charging ? 'plugged in' : 'unplugged'}`;
        });
        
        battery.addEventListener('levelchange', function() {
            level.innerText = `Battery Level: ${battery.level * 100}%`;
        });
    }).catch(function(error) {
        console.error('Battery API error: ', error);
        batteryStatus.innerText = 'Battery Status: unavailable';
    });
} else {
    batteryStatus.innerText = 'Battery';
    level.innerText = 'Level: unavailable';
    status.innerText = 'Charging: unavailable';
}


// Online/Offline
function updateOnlineStatus() {
    if (navigator.onLine) {
      onlineStatus.innerText = 'Online';
    } else {
      onlineStatus.innerText = 'Offline';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();

function onlineColor() {
    if (navigator.onLine) {
        onlineStatus.style.backgroundColor = 'var(--app-green)'; 
      } else {
        onlineStatus.style.backgroundColor = 'var(--app-red)'; 
      }
}

window.addEventListener('online', onlineColor);
window.addEventListener('offline', onlineColor);
  
onlineColor();
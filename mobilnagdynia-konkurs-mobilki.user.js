// ==UserScript==
// @name        Konkurs Rowerowy mobilki
// @namespace   pl.enux.mobilnagdynia
// @description Dostosowuje witrynę do urządzeń mobilnych (komórki itp). Wymagany jest także CSS.
// @include     http://dopracyjaderowerem.mobilnagdynia.pl/*
// @include     https://dopracyjaderowerem.mobilnagdynia.pl/*
// @version     1.0
// @grant       none
// @run-at		document-start
// ==/UserScript==

function addViewport() {
	var metaTag=document.createElement('meta');
	metaTag.name = "viewport"
	metaTag.content = "width=device-width, initial-scale=1.0"
	document.querySelector('head').appendChild(metaTag);
}

addViewport();
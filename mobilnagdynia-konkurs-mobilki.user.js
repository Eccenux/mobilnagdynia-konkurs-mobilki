// ==UserScript==
// @name        Konkurs Rowerowy mobilki
// @namespace   pl.enux.mobilnagdynia
// @description Dostosowuje witrynę do urządzeń mobilnych (komórki itp). Wymagany jest także CSS.
// @include     http://dopracyjaderowerem.mobilnagdynia.pl/*
// @include     https://dopracyjaderowerem.mobilnagdynia.pl/*
// @version     1.1
// @grant       none
// @run-at		document-start
// ==/UserScript==

/**
	Włączenie skalowania witryny.
*/
function addViewport() {
	var metaTag=document.createElement('meta');
	metaTag.name = "viewport"
	metaTag.content = "width=device-width, initial-scale=1.0"
	document.querySelector('head').appendChild(metaTag);
}
addViewport();

/**
	Usprawnienia formularza.
*/
function enhanceForm() {
	// km numeryczne i bez domyślnie wpisanego 0
	var km = document.getElementById('przejazd___Liczba_przejechanych_km_na_rowerze');
	km.setAttribute('type', 'number');
	km.value='';

	// dwie wartości w select? bez sensu...
	var kierunek = document.getElementById('przejazd___Podroz');
	kierunek.style.display = 'none';
	var kierunekSimple = document.createElement('div');
	//kierunekSimple.style.cssText = "margin: .2em 0 1em";
	kierunekSimple.innerHTML = ''
		+ '<label><input type="radio" name="ignore__przejazd___Podroz" value="do pracy" />do pracy</label>'
		+ '<label><input type="radio" name="ignore__przejazd___Podroz" value="z pracy" />z pracy</label>'
	;
	kierunekSimple.addEventListener("click", function(e) {
		if(e.target && e.target.nodeName.toLowerCase() === "input") {
			console.log(e.target.value);
			kierunek.value = e.target.value;
			// Create a new 'change' event
			var event = new Event('change');
			// Dispatch it.
			kierunek.dispatchEvent(event)			
		}
	});
	kierunek.parentNode.appendChild(kierunekSimple);
}
//window.addEventListener ("load", enhanceForm, false);
document.addEventListener("DOMContentLoaded", enhanceForm, false);
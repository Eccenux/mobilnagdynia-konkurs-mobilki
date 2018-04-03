// ==UserScript==
// @name        Konkurs Rowerowy mobilki
// @namespace   pl.enux.mobilnagdynia
// @version     2.0.1
// @description [2.0.1] Dostosowuje witrynę do urządzeń mobilnych (komórki itp).
// @include     http://dopracyjaderowerem.mobilnagdynia.pl/*
// @include     https://dopracyjaderowerem.mobilnagdynia.pl/*
// @grant       GM_addStyle
// @run-at      document-start
// @updateURL   https://github.com/Eccenux/mobilnagdynia-konkurs-mobilki/raw/master/mobilnagdynia-konkurs-mobilki.meta.js
// @downloadURL https://github.com/Eccenux/mobilnagdynia-konkurs-mobilki/raw/master/mobilnagdynia-konkurs-mobilki.user.js
// ==/UserScript==

/**
	Włączenie skalowania witryny.
*/
function addViewport() {
	var metaTag=document.createElement('meta');
	metaTag.name = "viewport";
	metaTag.content = "width=device-width, initial-scale=1.0";
	document.querySelector('head').appendChild(metaTag);
}
addViewport();

/**
	Usprawnienia formularza.
*/
function enhanceForm() {
	// km numeryczne i bez domyślnie wpisanego 0
	var km = document.getElementById('przejazd___Liczba_przejechanych_km_na_rowerze');
	if (km) {
		km.setAttribute('type', 'number');
		km.value='';
	}

	// dwie wartości w select? bez sensu...
	var kierunek = document.getElementById('przejazd___Podroz');
	if (kierunek) {
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
}
//window.addEventListener ("load", enhanceForm, false);
document.addEventListener("DOMContentLoaded", enhanceForm, false);

/**
	Dodanie CSS.
	Kopia z: `mobilnagdynia-konkurs-mobilki.css`
*/
function addCss() {
	var cssText = `
/* style w wąskim oknie */
@media only screen and (max-width: 1000px) {
	/* układ główny */
	body {
		min-width: auto;
	}
	.art-sheet {
		width: auto;
	}
	.art-content-layout .art-content {
		width: auto;
		display: block;
		float: left;
	}
	.art-content-layout .art-sidebar1 {
		width: auto;
		float: left;
	}
	/* zbędne */
	header .art-textblock,
	header .art-headline,
	header .art-slogan,
	header .art-shapes
	{
		display: none;
	}
	/* header back */
	.art-header,
	#art-header-bg {
		background-image: none;
	}
	body header.art-header {
		background-color: #015F8D;
	}
	/* nie logo (kontakt) */
	.art-logo.art-logo-1931633633 {
		display: none !important;
	}
	/* logo */
	.art-logo {
		position: static !important;
		display: block !important;
		float: right;
		height: auto;
		width: 8em;
	}
	.art-logo img {
		width: 100%;
	}
	/* fit menu */
	header.art-header .art-nav
	{
		width: calc(100% - 9em)
	}
	/* logo w tle na wąskim */
	@media only screen and (max-width: 600px) {
		.art-logo {
			opacity: .5;
			position: absolute !important;
			bottom: auto !important;
			left: auto !important;
			right: 0 !important;
			top: 0 !important;
			width: 8em;
		}
		header.art-header .art-nav
		{
			width: 100%;
		}
	}
	/*
		menu
	*/
	header.art-header {
		height: auto;
		position: relative;
	}
	header.art-header .art-nav {
		position: static;
	}
	ul.art-hmenu ul
	{
		visibility: visible;
	}
	/* ozdobniki */
	ul.art-hmenu li::before,
	ul.art-hmenu li::after,
	ul.art-hmenu ul::before,
	ul.art-hmenu ul::after {
		display: none !important;
	}
	ul.art-hmenu ul,
	ul.art-hmenu li,
	ul.art-hmenu a
	{
		position: static !important;
		display: inline-block !important;
		float: none !important;
		line-height: 1em !important;
		height: auto !important;
		width: auto !important;
		min-height: 0 !important;
		min-width: 0 !important;
		padding: 0 !important;
		margin: 0 !important;
		font-weight: normal !important;
		font-size: 100% !important;
		border: 0px solid black !important;
		border-radius: 0px !important;
	}
	ul.art-hmenu a
	{
		background-color: rgba(0,0,0,0.1) !important;
	}
	ul.art-hmenu a
	{
		padding: .5em !important;
		margin: .5em !important;
	}
	ul.art-hmenu a {
		position: relative !important;
		z-index: 200 !important;
	}
	/* mniej istotne pozycje w menu */
	/*
	strona główna,
	wcześniejsze edycje
	*/
	ul.art-hmenu li.item-119,
	ul.art-hmenu li.item-241 {
		display: none !important;
	}
	/* jakieś dziwne pozycje (firmy) w menu "wyniki" */
	ul.art-hmenu li.item-159 li[class^=item-4] {
		display: none !important;
	}
	/* jeszcze mniej pozycji w menu na wąskim */
	@media only screen and (max-width: 400px) {
		/*
		zasady,
		profil,
		kontakt
		*/
		ul.art-hmenu li.item-142,
		ul.art-hmenu li.item-141,
		ul.art-hmenu li.item-146 {
			display: none !important;
		}
	}

	/* formularz dodawania */
	.fabrikgrid_checkbox {
		margin: .2em 0;
		padding: .2em;
	}
	.fabrikGroup .row-fluid {
		margin-top: .2em;
	}
	fieldset label {
		width: auto !important;
	}
	#przejazd___data_przej_cal_cal_img
	{
		display: none;
	}
}
	`;
	//var styleTag=document.createElement('style');
	//styleTag.innerHTML = cssText;
	//document.querySelector('head').appendChild(styleTag);
	GM_addStyle(cssText);
}
document.addEventListener("DOMContentLoaded", addCss, false);

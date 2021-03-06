// ==UserScript==
// @name        Konkurs Rowerowy mobilki
// @namespace   pl.enux.mobilnagdynia
// @version     2.3.3
// @description [2.3.3] Dostosowuje witrynę do urządzeń mobilnych (komórki itp).
// @include     http://dopracyjaderowerem.mobilnagdynia.pl/*
// @include     https://dopracyjaderowerem.mobilnagdynia.pl/*
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
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
 * Usprawnienia dla daty przejazdu.
 */
function dataPrzejazduEnhance() {
	var fieldContainer = document.querySelector('.fb_el_przejazd___data_przej');
	if (!fieldContainer) {
		return;
	}

	// "przyciski"
	var buttonsContainer = document.createElement('div');
	buttonsContainer.className = 'btn-group';
	buttonsContainer.style.cssText = 'margin:.5em 0 1em';
	// użyte linki, bo Fabrik dziwnie reaguje na przyciski <button>
	// (dolny przycisk jest wyłączany; `updateField` trzeba robić w `setTimeout`)
	buttonsContainer.innerHTML = `
		<a href="javascript:void(0)" class="art-button">&lt;</a>
		<a href="javascript:void(0)" class="art-button">dziś</a>
		<a href="javascript:void(0)" class="art-button">&gt;</a>
	`;
	fieldContainer.appendChild(buttonsContainer);

	// Fabrik nie jest gotowy od razu, dlatego pobieranie pola za każdym razem
	function getField() {
		return unsafeWindow.Fabrik.blocks['form_1'].formElements.przejazd___data_przej;
	}
	function updateField(dt) {
		var dataPrzejazduFabrik = getField();
		dataPrzejazduFabrik.update(dt);
	}
	function readField() {
		var dataPrzejazduFabrik = getField();
		var value = dataPrzejazduFabrik.getValue();
		return new Date(value);
	}

	var buttons = buttonsContainer.querySelectorAll('a');
	// poprzedni
	buttons[0].onclick = function() {
		var dt = readField();
		dt.setDate(dt.getDate() - 1);
		updateField(dt);
	};
	// następny
	buttons[2].onclick = function() {
		var dt = readField();
		dt.setDate(dt.getDate() + 1);
		updateField(dt);
	};
	// dziś
	buttons[1].onclick = function() {
		var dt = new Date();
		dt.setHours(0,0,0,0); // midnight
		updateField(dt);
	};
}

/**
	Usprawnienia formularza.
*/
function enhanceForm() {
	// data przejazdu
	dataPrzejazduEnhance();

	// km numeryczne i bez domyślnie wpisanego 0
	var km = document.getElementById('przejazd___Liczba_przejechanych_km_na_rowerze');
	if (km) {
		km.setAttribute('type', 'number');
		km.value = '';
		// odtworzenie
		var prevKmValue = GM_getValue(km.id, null);
		if (prevKmValue && prevKmValue.length) {
			km.value = prevKmValue;
		}
		// zapis
		km.addEventListener('change', function(){
			GM_setValue(km.id, km.value);
		});
	}

	// dwie wartości w select? bez sensu...
	var kierunek = document.getElementById('przejazd___Podroz');
	if (kierunek) {
		kierunek.style.display = 'none';
		var kierunekSimple = document.createElement('div');
		//kierunekSimple.style.cssText = "margin: .2em 0 1em";
		kierunekSimple.innerHTML = `
			<label><input type="radio" name="ignore__przejazd___Podroz" value="do pracy" />do pracy</label>
			<label><input type="radio" name="ignore__przejazd___Podroz" value="z pracy" />z pracy</label>
		`;
		kierunekSimple.addEventListener("click", function(e) {
			if(e.target && e.target.nodeName.toLowerCase() === "input") {
				console.log(e.target.value);
				kierunek.value = e.target.value;
				// Create a new 'change' event
				var event = new Event('change');
				// Dispatch it.
				kierunek.dispatchEvent(event);
			}
		});
		kierunek.parentNode.appendChild(kierunekSimple);
	}
}
//window.addEventListener ("load", enhanceForm, false);
document.addEventListener("DOMContentLoaded", enhanceForm, false);
/**
	Dodanie CSS.
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
		color: white  !important;
	}
	ul.art-hmenu .current > a
	{
		color: #fee459 !important;
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
	ul.art-hmenu li.item-159 > a {
		display: none !important;
	}
	/* jeszcze mniej pozycji w menu na wąskim */
	@media only screen and (max-width: 400px) {
		/*
		zasady,
		profil,
		kontakt,
		liczba kilometrów (i tak nieczytelne)
		Średnia liczba kilometrów (j/w)
		Liczba przejazdów (j/w)
		rejestracja
		*/
		ul.art-hmenu li.item-142,
		ul.art-hmenu li.item-141,
		ul.art-hmenu li.item-146,
		ul.art-hmenu li.item-160,
		ul.art-hmenu li.item-488,
		ul.art-hmenu li.item-489,
		ul.art-hmenu li.item-245 {
			display: none !important;
		}
		/* mniejsze logo */
		.art-logo {
			width: 2em;
			opacity: .7;
		}
		/* ukrycie nieczytelnych elementów artykułu (za szeroki obrazek i tabelka) */
		.art-article > table,
		.art-article > p > img {
			display: none !important;
		}
		/* przymulające ozdobniki - FB i animacja z logo */
		#showplus_images_logafirm,
		#fb-root {
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

	dynamicStyle();
}
document.addEventListener("DOMContentLoaded", addCss, false);

/**
 * Dodatkowe, dynamiczne style.
 */
function dynamicStyle() {
	function isHidden(el) {
		var style = window.getComputedStyle(el);
		return (style.display === 'none');
	}
	// hide facebook parent if hidden
	try {
		if (isHidden(document.querySelector('#fb-root'))) {
			document.querySelector('#fb-root').parentNode.parentNode.parentNode.style.display="none";
		}
	} catch (error) {

	}
}
//document.addEventListener("DOMContentLoaded", dynamicStyle, false);

// Benutzerdefiniertes JavaScript für H5P-Elemente: Hier ein Beispiel
document.addEventListener('DOMContentLoaded', function () {
	var h5pIframes = document.querySelectorAll('iframe.h5p-iframe');
	h5pIframes.forEach(function (iframe) {
		iframe.addEventListener('load', function () {
			setTimeout(function () {
				// console.log(
				// 	'Neue Seite im iFrame geladen:',
				// 	iframe.contentWindow.location.href
				// );
				var h5pContent = iframe.contentDocument.querySelector(
					'.h5p-question-content'
				);
				var h5pButton = iframe.contentDocument.querySelector(
					'.h5p-question-check-answer'
				);
				if (h5pContent) {
					h5pContent.style.border = '5px solid red';

					console.log('H5P-Element geladen und angepasst:', h5pContent);
				}
				if (h5pButton) {
					h5pButton.style.backgroundColor = 'red';
				}
			}, 0);
		});
	});
});

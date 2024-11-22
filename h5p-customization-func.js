// Benutzerdefiniertes JavaScript für H5P-Elemente: Hier als Funktion

// Declare the h5p elements you want to modify using their CSS selectors
const h5pElements = ['.h5p-question-content', '.h5p-question-check-answer'];

function modifyH5PElements(h5pModify) {
	// Here you can access the selected H5P elements and modify them
	try {
		if (h5pModify[h5pElements[0]]) {
			h5pModify[h5pElements[0]].style.border = '5px solid red';
		}

		// Alternative way to modify the H5P element
		// if (h5pModify['.h5p-question-content']) {
		// 	h5pModify['.h5p-question-content'].style.border = '5px solid red';
		// }

		if (h5pModify[h5pElements[1]]) {
			h5pModify[h5pElements[1]].style.backgroundColor = 'red';
		}
	} catch (e) {
		console.error('Error modifying H5P elements:', e);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	var h5pIframes = document.querySelectorAll('iframe.h5p-iframe');
	h5pIframes.forEach(function (iframe) {
		iframe.addEventListener('load', function () {
			setTimeout(function () {
				let h5pToBeModified = {};
				for (let i = 0; i < h5pElements.length; i++) {
					h5pToBeModified[h5pElements[i]] =
						iframe.contentDocument.querySelector(h5pElements[i]);
				}
				modifyH5PElements(h5pToBeModified);
			}, 0);
		});
	});
});

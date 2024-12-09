// Declare the h5p elements you want to modify using their CSS selectors
const h5pElements = ['.ui-draggable'];

// Declare the h5p class you want to listen to for changes
const h5pClassesChanged = ['h5p-drag-dropped'];

// Declare new font size for arabic text
const newFontSize = '20pt';

// Function to modify H5P elements
function modifyH5PElements(h5pModify) {
	// Here we access the selected H5P elements and modify them
	try {
		// Check if our first class is present
		if (h5pModify[h5pElements[0]]) {
			// Loop through all elements that belong to our first class
			h5pModify[h5pElements[0]].forEach(function (element) {
				// Check if the element contains arabic characters
				if (containsArabic(element)) {
					// Change the font size
					element.style.fontSize = newFontSize;

					// Listen for changes --> We need to set size back to default after dropping the word
					var observer = new MutationObserver(function (mutations) {
						mutations.forEach(function (mutation) {
							// Check if the class has changed
							if (mutation.attributeName === 'class') {
								// Check if the class is the one we are looking for
								if (mutation.target.className.includes(h5pClassesChanged[0])) {
									// Reset the font size
									mutation.target.style.fontSize = '1em';
								} else {
									// Change the font size otherwise
									mutation.target.style.fontSize = newFontSize;
								}
							}
						});
					});

					// Start listening
					observer.observe(element, {
						attributes: true,
					});
				}
			});
		}
	} catch (e) {
		// Error handling
		console.error('Error modifying H5P elements:', e);
	}
}

// Function to check if text contains arabic characters
function isArabic(text) {
	var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
	result = pattern.test(text);
	return result;
}

// Function to check if element contains arabic characters
function containsArabic(element) {
	// Check if the element itself contains arabic characters
	result = isArabic(element.innerText);
	// If not, check if the element has child nodes
	// And check if any of the child nodes contain arabic characters recursively
	if (!result && element.hasChildNodes()) {
		element.childNodes.forEach(function (child) {
			result = containsArabic(child);
			if (result) {
				return;
			}
		});
	}
	return result;
}

// Main part of our script executed on page load
// Get H5P elements from iFrame using DOMContentLoaded event --> We need to wait until the page is loaded
document.addEventListener('DOMContentLoaded', function () {
	var h5pIframes = document.querySelectorAll('iframe.h5p-iframe');
	// Loop through all iframes (usually one, but one never knows...)
	h5pIframes.forEach(function (iframe) {
		// Wait until the page is loaded inside iFrame --> Set listener for iFrame content load
		iframe.addEventListener('load', function () {
			// Interestingly, we need to set timeout even though there is no timeout (0)
			setTimeout(function () {
				let h5pToBeModified = {};
				// Loop through all elements we want to modify
				for (let i = 0; i < h5pElements.length; i++) {
					// Query the elements we want to modify from DOM and store them in object
					h5pToBeModified[h5pElements[i]] =
						iframe.contentDocument.querySelectorAll(h5pElements[i]);
				}
				// Call function to modify H5P elements
				modifyH5PElements(h5pToBeModified);
			}, 0);
		});
	});
});

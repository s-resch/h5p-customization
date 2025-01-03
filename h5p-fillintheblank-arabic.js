// Declare the h5p elements you want to modify using their CSS selectors
const h5pElementsFB = ['.h5p-question-content'];

// Declare new font size for arabic text
const newFontSizeFB = '20pt';

// Function to modify H5P elements
function modifyh5pElementsFB(h5pModify) {
	// Here we access the selected H5P elements and modify them
	try {
		// Check if our first class is present
		if (h5pModify[h5pElementsFB[0]]) {
			// Loop through all elements that belong to our first class
			h5pModify[h5pElementsFB[0]].forEach(function (element) {
				// Check if the element contains arabic characters
				if (containsArabicFB(element)) {
					// Change the font size
					element.style.fontSize = newFontSizeFB;
				}
			});
		}
	} catch (e) {
		// Error handling
		console.error('Error modifying H5P elements:', e);
	}
}

// Function to check if text contains arabic characters
function isArabicFB(text) {
	var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
	result = pattern.test(text);
	return result;
}

// Function to check if element contains arabic characters
function containsArabicFB(element) {
	// Check if the element itself contains arabic characters
	result = isArabicFB(element.textContent);
	// If not, check if the element has child nodes
	// And check if any of the child nodes contain arabic characters recursively
	if (!result && element.hasChildNodes()) {
		element.childNodes.forEach(function (child) {
			result = containsArabicFB(child);
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
	var h5pIframesFB = document.querySelectorAll('iframe.h5p-iframe');
	// Loop through all iframes (usually one, but one never knows...)
	h5pIframesFB.forEach(function (iframe) {
		// Wait until the page is loaded inside iFrame --> Set listener for iFrame content load
		iframe.addEventListener('load', function () {
			// Interestingly, we need to set timeout even though there is no timeout (0)
			setTimeout(function () {
				let h5pToBeModifiedFB = {};
				// Loop through all elements we want to modify
				for (let i = 0; i < h5pElementsFB.length; i++) {
					// Query the elements we want to modify from DOM and store them in object
					h5pToBeModifiedFB[h5pElementsFB[i]] =
						iframe.contentDocument.querySelectorAll(h5pElementsFB[i]);
				}
				// Call function to modify H5P elements
				modifyh5pElementsFB(h5pToBeModifiedFB);
			}, 0);
		});
	});
});

// Declare the h5p elements you want to modify using their CSS selectors
const h5pElementsDC = ['.h5p-dialogcards-cardwrap-set'];

// Declare the (nested) h5p class which you want to change the text for
const h5pTextClassToChangeDC = ['.h5p-dialogcards-card-text-area'];

// Declare new font size for arabic text
const newFontSizeDC = '20pt';

// Function to modify H5P elements
function modifyh5pElementsDC(h5pModify) {
	// Here we access the selected H5P elements and modify them
	try {
		// Check if our first class is present
		if (h5pModify[h5pElementsDC[0]]) {
			// Loop through all elements that belong to our first class
			h5pModify[h5pElementsDC[0]].forEach(function (element) {
				// Check if the element contains arabic characters
				if (containsArabicDC(element)) {
					// Change the font size
					let texts = element.querySelectorAll(h5pTextClassToChangeDC[0]);
					texts.forEach((text) => (text.style.fontSize = newFontSizeDC));

					// Listen for changes --> We need to set size back to default after dropping the word
					var observerDC = new MutationObserver(function (mutations) {
						mutations.forEach(function (mutation) {
							// Check if the class has changed
							if (mutation.attributeName === 'class') {
								// As the card stack is lazily loaded,
								// we have to access all elements again
								let texts = element.querySelectorAll(h5pTextClassToChangeDC[0]);
								texts.forEach((text) => (text.style.fontSize = newFontSizeDC));
							}
						});
					});

					// Start listening --> We listen to any change of the card set
					// For this, we also observe the subtree
					observerDC.observe(element, {
						attributes: true,
						subtree: true,
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
function isArabicDC(text) {
	var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
	result = pattern.test(text);
	return result;
}

// Function to check if element contains arabic characters
function containsArabicDC(element) {
	// Check if the element itself contains arabic characters
	result = isArabicDC(element.textContent);
	// If not, check if the element has child nodes
	// And check if any of the child nodes contain arabic characters recursively
	if (!result && element.hasChildNodes()) {
		element.childNodes.forEach(function (child) {
			result = containsArabicDC(child);
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
	var h5pIframesDC = document.querySelectorAll('iframe.h5p-iframe');
	// Loop through all iframes (usually one, but one never knows...)
	h5pIframesDC.forEach(function (iframe) {
		// Wait until the page is loaded inside iFrame --> Set listener for iFrame content load
		iframe.addEventListener('load', function () {
			// Interestingly, we need to set timeout even though there is no timeout (0)
			setTimeout(function () {
				let h5pToBeModifiedDC = {};
				// Loop through all elements we want to modify
				for (let i = 0; i < h5pElementsDC.length; i++) {
					// Query the elements we want to modify from DOM and store them in object
					h5pToBeModifiedDC[h5pElementsDC[i]] =
						iframe.contentDocument.querySelectorAll(h5pElementsDC[i]);
				}
				// Call function to modify H5P elements
				modifyh5pElementsDC(h5pToBeModifiedDC);
			}, 0);
		});
	});
});

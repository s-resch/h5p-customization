# H5P Customization for Moodle

Here you find customization routines for H5P widgets used within Moodle.

## Usage

You can integrate them in your Moodle using the Text Editor of the Description section of your Moodle activity encapsulating the H5P widget to be customized.

Use the Code-Button of the Text Editor (</>-Button) and enter a script-Tag section like the following:

```
<script>

</script>
```

Between the `<script>` and the `</script>` tag you can insert the JavaScript code from the corresponding JavaScript file in this repository (e.g. the code from `h5p-dragwords-arabic.js` if you want to change the font size of arabic text of the draggable words in H5P Drag The Words activity).

Then, you can adjust the code, especially the values for the changes, e.g. the new font size.

## Requirements

Tested with:

- Moodle, v. 3.11
- Firefox 133.0 64-bit on Windows
- Google Chrome 131.0.6778.109 64-bit on Windows
- Microsoft Edge 131.0.2903.86 64-bit on Windows

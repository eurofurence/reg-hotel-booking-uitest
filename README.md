# UI Tests for the Eurofurence Hotelbooking App

Implemented using [testcafe](https://github.com/DevExpress/testcafe) in JavaScript (ECMAScript6 to be precise).

## Installation

All you need besides a clone of this repository is testcafe. Once [node.js](https://nodejs.org/en/download/) 
(and thus npm) is installed and in your path, run

```
npm install -g testcafe
```

## Running the Tests

### Command Line 

You should simply be able to run a command like ```testcafe firefox src/``` while inside this project.  

### JetBrains WebStorm (Windows)

Configure a node.js runtime configuration with 

Node Interpreter: ~\AppData\Roaming\npm\testcafe.cmd

Node Parameters: firefox (or chrome...)

Working Directory: <project directory root>

JavaScript file: src/main.js

## Test Cases To Be Automated

### Title Page

 - T1: When accessing the main URL, the title page is shown in English
 - T2: On the title page, switching language to German works (check text/button captions etc.)
 - T3: On the title page, switching language back to English works (check text/button captions etc.)
 - T4: On the title page, continuing to the form page works

### Form Page

 - F1: On the form page, initial setup when first switching there is sensible 
   (single room, first room type, default arrival and departure date, disclaimer not ticked, fields enabled)
 - F2: On the form page, the user can enter booking information for a single room and the correct prices are shown
 - F3: On the form page, the user can enter booking information for a double room and the correct prices are shown
 - F4: On the form page, the user can enter booking information for a triple room and the correct prices are shown
 - F5: On the form page, the user can enter a long message in the comments field (try just below 2000 characters)
 - F6: On the form page, before the disclaimer checkbox is checked, the "Generate Email" button is disabled, 
   and clicking it produces an error message and does not proceed to the email page
 - F7: On the form page, switching language from English to German works 
   (field values and captions show correctly, and all entered information is retained, including date with format change)
 - F8: On the form page, switching language from German to English works
   (field values and captions show correctly, and all entered information is retained, including date with format change)
 - F9: On the form page, after the disclaimer checkbox is checked, the submit button becomes available and it works
 - F10 On the form page, these fields are mandatory for the first person:
   Name (min 3 characters), Street Address (min 3 characters), City and ZIP (min 3 characters), 
   Country (min 3 characters), Email address (no spaces, must contain an @), Phone Number (min 3 characters).
   If any of them is not set initially or cleared, the Generate Email button stays/becomes unavailable and the fields 
   are somehow marked as "this field causes an error".
 - F11 On the form page, even when double or triple room is selected, their personal information can be left
   blank as long as the info for the first person is provided. An email can be generated that states that
   data for the second or third person is not provided (to avoid booking errors due to misreading by the hotel)
 - F12 On the form page, comments are limited to 2000 characters in length, any additional input causes a validation
   error.

### Email Page

 - E1: On the email page, before the secret code has been made available, the proper secret phrase, 
   convention keyword and target email address are not shown, and this is very clearly indicated in the generated mail text.
   No link for sending the mail message with external mail programs is generated.
 - E2: On the email page, after the secret code has been made available, the proper secret phrase,
   convention keyword and target email address ARE shown, the fact that you can now send the mail is made clear,
   and a link for sending the mail message with an external mail program is generated.
 - E3: On the email page, the captions and mail text are correct for German - single room - first room option
   (and the room type is spelled out, not given as a number)
   (and exactly one set of personal info is printed in the email )
 - E4: On the email page, the captions and mail text are correct for German - double room - second room option
   leave the info for the second person blank in this case
   (and the room type is spelled out, not given as a number)
   (and exactly two sets of personal info are printed in the email, with the second being shown as not provided)
 - E5: On the email page, the captions and mail text are correct for German - triple room - last room option
   (and the room type is spelled out, not given as a number)
   (and exactly three sets of personal info are printed in the email)
 - E6: On the email page, the captions and mail text are correct for English - single room - first room option
   (and the room type is spelled out, not given as a number)
   (and exactly one set of personal info is printed in the email )
 - E7: On the email page, the captions and mail text are correct for English - double room - second room option
   (and the room type is spelled out, not given as a number)
   (and exactly two sets of personal info are printed in the email)
 - E8: On the email page, the captions and mail text are correct for English - triple room - last room option
   leave the personal info for the second and third person blank in this case
   (and the room type is spelled out, not given as a number)
   (and exactly three sets of personal info are printed in the email, with the second and third being shown as
   not provided)
 - E9: On the email page, if a long message was entered in the comments field, it is included as is in the mail
 - E10: On the email page, switching languages from German to English works, and the mail properly changes language
   (including field content formatting, use case E3 above)
 - E11: On the email page, switching languages from English to German works, and the mail properly changes language 
   (including field content formatting, use case E8 above to test a different combination)
 - E12: On the email page, the content of all input fields on the email page cannot be edited
 - E13 TODO: On the email page, there is an easy to understand way to get back to the form page 
 - E14 TODO: On the email page, the page states how long until the secret code will be made available, and then
   it automatically reloads with all information intact

## Manual Test Cases / Code Verification

 - Check that it uses server side script response for time to activation of secret code
 - Try the app on various mobile devices and with various desktop browsers

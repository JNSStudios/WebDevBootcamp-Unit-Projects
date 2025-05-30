/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// begin by asking for user input (should be a URL)

inquirer
    .prompt([
        {   
            message: "Enter URL: ",
            name: "URL"
        }
    ])
    .then((answers) => {
        // take URL and convert it to QR code and save it

        var qrimg = qr.image(answers.URL, {type: 'png'});

        qrimg.pipe(fs.createWriteStream("qr_img.png"));

        // save URL to txt file
        fs.writeFile("URL.txt", answers.URL, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });
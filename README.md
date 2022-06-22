# SellPhone
## COMP5347 Group 19

This Application was built on the following environments:
- Front End - React, NextUI, Bootstrap
- Back End - Node JS

## Getting Started

Please clone the GitHub repository or download the source code in ```zip``` format.

### ```.env``` File

An ```.env``` file contains parameters which are necessary to hook the App with the database. Please create this file in the ```server``` directory and ensure it is complete with the following:

```
DB = ""

JWTPRIVATEKEY = "pwd"
BASE_URL = http://localhost:3000/

HOST = smtp.gmail.com
SERVICE = gmail
EMAIL_PORT = 587
SECURE = false
USER = ""
PASS = ""
```

- **DB** - Your connection link to the MongoDB database
- **USER** - Your Google email address (the account you wish to use for sending email verification links)
- **PASS** - Your Google app password (the password associated to that account)


To generate a Google app password, please follow the instructions here: https://support.google.com/accounts/answer/185833?hl=en

If you experience any issues with email verification, please navigate to the database and manually update the ```verified``` value to ```true``` for your User object.

### Running the App

1. Open two windows of command prompt (or terminal) on your PC
2. Navigate to the root folder and ```cd``` to```server``` on one window, and ```client``` on the other. 
3. Run the following command in both windows to install the required dependencies and modules: ```npm install```
4. Once installed, run the following command in both windows to start the Application: ```npm start```
5. In your browser, navigate to the following URL to begin the app: ```localhost:3000```

## Authors

- Anand Prakash
- Dan
- Dennis
- Sharmin

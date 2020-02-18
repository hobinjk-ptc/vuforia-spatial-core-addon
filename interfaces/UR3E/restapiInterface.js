const fetch = require('node-fetch');

/*
*  This class connects to the MIR RESTful API
*  in order to get, post or delete information
*  from the robot's server.
*/
class restapiInterface {

    constructor(hostIP){

        // MIR100 REST API INFO
        this._restAddress = "http://" + hostIP + "/api/v2.0.0";
        //const restAddress = "http://mir.com/api/v2.0.0";
        this._authorization = "Basic ZGlzdHJpYnV0b3I6NjJmMmYwZjFlZmYxMGQzMTUyYzk1ZjZmMDU5NjU3NmU0ODJiYjhlNDQ4MDY0MzNmNGNmOTI5NzkyODM0YjAxNA==";

    }

    // Example GET method implementation:
    getData(url = '') {

        // Default options are marked with *

        //console.log('   -   -   -   GET: ' + url);

        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "authorization": this._authorization,
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
        })
            .then(response => response.json()); // parses JSON response into native Javascript objects
    }

    // Example GET method implementation:
    /*getImg() {

        //console.log('   -   -   -   GET: ' + url);

        let url = 'http://10.10.10.111/?mode=get-map&calltype=light&id=b1bf0757-1e42-11e9-8200-94c6911e8fa3&t=1561742783';

        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "image/png",
                "authorization": this._authorization,
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
        })
            .then(response => response.blob()); // parses JSON response into native Javascript objects
    }*/


    // Example POST method implementation:
    postData(url = '', data = {}) {

        //console.log('   -   -   -   POST: ' + url + " | Body: " + JSON.stringify(data));

        // Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "authorization": this._authorization,
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })

        //.then(response => response.json());   // parses JSON response into native Javascript objects
            .then(response => response.text())      // convert to plain text
        //.then(text => console.log(text))      // then log it out
    }

    // Example DELETE method implementation:
    deleteData(url = '') {

        //console.log('   -   -   -   DELETE: ' + url + ");

        // Default options are marked with *
        return fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "authorization": this._authorization,
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer" // no-referrer, *client
        })

        //.then(response => response.json());   // parses JSON response into native Javascript objects
            .then(response => response.text())      // convert to plain text
        //.then(text => console.log(text))      // then log it out
    }
}

exports.RestAPIInterface = restapiInterface;

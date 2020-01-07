// TODO: tried to turn repeating code into a separate method. couldn't get it to work

let apiURL = "/encrypter_api/";

function populateTable() {
    let url = apiURL + "getAll"; // must be right url. url is different on embedded TC and external TC
    // send JSON request using Fetch API
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        response => {
            // returns Promise
            return response.json();
        })
        .then((response) => {
            // now it'a JSON not Promise
            let txt = "";
            // go / loop through returned JSON array
            for (x in response) {
                // construct HTML string
                txt += "<tr class='dataRow' onclick='rowClick(this)'><td class='dataColumn'>" + response[x].encryptedData + "</td>";
                txt += "<td>" + response[x].userName + "</td></tr>";
            }
            // insert constructed HTML string into HTML document
            document.getElementById("resultsTableBody").innerHTML = txt;
        });
}

function getDataJson() {
    let dataInputFieldValue = document.getElementById("dataInputField").value;
    let userInputFieldValue = document.getElementById("userInputField").value;
    let passwordInputFieldValue = document.getElementById("passwordInputField").value;
    if (userInputFieldValue === "") {
        userInputFieldValue = "default";
    }
    if (passwordInputFieldValue === "") {
        passwordInputFieldValue = "default";
    }
    let dataJson = {
        data: dataInputFieldValue,
        user: userInputFieldValue,
        password: passwordInputFieldValue
    };
    return dataJson;
}

function encryptButtonClickFetch() {
    let url = apiURL + "encrypt";
    fetch(url, {
        body: JSON.stringify(getDataJson()),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        response => {
            return response.json();
        })
        .then((response) => {
            let txt = "";
            for (x in response) {
                txt += "<tr class='dataRow' onclick='rowClick(this)'><td class='dataColumn'>" + response[x].encryptedData + "</td>";
                txt += "<td>" + response[x].userName + "</td></tr>";
            }
            document.getElementById("resultsTableBody").innerHTML = txt;
        });
}

function decryptButtonClickFetch() {
    let url = apiURL + "decrypt";
    fetch(url, {
        body: JSON.stringify(getDataJson()),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        response => {
            return response.text();
        }).then((response) => {
        document.getElementById("dataInputField").value = response;
    });
}

function rowClick(tableRow) {
    // getElementsByTagName("td") returns array of cells (tag: td). first cell is at index 0
    document.getElementById("dataInputField").value = tableRow.getElementsByTagName("td").item(0).innerHTML;
}





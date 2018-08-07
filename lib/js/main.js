const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
const database = firebase.database().ref();


//store global access for .allMessages div

let allMessages = document.getElementsByClassName("allMessages")[0];
/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username = usernameElement.value;
    const message = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    // console.log(username + " : " + message);

    //make my JSON to push
    let messageJSON = {
        USERNAME: username,
        MESSAGE: message
    }
    //Update database here
    database.push(messageJSON);
}

// Set database "child_added" event listener here
database.on("child_added", addMessageToBoard);

function addMessageToBoard(rowData){
    const data = rowData.val();
    console.log(data);
    //display in form NAME: MESSAGE
    const name = data.USERNAME;
    const message = data.MESSAGE;
    let p = document.createElement("p");
    p.innerText = `${name}: ${message}`
    allMessages.appendChild(p);

    //build a paragraph and append to ".allMessages"
}
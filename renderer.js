// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const updateOnlineStatus = () => {
// document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()

// let Data = {
//     message: "Hi",
//     someData: "Let's go"
// };

// // Add the event listener for the response from the main process
// ipcRenderer.on('mainprocess-response', (event, arg) => {
//     console.log(arg); // prints "Hello World!"
// });

// // Send information to the main process
// // if a listener has been set, then the main process
// // will react to the request !
// ipcRenderer.send('request-mainprocess-action', Data);

if (window.api) {
    window.api.receive("fromMain", (data) => {
        console.log(`Received ${data} from main process`);
    });
    window.api.send("toMain", "some data");
}
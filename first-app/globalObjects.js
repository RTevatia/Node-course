setTimeout(() => {
  console.log("This runs after two seconds");
}, 2000);

// Browsers have global object - window
// window.console.log("Hello from window");
// console.log("This also works");

// Variables in browsers defined globally become 
// properties of window
// var message = "Hello";
// console.log(window.message);

// Node.js global object - global
global.console.log("From Node global");

// Varibales in Node.js are scoped to the file and not global
let node_message = "Hello";
global.console.log(node_message);
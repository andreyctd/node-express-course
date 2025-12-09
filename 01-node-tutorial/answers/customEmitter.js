/*   const EventEmitter = require("events");
const emitter = new EventEmitter();
setInterval(() => {
  emitter.emit("timer", "hi there");
}, 2000);
emitter.on("timer", (msg) => console.log(msg));   */

/*   const EventEmitter = require("events");
const emitter = new EventEmitter();
const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("happens", (msg) => resolve(msg));
  });
};
const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event! Here it is: ", msg);
};
doWait();
emitter.emit("happens", "Hello World!");   */

const EventEmitter = require("events");
const emitter = new EventEmitter();

// Example handler 1
emitter.on("greet", (name) => {
  console.log("Hello,", name);
});

// Example handler 2 (chained event)
emitter.on("greet", (name) => {
  emitter.emit("response", `Nice to meet you, ${name}!`);
});

// Handler for response event
emitter.on("response", (msg) => {
  console.log(msg);
});

// Timer-based event
setInterval(() => {
  emitter.emit("timer", "Tick Tack...");
}, 2000);

emitter.on("timer", (msg) => console.log(msg));

// Emit an event manually
emitter.emit("greet", "Student");
"use strict";
function greet(name = "") {
    console.log(`Hi, ${name || ''}
How are you?`);
}
greet();

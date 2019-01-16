const buildBtn = document.querySelector("#build-btn");
const objectDivContainer = document.querySelector(".object");
let json;

buildBtn.addEventListener("click", () => {
    const inputString = document.querySelector(".input-field").value;

    try{
        json = JSON.parse(inputString);
    }
    catch {
        const error = new Error("Invalid JSON string");
        alert(error);
    };

    goThrough(json);
});

function goThrough(object, divContainer = objectDivContainer) {
    for (let key in object) {        
        if (object[key] instanceof Object) {
            const node = createNode(key, object, divContainer);
            goThrough(object[key], node);
        }  
        else {
            createNode(key, object, divContainer);
        };
    };
};

function createNode(key, json, container){
    const div = document.createElement("div");
    const label = document.createElement("label");
    const span = document.createElement("span");

    label.innerText = key;

    let type = typeof(json[key]);

    if (type === "object") {
        div.classList.add(type);
        if (json[key] instanceof Array) {
            span.innerText = "[]";
        }
        else if (key == "null") {
            span.innerText = key;
            span.classList.add(key);
        }
        else {
            span.innerText = "{}";
        };
    }
    else {
        span.innerText = json[key] || key;
        span.classList.add(type);
    };

    div.appendChild(label);
    div.appendChild(span);
    container.appendChild(div);
    
    return div;
};
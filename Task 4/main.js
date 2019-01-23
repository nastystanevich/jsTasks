const buildBtn = document.querySelector("#build-btn");
const objectDivContainer = document.querySelector(".main");
let json;

objectDivContainer.addEventListener("click", handleObjectClick);

buildBtn.addEventListener("click", () => {
    clearTree();
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

function clearTree() {
    const divs = document.querySelectorAll(".main > div");
    divs.forEach(div => {
        objectDivContainer.removeChild(div);
    });     
};

function goThrough(object, divContainer = objectDivContainer) {
    for (const key in object) {        
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

    const type = typeof(json[key]);
    const value = JSON.stringify(json[key]);
 
    if (type === "object") {        
        if (json[key] === null) {
            span.innerText = value;
            span.classList.add(value);
        }
        else {
            div.classList.add(type);
            div.addEventListener("click", handleObjectClick);

            if (json[key] instanceof Array) {
                span.innerText = "[]";
            }
            else {
                span.innerText = "{}";
            };
        };
    }
    else {
        span.innerText = value;
        span.classList.add(type);
    };

    div.appendChild(label);
    div.appendChild(span);
    container.appendChild(div);
    
    return div;
};

function handleObjectClick(event) {
    event.stopImmediatePropagation();
    const object = event.target;
    object.classList.toggle("closed");
};
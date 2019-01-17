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
    if (divs.length) {
        divs.forEach(div => {
            objectDivContainer.removeChild(div);
        });     
    };
};

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
        if (key === "null") {
            span.innerText = key;
            span.classList.add(key);
        }
        else {
            div.classList.add(type, "opened");
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
        span.innerText = json[key] || key;
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
    
    if (object.classList.contains("opened")){
        object.classList.remove("opened");
        object.classList.add("closed");
    } 
    else {
        object.classList.remove("closed");
        object.classList.add("opened");
    }
}
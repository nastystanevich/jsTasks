import math from "mathjs";

math.config({
    precision: 12
  })

class Cacher{   
    constructor() {
        this.cache = {};
    };

    withCache(func) {
        return (arg) => {  
            let result;
            if (arg in this.cache){              
                result = `${this.cache[arg]} from cache`; 
                return result;
            }  
            else {
                result = func(math.bignumber(arg));
                this.cache[arg] = result;
            };
            return result;
        };
    };
};


const cacher = new Cacher();
const factorial = cacher.withCache(math.factorial);
const calcBtn = document.querySelector("#calc-btn");

calcBtn.addEventListener("click", () => {
    const inputField = document.querySelector("#input-field").value;
    
    calcBtn.setAttribute("disabled", true);

    const startTime = performance.now(); 
    const result = factorial(inputField);
    const endTime = performance.now();
    const timeString = `Time: ${endTime - startTime}`;

    let p = document.createElement("p");
    p.innerHTML = `Result: ${result}, ${timeString}`;
    
    const resultDiv = document.querySelector("#result");
    resultDiv.appendChild(p);
    
    calcBtn.removeAttribute("disabled");
});


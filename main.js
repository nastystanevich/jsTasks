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
            }  
            else {
                result = func(math.bignumber(arg));
                this.cache[arg] = math.factorial(arg);
                this.cache[arg] = result;
            };
            return result;
        };
    };
};

const cacher = new Cacher();
const factorial = cacher.withCache(math.factorial);

const inputField = document.querySelector("#input-field");
const calcBtn = document.querySelector("#calc-btn");

calcBtn.addEventListener("click", () => {
    const inputValue = inputField.value;

    startTime = performance.now(); 
    const result = factorial(inputValue);
    endTime = performance.now();
    timeString = `Time: ${endTime - startTime}`;

    var p = document.createElement("p");
    p.innerHTML = `Result: ${result}, ${timeString}`;
    
    const body = document.querySelector("body");
    body.appendChild(p);
});


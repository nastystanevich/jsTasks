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
const calcBtn = document.querySelector("#calc-btn");

calcBtn.addEventListener("click", () => {
    const inputField = document.querySelector("#input-field").value;
    
    calcBtn.setAttribute("disabled", true);

    startTime = performance.now(); 
    const result = factorial(inputField);
    endTime = performance.now();
    timeString = `Time: ${endTime - startTime}`;

    var p = document.createElement("p");
    p.innerHTML = `Result: ${result}, ${timeString}`;
    
    const resultDiv = document.querySelector("#result");
    resultDiv.appendChild(p);
    
    calcBtn.removeAttribute("disabled");
});


const factorial = (n) => {
    if (n == 0) {
        return 1;
      }
      else {
        return n * factorial(n - 1);
      };
};

class Cacher{   
    constructor() {
        this.cache = {};
    };

    withCache(func) {
        return (arg) => {  
            let startTime, 
                endTime, 
                timeString, 
                result;

            if (arg in this.cache){
                startTime = performance.now();               
                result = this.cache[arg];
                endTime = performance.now();
                timeString = `Time: ${endTime - startTime}`;
                
                return `${result} from cache, ${timeString}`;
            }  
            else {
                startTime = performance.now();
                result = func(arg);
                endTime = performance.now();
                timeString = `Time: ${endTime - startTime}`;
                this.cache[arg] = func(arg);

                return `${result}, ${timeString}`;
            };
        };
    };
};

const cacher = new Cacher();
const func = cacher.withCache(factorial);

const inputField = document.querySelector("#input-field");
const calcBtn = document.querySelector("#calc-btn");

calcBtn.addEventListener("click", () => {
    let inputValue = inputField.value;
    let result = func(inputValue);

    var p = document.createElement("p");
    p.innerHTML = `Result: ${result}`;
    const body = document.querySelector("body");
    body.appendChild(p);
});

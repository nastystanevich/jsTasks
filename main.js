const factorial = (n) => {
    if (n == 0) {
        return 1;
      }
      else {
        return n * factorial(n - 1);
      }
};
//import * as math from 'mathjs';

//import math from 'mathjs';

class Cacher{   
    constructor() {
        this.cache = {};
    };

    withCache(func) {
        return (arg) => {  
            //let start, end, time, result;
            let result;

            if (arg in this.cache){
                //start = new Date().getTime();
                result = this.cache[arg];
                /*end = new Date().getTime();
                time = (end - start);  // рассчитаем время выполнения
                console.log(time);*/
                
                return result + " from cache";
            }  
            else {
                //start = new Date().getTime();
                result = func(arg);
                /*end = new Date().getTime();
                time = (end - start);  // рассчитаем время выполнения
                console.log(time);*/
                this.cache[arg] = func(arg);

                return result;
            };
        }
    }
}

const cacher = new Cacher();
const func = cacher.withCache(factorial);

const inputField = document.querySelector("#input-field");
const calcBtn = document.querySelector("#calc-btn");

calcBtn.addEventListener("click", () => {
    let inputValue = inputField.value;
    let result = func(inputValue);

    var p = document.createElement("p");
    p.innerHTML = "Result: " + result;
    const body = document.querySelector("body");
    body.appendChild(p);
});


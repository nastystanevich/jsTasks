(function(){
    class OneMoment {
        constructor(arg) {
            const that = this;
            function setProps(date) {
                that.day = date.getDay();
                that.month = date.getMonth() || date.getMonth() + 1;
                that.year = date.getFullYear();
            };

            if(arg instanceof Date) {
                setProps(arg);
            }
            else if(typeof(arg) == "number") {
                setProps(new Date(arg));
            };
        };

        static parse(dateString, datePattern) {
            const patternParts = {
                day : {
                    abbr: "DD",
                    positon : null
                },
                month : {
                    abbr: "MM",
                    positon: null
                },
                year : {
                    abbr: "YYYY",
                    positon: null
                }
            }; 
            
            let date = new OneMoment();

            for (let prop in patternParts) {
                patternParts[prop].positon = datePattern.indexOf(patternParts[prop].abbr);

                if (~patternParts[prop].positon) {
                    date[prop] = Number.parseInt(dateString.substr(patternParts[prop].positon, prop == 'year' ? 4 : 2));
                };
            };
            
            return date;
        };

        format(datePattern) {
            const patternParts = {
                day : "DD",
                month : "MM",
                year : "YYYY"
            };
            let dateString = datePattern;

            for (let prop in patternParts) {
                dateString = dateString.replace(patternParts[prop], this[prop] < 10 ? `0${this[prop]}` : this[prop]);
            };

            return dateString;
        };

        fromNow() {
            const now = new OneMoment(new Date());

            let difference = {
                day: null,
                month: null,
                year: null
            };

            let isFuture = true; //ago or in

            if (this.year < now.year) {
                isFuture = false;

                for (let prop in difference) {
                    difference[prop] = now[prop] - this[prop];
                };
    
                if(difference.day < 0) {
                    difference.day += 30;
                    difference.month--; 
                };

                if(difference.month < 0) {
                    difference.month += 12;
                    difference.year--; 
                };
            } 
            else {
                for (let prop in difference) {
                    difference[prop] = this[prop] - now[prop];
                };

                if(difference.day < 0) {
                    difference.day = 30 - now.day + this.day;
                    difference.month--; 
                };

                if(difference.month < 0) {
                    difference.month = 12 - now.month + this.month;
                    difference.year--; 
                };
            };
            
            let resultString = "";

            for (let prop in difference) {
                let propStr = prop;

                if (difference[prop]) {
                    propStr = prop + 's';
                    resultString += `${difference[prop]} ${propStr} `;
                }
            };

            if (isFuture) {
                resultString = "in ".concat(resultString);
            }
            else {
                resultString += "ago";
            };

            return resultString;
        };

        toDate() {
            return new Date(
                this.year,
                this.month, 
                this.day
            );
        };         
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = OneMoment;
    else
        window.OneMoment = OneMoment;
})();

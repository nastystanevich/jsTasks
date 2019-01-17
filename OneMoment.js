(function(){
    class OneMoment {
        constructor(arg) {
            const that = this;
            function setProps(date) {
                that.day = date.getDate();
                that.month = date.getMonth() + 1;
                that.year = date.getFullYear();
            };

            if(arg instanceof Date) {
                setProps(arg);
            }
            else if(typeof(arg) === "number") {
                setProps(new Date(arg));
            };     
        };

        static getPatternParts() {
            return {
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
        };

        static parse(dateString, datePattern) {
            const patternParts = this.getPatternParts();
            
            let date = new OneMoment();
            
            for (const prop in patternParts) {
                patternParts[prop].positon = datePattern.indexOf(patternParts[prop].abbr);

                if (~patternParts[prop].positon) {
                    date[prop] = Number.parseInt(dateString.substr(patternParts[prop].positon, prop === 'year' ? 4 : 2));
                };
            };
            
            return date;
        };

        format(datePattern) {
            const patternParts = this.getPatternParts();
            let dateString = datePattern;

            for (const prop in patternParts) {
                dateString = dateString.replace(patternParts[prop].abbr, getNumberWithZero(this, prop));
            };

            function getNumberWithZero(date, property) {
                return date[property] < 10 ? `0${date[property]}` : date[property];
            };

            return dateString;
        };
        
        fromNow() {
            const oneDay = 1000*60*60*24; //in ms
            const oneMonth = 30; // in days
            const oneYear = 12; //in months

            const dateNow = Date.now();
            const date = Date.parse(this.toDate());

            let millisecondsDiff = date - dateNow;
            let isFuture = true; //ago or in

            if(millisecondsDiff <= 0) {
                isFuture = false;
                millisecondsDiff *= -1;               
            }; 
            
            let diff = {
                day: null,
                month: null,
                year: null
            };

            diff.day = Number.parseInt(millisecondsDiff / oneDay);
            if(diff.day >= oneMonth) {
                diff.month = Number.parseInt(diff.day / oneMonth);
                diff.day = diff.day % oneMonth;
            };
            if(diff.month >= oneYear) {
                diff.year = Number.parseInt(diff.month / oneYear);
                diff.month = diff.month % oneYear;
            };

            let resultString = "";
            for(let prop in diff) {
                let propStr = prop;

                if(diff[prop]) {
                    propStr = prop + 's';
                    resultString += `${diff[prop]} ${propStr}`;
                };
            };

            if(isFuture) {
                return `in ${resultString}`;
            }
            else if(diff.day) {
                return `${resultString} ago`;
            }
            else {
                return "today";
            };
        };

        toDate() {
            return new Date(
                this.year,
                this.month - 1, 
                this.day
            );
        };         
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = OneMoment;
    else
        window.OneMoment = OneMoment;
})();


(function() {
    const dollarInput1 = document.getElementById("dollarID") as HTMLInputElement;
    const output = document.getElementById("outputID") as HTMLDivElement;

    function calculate(dollarInput: HTMLInputElement): void {
        output.innerText = "";

        let dollarPart: string;
        if (dollarInput.value.includes(".")) {
            dollarPart = dollarInput.value.substring(0, dollarInput.value.indexOf("."));
        } else {
            dollarPart = dollarInput.value;
        }

        let afterDotPart: string = dollarInput.value.substring(dollarInput.value.indexOf(".") + 1, dollarInput.value.length);
        
        let quarterAmount: number;
        let dimeAmount: number;
        let nickelAmount: number;
        let pennyAmount: number;

        if (afterDotPart.length === 1) {
            afterDotPart += "0"
        }

        if (afterDotPart && afterDotPart.length <= 2) {
            // theres gotta be an easier way

            quarterAmount = Number(afterDotPart) / 25 >= 1 ? Math.floor(Number(afterDotPart) / 25) : 0;

            if ((Number(afterDotPart) - quarterAmount * 25) / 10 >= 1) {
                dimeAmount = Math.floor((Number(afterDotPart) - quarterAmount * 25) / 10);
            } else {
                dimeAmount = 0;
            }

            if ((Number(afterDotPart) - (quarterAmount * 25 + dimeAmount * 10)) / 5 >= 1) {
                nickelAmount = Math.floor((Number(afterDotPart) - (quarterAmount * 25 + dimeAmount * 10)) / 5);
            } else {
                nickelAmount = 0;
            }

            if ((Number(afterDotPart) - (quarterAmount * 25 + dimeAmount * 10 + nickelAmount * 5)) / 1 >= 1) {
                pennyAmount = Math.floor((Number(afterDotPart) - (quarterAmount * 25 + dimeAmount * 10 + nickelAmount * 5)) / 1);
            } else {
                pennyAmount = 0;
            }
        }

        outputFunction({ dollarPart, quarterAmount, dimeAmount, nickelAmount, pennyAmount });

        function outputFunction({ dollarPart, quarterAmount, dimeAmount, nickelAmount, pennyAmount }): void {
            let newSpan = document.createElement("span") as HTMLSpanElement;
            newSpan.innerText = `${dollarPart} ${dollarPart === 1 ? 'dollar' : 'dollars'},
             ${quarterAmount} ${quarterAmount === 1 ? 'quarter' : 'quarters'},
             ${dimeAmount} ${dimeAmount === 1 ? 'dime' : 'dimes'},
             ${nickelAmount} ${nickelAmount === 1 ? 'nickel' : 'nickels'},
             ${pennyAmount} ${pennyAmount === 1 ? 'penny' : 'pennies'}
            `
            output.appendChild(newSpan);
        }
    }


    function validateInput() {
        let str: string = "0123456789.";
        // 5 chars length max
        // only numbers or dot
        let validated: boolean = false;

        str.split("").forEach(i => {
            if (dollarInput1.value.includes(i)) {
                validated = true;
            } else validated = false; // ????????
        })

        if (dollarInput1.value.length <= 5) {
            validated = true;
        } else validated = false;

        return validated;

    }

    dollarInput1.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            if (validateInput()) {
                const dollarInput1 = document.getElementById("dollarID") as HTMLInputElement;
                calculate(dollarInput1);
            }
        }
    })

})();
(function () {
    var dollarInput1 = document.getElementById("dollarID");
    var output = document.getElementById("outputID");
    function calculate(dollarInput) {
        output.innerText = "";
        var dollarPart;
        if (dollarInput.value.includes(".")) {
            dollarPart = dollarInput.value.substring(0, dollarInput.value.indexOf("."));
        }
        else {
            dollarPart = dollarInput.value;
        }
        var afterDotPart = dollarInput.value.substring(dollarInput.value.indexOf(".") + 1, dollarInput.value.length);
        var quarterAmount;
        var dimeAmount;
        var nickelAmount;
        var pennyAmount;
        if (afterDotPart.length === 1) {
            afterDotPart += "0";
        }
        if (afterDotPart && afterDotPart.length <= 2) {
            // theres gotta be an easier way
            quarterAmount = Number(afterDotPart) / 25 >= 1 ? Math.floor(Number(afterDotPart) / 25) : 0;
            if ((Number(afterDotPart) - quarterAmount * 25) / 10 >= 1) {
                dimeAmount = Math.floor((Number(afterDotPart) - quarterAmount * 25) / 10);
            }
            else {
                dimeAmount = 0;
            }
            if ((Number(afterDotPart) - (quarterAmount * 25 + dimeAmount * 10)) / 5 >= 1) {
                nickelAmount = Math.floor((Number(afterDotPart) - (quarterAmount * 25 + dimeAmount * 10)) / 5);
            }
            else {
                nickelAmount = 0;
            }
            if ((Number(afterDotPart) - (quarterAmount * 25 + dimeAmount * 10 + nickelAmount * 5)) / 1 >= 1) {
                pennyAmount = Math.floor((Number(afterDotPart) - (quarterAmount * 25 + dimeAmount * 10 + nickelAmount * 5)) / 1);
            }
            else {
                pennyAmount = 0;
            }
        }
        outputFunction({ dollarPart: dollarPart, quarterAmount: quarterAmount, dimeAmount: dimeAmount, nickelAmount: nickelAmount, pennyAmount: pennyAmount });
        function outputFunction(_a) {
            var dollarPart = _a.dollarPart, quarterAmount = _a.quarterAmount, dimeAmount = _a.dimeAmount, nickelAmount = _a.nickelAmount, pennyAmount = _a.pennyAmount;
            var newSpan = document.createElement("span");
            newSpan.innerText = "".concat(dollarPart, " ").concat(dollarPart === 1 ? 'dollar' : 'dollars', ",\n             ").concat(quarterAmount, " ").concat(quarterAmount === 1 ? 'quarter' : 'quarters', ",\n             ").concat(dimeAmount, " ").concat(dimeAmount === 1 ? 'dime' : 'dimes', ",\n             ").concat(nickelAmount, " ").concat(nickelAmount === 1 ? 'nickel' : 'nickels', ",\n             ").concat(pennyAmount, " ").concat(pennyAmount === 1 ? 'penny' : 'pennies', "\n            ");
            output.appendChild(newSpan);
        }
    }
    function validateInput() {
        var str = "0123456789.";
        // 5 chars length max
        // only numbers or dot
        var validated = false;
        str.split("").forEach(function (i) {
            if (dollarInput1.value.includes(i)) {
                validated = true;
            }
            else
                validated = false; // ????????
        });
        if (dollarInput1.value.length <= 5) {
            validated = true;
        }
        else
            validated = false;
        return validated;
    }
    dollarInput1.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            if (validateInput()) {
                var dollarInput1_1 = document.getElementById("dollarID");
                calculate(dollarInput1_1);
            }
        }
    });
})();

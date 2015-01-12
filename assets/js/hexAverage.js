function hexAverage() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function (previousValue, currentValue) {
        return currentValue
            .replace(/^#/, '')
            .match(/.{2}/g)
            .map(function (value, index) {
                return previousValue[index] + parseInt(value, 16);
            });
    }, [0, 0, 0])
    .reduce(function (previousValue, currentValue) {
        return previousValue + Math.floor(currentValue / args.length).toString(16);
    }, '#');

console.log(hexAverage('#111111', '#333333')); // => #222222
console.log(hexAverage('#111111', '#222222')); // => #191919
console.log(hexAverage('#111111', '#222222', '#333333')); // => #222222

thin.define("A", [], function() {
    return "a";
});

thin.define("B", [], function() {
    return "b";
});

thin.define("C", [], function() {
    return "c";
});

thin.define("D", ["A", "B", "C"], function(B, A, C) {
    return B + A + C;
});

var D = thin.use("D");
alert(D);
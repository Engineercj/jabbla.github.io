function test(){
    var te = [];
    return function(){
        var i = 1;
        return te;
    }
}
console.log(test()());
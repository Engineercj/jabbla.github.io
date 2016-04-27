/**
 * Created by zxr on 2016/4/27.
 */
function updateSameProperties(array,obj,diff){
    var first = arguments[0],
        second = arguments[1];
    first.forEach(function(item){
        for(str in second){
            item.style[str] = obj[str];
        }
    });
    if(arguments.length===3){

        diff.forEach(function(item1,index,arr){
            for(str1 in item1){
                first[index].style[str1] = item1[str1];
            }
        });
    }
}
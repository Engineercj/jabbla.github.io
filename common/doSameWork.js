function doSameWork(arr,fn){
    for(var i=0,item;item = arr[i++];){
        fn(item,i-1);
    }
}
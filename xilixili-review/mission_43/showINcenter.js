/**
 * Created by zxr on 2016/4/27.
 */
function showINcenter(img,target){
    return {
        left:-(img.width-target.width)*0.5,
        top:-(img.height-target.height)*0.5
    }
}
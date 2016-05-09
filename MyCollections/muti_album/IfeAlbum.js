/**
 * Created by zxr on 2016/5/6.
 */
(function (window) {

    // 由于是第三方库，我们使用严格模式，尽可能发现潜在问题
    'use strict';


    
    function IfeAlbum() {
        // 布局的枚举类型
        this.LAYOUT = {
            PUZZLE: 1,    // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3     // 木桶布局
        };
        // 公有变量可以写在这里
        this.imageStack = [];

    }

    // 私有变量可以写在这里
    var LayoutFuncs = {
        1:puzzle,
        2:waterfall,
        3:Barrel
    }
    // var xxx = ...



    /************* 以下是本库提供的公有方法 *************/



    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项包含属性
     */
    IfeAlbum.prototype.setImage = function (image, option) {
        var self = this;
        if (typeof image === 'string') {
            // 包装成数组处理
            this.setImage([image]);
            return;
        }

        // 推入图片栈
        this.imageStack = [];
        image.forEach(function(item,index,array){
            self.imageStack.push(item);
        });
        // 设置图片
        this.layout.setImage(this.imageStack);
    };



    /**
     * 获取相册所有图像对应的 DOM 元素
     * 可以不是 ，而是更外层的元素
     * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    IfeAlbum.prototype.getImageDomElements = function() {

        return this.layout.getImageDomElements();
    };




    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    IfeAlbum.prototype.removeImage = function (image) {
        var index;
        var out = [];
        var self = this;
        if(image.length){

            image.forEach(function(item){
                index = self.getImageDomElements().indexOf(index);
                out.push(self.imageStack.splice(index,1));
            });

            this.layout.setImage(this.imageStack);

            return out.length===image.length
        }else{
            index = this.getImageDomElements().indexOf(image);
            out = this.imageStack.splice(index,1);
            console.log(this.imageStack);
            this.layout.setImage(this.imageStack);

            return out!==void 0
        }
    };



    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    IfeAlbum.prototype.setLayout = function (layout) {
        this.layout = LayoutFuncs[layout]();
        this.layout.name = Object.keys(this.LAYOUT)[layout-1];
        this.dom = this.layout.getDom();
    }



    /**
     * 获取相册的布局
     * @return {string} 布局名称
     */
    IfeAlbum.prototype.getLayout = function() {
        return this.layout.name;
    };



    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    IfeAlbum.prototype.setGutter = function (x, y) {
        this.layout.setGutter(x,y);
    };



    /**
     * 允许点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.enableFullscreen = function () {
        this.layout.enableFullscreen();
    };



    /**
     * 禁止点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.disableFullscreen = function () {
        this.layout.disableFullscreen();
    };



    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {
        return this.layout.isFullscreenEnabled();
    };

    /**
     * 设置各个布局的基本信息
     * @param {string}  width  宽度
     * @param {string}  height  高度
     * @param {object}  options  其它对应参数
     * @return {object} 拼图的dom
     */
    IfeAlbum.prototype.init = function (width,height,options) {
        return this.layout.init(width,height,options);
    };
    /**
     * 获取木桶模式每行图片数的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMax = function () {
        if(!this.layout.name==='BARREL') return;
        return this.layout.getBarrelBinMax();

    };



    /**
     * 获取木桶模式每行图片数的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMin = function () {
        if(!this.layout.name==='BARREL') return;
        return this.layout.getBarrelBinMin();
    };



    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     * @param {number} max 最大高度
     */
    IfeAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * 获取木桶模式每行高度的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {

    };



    // 你想增加的其他接口



    /************* 以上是本库提供的公有方法 *************/



    // 实例化
    if (typeof window.ifeAlbum === 'undefined') {
        // 只有当未初始化时才实例化
        window.ifeAlbum = new IfeAlbum();
    }

}(window));

ifeAlbum.setLayout(1);
ifeAlbum.init('900px','400px');
ifeAlbum.setImage(['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg']);
ifeAlbum.enableFullscreen();
document.body.appendChild(ifeAlbum.dom);

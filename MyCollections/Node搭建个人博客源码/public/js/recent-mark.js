/**
 * Created by zxr on 2016/4/4.
 */
(function(){
    $('.dropdown-toggle').click(function(){
        var menue = this.parentNode.getElementsByClassName('dropdown-menu')[0];
        var $menue = $(menue);
        $menue.slideToggle();
    });
})();
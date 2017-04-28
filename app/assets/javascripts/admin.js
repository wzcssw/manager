//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require turbolinks
//= require angular
//= require angular-animate
//= require angular-touch
//= require angular-resource
//= require angular-sanitize
//= require angular-route
//= require ngSlimscroll

//= require adminAngular/lib/angular-bootstrap/ui-bootstrap.min
//= require adminAngular/lib/angular-bootstrap/ui-bootstrap-tpls.min
//= require adminAngular/lib/angular-ui-router/release/angular-ui-router.min
//= require adminAngular/lib/loading-bar.min
//= require adminAngular/lib/angular-confirm.min
//= require adminAngular/lib/ng-file-upload-shim.min
//= require adminAngular/lib/ng-file-upload.min
//= require adminAngular/lib/xeditable.min

// tree
//= require tree/angular-ui-tree.min.js

//= require util/date
//= require util/uuid


//= require film/jquery-ui.min
//= require film/hammer.min
//= require film/cornerstone
//= require film/cornerstoneFileImageLoader
//= require film/cornerstoneMath
//= require film/cornerstoneTools
//= require film/cornerstoneWADOImageLoader
//= require film/cornerstoneWebImageLoader
//= require film/dicomParser
//= require film/film

//= require cable

//= require sweet-alert.min
//= require pinyin_dict_firstletter
//= require pinyinUtil
//= require moment-with-locales.min
//= require datetimepicker
//= require datetimepicker.templates

//= require adminAngular/app/routes
//= require adminAngular/app/filters
//= require adminAngular/app/services
//= require_tree ./adminAngular/app/services
//= require adminAngular/app/directives
//= require adminAngular/app/controllers
//= require_tree ./adminAngular/app/controllers
//= require adminAngular/app/app



// 警告弹出框
function warn_confirm(params) {
    swal({
        title: params.title,
        text: params.text,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: true
    }, function(isConfirm) {
        if (isConfirm) {
            if (params.sure_func) {
                params.sure_func();
            }
        } else {
            if (params.cancel_func) {
                params.cancel_func();
            }
        }
    });
}


moment.locale('zh-cn');

// 弹出窗口
function newWin(url, id) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", id);
    if (!document.getElementById(id)) document.appendChil
    a.click();
}
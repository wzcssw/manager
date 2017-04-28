//add by zyy 2015-11-27增加格式化
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 中文星期几
Date.prototype.WeekZh = function() {
    var weekzh_arr = ["日", "一", "二", "三", "四", "五", "六"];
    return ("周" + weekzh_arr[this.getDay()]);
}

Date.prototype.GetWeekFirstDay = function() {
    var temp_day = this.getDay();
    if (temp_day == 0) {
        temp_day = 7;
    }
    var WeekFirstDay = new Date(this - (temp_day - 1) * 86400000);
    return WeekFirstDay;
}
Date.prototype.GetWeekLastDay = function() {
    var WeekFirstDay = this.GetWeekFirstDay();
    var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
    return WeekLastDay;
}
Date.prototype.GetMonthFirstDay = function() {
    var MonthFirstDay = new Date(this.getFullYear(), this.getMonth(), 1);
    return MonthFirstDay;
}
Date.prototype.GetMonthLastDay = function() {
        var MonthNextFirstDay = new Date(this.getFullYear(), this.getMonth() + 1, 1);
        MonthNextFirstDay.setDate(MonthNextFirstDay.getDate() - 1);
        return MonthNextFirstDay;
    }
    // 获得本年第一周的星期一
Date.GetYearFirstWeekFirstDay = function(year) {
    var date = new Date(year, 0, 1);
    if (date.getDay() != 1) {
        // 如果本年第一天不是周一
        var temp_day = date.getDay();
        if (temp_day == 0) {
            temp_day = 7;
        }
        date = new Date(year, 0, (7 - temp_day + 2));
    }
    return date;
}
Date.prototype.GetYearWeek = function() {
    var d = new Date(+this);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
}
Date.prototype.AddDay = function(day) {
    var d = new Date(+this);
    d.setDate(d.getDate() + day);
    return d;
}
Date.prototype.AtBegin = function() {
    var d = new Date(+this);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
}
Date.prototype.AtEnd = function() {
    var d = new Date(+this);
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    return d;
}
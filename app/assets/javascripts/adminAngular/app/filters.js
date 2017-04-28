var filters = angular.module('filters', []);
filters.filter('stringAdd', function() {
    return function(obj, addString) {
        return obj + addString;
    }
});
filters.filter('moneySymbol', function() {
    return function(obj, direction) {
        if (direction == undefined || direction == null) {
            if (obj < 0) {
                return obj;
            } else {
                return ('+' + obj);
            }
        } else {
            if (direction == true) {
                return ('+' + obj);
            } else {
                return ('-' + obj);
            }
        }
    }
});
filters.filter('trustHtml', ['$sce', function($sce) {
    return function(input) {
        return $sce.trustAsHtml(input);
    }
}]);
filters.filter('dateAndWeek', function() {
    return function(date) {
        return (date.Format("yyyy年MM月dd日") + "  " + date.WeekZh());
    }
});
filters.filter('dateInSide', function() {
    return function(data_arr, time_begin, time_end) {
        var arr = [];
        var tmp_date;
        for (var i = 0; i < data_arr.length; i++) {
            tmp_date = data_arr[i].appointment_at;
            if (tmp_date >= time_begin && tmp_date < time_end) {
                arr.push(data_arr[i]);
            }
        }
        return arr;
    }
});
filters.filter('bodyDesc', ['$sce', function($sce) {
    return function(body_desc) {
        if (body_desc) {
            var result = body_desc.split(',');
            return $sce.trustAsHtml(result.join('<br/>'));
        } else {
            return body_desc;
        }
    }
}]);
filters.filter('checkTechniqueDesc', ['$sce', function($sce) {
    return function(ck_desc) {
        if (ck_desc) {
            var result = ck_desc.split(' ');
            return $sce.trustAsHtml(result.join('<br/>'));
        } else {
            return ck_desc;
        }
    }
}]);
filters.filter('stateDesc', function() {
    return function(state) {
        if (state != null) {
            var result = ['未交费', '等待检查', '检查中', '已完成', '迟到', '已取消'];
            return result[state];
        } else {
            return state;
        }
    }
});
filters.filter('noneTShow', function() {
    return function(time, placeholder) {
        if (time != null && time != '') {
            return time.Format('yyyy年MM月dd日 hh:mm');
        } else {
            return placeholder;
        }
    }
});
filters.filter('noneSShow', function() {
    return function(str, placeholder) {
        if (str != null && str != '') {
            return str;
        } else {
            return placeholder;
        }
    }
});

filters.filter('patientDesc', function() {
    return function(patient) {
        if (patient) {
            return '(' + patient.patient_name + ',' + patient.patient_age + '岁,电话:' + patient.patient_phone + ')';
        } else {
            return '';
        }
    }
});

filters.filter('meetingStateDesc', function() {
    return function(code) {
        if (code != null) {
            var mstate = {
                "default": "未申请",
                "checking": "审核中",
                "nopass": "审核不通过",
                "pass": "审核通过",
                "make_sure": "专家已确认",
                "in_meeting": "会议召开中",
                "finish_meeting": "会议结束"
            };
            return mstate[code];
        } else {
            return code;
        }
    }
});

filters.filter('patientReportStateDesc', function() {
    return function(is_print) {
        if (is_print == true) {
            return '可见';
        } else {
            return '不可见';
        }
    }
});

filters.filter('patientSexDesc', function() {
    return function(sex_code) {
        if (sex_code != null) {
            var sex = {
                "female": "女",
                "male": "男",
                "unknow": "未知"
            };
            return sex[sex_code];
        } else {
            return sex_code;
        }
    }
});
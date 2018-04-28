const data_json = {
    "theme":{"subject":"贯信信息技术有限公司课程","logo":"../picture/logo.png"},
    "columns": [
        {"name": "name", "describe": "姓名", "type": "text", "is_required": true},
        {"name": "age", "describe": "年龄", "type": "text", "is_required": false, "is_display": false},
        {"name": "phone", "describe": "手机号", "type": "text"},
        {"name": "pic", "describe": "照片", "type": "file"},
        {
            "name": "class",
            "describe": "课程",
            "type": "select",
            "options": [
                {"describe": "选项1", "value": "opt1"},
                {"describe": "选项2", "value": "opt2"},
                {"describe": "选项3", "value": "opt3"}
            ]
        }
    ],
    "participant": {
        "id": "0212151105",
        "url": "../picture/er.png",
        "name": "张三",
        "phone": "1300000000",
        "class": "opt1",
        "pic": "../picture/tx.png"
    },
    "schedule": [
        {
            "date": "2017-05-01",
            "time": "08:00",
            "duration": "8:00~9:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },
        {
            "date": "2017-05-01",
            "time": "08:00",
            "duration": "8:00~9:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },
        {
            "date": "2017-05-01",
            "time": "08:00",
            "duration": "8:00~9:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },
        {
            "date": "2018-04-28",
            "time": "08:00",
            "duration": "8:00~9:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },
        {
            "date": "2018-04-28",
            "time": "19:00",
            "duration": "19:00~19:30",
            "event": "晚餐",
            "address": "餐厅",
            "detail": "二楼"
        },
        {
            "date": "2019-05-01",
            "time": "08:00",
            "duration": "8:00~9:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },
        {
            "date": "2019-05-01",
            "time": "09:00",
            "duration": "9:00~10:00",
            "event": "开会",
            "address": "明德楼",
            "detail": "二楼301室"
        },
        {
            "date": "2019-05-02",
            "time": "08:00",
            "duration": "8:00~9:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },
        {
            "date": "2019-05-02",
            "time": "09:00",
            "duration": "9:00~10:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },  {
            "date": "2019-05-03",
            "time": "09:00",
            "duration": "9:00~10:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },  {
            "date": "2019-05-04",
            "time": "09:00",
            "duration": "9:00~10:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        },  {
            "date": "2019-05-05",
            "time": "09:00",
            "duration": "9:00~10:00",
            "event": "早餐",
            "address": "餐厅",
            "detail": "二楼"
        }
    ]
};
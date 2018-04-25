const config = {
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
                {"describe": "请选择课程", "value": "0"},
                {"describe": "选项1", "value": "opt1"},
                {"describe": "选项2", "value": "opt2"},
                {"describe": "选项3", "value": "opt3"}
            ]
        }
    ]
};
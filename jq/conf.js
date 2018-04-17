const conf =
    {
        tablename: "products",
        // templateUrl: "view1/view1.html",
        columns: [
            {name:"id",describe:"id",type: "number",order:true},
            {name:"num",describe:"商品款号",type:"string",order:false},
            {name:"quality",describe:"质量",type:"string",order:false},
            {name:"element",describe:"成分",type:"string",order:false},
            {name:"width",describe:"宽度",type:"string",order:false},
            {name:"count",describe:"数量",type:"string",order:true},
            {name:"code",describe:"唯一码",type:"string",order:false},
            {name:"pic",describe:"图片",type:"string",order:false},
            {name:"pic1",describe:"图1",type:"string",order:false},
            {name: "pic2", describe: "图2", type: "string",order:false},
        ],
        format:{
            'id':function(data,rowdata){
                var str='<td><a target="_blank" href="http://www.baidu.com?id='+data+'">'+data+'</a></td>';
                return str;
            },
            'num':function(data,rowdata){
                return '<td>'+data+'</td>';
            },
            'quality':function(data,rowdata){
                return '<td>'+data+'</td>';
            },
            'element':function(data,rowdata){
                return '<td>'+data+'</td>';
            },
            'width':function(data,rowdata){
                return '<td>'+data+'</td>';
            },
            'count':function(data,rowdata){
                return '<td>'+data+'</td>';
            },
            'code':function(data,rowdata){
                return '<td>'+data+'</td>';
            },
            'pic':function(data){
                var str='<td><img src="'+data+'"></td>';
                return str;
            },
            'pic1':function(data){
                var str='<td><img src="'+data+'"></td>';
                return str;
            },
            'pic2':function(data){
                var str='<td><img src="'+data+'"></td>';
                return str;
            }
        }
    };

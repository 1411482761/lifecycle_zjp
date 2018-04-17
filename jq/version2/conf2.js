const config =
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
        title:{
            'id':function(){
                var str='<th>id</th>';
                return str;
            },
            'num':function(){
                /*data.order
                data.name*/
                return '<th><input type="button" id="num" name="num" value="商品款号"></th>';
            },
            'quality':function(){
                return '<th><input type="button" id="quality" name="quality" value="质量"></th>';
            },
            'element':function(){
                return '<th><input type="button" id="element" name="element" value="成分"> </th>';
            },
            'width':function(){
                return '<th><input type="button" id="width" name="width" value="宽度"> </th>';
            },
            'count':function(){
                return '<th><input type="button" id="count" name="count" data-sortable="1" value="数量"> </th>';
            },
            'code':function(){
                return '<th><input type="button" id="code" name="code" value="唯一码"> </th>';
            },
            'pic':function(){
                return '<th><input type="button" id="pic" name="pic" data-sortable="1" value="图片"> </th>';
            },
            'pic1':function(){
                return '<th><input type="button" id="pic1" name="pic1" value="图1"> </th>';
            },
            'pic2':function(){
                return '<th><input type="button" id="pic2" name="pic2" value="图2"> </th>';
            }
        },
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

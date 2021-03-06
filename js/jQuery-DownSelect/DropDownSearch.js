(function(){
    jQuery.fn.extend({
        SeSelectDown:function(data){
            var options = {
                data:{},
                ClassName:'',
                returnVal:function(res){
                    return {
                        a:res
                    }
                }
            }

            options = $.extend(options, data);
            var _this = this;
            var DomStart = '<div class="btn-group DownBtn"><button type="button" class="btn btn-Down-value btn-default btn-sm">请选择公司</button><button type="button" class="btn btn-default btn-sm dropdown-toggle" ><span class="caret"></span></button><div class="Dropdown"><div class="Dropdown-text"><input type="text" class="DownText"></div><ul class="dropdown-menu Dropdown-menu">';
            var DomEnd = '</ul></div></div>';
            var Data = data.data;
            var ClassName = data.ClassName;
            var ArrNum = 0;
            var AddNum = 0;
            var Type = true;
            var Downlist = [];
            var Derlist = [];
            var Pagelist = [];
            Derlist[ArrNum] = [];
            Pagelist[ArrNum] = [];
            for(var i=0;i<Data.length;i++){
                Pagelist[ArrNum].push({id:Data[i].accountId,name:Data[i].accountCnName});
                if((i+1)%20==0){
                    ArrNum+=1;
                    Pagelist[ArrNum] = [];
                }
            }

            function Clear(){
                Value={};
                Ctrl(Pagelist[0],false);
                _this.find('.btn-Down-value').text('请选择公司').removeAttr('name');
            }

            Downlist = Pagelist[0];

            Ctrl(Downlist,true);
            function Ctrl(data,is,clear){
                if(is){
                    _this.html(DomStart+AddDom(data)+DomEnd);
                }else{
                    if(clear){
                        _this.find('.Dropdown-menu').html('');
                    }
                    _this.find('.Dropdown-menu').append(AddDom(data));
                }
            }

            _this.find('.DownText').keyup(function(){
                AddNum = 0;
                var _index=0;
                ArrNum = 0;
                Derlist = [];
                Derlist[ArrNum] = [];
                var text = $(this).val();
                if(text==''){
                    Type=true;
                    Ctrl(Pagelist[0],false);
                    return false;
                }
        
                Pagelist.forEach(function(e){
                    e.forEach(function(res){
                        if(res.name.indexOf(text)>-1){
                            Derlist[ArrNum].push(res);
                            _index++;
                            if(_index==19){
                                _index=0;
                                ArrNum+=1;
                                Derlist[ArrNum] = [];
                            }
                        }
                    })
                })
                Ctrl(Derlist[0],false,true);
                Type=false;
            })

            _this.delegate('li','click',function(){
                var Value = new Object();
                Value.name=$(this).text();
                Value.id = $(this).attr('name');
                _this.find('.btn-Down-value').text($(this).text()).attr('name',$(this).attr('name'))
                _this.find('.Dropdown').stop().slideToggle(100);
                Return(Value);
            })

            //toggle
            _this.find('.dropdown-toggle').click(function(){
                _this.find('.Dropdown').stop().slideToggle(100);
            })

            //滚动加载
            _this.find('.Dropdown-menu').scroll(function(){
                if($(this).scrollTop()>$(this).height()+50){
                    AddNum+=1
                    if(Type){
                        Ctrl(Pagelist[AddNum],false);
                    }else{
                        Ctrl(Derlist[AddNum],false);
                    }
                }
            })

            //添加dom
            function AddDom(data){
                var text = '';
                for(i in data){
                    text+="<li name='"+data[i].id+"'><a href='javascript:;' title='"+data[i].name+"' >"+data[i].name+"</a></li>"
                }
                return text;
            }

            function Return(str){
                return options.returnVal(str);
            }

            return {
                    Clear:Clear
                };
        }
    })
})()
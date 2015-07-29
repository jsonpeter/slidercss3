/**
 * Created by JsonPeter on 2015/7/28.
 */
(function(s){
    var sliderCss=function(s){
        return _private._getDom.call(this,s);
    };
    sliderCss.prototype= {
        //��n:������� c ������� m ͼƬ���� num��ǰͼƬ fn �ص���
        init : function (n, c, m,num,type,fn) {

          return  _private._init.call(this, n, c, _private._getImgs.call(this, m),num,type,function(s){
                setTimeout(function(){
                    s.selectDoms.innerHTML="<div class='slider-postion'><img src='"+ s.imgList[num+1> s.imgList.length-1?0:num+1]+"'></div>";
                    fn();
                },1000)
            });
        }
    }
    //��ȡdom�ڵ�
    var _private={
        _getDom:function(str){
            var _str=""+str;
            switch (_str.charAt(0)){
                case "#":
                    this.selectDoms=document.getElementById(_str.substr(1));
                    break;
                //��������ʱû��д
                default :
                    break;
            }
            return this;
        },
        //��ȡͼƬ
        _getImgs:function(m){
            this.imgList=this.selectDoms.getAttribute(m).split(";")||[];
            return this.imgList;
        },
        //���ɾ���n:������� c ������� img ͼƬ���� num��ǰͼƬ callback �ص���
        _init:function(n,c,img,num,animtype,callback){
            var _num=num||0;
            var _innerHtml="";
            var _width=this.selectDoms.offsetWidth;
            var _height=this.selectDoms.offsetHeight;
            var sheet=document.styleSheets[0];
            for(var i=0;i<sheet.rules.length;i++){
                console.log(sheet.rules[i].selectorText);
                //if(sheet.rules[i].indexOf('@')){
                //    sheet.deleteRule(i);
                //}
            }
            for(var f=0;f<c;f++){
                for(var s=0;s<n;s++){
                    //����div
                    var _css="background:url("+img[_num]+") -"+Math.ceil(_width/n)*s+"px -"+Math.ceil(_height/c)*f+"px;"
                        +"width:"+Math.ceil(_width/n)+"px;height:"+Math.ceil(_height/c)+"px;"
                        +"-webkit-animation:sliderAnimate"+f+"_"+s+" 1s;";
                    _innerHtml+="<div style='"+_css+"'></div>";
                    //��������
                    var anObj;
                    switch (animtype){
                        case "bomb":
                            anObj=css3Animate.creatAnimate.intoAnimate_bomb(_width,_height,f,c,s,n);
                            break;
                        case "drop":
                            anObj=css3Animate.creatAnimate.intoAnimate_drop(_width,_height,f,c,s,n);
                        default :
                            break;
                    }
                    addKeyframeRule(anObj);

                }
            }
            this.selectDoms.innerHTML=_innerHtml+"<div class='slider-postion'><img src='"+ img[num+1>img.length-1?0:num+1]+"'></div>";
            callback(this);
        }
    };

    //����Ч��
    var css3Animate= {
        bomb: function (r, m, s, sl, op) {
            return "-webkit-transform:rotate(" + r + "deg) scale(" + sl + ")  translate(" + m + "px," + s + "px);opacity:" + op + "";
        },
        drop: function (sx,sy,r,s,op) {
            return "-webkit-transform:rotate(" + r + "deg)  skew("+sx+"deg,"+sy+"deg)  translate(0px,"+s+"px);opacity:" + op + "";
        },
        creatAnimate: {
            //����Ч��һ
            intoAnimate_bomb: function (_width,_height,f,c,s,n) {
                var _tmp1 = GetRandomNum(10, 20);
                var _tmp2 = GetRandomNum(100, 800);
                var _tmp3 = GetRandomNum(30, 100);
                var _rotate, _moveclm, _moveline;
                //λ�������ж�
                if (Math.ceil(_width / n) * s >= Math.ceil(_width / 2)) {
                    _rotate = _tmp1;
                    _moveclm = _tmp2;
                } else {
                    _rotate = 0 - (~~_tmp1);
                    _moveclm = 0 - (~~_tmp2);
                }
                //λ�������ж�
                if (Math.ceil(_height / c) * f >= Math.ceil(_height / 2)) {
                    _moveline = _tmp3;
                } else {
                    _moveline = 0 - (~~_tmp3);
                }
                //��������
                return "@-webkit-keyframes sliderAnimate" + f + "_" + s + " {0%{ " + css3Animate.bomb(0, 0, 0, 1.0, 1.0) + " }"
                    +"10%{ " + css3Animate.bomb(1,0,0,1.1, 1.0) + " }"
                    + "100%{ " + css3Animate.bomb(_rotate, _moveclm, _moveline, 1.0, 0.0) + "}}";

            },
            //����Ч����
            intoAnimate_drop:function (_width,_height,f,c,s,n) {
                var _tmp1 = GetRandomNum(1, 5);
                var _rotate, _moveline,_sx,_sy;

                //λ�������ж�
                if (Math.ceil(_height / c) * f >= Math.ceil(_height / 2)) {
                    _moveline =  GetRandomNum(150, 200);
                    //λ�������ж�
                    if (Math.ceil(_width / n) * s >= Math.ceil(_width / 2)) {
                        _sx= GetRandomNum(10, 20);
                        _sy=-GetRandomNum(20,30);
                    } else {
                        _sx=-GetRandomNum(30, 40);
                        _sy=GetRandomNum(0,20);
                    }

                } else {
                    _moveline =  GetRandomNum(300,400);
                    _sx=0;
                    _sy=0;
                }
                //��������
                return "@-webkit-keyframes sliderAnimate" + f + "_" + s + " {0%{ " + css3Animate.drop(0,0, 0, 1.0) + " }"
                        +"10%{ " + css3Animate.drop(1,-1,0,0, 1.0) + " }"
                    + "100%{ " + css3Animate.drop(_sx,_sy,0, _moveline, 0.0) + "}}";

            }
        }
    }
    //���ɷ�Χ�������
    function GetRandomNum(Min,Max){
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }
    //���css3������ʽ
    function addKeyframeRule(rule) {
        if (document.styleSheets && document.styleSheets.length){
            document.styleSheets[0].insertRule(rule,0);
        }
        else
        {
            var style = document.createElement('style');
            style.innerHTML = rule;
            document.head.appendChild(style);
        }
    }
    //ȫ�ֱ�¶
    s.$slider=function(s){
        return new sliderCss(s);
    }

})(window)
var main=document.getElementById('main'),
	con1=document.getElementById('con1'),
	ps=con1.getElementsByTagName('p'),
	p1=main.getElementsByTagName('p')[0],
	num=document.getElementById('num'),
	lis=num.getElementsByTagName('li');
var a=0;//代表当前数字的索引值
var b=1;//代表当前图片的索引值
var timer1,timer2;

var firstImg=con1.children[0].cloneNode(true);//复制第一张图片
var lastImg=con1.children[ps.length-1].cloneNode(true);//复制最后一张图片
con1.appendChild(firstImg);
con1.insertBefore(lastImg,con1.children[0]);

main.scrollLeft=con1.children[0].clientWidth;//初始位置

function move(){
	var start=main.scrollLeft;//运动起点
	var end=p1.offsetWidth*b;//运动终点
	var change=end-start;//运动量
	var minstep=0;//起始步数
	var maxstep=20;//最大步数
	var everystep=change/maxstep;//每步所走的距离
	clearInterval(timer2);
	timer2=setInterval(function (){//运动过程
		minstep++;
		if (minstep>=maxstep) {
			clearInterval(timer2);
		}
		// start+=everystep;//不是整数
		// main.scrollLeft=start;
		main.scrollLeft=Tween.Back.easeIn(minstep,start,change,maxstep);
		// main.scrollLeft=Tween.Back.easeIn(起始步数,起始位置,运动量,结束步数);
	},30);
	for (var i = 0; i < lis.length; i++) {
		lis[i].className='';
	}
	lis[a].className='show';
}
function autoMove(){
	clearInterval(timer1);
	timer1=setInterval(function (){//每隔两秒走一张
		a++;
		if (a>=lis.length) {
			a=0;
		}
		b++;
		if (b>=ps.length) {
			b=2;
			main.scrollLeft=con1.children[0].clientWidth;
		}
		move();
	},3000);
}
autoMove();//进入页面自动执行


for (var i = 0; i < lis.length; i++) {
	lis[i].onclick=function (){
		clearInterval(timer1);
		for (var i = 0; i < lis.length; i++) {
			if (lis[i]==this) {
				a=i;
				b=i+1;
				move();
				autoMove();//控制结束，自动走
			}
		}
	}
}
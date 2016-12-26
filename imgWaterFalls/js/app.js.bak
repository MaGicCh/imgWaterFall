window.onload = function(){
	imgLocation("container","box");
	
	//定义读取的图片数据json
	var imgData = {"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"}]}
	
	window.onscroll = function(){
		if(checkFlag("container","box")){
			var parentElement = document.getElementById("container");
			for(var i= 0;i<imgData.data.length;i++){
				var content = document.createElement("div");
				content.className = "box";
				parentElement.appendChild(content);
				var boximg = document.createElement("div");
				boximg.className = "box_img";
				content.appendChild(boximg);
				var img = document.createElement("img");
				img.src = "images/"+imgData.data[i].src;
				boximg.appendChild(img);
			}
			//添加新图片后重新布局
			imgLocation("container","box");
		}
	};
}
//判断时候加载新图片
function checkFlag(parent,content){
	var parentElement = document.getElementById(parent);
	var allContent = getChildElement(parentElement,content);
	//得到最后一张图片的高度
	var lastContentHeight = allContent[allContent.length - 1].offsetTop;
	//console.log(lastContentHeight);
	//获得当前滚动条的高度
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	//获得当前页面的高度
	var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
	//当最后一张图片的高度 < 当前滚动条的高度 + 当前页面的高度 需要加载新图片
	if(lastContentHeight < scrollTop + pageHeight){
		return true;
	}
	//console.log(pageHeight);
}

//parent父级控件，content父级控件下的内容
function imgLocation(parent,content){
	//将父级控件container下的全部内容取出
	var parentElement = document.getElementById(parent);
	//获得container下的所有box
	var allContent = getChildElement(parentElement,content);
	//获得box的宽度
	var imgWidth = allContent[3].offsetWidth;
	//获得初始页面的宽度下能够存放几张图片
	var num = Math.floor(document.documentElement.clientWidth / imgWidth);
	//设置box的父级控件container的宽度并且居中
	parentElement.style.cssText = "width:"+imgWidth * num +"px;margin:0 auto";
	
	//获得每张图片的高度
	var boxHeightArray = [];
	for(var i = 0;i<allContent.length;i++){
		//只需要获得第一排的高度
		if(i < num){
			boxHeightArray[i] = allContent[i].offsetHeight;
			//console.log(boxHeightArray[i]);
		}
		else{
			//获得最小高度
			var minHeight = Math.min.apply(null,boxHeightArray);
			//console.log("min->"+minHeight);
			//获得最小高度的位置
			var minINdex = getMinHeightLocation(boxHeightArray,minHeight);
			//设置下一张图片的位置
			allContent[i].style.position = "absolute";
			//设置下一张图片的起始高度
			allContent[i].style.top = minHeight + "px";
			//设置下一张图片的距离左边的宽度(放在最短的图片下面)
			allContent[i].style.left = allContent[minINdex].offsetLeft + "px";
			//更新当前高度,当前高度 = 原最小高度 + 第i张图片的高度
			boxHeightArray[minINdex] = boxHeightArray[minINdex] + allContent[i].offsetHeight;
			//console.log("+height->"+allContent[i].offsetHeight);
			//console.log("newmin->"+boxHeightArray[minINdex]);
		}
	}
	
}

//获得最小高度的图片的位置
function getMinHeightLocation(boxHeightArray,minHeight){
	for(var i in boxHeightArray){
		if(boxHeightArray[i] == minHeight){
			return i;
		}
	}
}

//获得父级控件下的所有元素
function getChildElement(parent,content){
	//定义一个数组用于存放父级控件下的内容
	var contentArray = [];
	//抓到父级控件下的所有元素
	var allContent = parent.getElementsByTagName("*");
	//遍历
	for(var i = 0;i<allContent.length;i++){
		//如果抓到的内容是box，将allContent[i]放入contentArray
		if(allContent[i].className == content){
			contentArray.push(allContent[i]);
		}
	}
	return contentArray;
}
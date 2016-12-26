window.onload = function(){
	imgLocation("container","box");
	
	//�����ȡ��ͼƬ����json
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
			//�����ͼƬ�����²���
			imgLocation("container","box");
		}
	};
}
//�ж�ʱ�������ͼƬ
function checkFlag(parent,content){
	var parentElement = document.getElementById(parent);
	var allContent = getChildElement(parentElement,content);
	//�õ����һ��ͼƬ�ĸ߶�
	var lastContentHeight = allContent[allContent.length - 1].offsetTop;
	//console.log(lastContentHeight);
	//��õ�ǰ�������ĸ߶�
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	//��õ�ǰҳ��ĸ߶�
	var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
	//�����һ��ͼƬ�ĸ߶� < ��ǰ�������ĸ߶� + ��ǰҳ��ĸ߶� ��Ҫ������ͼƬ
	if(lastContentHeight < scrollTop + pageHeight){
		return true;
	}
	//console.log(pageHeight);
}

//parent�����ؼ���content�����ؼ��µ�����
function imgLocation(parent,content){
	//�������ؼ�container�µ�ȫ������ȡ��
	var parentElement = document.getElementById(parent);
	//���container�µ�����box
	var allContent = getChildElement(parentElement,content);
	//���box�Ŀ��
	var imgWidth = allContent[3].offsetWidth;
	//��ó�ʼҳ��Ŀ�����ܹ���ż���ͼƬ
	var num = Math.floor(document.documentElement.clientWidth / imgWidth);
	//����box�ĸ����ؼ�container�Ŀ�Ȳ��Ҿ���
	parentElement.style.cssText = "width:"+imgWidth * num +"px;margin:0 auto";
	
	//���ÿ��ͼƬ�ĸ߶�
	var boxHeightArray = [];
	for(var i = 0;i<allContent.length;i++){
		//ֻ��Ҫ��õ�һ�ŵĸ߶�
		if(i < num){
			boxHeightArray[i] = allContent[i].offsetHeight;
			//console.log(boxHeightArray[i]);
		}
		else{
			//�����С�߶�
			var minHeight = Math.min.apply(null,boxHeightArray);
			//console.log("min->"+minHeight);
			//�����С�߶ȵ�λ��
			var minINdex = getMinHeightLocation(boxHeightArray,minHeight);
			//������һ��ͼƬ��λ��
			allContent[i].style.position = "absolute";
			//������һ��ͼƬ����ʼ�߶�
			allContent[i].style.top = minHeight + "px";
			//������һ��ͼƬ�ľ�����ߵĿ��(������̵�ͼƬ����)
			allContent[i].style.left = allContent[minINdex].offsetLeft + "px";
			//���µ�ǰ�߶�,��ǰ�߶� = ԭ��С�߶� + ��i��ͼƬ�ĸ߶�
			boxHeightArray[minINdex] = boxHeightArray[minINdex] + allContent[i].offsetHeight;
			//console.log("+height->"+allContent[i].offsetHeight);
			//console.log("newmin->"+boxHeightArray[minINdex]);
		}
	}
	
}

//�����С�߶ȵ�ͼƬ��λ��
function getMinHeightLocation(boxHeightArray,minHeight){
	for(var i in boxHeightArray){
		if(boxHeightArray[i] == minHeight){
			return i;
		}
	}
}

//��ø����ؼ��µ�����Ԫ��
function getChildElement(parent,content){
	//����һ���������ڴ�Ÿ����ؼ��µ�����
	var contentArray = [];
	//ץ�������ؼ��µ�����Ԫ��
	var allContent = parent.getElementsByTagName("*");
	//����
	for(var i = 0;i<allContent.length;i++){
		//���ץ����������box����allContent[i]����contentArray
		if(allContent[i].className == content){
			contentArray.push(allContent[i]);
		}
	}
	return contentArray;
}
var Http=function(){};
Http.getJson=function(url,callback){
	var ajax=new XMLHttpRequest();
	ajax.responseType="json";
	ajax.onreadystatechange=function(){
		if(ajax.readystate===4){
			if(ajax.status==200) callback(ajax.response);
		}
	};
	ajax.open("GET",url);
	ajax.send();		
};
var windowHeight=window.innerHeight;
var title_val=Smi.deF({
	prop:{
		_raw_:"span"
	},
	content:function(){
		return this.prop.value;
	}
});
var titlePanel=Smi.deF({
	prop:{
		_class_:["title_panel"]
	},
	content:function(){
		return title_val({value:this.prop.value});
	}
});
var innerPage=Smi.deF({
	prop:{
		_class_:["innerPage"]
	},
	content:function(){
		return titlePanel({value:this.prop.title});
	}
});
var IconFont=Smi.deF({
	prop:{
		_raw_:"i"
	},
	content:function(){
		return false;
	}
});
var Cube=Smi.deF({
	prop:{
		_class_:["cube"],
	},
	content:function(){
		return [
		NavigatePage({_class_:["front"]}),
		TopicMenu({_class_:["bottom"]}),
		ListItemPage({_class_:["back"]})
		];
	}
});
var ListItemPage=Smi.deF({

});
// var ListItemPage=
var NavigatePage=Smi.deF({
	prop:{
		navigateInfos:{displayInfo:[
			{
				title:"Ceil",
				width:50,
				height:100,
				background:'img/pic1.jpg',
				id:"1.1"
			},
			{
				title:"Ceil",
				width:50,
				height:50,
				background:'img/pic1.jpg',
				id:"1.2"
			},
			{
				title:"Ceil",
				width:30,
				height:50,
				background:'img/pic1.jpg',
				id:"1.3"
			},
			{
				title:"Ceil",
				width:20,
				height:60,
				background:'img/pic1.jpg',
				id:"1.4"
			}
			]}
	},
	fns:{
		// init:function(){
		// 	Http.getJson("http://"+window.location.host+"/data/page1.json",function(result){
		// 		console.log(result)
		// 		this.prop.navigateInfos=result;
		// 		this.update();
		// 	}.bind(this));
		// },
		handle_click_innerpage:function(evt){
			if(this.getShared("cancel_click")!==true){
				window.location.hash="#"+evt.currentTarget.prop.id;
				console.log(1)
				this.getShared("handle_active")();				
			}
		}
	},
	content:function(){
		return this.prop.navigateInfos.displayInfo.map(function(val){
			return innerPage({title:val.title,id:val.id,_style_:{width:val.width+"%",height:val.height+"%","background-image":"url("+val.background+")"}},
											 {click:this.fns.handle_click_innerpage});
		}.bind(this));	
	}
});
var TopicMenuHeader=Smi.deF({
	prop:{
		_raw_:"h2",
		_class_:["text-display"]
	},
	content:function(){
		return this.prop.inner;
	}
});
var TopicMenu=Smi.deF({
	content:function(){
		return [TopicMenuHeader({inner:"Topic Showcases"}),
					 TopicsWrap(),
					 TopicMenuBtnBox()];
	}
});
var TopicMenuBtnBox=Smi.deF({
	prop:{
		_class_:["pagination"]
	},
	content:function(){
		return [Wrap({IC:"Previous",_raw_:"span",_class_:["disable"]}),Wrap({IC:"Next",_raw_:"span",_class_:["disable"]})];
	}
});
var TopicsWrap=Smi.deF({
	prop:{
		_class_:["topic-menu"]
	},
	fns:{
		handle_click:function(){
			this.getShared("rotateupdate")(90,180);
		}
	},
	content:function(){
		return [TopicCeil({},{click:this.fns.handle_click}),TopicCeil(),TopicCeil(),TopicCeil(),
					 TopicCeil(),TopicCeil()];
	}
});
var TopicCeil=Smi.deF({
	prop:{
		_raw_:"a",
		_class_:["topic-ceil"]
	},
	content:function(){
		return [Wrap({_class_:["item-header"],IC:false,style:{"background-color":"blue"}}),
					 Wrap({_raw_:"h3",_class_:["item-title"],IC:"item-title"}),
					 "These tools help you manage servers and deploy happier and more often wi...",
					 TopicMeta()];
	}
});
var TopicMeta=Smi.deF({
	prop:{
		_class_:["item-meta"]
	},
	content:function(){
		return Wrap({_class_:"item-meta-details",_raw_:"span",IC:this.prop.articalNum+" "});
	}
});
var posCenter=Smi.deF({
	content:function(){
		return Cube({_style_:this.prop.dis_style});
	}
});
var ResponseWrap=Smi.deF({
	prop:{
		mouseP:{},
		_class_:["respnose-wrap"],
		rotate:0
	},
	fns:{
		init:function(){
			if(window.innerWidth>=992) {
				this.on("mousedown",this.fns.handle_mousedown_wrap);
				document.addEventListener("mouseup",function(){
					if(this.hasOn("mousemove")){ 
						this.off("mousemove");
						this.share("cancel_click",true);
						this.prop.bool_shrink=false;
						this.update();	
					}else{
						window.clearTimeout(this.prop.timeout);
						this.share("cancel_click",false);
					}
				}.bind(this));
			}
		},
		handle_mousedown_wrap:function(event){
			if(this.prop.rotate===180) return;
			event.preventDefault();
			var self=this;
			self.prop.mouseP.y=event.screenY;
			var dis=100;
			function A(eve){
				if(eve.screenY-self.prop.mouseP.y>dis){
					self.prop.rotatedeg=90;
					self.update();
					self.prop.mouseP.y=eve.screenY;
				}else if(eve.screenY-self.prop.mouseP.y<-dis){
					self.prop.rotatedeg=-90;
					self.update();
					self.prop.mouseP.y=eve.screenY;
				}
			}
			this.prop.timeout=window.setTimeout(function(){
				self.prop.bool_shrink=true;
				self.update();
				self.on("mousemove",A);
			},300);
		},
		getTransformStyle:function(){
			this.prop.rotate=this.prop.rotate+this.prop.rotatedeg;
			if(this.prop.rotate>this.prop.maxdeg) this.prop.rotate=this.prop.maxdeg;
			else if(this.prop.rotate<0) this.prop.rotate=0;
			if(this.prop.bool_shrink===true){
				this.prop.transition=0.8+"s";
				this.prop.add=0;
			}else{
				if(this.prop.rotate===90)this.prop.add=-50;
				else if(this.prop.rotate===270)this.prop.add=50;	
				else this.prop.add=0;
				this.prop.transition=0+"s";		
			}
			if(this.prop.rotatedeg!==0) {
				this.prop.transition=0.8+"s";
			}
			this.prop.rotatedeg=0;
			return "translateY("+this.prop.add+"%) rotateX("+this.prop.rotate+"deg)";
		}
	},
	content:function(){
		return Wrap({_class_:["cube-wrap"],IC:posCenter({_class_:this.prop.bool_shrink?["poscenter","shrink"]:["poscenter"],dis_style:{transform:this.fns.getTransformStyle(),transition:this.prop.transition}})});
	}
});
var MainHeader=Smi.deF({
	prop:{
		_raw_:"header"
	},
	fns:{
		handle_logo_click:function(){
			window.location.hash="#index";
			this.getShared("handle_active")();
		}
	},
	content:function(){
		return Wrap({_class_:["clearfix","container"],IC:[
			Link({_class_:["link-img"],_href_:"javascript:void 0",IC:Image({_src_:"img/logo.jpg",_width_:28,_height_:28})},{
			click:this.fns.handle_logo_click}),
			HeaderBtnBox({_class_:["hander-btn-box"]})]});		
	}
});
var HeaderBtnBox=Smi.deF({
	fns:{
		next:function(){
			this.getShared("rotateupdate")(90);
		},
		previous:function(){
			this.getShared("rotateupdate")(-90);
		}
	},
	content:function(){
		return [Wrap({_raw_:"span",IC:IconFont({_class_:["fa","fa-chevron-up"]})},{click:this.fns.previous}),
					 Wrap({_raw_:"span",IC:IconFont({_class_:["fa","fa-chevron-down"]})},{click:this.fns.next})];
	}
});
var Main=Smi.deF({
	prop:{
		cubewrap_height:windowHeight,
		rotatedeg:0,
		i:0,//用于更新,
		maxdeg:90
	},
	fns:{
		init:function(){
			window.addEventListener("resize",function(){
				if(window.innerHeight>this.prop.cubewrap_height){
					this.prop.cubewrap_height=window.innerHeight;
					this.update();
				}
			}.bind(this));
			this.share("rotateupdate",this.fns.updateRotate);
		},
		updateRotate:function(deg,maxdeg){
			if(maxdeg===undefined) this.prop.maxdeg=90;
			else this.prop.maxdeg=maxdeg;
			this.prop.rotatedeg=deg;
			this.prop.i++;
			this.update();
		}
	},
	content:function(){
		return [MainHeader({_class_:["header"]}),
					 ResponseWrap({_style_:{height:this.prop.cubewrap_height-49+"px"},rotatedeg:this.prop.rotatedeg,maxdeg:this.prop.maxdeg,i:this.prop.i})];
	}
});
var Wrap=Smi.deF({
	content:function(){
		return this.prop.IC;//InnerComponent
	}
});
var Link=Smi.deF({
	prop:{
		_raw_:"a"
	},
	content:function(){
		return this.prop.IC;
	}
});
var Image=Smi.deF({
	prop:{
		_raw_:"img"
	},
	content:function(){
		return false;
	}
});
var Item=Smi.deF({
	prop:{
		_raw_:"span"
	},
	content:function(){
		return this.prop.IC;
	}
});
var Artical=Smi.deF({
	prop:{
		_raw_:"artical"
	},
	content:function(){
		return "article";
	}
});
var ContentArticalWrap=Smi.deF({
	content:function(){
		return [Wrap({IC:"哈啊",_class_:["details-container"]}),Wrap({_class_:"artical",IC:Artical()})];
	}
});
var Bar=Smi.deF({
	prop:{
		_raw_:"header"
	},
	fns:{
		handle_logo_click:function(){
			window.location.hash="#index";
			this.getShared("handle_active")();
		}
	},
	content:function(){
		return Wrap({_class_:["clearfix","container"],IC:[Link({_class_:["link-img"],_href_:"#index",IC:Image({_src_:"img/logo.jpg",_width_:28,_height_:28})},
																													 {click:this.fns.handle_logo_click})]});
	}
});
var PageHeader=Smi.deF({
	content:function(){
	return Wrap({_class_:["container"],IC:[
							Item({_class_:["topic"],IC:Link({_href_:"#",IC:this.prop.topic})}),
							Item({_class_:["path-divider"],IC:"/"}),
							Item({_class_:["name"],IC:this.prop.name})]});
	}
});
var Content=Smi.deF({
	content:function(){
		return [Bar({_class_:["header"]}),
						PageHeader({_class_:["page-header"],topic:"时光与我"}),
						Wrap({_class_:["description","container"],IC:"Description"}),
						ContentArticalWrap({_class_:["content_articalwrap","container"]})];
	}
});
var mybeauty_app=Smi.deF({
	prop:{
		class_content:["content"],
		content_val:null,
		wrap_dis:"block",
		content_dis:"none",
		_class_:["app"]
	},
	fns:{
		init:function(){
			this.share("handle_active",this.fns.active);
			this.fns.active();			
		},
		active:function(evt){
			var id;
			if ((id=/^#\d+.\d+/.exec(window.location.hash))!==null){
				this.prop.class_content=["content","active"];
				this.update();
				setTimeout(function(){
					this.prop.class_content=["content","active","bounce"];
					this.prop.content_dis="block";
					this.prop.wrap_dis="none";
					this.update();
				}.bind(this),500);
				setTimeout(function(){
					this.prop.class_content=["content","active","scaleup"];
					this.update();
				}.bind(this),3000);
			}else{
				this.prop.class_content=["content"];
				this.prop.content_dis="none";
				this.prop.wrap_dis="block";
				this.update();
			}
		}
	},
	content:function(){
		return [Content({_class_:this.prop.class_content,val:this.prop.content_val,_style_:{display:this.prop.content_dis}}),
		Main({_class_:["page-index"],_style_:{display:this.prop.wrap_dis}})];
	}
});
Smi.render(mybeauty_app(),document.getElementsByClassName("main")[0]);

//父组件update导致子组件状态被清空

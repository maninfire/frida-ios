'use strict';

// SCChat sendText:
function findHookMethod(clsname,mtdname){
  if(ObjC.available) {
      for(var className in ObjC.classes) {
          if (ObjC.classes.hasOwnProperty(className)) {
              if(className == clsname) {
                 return ObjC.classes[className][mtdname];
              }
          }
      }
  }
  return;
}
var method = findHookMethod('ViewController', '- viewDidLoad');

Interceptor.attach(method.implementation, {
	onEnter:function (args){
		console.log('-[hkms:] onEnter...');
		//console.log('argv1:' + args[1]);//这个地址貌似应该是self,但输出不了对应字符串，不知为啥

		//console.log('argv2:' + args[2]);
		//var SCText = ObjC.Object(args[2]);//取相应地址的对象，
		//console.log('SCText2 is:' + SCText);//对象转换成字符串输出,这里本身已经是字符串了，所以和下面一句输出一样
		//console.log('SCText2 is:' + SCText.toString());//对象转换成字符串输出

		//var text2 = SCText['- text']();//这个貌似是去类中全局变量或其他内部类用的，如果没有直接导致下面的代码跳过，不会报错。
		//console.log('text2 is:' + text2.toString());
	},
	//retVal
	onLeave:function(){
		console.log('-[hkms:] onLeave...');
		//console.log('retVal-address:'+retVal);
		//var SCTextret = ObjC.Object(retVal);
		//console.log('retVal-value:'+SCTextret.toString());
	},
	
});

/*
var method = findHookMethod('KSLoginModel', 'thirdPartLoginWithOAuthParams:');

Interceptor.attach(method.implementation, {
	onEnter:function (args){
		console.log('argv1:' + args[1]);//这个地址貌似应该是self,但输出不了对应字符串，不知为啥
		var SCText = ObjC.Object(args[2]);//取相应地址的对象，这个是参数一
		console.log('SCText2 is:' + SCText);//对象转换成字符串输出,这里本身已经是字符串了，所以和下面一句输出一样
		console.log('SCText2 is:' + SCText.toString());//对象转换成字符串输出

		//var text2 = SCText['- text']();//这个貌似是去类中全局变量或其他内部类用的，如果没有直接导致下面的代码跳过，不会报错。
		//console.log('text2 is:' + text2.toString());
	},
	onLeave:function(retVal){
		console.log('-[KSLoginModel thirdPartLoginWithOAuthParams:] onLeave...');
	},
});*/


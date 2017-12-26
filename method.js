//show ui 
//controller

//by: AloneMonkey
//在主线程中输出
ObjC.schedule(ObjC.mainQueue, function(){

  	const window = ObjC.classes.UIWindow.keyWindow();
  	
  	const ui = window.recursiveDescription().toString();
	
  	send({ ui: ui });//和python交互发送到dealmessage
});


ObjC.schedule(ObjC.mainQueue, function(){

	const window = ObjC.classes.UIWindow.keyWindow();

	const rootControl = window.rootViewController();

	const control = rootControl['- _printHierarchy']();//拿到方法调用

	send({ ui: control.toString() });
});

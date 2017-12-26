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
//处理python传递来的消息
function handleMessage(message) {

  var order = message.substring(0,1);
  var command = '';

  switch(order){
  	case 'n':
  		command = message.substring(2);
  		
  		var view = new ObjC.Object(ptr(command));

	  	var nextResponder = view.nextResponder();

	  	nextResponder = new ObjC.Object(ptr(nextResponder));

	  	var deep = 0;

	  	var pre = '';

	  	while(nextResponder){

	    	pre += '-';

	      	send({ ui: pre+'>'+nextResponder.toString()});

	  		nextResponder = nextResponder.nextResponder();

	  		nextResponder = new ObjC.Object(ptr(nextResponder));
	  	}
  		break;
  	default:
  		send({ ui: 'error command' });
  }
  recv(handleMessage);
}

recv(handleMessage);

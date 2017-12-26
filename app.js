//uninstall app 
//show installed app list

//by: AloneMonkey

const LSApplicationWorkspace = ObjC.classes.LSApplicationWorkspace;
const LSApplicationProxy = ObjC.classes.LSApplicationProxy;

function getDataDocument(appid){
	const dataUrl = LSApplicationProxy.applicationProxyForIdentifier_(appid).dataContainerURL();
	if(dataUrl){
		return dataUrl.toString() + '/Documents';
	}else{
		return "null";
	}
}
function getData(appid){
	const dataUrl0 = LSApplicationProxy.applicationProxyForIdentifier_(appid);
	if(dataUrl0){
		return dataUrl0.toString();
	}else{
		return "null";
	}
}
function docinstalled(){
	const workspace = LSApplicationWorkspace.defaultWorkspace();
	const apps = workspace.allApplications();
	var result;
	for(var index = 0; index < apps.count(); index++){
		var proxy = apps.objectAtIndex_(index);
		result = result + proxy.localizedName().toString() + '\t' + proxy.bundleIdentifier().toString()+'\t'+ getDataDocument(proxy.bundleIdentifier().toString())+'\n';
		result = result + proxy.localizedName().toString() + '\t' + proxy.bundleIdentifier().toString()+'\t'+ getData(proxy.bundleIdentifier().toString())+'\n';
		//result = result + getDataDocument(proxy.bundleIdentifier().toString())+'\n';
	}
	send({app : result}); 
}

//处理python传递来的消息
function handleMessage(message) {
  send({ mes: 'into'});
  if(message['cmd']){
  	if(message['cmd'] == 'docinstalled'){
  		docinstalled();
  	}
  	
  }
  send({ mes: 'Successful operation!'});
  send({ finished: 'yes'});
}
recv(handleMessage);

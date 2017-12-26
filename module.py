#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import frida
import threading

reload(sys)
sys.setdefaultencoding('utf-8')
global session

def outWrite(text):
	sys.stdout.write(text.encode('utf8') + '\n');
#枚举某个进程的所有模块信息
def listModulesoOfProcess(session):
	global address
	modules = session.enumerate_modules()
	modules.sort(key = lambda item : item.base_address)
	module=modules[0]
	outWrite('%-40s\t%-10s\t%-10s\t%s' % (module.name, hex(module.base_address), hex(module.size), module.path))
	print "address:%s"%address
	if address:
		tempaddr=module.base_address-0x100000000
		print "0x%x"%tempaddr
		idaaddr=int(address,16)-tempaddr
		print "ida address:0x%x"%idaaddr
	'''for module in moduels:
		outWrite('%-40s\t%-10s\t%-10s\t%s' % (module.name, hex(module.base_address), hex(module.size), module.path))
		break'''
	
	session.detach()
#获取第一个USB连接的设备
def get_usb_iphone():
	dManager = frida.get_device_manager();
	changed = threading.Event()
	def on_changed():
		changed.set()
	dManager.on('changed',on_changed)
	device = None
	while device is None:
		devices = [dev for dev in dManager.enumerate_devices() if dev.type =='tether']
		if len(devices) == 0:
			print 'Waiting for usb device...'
			changed.wait()
		else:
			device = devices[0]

	dManager.off('changed',on_changed)
	return device

def main():
	global session
	global address
	global UIMESSAGE
	UIMESSAGE=''

	# 1. 获取USB设备
	address=''
	device = get_usb_iphone()
	print len(sys.argv)
	if len(sys.argv)>1:
		address=sys.argv[1]
	appname=u'有料短视频'
	print '设备信息:' + str(device)
	session = device.attach(appname)
	listModulesoOfProcess(session)
if __name__ == '__main__':
	try:
		main()
	except KeyboardInterrupt:
		if session:
			session.detach()
		sys.exit()
	else:
		pass
	finally:
		pass

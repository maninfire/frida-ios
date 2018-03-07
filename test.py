#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys

'''
global appname
print "脚本名：",sys.argv[0]
print len(sys.argv)
if len(sys.argv)>2:
	appname=sys.argv[2]
for i in range(1,len(sys.argv)):
	print "参数",i,sys.argv[i]
if sys.argv[1]=="ps":
	print 'ps'
elif sys.argv[1]=='appinf':
	print 'appinf'
elif sys.argv[1]=='mod':
	print u'mod'
	print appname
elif sys.argv[1]=='ui':
	print 'ui'
elif sys.argv[1]=='hook':
	print 'hook'
'''
uimessage='original '
file_object = open("uimess.txt",'w+')
all_the_text='hello'
uimessage=uimessage+all_the_text
try:
#all_the_text = file_object.read()
	file_object.write(uimessage)
finally:
	file_object.close()

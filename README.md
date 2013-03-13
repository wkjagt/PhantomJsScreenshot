PhantomJsScreenshot
===================

Screenshot script for PhantomJS

Most examples I found either didn't work, or worked but didn't provide the functionality I wanted. This is mostly for personal use, but feel free to use it, modify it, copy parts from it, or completely ignore it.

##usage

phantomjs capture.js url=http://google.com output=/tmp/google.png viewport=1280x1500 timeout=1000; echo $?

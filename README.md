#### Small summery of my long way to my first cross platform app with a HTC ONE S and win8

It was my first time to create a small jquery and phonegap based mobile app for android. I found that really small and simple tutorial http://www.techrepublic.com/blog/software-engineer/create-cross-platform-apps-with-phonegap-and-jquery-mobile/ which brought me fast to my first result.

But the way was hard. Not because of the new technologies or even the crazy build commands of nodejs. It's because every single developers environment is different. And especially my one.
After I had the steps of the tutorial done I had to learn hard what changed in the htc philosophy and whats new in windows8 drivers.

The summery, I needed to reinstall **jdk7** http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html
Change the environment variables manually JAVA_HOME - C:\Program Files (x86)\Java\jdk1.7.0_51 and add then to the Path var C:\Development\adt-bundle\sdk\platform-tools;C:\Development\adt-bundle\sdk\tools;%JAVA_HOME%\bin;%ANT_HOME%\bin

As you can see I created a dir named Development for the Android SDK http://developer.android.com/sdk/index.html?utm_source=weibolife. Interesting was, that the eclipse include just runs with the jre for x64 and the phonegap commands are only working with the x86 jdk installed.

After **phonegap run** and **phonegap install** I run into the next trouble. My device wasn't able to connect to **adb**. Why? No idea. But after reinstalling a hundred times the htc usb driver and installing the htc sync manager – unexpected, it works. I think, you definitely need a original htc usb cable (no noname one). So use the newest sync tool http://www.htc.com/www/software/htc-sync-manager/ and it should work.

It builds. And finally I created my wonderful simple contacts list app!

Also interesting:
https://code.google.com/p/winant/
http://developer.android.com/sdk/index.html#download
http://stackoverflow.com/questions/20576704/phonegap-cordova-android-development
http://docs.phonegap.com/en/2.9.0/guide_getting-started_android_index.md.html

#!/bin/sh

./bin/cmd-setup.sh

rm dist/android-release.apk

cordova build android --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore trelloTodos.keystore platforms/android/build/outputs/apk/release/android-release-unsigned.apk trelloTodos

/opt/android-sdk-linux/build-tools/26.0.2/zipalign -v 4 platforms/android/build/outputs/apk/release/android-release-unsigned.apk ./dist/android-release.apk


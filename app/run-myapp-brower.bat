echo off
cls
echo rendering PUGs ...

call pug files\www --out www

echo inicializing cordova

call cordova run browser


chcp 65001
::@echo off
goto :check_admin


rem 清理微信图片、视频（默认不开启）
:DeleteWechatPic

rem 设置WeChat Files目录路径，清理微信
set "TENCENT_PATH=%userprofile%\Documents\WeChat Files"
rem 遍历WeChat Files目录下的文件夹
for /d %%G in ("%TENCENT_PATH%\*") do (
    rem 检查是否存在FileStorage文件夹
    if exist "%%G\FileStorage" (
        set "USERPATH=%%G\FileStorage\Image"
	call :DeleteFolder
        set "USERPATH=%%G\FileStorage\Image"
	call :DeleteFolder
        set "USERPATH=%%G\FileStorage\Video"
	call :DeleteFolder
        set "USERPATH=%%G\FileStorage\CustomEmotion"
	call :DeleteFolder
        set "USERPATH=%%G\FileStorage\Sns"
	call :DeleteFolder
        set "USERPATH=%%G\FileStorage\Cache"
	call :DeleteFolder
        set "USERPATH=%%G\FileStorage\Temp"
	call :DeleteFolder
    )
)

:runAsAdmin
echo Requesting administrative privileges...
powershell -Command "Start-Process cmd -ArgumentList '/c %~0' -Verb RunAs"
goto :eof


:check_admin
net session >nul 2>&1
if %errorlevel% == 0 (
   goto :start
) else (
   goto :runAsAdmin
)

:start
setlocal

rem 获取当前用户的用户名
set "USERNAME=%USERNAME%"

rem 设置用户特定路径
set "USERPATH=%localappdata%\Roaming\Adobe\Common\Media Cache"
rem 调用函数
call :DeleteFolder

set "USERPATH=%appdata%\Adobe\Common\Media Cache"
call :DeleteFolder

set "USERPATH=%appdata%\Microsoft\Windows\Recent"
call :DeleteFolder

set "USERPATH=%userprofile%\AppData\Local\Temp"
call :DeleteFolder

set "USERPATH=%userprofile%\AppData\Local\Microsoft\Windows\INetCache\IE"
call :DeleteFolder

set "USERPATH=%windir%\Offline Web Pages"
call :DeleteFolder

set "USERPATH=%userprofile%\AppData\Local\Steam\htmlcache"
call :DeleteFolder

set "USERPATH=%windir%\SoftwareDistribution\download"
call :DeleteFolder

set "USERPATH=%windir%\Prefetch"
call :DeleteFolder

set "USERPATH=%windir%\SoftwareDistribution\download"
call :DeleteFolder

rem 设置Tencent Files目录路径，清理qq图片
set "TENCENT_PATH=%userprofile%\Documents\Tencent Files"
rem 遍历Tencent Files目录下的文件夹
for /d %%G in ("%TENCENT_PATH%\*") do (
    rem 检查是否存在Image、Video、Audio文件夹
    if exist "%%G\Image" (
        set "USERPATH=%%G\Image"
	call :DeleteFolder
    )
    if exist "%%G\Video" (
        set "USERPATH=%%G\Video"
	call :DeleteFolder
    )
    if exist "%%G\Audio" (
        set "USERPATH=%%G\Audio"
	call :DeleteFolder
    )
)
rem 清理telegram产生的缓存
set "USERPATH=%appdata%\Telegram Desktop\tdata\user_data\media_cache"
call :DeleteFolder

rem 删除微信小程序组件
set "USERPATH=%appdata%\Tencent\WeChat\XPlugin"
call :DeleteFolder
rem 删除腾讯会议生成的垃圾日志
set "USERPATH=%appdata%\Tencent\WeMeet\Global\Logs"
call :DeleteFolder
set "USERPATH=%appdata%\Tencent\WeMeet\Global\WebkitCache"
call :DeleteFolder

rem 清理流氓qq的其他东西
TASKKILL /f /IM "Tencent TenioDL for Game.exe"
TASKKILL /f /IM "QQMicroGameBoxTray.exe"
TASKKILL /f /IM "QQMicroGameBoxService.exe"
set "USERPATH=%userprofile%\AppData\Roaming\Tencent\QQMGBDownload"
call :DeleteFolder
set "USERPATH=%userprofile%\AppData\Local\Tencent\Cross"
call :DeleteFolder
set "USERPATH=%userprofile%\AppData\Roaming\Tencent\QQMicroGameBox"
call :DeleteFolder
set "USERPATH=%userprofile%\AppData\Roaming\Tencent\QQMiniGameBox"
call :DeleteFolder
set "USERPATH=%userprofile%\AppData\Roaming\Tencent\QQMiniDL"
call :DeleteFolder
set "USERPATH=%userprofile%\AppData\Roaming\Tencent\游戏人生cross"
call :DeleteFolder
set "USERPATH=%userprofile%\AppData\Local\Tencent\QQPet"
call :DeleteFolder
set "USERPATH=%systemdrive%\Program Files (x86)\Tencent\QQMicroGameBoxService"
call :DeleteFolder
set "USERPATH=%userprofile%\Roaming\Tencent\Logs"
call :DeleteFolder
set "USERPATH=%userprofile%\AppData\Roaming\Tencent\QQGAMETempest\Download"
call :DeleteFolder
set "USERPATH=%userprofile%\AppData\Roaming\Tencent\QQ\Temp"
call :DeleteFolder

rem 清理流氓NTQQ的东西（新版脑瘫QQ）
TASKKILL /f /IM "QQ.exe"
TASKKILL /f /IM "QQScreenshot.exe"
TASKKILL /f /IM "crashpad_handler.exe"
TASKKILL /f /IM "TxBugReport.exe"
rem 设置临时NTQQ工作目录
set "NTQQ_PATH=%userprofile%\Documents\Tencent Files"
rem 遍历Tencent Files目录下的文件夹
for /d %%G in ("%NTQQ_PATH%\*") do (
    rem 检查是否存在TIM文件夹
    if exist "%%G\TIM" (
        set "USERPATH=%%G\nt_qq"
	call :DeleteFolder
        set "USERPATH=%%G\GroupCollection"
	call :DeleteFolder
        set "USERPATH=%%G\MyCollection"
	call :DeleteFolder
        set "USERPATH=%%G\CloudRes"
	call :DeleteFolder
        set "USERPATH=%%G\AppWebCache"
	call :DeleteFolder
        set "USERPATH=%%G\RecommendFace"
	call :DeleteFolder
        rem 删除所有后缀为 .db 的文件
	del /s /q *.db
	rem 删除广告Ads文件并添加屏蔽
	del /s /q Ads
	mkdir Ads
	icacls Ads /inheritance:r /grant:r "Administrator:(OI)(CI)F" /deny "Users:(OI)(CI)W"
    )
)
rem 删除QQ多余的组件
set "RoamingQQ_PATH=%appdata%\Roaming\Tencent\QQ"
set "USERPATH=%RoamingQQ_PATH%\webkit_cache"
call :DeleteFolder
set "USERPATH=%RoamingQQ_PATH%\Temp"
call :DeleteFolder
set "USERPATH=%RoamingQQ_PATH%\STemp"
call :DeleteFolder
set "USERPATH=%RoamingQQ_PATH%\TimwpReport"
call :DeleteFolder
set "USERPATH=%RoamingQQ_PATH%\QQFace"
call :DeleteFolder
set "USERPATH=%RoamingQQ_PATH%\PushHead"
call :DeleteFolder
set "USERPATH=%RoamingQQ_PATH%\AuTemp"
call :DeleteFolder
set "USERPATH=%RoamingQQ_PATH%\HotFriendInfoRes"
call :DeleteFolder
del /s /q *.cache

set "USERPATH=%appdata%\Roaming\Tencent\Logs"
call :DeleteFolder

set "TIM_PATH=%appdata%\Roaming\Tencent\TIM"
set "USERPATH=%TIM_PATH%\Temp"
call :DeleteFolder
set "USERPATH=%TIM_PATH%\STemp"
call :DeleteFolder
set "USERPATH=%TIM_PATH%\PushHead"
call :DeleteFolder
set "USERPATH=%TIM_PATH%\QQFace"
call :DeleteFolder
set "USERPATH=%TIM_PATH%\HotFriendInfoRes"
call :DeleteFolder
set "USERPATH=%TIM_PATH%\TimwpReport"
call :DeleteFolder
set "USERPATH=%TIM_PATH%\GroupHead"
call :DeleteFolder
set "USERPATH=%TIM_PATH%\DSBackGround"
call :DeleteFolder

set "USERPATH=%appdata%\Roaming\Tencent\QQTempSys"
call :DeleteFolder

set "USERPATH=%appdata%\Roaming\Tencent\QQPCMgr"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\Tencent\QQLive"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\Tencent\QQDoctor"
call :DeleteFolder
rem 另一个流氓QQ目录
set "USERPATH=%appdata%\Roaming\QQ\tmp"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\QQ\Cache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\QQ\GPUCache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\QQ\Code Cache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\QQ\DawnCache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\QQ\log"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\QQ\logs"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\QQ\Partitions"
call :DeleteFolder


rem 删除IDM临时文件夹
set "USERPATH=%appdata%\Roaming\IDM\DwnlData"
call :DeleteFolder

rem 清理电脑版B站的缓存
set "USERPATH=%appdata%\Roaming\bilibili\Cache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\bilibili\Code Cache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\bilibili\GPUCache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\bilibili\DawnCache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\bilibili\logs"
call :DeleteFolder

REM 清理Discord目录缓存
set "USERPATH=%appdata%\Roaming\discord\Cache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\discord\Code Cache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\discord\GPUCache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\discord\DawnCache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\discord\logs"
call :DeleteFolder

REM 清理Z-Library目录缓存
set "USERPATH=%appdata%\Roaming\Z-Library\Cache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\Z-Library\Code Cache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\Z-Library\GPUCache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\Z-Library\DawnCache"
call :DeleteFolder
set "USERPATH=%appdata%\Roaming\Z-Library\logs"
call :DeleteFolder

REM 清理百度网盘自动升级目录缓存
set "USERPATH=%appdata%\Roaming\baidu\BaiduNetdisk\AutoUpdate"
call :DeleteFolder
REM 删除流氓的百度云管家
set "USERPATH=%appdata%\Roaming\BaiduYunGuanjia"
call :DeleteFolder


REM 清理Chrome缓存
set "USERPATH=%userprofile%\Local Settings\Application Data\Google\Chrome\User Data\Default\Cache\Cache_Data"
call :DeleteFolder
set "USERPATH=%localappdata%\Google\Chrome\User Data\Default\Cache\Cache_Data"
call :DeleteFolder
set "USERPATH=%localappdata%\Google\GoogleUpdater"
call :DeleteFolder

REM 清理Edge缓存
set "Edge_PATH=%localappdata%\Microsoft\Edge\User Data"
set "USERPATH=%Edge_PATH%\Default\Service Worker\CacheStorage"
call :DeleteFolder
set "USERPATH=%Edge_PATH%\Default\Cache"
call :DeleteFolder
set "USERPATH=%Edge_PATH%\Default\Code Cache"
call :DeleteFolder
set "USERPATH=%Edge_PATH%\Default\GPUCache"
call :DeleteFolder
set "USERPATH=%Edge_PATH%\Default\DawnCache"
call :DeleteFolder
set "USERPATH=%Edge_PATH%\Crashpad"
call :DeleteFolder
set "USERPATH=%Edge_PATH%\GrShaderCache"
call :DeleteFolder
set "USERPATH=%Edge_PATH%\ShaderCache"
call :DeleteFolder
set "USERPATH=%Edge_PATH%\Crashpad"
call :DeleteFolder

set "Edge_Dev_PATH=%localappdata%\Microsoft\Edge\User Data"
set "USERPATH=%Edge_Dev_PATH%\Default\Service Worker\CacheStorage"
call :DeleteFolder
set "USERPATH=%Edge_Dev_PATH%\Default\Cache"
call :DeleteFolder
set "USERPATH=%Edge_Dev_PATH%\Default\Code Cache"
call :DeleteFolder
set "USERPATH=%Edge_Dev_PATH%\Default\GPUCache"
call :DeleteFolder
set "USERPATH=%Edge_Dev_PATH%\Default\DawnCache"
call :DeleteFolder
set "USERPATH=%Edge_Dev_PATH%\Crashpad"
call :DeleteFolder
set "USERPATH=%Edge_Dev_PATH%\GrShaderCache"
call :DeleteFolder
set "USERPATH=%Edge_Dev_PATH%\ShaderCache"
call :DeleteFolder
set "USERPATH=%Edge_Dev_PATH%\Crashpad"
call :DeleteFolder

REM 删除奔溃日志CrashDumps
set "USERPATH=%localappdata%\CrashDumps"
call :DeleteFolder

REM 删除网易云音乐缓存
set "USERPATH=%localappdata%\Netease\CloudMusic\Cache"
call :DeleteFolder
set "USERPATH=%localappdata%\Netease\CloudMusic\Temp"
call :DeleteFolder
set "USERPATH=%localappdata%\Netease\CloudMusic\webapp91x64\Cache"
call :DeleteFolder
set "USERPATH=%localappdata%\Netease\CloudMusic\webapp91x64\Code Cache"
call :DeleteFolder
set "USERPATH=%localappdata%\Netease\CloudMusic\webapp91x64\GPUCache"
call :DeleteFolder


REM 删除钉钉旧版文件
set "USERPATH=c:\program files (x86)\DingDing\main\current_new"
call :DeleteFolder
set "USERPATH=d:\program files (x86)\DingDing\main\current_new"
call :DeleteFolder

set a=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90
for %%i in (%a%) do (
rd /s /q "%userprofile%\AppData\Local\DingTalk_%%i" >nul 2>nul
)

rem 清理edge产生的垃圾
set "USERPATH=%localappdata%\Packages\Microsoft.MicrosoftEdge_8wekyb3d8bbwe\AC\Temp"
call :DeleteFolder
set "USERPATH=%localappdata%\Packages\Microsoft.MicrosoftEdge_8wekyb3d8bbwe\AC\INetCache"
call :DeleteFolder


REM 清理WinSxs目录
Dism /online /Cleanup-Image /StartComponentCleanup

rem 最后使用系统自带的磁盘清理
cleanmgr /d C



rem 删除win10自带无用组件（可以去掉前面的“::”来自行决定删除一些项目，默认是不删除系统组件的）
::powershell -command "get-appxpackage  *municationsapps* | remove-appxpackage"
::powershell -command "get-appxpackage  *people* | remove-appxpackage"
::powershell -command "get-appxpackage  *zune* | remove-appxpackage"
::powershell -command "get-appxpackage  *alarms* | remove-appxpackage"

::powershell -command "get-appxpackage  *bing* | remove-appxpackage"
::powershell -command "get-appxpackage  *onenote* | remove-appxpackage"
::powershell -command "get-appxpackage  *camera* | remove-appxpackage"
::powershell -command "get-appxpackage  *photos* | remove-appxpackage"
::powershell -command "get-appxpackage  *maps* | remove-appxpackage"
::powershell -command "get-appxpackage  *soundrecorder* | remove-appxpackage"
::powershell -command "get-appxpackage  *xbox* | remove-appxpackage"



rem 是否要跳过清理微信（if 1==0则跳过，if 1则执行）
if 1==0 (
    goto :DeleteWechatPic
)

rem 结束脚本
exit /b





rem 定义函数用于删除用户指定目录
:DeleteFolder
rem 删除文件
del /f /s /q "%USERPATH%\*.*"
rem 切换目录
cd /d "%USERPATH%"
rem 删除目录
rd /s /q "%USERPATH%"
rem 返回调用位置
exit /b
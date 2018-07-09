var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
var packagesArr = [{
        app_name:'丰德运维开发版',
        package_name: 'io.fits.itworkorderms',
        jpush_key: '869f8ca7a6eb322a5925429d'
    },
    {
        app_name:'丰德运维测试版',
        package_name: 'io.fits.itworkordermsTest',
        jpush_key: '00a8a3ac7e74fdf3afc9806d'
    },
    {
        app_name:'丰德运维',
        package_name: 'io.fits.itworkordermsproduction',
        jpush_key: 'bf3b660117003544eaad9c6c'
    },
    {
        app_name:'运维服务系统',
        package_name: 'io.fits.itworkordermsHQYY',
        jpush_key: '641c0bc4f13fe042d8a518eb'
    },
];
// var argv = require( 'argv' );
// argv.option({
//     name:"jpush_key",//全称
//     short:"j",//命令的简称
//     type: 'string',
//     description: '传输极光推送的APP_key',
//     example: "'npm run --jpush_key=xxxxxx' or 'npm run -j xxxx'"
// })

// var args = argv.run();
// console.log("命令参数"+JSON.stringify(args))
// NODE_ENV指的是 server的环境，也就是 开发环境还是 测试环境或者生产环境，
var env = process.env.NODE_ENV || ''; //如果传入undefined，就给他一个默认字符串
//IONIC_ENV指的是 app的打包模式等，例如 --prod 这些
var IONIC_ENV = process.env.IONIC_ENV


useDefaultConfig.dev.resolve.alias = {
    '@env/environment': path.resolve(environmentPath(env))
}

function environmentPath(env) {
    var filePath = null;
    // env.indexOf('dev') != -1 ?
    //     filePath = 'src/environments/environment.ts' :
    //     filePath = 'src/environments/environment.' + env.replace(/^\s+|\s+$/g, "") + '.ts';

    switch (env) {
        case 'dev': //106验证环境
            filePath = 'src/environments/environment.ts'
            handleFile(0)
            break;
        case 'beta': //106验证环境
            filePath = 'src/environments/environment.beta.ts'
            handleFile(1)
            break;
        case 'test': //105测试环境
            filePath = 'src/environments/environment.test.ts'
            handleFile(1)
            break;
        case 'prod':
            filePath = 'src/environments/environment.prod.ts'
            handleFile(2)
            break;
        case 'other': //运维服务系统，客户版
            filePath = 'src/environments/environment.other.ts'
            handleFile(3)
            break;
        default: //默认开发环境
            //默认不做修改包名和key
            filePath = 'src/environments/environment.ts'
            //参数env == undefined；
            break;
    }
    console.log('使用环境变量为：' + filePath);
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red('\n' + filePath + ' 不存在！'));
    } else {
        return filePath;
    }
}
//把要处理的环境，的数组索引传进来
function handleFile(_newNum) {
    var newData;
    var oldDataConfig = fs.readFileSync('config.xml', 'utf8');
    var _oldNum = findPackageNameFunc(oldDataConfig);
    if (_oldNum !== _newNum) {
        console.log('当前app名字是：'+ packagesArr[_oldNum].app_name +'，当前包名是：' + packagesArr[_oldNum].package_name + '，极光推送APP_key：' + packagesArr[_oldNum].jpush_key);
        newData = oldDataConfig.replace(packagesArr[_oldNum].package_name, packagesArr[_newNum].package_name);
        newData = newData.replace(packagesArr[_oldNum].jpush_key, packagesArr[_newNum].jpush_key);
        newData = newData.replace(packagesArr[_oldNum].app_name, packagesArr[_newNum].app_name);
        fs.writeFileSync('config.xml', newData, 'utf8');
        editJpushKey(_oldNum, _newNum)
        console.log('已更改app名字为：'+ packagesArr[_newNum].app_name +'，已更改包名为：' + packagesArr[_newNum].package_name + '，极光推送APP_key：' + packagesArr[_newNum].jpush_key);
    }
}


//查询当前包名，返回索引值
function findPackageNameFunc(data) {
    var _index;
    packagesArr.forEach(function (element, key) {
        if (data.indexOf(element.package_name) > -1) {
            _index = key;
            console.log('当前的索引是：'+key)
            return;
        }
    })
    return _index; //返回数组的索引
}

//传入当前包名的索引值
function editJpushKey(olderIndex, newIndex) {
    var _oldStr = packagesArr[olderIndex].jpush_key;
    var _newStr = packagesArr[newIndex].jpush_key;
    console.log('旧key：'+_oldStr+',新key：'+_newStr );
    var _data1 = fs.readFileSync('plugins/android.json', 'utf8');
    var _result1 = _data1.replace(_oldStr, _newStr);
    fs.writeFileSync('plugins/android.json', _result1, 'utf8');
    console.log('路径为：plugins/android.json已替换jpush_key,key值为：'+ _newStr);


    var _data2 = fs.readFileSync('plugins/ios.json', 'utf8');
    var _result2 = _data2.replace(_oldStr, _newStr);
    fs.writeFileSync('plugins/ios.json', _result2,'utf8');
    console.log('路径为：plugins/ios.json已替换jpush_key,key值为：'+ _newStr);

    var _data3 = fs.readFileSync('plugins/fetch.json', 'utf8');
    var _result3 = _data3.replace(_oldStr, _newStr);
    fs.writeFileSync('plugins/fetch.json', _result3, 'utf8');
    console.log('路径为：plugins/fetch.json已替换jpush_key,key值为：'+ _newStr);

    var _data4 = fs.readFileSync('package.json', 'utf8');
    var _result4 = _data4.replace(_oldStr, _newStr);
    fs.writeFileSync('package.json', _result4, 'utf8');
    console.log('路径为：package.json 已替换jpush_key,key值为：'+ _newStr);

    // if (fs.existsSync('platforms/android/android.json')) {
    //     var _data5 = fs.readFileSync('platforms/android/android.json', 'utf8');
    //     var _result5 = _data5.replace('"'+_oldStr+'"', '"'+_newStr+'"');
    //     fs.writeFileSync('platforms/android/android.json', _result5, 'utf8');
    //     console.log('路径为：platforms/android/android.json 已替换jpush_key,key值为：'+ _newStr);

    //     var _data6 = fs.readFileSync('platforms/android/AndroidManifest.xml', 'utf8');
    //     var _result6 = _data6.replace(_oldStr, _newStr);
    //     fs.writeFileSync('platforms/android/AndroidManifest.xml', _result6, 'utf8');
    //     console.log('路径为：platforms/android/AndroidManifest.xml 已替换jpush_key,key值为：'+ _newStr);
    // } else {
    //     console.log(chalk.red('android平台文件不存在！'));
    // }

}

module.exports = function () {
    return useDefaultConfig;
}
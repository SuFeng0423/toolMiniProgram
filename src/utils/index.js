const API  = uni
module.exports  = {
	promisify(api) {
	  return (options, ...params) => {
		return new Promise((resolve, reject) => {
		  api(Object.assign({}, options, {success: resolve, fail: reject}), ...params)
		})
	  }
	},

	// 获取当前页url
	getCurrentPageUrl() {
	  const pages = getCurrentPages()    //获取加载的页面
	  const currentPage = pages[pages.length - 1]    //获取当前页面的对象
	  return currentPage.route    //当前页面url
	},

	// 获取当前页带参数的url
	getCurrentPageUrlWithArgs() {
	  const pages = getCurrentPages()    //获取加载的页面
	  const currentPage = pages[pages.length - 1]    //获取当前页面的对象
	  const url = currentPage.route    //当前页面url
	  const options = currentPage.options    //如果要获取url中所带的参数可以查看options
	  //拼接url的参数
	  let urlWithArgs = url + '?'
	  for (let key in options) {
	    let value = options[key]
	    urlWithArgs += key + '=' + value + '&'
	  }
	  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
	  return urlWithArgs
	},

	// 以key获取url参数
	getCurrentPageArg(key) {
	  const pages = getCurrentPages()    //获取加载的页面
	  const currentPage = pages[pages.length - 1]    //获取当前页面的对象
	  const url = currentPage.route    //当前页面url
	  const options = currentPage.options    //如果要获取url中所带的参数可以查看options
	  return options[key] ? options[key] : ''
	},

  //简单时间格式化
  //使用方法 供新手参考 :
  //let date = new Date();
  // dateFormat("YYYY-mm-dd HH:mm",date)
  dateFormat(fmt, date) {
    let ret
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'M+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'h+': date.getHours().toString(), // 时
      'm+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        )
      }
    }
    return fmt
  },

	// // 读取本地用户id
	// function getUserID() {
	//   try {
	//     let id = API.getStorageSync('LHMOUNT')
	//     if (!id) {
	//       id = uuid()
	//       API.setStorageSync('LHMOUNT', id)
	//     }
	//     return id
	//   } catch (e) {
	//   }
	// }

	// 图片压缩
	compressImg(filePath, that) {
	  return new Promise((resolve, reject) => {
	    API.getImageInfo({
	      src: filePath,
	      success: res => {
	        let canvasW = res.width;
	        let canvasH = res.height;
	        let radio = Math.trunc(canvasW / 512) == 0 ? 1 : Math.trunc(canvasW / 512);
	        canvasW = Math.trunc(res.width / radio);
	        canvasH = Math.trunc(res.height / radio);
	        that.setData({
	          cWidth: canvasW,
	          cHeight: canvasH
	        })
	        var ctx = API.createCanvasContext('compressCanvas')
	        ctx.drawImage(res.path, 0, 0, canvasW, canvasH)
	        setTimeout(function () {
	          ctx.draw(false, () => {
	            // url形式
	            API.canvasToTempFilePath({
	              canvasId: 'compressCanvas',
	              fileType: 'jpg',
	              destWidth: canvasW,
	              destHeight: canvasH,
	              success: function (res) {
	                console.log('res.tempFilePath', res.tempFilePath)
	                // let bs64 = API.getFileSystemManager().readFileSync(res.tempFilePath, "base64")
	                // resolve('data:image/jpeg;base64,' + bs64)//最终图片路径
	                resolve(res.tempFilePath)//最终图片路径
	              },
	              fail: function (res) {
	                console.log(res.errMsg)
	              }
	            })
	            // // base64形式
	            // API.canvasGetImageData({
	            //   canvasId: 'compressCanvas',
	            //   x: 0,
	            //   y: 0,
	            //   width: canvasW,
	            //   height: canvasH,
	            //   success: function (res) {
	            //     //引入upng，将图片转化成utf-8格式
	            //     let pngData = upng.encode([res.data.buffer], res.width, res.height)
	            //     //再转化成base64
	            //     let bs64 = API.arrayBufferToBase64(pngData)
	            //     resolve('data:image/jpeg;base64,' + bs64)//最终图片路径
	            //   },
	            //   fail: function (err) {
	            //     reject(err)
	            //     console.log("压缩错误",err)
	            //   }
	            // })

	          })
	        }, 500)
	      },
	      fail: function (err) {
	        console.log("获取图片信息错误", err)
	      }
	    })
	  })
	  },
}

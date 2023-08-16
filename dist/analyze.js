'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.analyze = void 0
const fs = require('fs')
const path = require('path')
const {
  isMainThread,
  parentPort,
  workerData,
  Worker: MyWorker
} = require('worker_threads')
require('ts-node/register')
//定义一个线程池类
class ThreadPool {
  constructor(numThreads) {
    this.numThreads = numThreads
    this.workers = []
    this.taskQueue = []
  }
  initialize() {
    console.log('111')
    for (let i = 0; i < this.numThreads; i++) {
      const worker = new MyWorker('./dist/worker.js')
      this.workers.push(worker)
      worker.on('message', (message) => {
        console.log(`Thread ${worker.threadId}: ${message}`)
      })
    }
  }
}
function analyze() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      //计算package.json的路径
      const packageJsonPath = path.resolve(
        path.dirname(__dirname),
        'package.json'
      )
      //读取package.json文件
      const packageData = fs.readFileSync(packageJsonPath, 'utf-8')
      const packageObj = JSON.parse(packageData)
      //读取依赖
      const dependencies = Object.keys(packageObj.dependencies) //生产依赖
      const devdependencies = Object.keys(packageObj.devDependencies) //开发依赖
      const currentPackageName = packageObj.name //主包名
      const currentPackageVersion = packageObj.version //主包版本
      //获取依赖个数
      const dependenciesCount = dependencies.length
      const devdependenciesCount = devdependencies.length
      return dependenciesCount
    } catch (error) {
      console.log(error)
      return 0
    }
  })
}
exports.analyze = analyze
if (isMainThread) {
  ;(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      const numThreads = yield analyze()
      console.log('numThreads: ', numThreads)
      const threadPool = new ThreadPool(numThreads)
      threadPool.initialize()
    }))()
}
//# sourceMappingURL=analyze.js.map
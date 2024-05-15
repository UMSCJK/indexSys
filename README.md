# indexSys成绩查询系统 - 数据库信息

| 考试代号 |  考试简称  | 考试全称                                            | 人数  |
| :------: | :--------: | :-------------------------------------------------- | :---: |
| 20230913 | 高三上学考 | 深圳市云顶学校高中部2022-2023学年上学期高三质量检测 |  134  |
| 20231118 | 高三上期中 | 深圳市云顶学校高中部2023-2024学年上学期高三期中考试 |  72   |
| 20240117 | 高三上期末 | 深圳市云顶学校高中部2023-2024学年上学期高三期末考试 |  125  |
| 20240228 | 深圳市一模 | 2024年深圳市高三年级第一次调研考试                  |  133  |
| 20240327 | 三月份月考 | 深圳市云顶学校高中部2023-2024学年下学期高三三月月考 |  115  |
| 20240424 | 深圳市二模 | 2024年深圳市高三年级第二次调研考试                  |  145  |

# 技术文档

## 通用函数 & 开发工具

| 函数 (参数)        | 参数类型 | 参数释义      | 作用                           | 核心原理         |
| :----------------- | :------: | :------------ | :----------------------------- | :--------------- |
| `$(id)`            |  String  | HTML元素的id  | 代替`document.getElementById`  | `getElementById` |
| `random(n)`        |  Number  | 随机数最大值  | 在0和n-1之间取随机整数         | `Math.floor`     |
| `allSame(arr)`     |  Array   | 输入的数组    | 若输入内容完全一致，输出true   | `if()`           |
| `copy(text)`       |  String  | 要复制的文本  | 将text存储至剪贴板 (传统实现)  | `execCommand`    |
| `csv(file, cnt)`   | String*2 | 文件名、内容  | 将字符串转为CSV文件下载        | `Blob()`         |
| `exist(name)`      |  String  | 姓名          | 返回数据库中指定学生的出现次数 | `if()`           |
| `hint(id, text)`   | String*2 | id、innerHTML | 暂时改变一个元素的innrtHTML    | `setTimeout`     |
| `list()`           |    无    | 无            | 打印数据库中的所有考试信息     | `console.log()`  |
| `download(exam)`   |  String  | 考试代号      | 下载指定考试的CSV格式成绩单    | `csv()`          |
| `copyAll(name, s)` | String*2 | 姓名、分隔符  | 复制指定考生的所有分数         | `copy()`         |
| `fastdebug()`      |    无    | 无            | 随机进入一个查询结果界面       | `check()`        |

# 部分函数详解

## `getData(stu, exam)`获取考生数据

### 基本原理

功能：返回 (`return`) 查询所需的指定考试、考生的全部数据

1. 选择使用的考试数据 (赋值`ed`对象，Exam Data)；  
   获取指定学生在该考试中的选课代号 (赋值`ss`变量，Student Selection)

- 若存在第二个参数`exam`：赋值`ed`为指定考试的全部数据
- 若不存在但存在`#exams`：赋值`ed`为`#exams`选择的考试
```js
if (exam) {
	var ed = db[exam]
} else if (!exam && $('exams')) {
	var ed = db[$('exams').value]
}
```

2. `var`并`return`考生数据，用于进一步处理

```js
var ... dat = ... // 略
return dat
```

### 使用例

#### 原始`data.js`数据

```js
const db = {
	"20240117": {
		"info": ["深圳市云顶学校高中部2023-2024学年上学期高三期末考试",
			"深圳市云顶学校", "高三年级上学期期末考试 (2024年1月)", "高三上期末", "高三"],
		"sub": {
			"tot": [125, 125], "chn": [125, 125], "mat": [125, 125],
			"eng": [93, 93], "jap": [32, 32], "his": 51, "phy": 74,
			"che": [0, 74], "bio": [0, 34], "pol": [67, 67], "geo": [74, 74]
		},
		"main": {
			"曹俊楷": [4, 5, 408, 24, 80, 43, 73, 39, 100, 6, 44, 5, 34, 43, 49, 42, 56, 39, 62, 39]
			// 其他考生略
		}
	}
}
```

#### 返回数据

##### `console.table`表格：`console.table(getData('曹俊楷', '20240117'))`

| index |      0 |    1 |        2 |    3 |    4 |    5 |    6 |    7 |    8 |   释义   |
| ----- | -----: | ---: | -------: | ---: | ---: | ---: | ---: | ---: | ---: | :------: |
| 0     | 曹俊楷 |    4 | Array(5) |      |      |      |      |      |      |          |
| 1     |   总分 | 语文 |     数学 | 英语 | 物理 | 化原 | 化学 | 地原 | 地理 | 学科名称 |
| 2     |    408 |   80 |       73 |  100 |   44 |   34 |   49 |   56 |   62 |   分数   |
| 3     |     24 |   43 |       39 |    6 |    5 |   43 |   42 |   39 |   39 |   排名   |
| 4     |    125 |  125 |      125 |   93 |   74 |   74 |   74 |      |      | 参加人数 |

注：

```js
getData('曹俊楷', '20240117')[0][2] == [ // Array(5)
	'深圳市云顶学校高中部2023-2024学年上学期高三期末考试',
	'深圳市云顶学校', '高三年级上学期期末考试 (2024年1月)', '高三上期末', '高三']
```

##### 文本数组、元素释义

```js
var arr = getData('曹俊楷', '20240117')
arr == [
	['曹俊楷', 4, ['深圳市云顶学校高中部2023-2024学年上学期高三期末考试',
		'深圳市云顶学校', '高三年级上学期期末考试 (2024年1月)', '高三上期末', '高三']],
	['总分', '语文', '数学', '英语', '物理', '化原', '化学', '地原', '地理'],
	[408, 80, 73, 100, 44, 34, 49, 56, 62], [24, 43, 39, 6, 5, 43, 42, 39, 39],
	[125, 125, 125, 93, 74, 74, 74]
]
```

| 数组内元素    | 释义           | 数组内元素    | 释义           |
| :------------ | :------------- | :------------ | :------------- |
| `arr[0]`      | 姓名           | `arr[3][5-8]` | 赋分选科名称   |
| `arr[1]`      | 班级           | `arr[4][0]`   | 总分           |
| `arr[2]`      | 考试信息       | `arr[4][1-4]` | 不赋分选科分数 |
| `arr[2][0]`   | 考试全称       | `arr[4][5-8]` | 赋分选科分数   |
| `arr[2][1]`   | 考试标题       | `arr[5][0]`   | 总排名         |
| `arr[2][2]`   | 考试副标题     | `arr[5][1-4]` | 不赋分选科排名 |
| `arr[2][3]`   | 考试简称       | `arr[5][5-8]` | 赋分选科排名   |
| `arr[2][4]`   | 年级           | `arr[6][0]`   | 总人数         |
| `arr[3][0]`   | "总分"         | `arr[6][1-4]` | 不赋分选科人数 |
| `arr[3][1-4]` | 不赋分选科名称 | `arr[6][5-6]` | 赋分选科人数   |

## `check()`功能

| 功能  |  `#name`   | `#exams` | 描述                                                |
| :---: | :--------: | :------: | :-------------------------------------------------- |
| 查询  |    姓名    | 指定考试 | 利用`getData()`函数展示指定考试中指定考生的成绩     |
| 复制  | 姓名+`all` |  未指定  | 使用`copyAll()`函数将指定考生的所有分数存储到剪贴板 |
| 下载  |    `dl`    | 指定考试 | 使用`download()`函数下载指定考试的CSV格式成绩单     |
| 报错  |    其他    |  未指定  | 使用`hint()`函数提示“无此人成绩”                    |
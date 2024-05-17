//#region 主要功能
function getData(stu, exam) {
	if (exam) {
		var ed = db[exam]
	} else if (!exam && $('exams')) {
		var ed = db[$('exams').value]
	}
	var ss = sl[ed.main[stu][1]], sub = {
		"英": ["eng", "英语"], "日": ["jap", "日语"], "物": ["phy", "物理", 1], "历": ["his", "历史", 0],
		"生": ["bio", "生物"], "地": ["geo", "地理"], "化": ["che", "化学"], "政": ["pol", "政治"]
	}, s = { "a": sub[ss[0]], "b": sub[ss[1]], "c": sub[ss[2]], "w": sub[ss[3]] },
		st = ed.main[stu], su = ed.sub, dat = [[stu, st[0], ed.info],
		['总分', '语文', '数学', s.w[1], s.a[1], s.b[1], s.b[1][0] + '原', s.c[1][0] + '原', s.c[1]],
		[st[2], st[4], st[6], st[8], st[10], st[12], st[14], st[16], st[18]],
		[st[3], st[5], st[7], st[9], st[11], st[13], st[15], st[17], st[19]],
		[su.tot[s.a[2]], su.chn[s.a[2]], su.mat[s.a[2]], su[s.w[0]][s.a[2]],
		su[s.a[0]], su[s.b[0]][s.a[2]], su[s.c[0]][s.a[2]]]]
	return dat
}
function check() {
	if ($('exams')) { inm = $('name').value } // 若select#exams存在，初始化inm
	if (inm == 'dl') { download($('exams').value) } // 若输入内容为'dl'
	else if (inm == '') { hint('check', '请输入姓名') } // 若没输入内容
	else if (inm.slice(-3) == 'all' && exist(inm.slice(0, -3))) { // 若以all结尾且有数据
		inm = inm.slice(0, -3) // 去掉全局变量inm末尾的'all'
		copyAll(inm, '\t')
		hint('check', '复制成功')
	} else if (db[$('exams').value].main[inm]) { // 若所选考试中有所选考生的成绩
		d = getData(inm)
		document.body.innerHTML = `\n\t<div id="header">\n\t\t<h1>${d[0][2][1]}</h1>
\t\t<h2>${d[0][2][2]}</h2>\n\t</div>\n\t<ul id="list">\n\t\t<li><span>姓名</span><span>${d[0][0]}</span></li>
\t\t<li><span>班级</span><span>${d[0][2][4]} (${d[0][1]}) 班</span></li>
\t\t<li><span><b>${d[1][0]}</b></span><span><b>${d[2][0]}</b> / 750 (${d[3][0]} / ${d[4][0]})</span></li>
\t\t<li><span><b>${d[1][1]}</b></span><span><b>${d[2][1]}</b> / 150 (${d[3][1]} / ${d[4][1]})</span></li>
\t\t<li><span><b>${d[1][2]}</b></span><span><b>${d[2][2]}</b> / 150 (${d[3][2]} / ${d[4][2]})</span></li>
\t\t<li><span><b>${d[1][3]}</b></span><span><b>${d[2][3]}</b> / 150 (${d[3][3]} / ${d[4][3]})</span></li>
\t\t<li><span><b>${d[1][4]}</b></span><span><b>${d[2][4]}</b> / 100 (${d[3][4]} / ${d[4][4]})</span></li>
\t\t<li><span><i>${d[1][5]}</i></span><span><i>${d[2][5]}</i> / 100 (${d[3][5]} / ${d[4][5]})</span></li>
\t\t<li><span><b>${d[1][6]}</b></span><span><b>${d[2][6]}</b> / 100 (${d[3][6]} / ${d[4][5]})</span></li>
\t\t<li><span><i>${d[1][7]}</i></span><span><i>${d[2][7]}</i> / 100 (${d[3][7]} / ${d[4][6]})</span></li>
\t\t<li><span><b>${d[1][8]}</b></span><span><b>${d[2][8]}</b> / 100 (${d[3][8]} / ${d[4][6]})</span></li>
\t\t<li><span><b>说明</b></span><span><b>得分/满分 (排名/参加人数)</b></span></li>
\t</ul>\n\t<div id="buttons">\n\t\t<div id="copy" class="btn" onclick="copyGrade()">复制</div>
\t\t<div id="back" class="btn" onclick="writeHTML()">返回</div>\n\t</div>
\t<p class="ps">\n\t\t加粗分数计入总分，全部小数分数已四舍五入<br>
\t\t各科参加人数为零分考生的排名数或合理猜测\n\t</p>\n\t<br>\n`
	} else { hint('check', '无此人成绩') }
}
function copyGrade() { // 复制成绩至剪贴板
	text = `姓名：${d[0][0]}\n班级：${d[0][2][4]} (${d[0][1]}) 班
考试：${d[0][2][3]}\n总分：${d[2][0]}/750 (${d[3][0]}/${d[4][0]})
语文：${d[2][1]}/150 (${d[3][1]}/${d[4][1]})\n数学：${d[2][2]}/150 (${d[3][2]}/${d[4][2]})
${d[1][0]}：${d[2][3]}/150 (${d[3][3]}/${d[4][3]})\n${d[1][1]}：${d[2][4]}/100 (${d[3][4]}/${d[4][4]})
${d[1][2]}：${d[2][5]}/100 (${d[3][5]}/${d[4][5]})\n${d[1][3]}：${d[2][6]}/100 (${d[3][6]}/${d[4][5]})
${d[1][4]}：${d[2][7]}/100 (${d[3][7]}/${d[4][6]})\n${d[1][5]}：${d[2][8]}/100 (${d[3][8]}/${d[4][6]})
说明：得分/满分 (排名/参加人数)`
	copy(text)
	hint('copy', '复制成功')
}
function writeHTML() { // 写入初始HTML内容
	document.body.innerHTML = `\n\t<style>\n\t\tbody {\n\t\t\tborder: 0;\n\t\t\theight: 100vh;
\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tflex-direction: column;
\t\t\tjustify-content: center;\n\t\t}\n\n\t\tp.ps {\n\t\t\tposition: fixed;\n\t\t}\n\t</style>
\t<div id="container">\n\t\t<h1 id="title">深圳市云顶学校<br>成绩查询系统</h1>
\t\t<input type="text" id="name" placeholder="请输入姓名" autocomplete="name" /><br>
\t\t<div id="row">\n\t\t\t<select name="exams" id="exams" title="exams">\n\t\t\t</select>
\t\t\t<div id="check" class="btn" onclick="check()">查询</div>\n\t\t</div>\n\t</div>
\t<p class="ps">输入姓名+"all"后点击查询按钮<br>即可复制全部成绩，如：张三all</p>\n`
	if (typeof (inm) !== 'undefined') { $('name').value = inm }
	for (var e in db) { // 写入option选项
		$('exams').innerHTML += `\t<option value=${e}>${db[e].info[3]}</option>\n\t\t\t`
	} // 为最近考试的option标签添加selected属性
	$('exams')[$('exams').length - 1].selected = true
}
window.onload = function () { // 页面加载完成后自动运行
	writeHTML()    // 写入初始HTML内容
	// list()      // 用于开发，测试list()函数
	// fastdebug() // 用于开发，跳过点击查询，直接显示成绩
}
//#endregion
//#region 通用函数
const $ = id => document.getElementById(id)
const random = n => Math.floor(Math.random() * n)
function allSame(arr) {
	var same = true
	for (var i = 1; i < arr.length; i++) {
		if (arr[i - 1] !== arr[i]) { same = false }
	}
	return same
}
function copy(text) {
	var area = document.createElement('textarea'), tempScrollY = scrollY
	area.value = text
	document.body.appendChild(area)
	area.focus()
	area.select()
	document.execCommand('copy')
	document.body.removeChild(area)
	scroll(0, tempScrollY)
}
function csv(file, cnt) {
	if (file && cnt) {
		var bom = new Uint8Array([0xEF, 0xBB, 0xBF]),
			blob = new Blob([bom, cnt], { type: 'text/csv;charset=utf-8' }),
			tempEle = document.createElement('a')
		tempEle.href = URL.createObjectURL(blob)
		tempEle.download = file
		tempEle.click()
		URL.revokeObjectURL(tempEle.href)
	}
}
function exist(name) {
	var num = 0
	for (var e in db) { if (db[e].main[name]) { num++ } }
	return num
}
function hint(id, text) {
	if ($(id)) { // 创建id-原innerHTML对应表
		if (typeof (ori) !== 'object') { ori = {} }
		if (!ori[id]) { ori[id] = $(id).innerHTML }
		$(id).innerHTML = text
		setTimeout(function () {
			if ($(id)) { $(id).innerHTML = ori[id] }
		}, 1500)
	}
}
//#endregion
//#region 开发工具
function list() {
	var text = ''
	for (var exam in db) {
		text += `${exam}\t${db[exam].info[4]}\t${keys(db[exam].main).length}人\t${db[exam].info[0]}\n`
	}
	var info = `当前数据库内含数据简要信息如下：
\n日期/代号\t年级\t人数\t考试全称\n${text}
P.S.: 在姓名框中输入'dl'，点击查询按钮后即开始下载
所选考试的CSV格式成绩表。也可用以下命令下载全部数据：
for (var e in db) { download(e) }`
	console.log(info)
}
function download(exam) {
	var filename = db[exam].info[3] + '.csv',
		cont = '姓名,班,选,A,B,C,W,总分,市排,语,语排,数,数排,外,外排,A科,A排,B科,B排,B赋,B赋排,C科,C排,C赋,C赋排'
	for (var stu in db[exam].main) {
		var m = db[exam].main[stu]
		cont += `\n${stu},${m[0]},${m[1]},${sl[m[1]][0]},${sl[m[1]][1]},${sl[m[1]][2]},${sl[m[1]][3]}`
		for (var i = 2; i < 20; i++) { cont += `,${m[i]}` }
	}
	csv(filename, cont)
	console.log(`"${db[exam].info[3]}.csv"下载成功：\n代号：${exam} \n考试：${db[exam].info[0]} `)
}
function copyAll(name, s) {
	if (exist(name)) {
		var compare = [], joined = []
		for (var e in db) { // 确定指定考生每场考试的班级和选科都一样
			if (db[e].main[name]) {
				compare.push(db[e].main[name][0] * 10 + db[e].main[name][1])
				joined.push(e)
			}
		}
		if (allSame(compare) == true) { // 若一样则继续
			var gd = getData(name, [joined[0]]),
				allData = `${name}${' '.repeat(7 - name.length * 2)}${gd[0][1]}班`
					+ `${s}总${s}语${s}数${s}${gd[1][3][0]}${s}${gd[1][4][0]}`
					+ `${s}${gd[1][5][0]}${s}赋${s}${gd[1][7][0]}${s}赋`
			console.log(gd)
			for (var j of joined) {
				allData += `\n${db[j].info[3]}`
				for (var i = 1; i < 10; i++) {
					allData += `${s}${db[j].main[name][i * 2]}`
				}
			}
			copy(allData)
		}
	}
}
function fastdebug() {
	writeHTML()
	var exams = [], stus = []
	for (var e in db) { exams.push(e) }
	var rdmExam = exams[random(exams.length)]
	for (var s in db[rdmExam].main) { stus.push(s) }
	var rdmStu = stus[random(stus.length)]
	$('exams').value = rdmExam
	$('name').value = rdmStu
	check()
}
//#endregion
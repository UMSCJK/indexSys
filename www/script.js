//#region 主要功能
function getSel(obj, exam) { // 返回指定考生的选科信息
	if (exam) { // 若有第二个参数
		var oSel = sl[db[exam].main[obj][1]] // 选科
	} else { // 若没有第二个参数则使用select的value
		if ($('exams')) {
			oSel = sl[db[$('exams').value].main[obj][1]]
		}
	}
	var sDat = [] // Student Data
	if (oSel[0] == '物') { sDat[0] = ['phy', '物理', 1] }
	if (oSel[0] == '历') { sDat[0] = ['his', '历史', 0] }
	if (oSel[1] == '地') { sDat[1] = ['geo', '地理', '地原'] }
	if (oSel[1] == '化') { sDat[1] = ['che', '化学', '化原'] }
	if (oSel[2] == '生') { sDat[2] = ['bio', '生物', '生原'] }
	if (oSel[2] == '政') { sDat[2] = ['pol', '政治', '政原'] }
	if (oSel[2] == '地') { sDat[2] = ['geo', '地理', '地原'] }
	if (oSel[3] == '英') { sDat[3] = ['eng', '英语'] }
	if (oSel[3] == '日') { sDat[3] = ['jap', '日语'] }
	if (oSel[3] == '俄') { sDat[3] = ['rus', '俄语'] }
	return sDat
}
function getData(obj) { // 返回查询所需的指定考试、考生的全部数据
	if ($('exams')) { var eDat = db[$('exams').value] }
	var sd = eDat.main[obj], gso = getSel(obj), es = eDat.sub, studentInfo = {
		"class": sd[0], "exam": eDat.info[0], "grade": eDat.info[4], "name": obj,
		"scr": [sd[2], sd[4], sd[6], sd[8], sd[10], sd[12], sd[14], sd[16], sd[18]],
		"rnk": [sd[3], sd[5], sd[7], sd[9], sd[11], sd[13], sd[15], sd[17], sd[19]],
		"sel": [gso[3][1], gso[0][1], gso[1][2], gso[1][1], gso[2][2], gso[2][1]],
		"tna": [es.tot[gso[0][2]], es.chn[gso[0][2]], es.mat[gso[0][2]], // 总、语数
		es[gso[3][0]][gso[0][2]], es[gso[0][0]][gso[0][2]],              // 外语、A科
		es[gso[1][0]][gso[0][2]], es[gso[2][0]][gso[0][2]]]              // B科、C科
	}
	return studentInfo
}
function check() { // 点击查询按钮后运行
	if ($('exams')) { // 若select#exams存在
		var eDat = db[$('exams').value] // 所选考试的全部数据
		inm = $('name').value
	}
	if (inm == 'dl') { // 若输入内容为'dl'
		download($('exams').value)
	} else if (inm == '') { // 若没输入内容
		hint('check', '请输入姓名')
	} else if (inm.slice(-3) == 'all' && exist(inm.slice(0, -3))) {// 若以all结尾且有数据
		inm = inm.slice(0, -3) // 去掉全局变量inm末尾的'all'
		copyAll(inm, '\t')
		hint('check', '复制成功')
	} else if (exist(inm)) { // 若所选考试中有所选考生的成绩
		dt = getData(inm)
		document.body.innerHTML = `
	<div id="header">
		<h1>${eDat.info[1]}</h1>
		<h2>${eDat.info[2]}</h2>
	</div>
	<ul id="list">
		<li><span>姓名</span><span>${dt.name}</span></li>
		<li><span>班级</span><span>${dt.grade} (${dt.class}) 班</span></li>
		<li><span><b>总分</b></span>
			<span><b>${dt.scr[0]}</b> / 750 (${dt.rnk[0]} / ${dt.tna[0]})</span></li>
		<li><span><b>语文</b></span>
			<span><b>${dt.scr[1]}</b> / 150 (${dt.rnk[1]} / ${dt.tna[1]})</span></li>
		<li><span><b>数学</b></span>
			<span><b>${dt.scr[2]}</b> / 150 (${dt.rnk[2]} / ${dt.tna[2]})</span></li>
		<li><span><b>${dt.sel[0]}</b></span>
			<span><b>${dt.scr[3]}</b> / 150 (${dt.rnk[3]} / ${dt.tna[3]})</span></li>
		<li><span><b>${dt.sel[1]}</b></span>
			<span><b>${dt.scr[4]}</b> / 100 (${dt.rnk[4]} / ${dt.tna[4]})</span></li>
		<li><span><i>${dt.sel[2]}</i></span>
			<span><i>${dt.scr[5]}</i> / 100 (${dt.rnk[5]} / ${dt.tna[5]})</span></li>
		<li><span><b>${dt.sel[3]}</b></span>
			<span><b>${dt.scr[6]}</b> / 100 (${dt.rnk[6]} / ${dt.tna[5]})</span></li>
		<li><span><i>${dt.sel[4]}</i></span>
			<span><i>${dt.scr[7]}</i> / 100 (${dt.rnk[7]} / ${dt.tna[6]})</span></li>
		<li><span><b>${dt.sel[5]}</b></span>
			<span><b>${dt.scr[8]}</b> / 100 (${dt.rnk[8]} / ${dt.tna[6]})</span></li>
		<li><span><b>说明</b></span><span><b>得分/满分 (排名/参考人数)</b></span></li>
	</ul>
	<div id='buttons'>
		<div id='copy' class="btn" onclick='copyGrade()'>复制</div>
		<div id='back' class="btn" onclick='writeHTML()'>返回</div>
	</div>
	<p class="ps">
		加粗分数计入总分，小数赋分四舍五入<br>
		各科参考人数取自该科零分考生的排名
	</p>
	<br>`
	} else {
		hint('check', '无此人成绩')
	}
}
function copyGrade() { // 复制成绩至剪贴板
	text = `姓名：${dt.name}\n班级：${dt.grade} (${dt.class}) 班
总分：${dt.scr[0]}/750 (${dt.rnk[0]}/${dt.tna[0]})
语文：${dt.scr[1]}/150 (${dt.rnk[1]}/${dt.tna[1]})
数学：${dt.scr[2]}/150 (${dt.rnk[2]}/${dt.tna[2]})
${dt.sel[0]}：${dt.scr[3]}/150 (${dt.rnk[3]}/${dt.tna[3]})
${dt.sel[1]}：${dt.scr[4]}/100 (${dt.rnk[4]}/${dt.tna[4]})
${dt.sel[2]}：${dt.scr[5]}/100 (${dt.rnk[5]}/${dt.tna[5]})
${dt.sel[3]}：${dt.scr[6]}/100 (${dt.rnk[6]}/${dt.tna[5]})
${dt.sel[4]}：${dt.scr[7]}/100 (${dt.rnk[7]}/${dt.tna[6]})
${dt.sel[5]}：${dt.scr[8]}/100 (${dt.rnk[8]}/${dt.tna[6]})
说明：得分/满分 (排名/报考人数)`
	copy(text)
	hint('copy', '复制成功')
}
function writeHTML() { // 写入初始HTML内容
	document.body.innerHTML = `\n\t<style id="remove">\n\t\tbody {
\t\t\tborder: 0;\n\t\t\theight: 100vh;\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;
\t\t\tflex-direction: column;\n\t\t\tjustify-content: center;\n\t\t}\n\n\t\tp.ps {
\t\t\tposition: fixed;\n\t\t}\n\t</style>
\t<div id="container">\n\t\t<h1 id="title">深圳市云顶学校<br>成绩查询系统</h1>
\t\t<input type="text" id="name" placeholder="请输入姓名" autocomplete="name" />
\t\t<br>\n\t\t<div id="row">\n\t\t\t<select name="exams" id="exams" title="exams">
\t\t\t\t<option value="20230913">高三上学考</option>
\t\t\t\t<option value="20231118">高三上期中</option>
\t\t\t\t<option value="20240117">高三上期末</option>
\t\t\t\t<option value="20240228">深圳市一模</option>
\t\t\t\t<option value="20240327" selected>三月份月考</option>
\t\t\t\t<option value="20240424" disabled>深圳市二模</option>\n\t\t\t</select>
\t\t\t<div id="check" class="btn" onclick="check()">查询</div>\n\t\t</div>\n\t</div>
\t<p class="ps">输入姓名+"all"后点击查询按钮<br>即可复制全部成绩，如：张三all</p>\n`
	if (typeof (inm) !== 'undefined') { $('name').value = inm }
}
window.onload = function () { // 页面加载完成后自动运行
	writeHTML()    // 写入初始HTML内容
	// list()      // 用于开发，测试list()函数
	// fastdebug() // 用于开发，跳过点击查询，直接显示成绩
}
//#endregion
//#region 通用函数
const $ = id => document.getElementById(id) // 简化document.getElementById
const random = n => Math.floor(Math.random() * n) // 在0和n - 1之间取随机整数
function copy(text) { // 将text存储至剪贴板 (传统实现)
	var area = document.createElement('textarea')
	var tempScrollY = scrollY
	area.value = text
	document.body.appendChild(area)
	area.focus()
	area.select()
	document.execCommand('copy')
	document.body.removeChild(area)
	scroll(0, tempScrollY)
}
function hint(id, text) {
	if ($(id)) {
		var ori = $(id).innerHTML
		$(id).innerHTML = text
		setTimeout(function () {
			if ($(id)) {
				$(id).innerHTML = ori
			}
		}, 1500)
	}
}
function allSame(arr) { // 输入数组，若数组内容完全一致，输出true
	var same = true
	for (var i = 1; i < arr.length; i++) {
		if (arr[i - 1] !== arr[i]) { same = false }
	}
	return same
}
function csv(filename, content) { // 下载CSV数据，指定文件名和字符串内容
	if (filename && content) {
		var bom = new Uint8Array([0xEF, 0xBB, 0xBF])
		var blob = new Blob([bom, content], { type: 'text/csv;charset=utf-8' })
		var tempEle = document.createElement('a')
		tempEle.href = URL.createObjectURL(blob)
		tempEle.download = filename
		tempEle.click()
		URL.revokeObjectURL(tempEle.href)
	}
}
function exist(name) { // 判断数据库中是否存在指定学生数据
	var num = 0
	for (e in db) {
		if (db[e].main[name]) { num++ }
	}
	return num
}
//#endregion
//#region 开发工具
function list() { // 打印数据库中的所有考试信息 (info)
	var info = `当前数据库内含数据简要信息如下：\n\n日期 / 代号\t年级\t考试全称\n`
	for (var exam in db) {
		info += `${exam} \t${db[exam].info[4]} \t${db[exam].info[0]} \n`
	}
	info += `\nP.S.: 在姓名框中输入'dl'，点击查询按钮后即开始下载
	所选考试的CSV格式成绩表。也可用以下命令下载全部数据：
	for (var e in db) { download(e) } `
	console.log(info)
}
function download(exam) { // 下载指定考试的CSV格式成绩单
	var filename = db[exam].info[3] + '.csv'
	var cont = '姓名,班,A,B,C,W,总分,市排,语,语排,数,数排,外,'
		+ '外排,A科,A排,B科,B排,B赋,B赋排,C科,C排,C赋,C赋排'
	for (var stu in db[exam].main) {
		var m = db[exam].main[stu]
		cont += `\n${stu},${m[0]} `
			+ `, ${sl[m[1]][0]},${sl[m[1]][1]},${sl[m[1]][2]},${sl[m[1]][3]} `
		for (var i = 2; i < 20; i++) {
			cont += `, ${m[i]} `
		}
	}
	csv(filename, cont)
	console.log(`"${db[exam].info[3]}.csv"下载成功：
	代号：${exam} \n考试：${db[exam].info[0]} `)
}
function copyAll(name, s) { // 复制指定考生的所有分数
	if (exist(name)) {
		var compare = [], joined = []
		for (var e in db) { // 确定指定考生每场考试的班级和选科都一样
			if (db[e].main[name]) {
				compare.push(db[e].main[name][0] * 10 + db[e].main[name][1])
				joined.push(e)
			}
		}
		if (allSame(compare) == true) { // 若一样则继续
			var sel = getSel(name, [joined[0]])
			var allData = `${name} ${db[joined[0]].main[name][0]}班${s} `
				+ `总${s}语${s}数${s}${sel[3][1][0]}${s}${sel[0][1][0]} `
				+ `${s}${sel[1][2][0]}${s}赋${s}${sel[2][2][0]}${s} 赋`
			for (j of joined) {
				var a = db[j].main[name]
				allData += `\n${db[j].info[3]} `
				for (var i = 1; i < 10; i++) { allData += `${s}${a[i * 2]} ` }
			}
			copy(allData)
		}
	}
}
function fastdebug() { // 随机选择考试考生，直接进入查询结果界面 (调试时使用)
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
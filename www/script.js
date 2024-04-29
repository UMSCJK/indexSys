//#region Main functions
function getExam() { // 返回指定考试的全部数据
	if (document.getElementById('exams')) {
		return db[document.getElementById('exams').value]
	}
}
function getSel(obj) { // 返回指定考生的选科信息
	var sDat = [], oSel = getExam().main[obj]
	if (sl[oSel[1]][0] == '物') { sDat[0] = ['phy', '物理', 1] }
	if (sl[oSel[1]][0] == '历') { sDat[0] = ['his', '历史', 0] }
	if (sl[oSel[1]][1] == '地') { sDat[1] = ['geo', '地理', '地原'] }
	if (sl[oSel[1]][1] == '化') { sDat[1] = ['che', '化学', '化原'] }
	if (sl[oSel[1]][2] == '生') { sDat[2] = ['bio', '生物', '生原'] }
	if (sl[oSel[1]][2] == '政') { sDat[2] = ['pol', '政治', '政原'] }
	if (sl[oSel[1]][2] == '地') { sDat[2] = ['geo', '地理', '地原'] }
	if (sl[oSel[1]][3] == '英') { sDat[3] = ['eng', '英语'] }
	if (sl[oSel[1]][3] == '日') { sDat[3] = ['jap', '日语'] }
	if (sl[oSel[1]][3] == '俄') { sDat[3] = ['rus', '俄语'] }
	return sDat
}
function getData(obj) { // 返回查询所需的指定考试、考生的全部数据
	var sd = getExam().main[obj], studentInfo = {
		"classNum": sd[0],
		"exam": getExam().info[0],
		"grade": getExam().info[4],
		"name": obj, // 分数、排名：总、语、数、外、A、B原、B、C原、C
		"scr": [sd[2], sd[4], sd[6], sd[8], sd[10], sd[12], sd[14], sd[16], sd[18]],
		"rnk": [sd[3], sd[5], sd[7], sd[9], sd[11], sd[13], sd[15], sd[17], sd[19]],
		"sel": [
			getSel(obj)[3][1], getSel(obj)[0][1], getSel(obj)[1][2],
			getSel(obj)[1][1], getSel(obj)[2][2], getSel(obj)[2][1]
		],
		"tna": [                                                 // 各科总报考人数
			getExam().sub.tot[getSel(obj)[0][2]],                // 总分
			getExam().sub.chn[getSel(obj)[0][2]],                // 语文
			getExam().sub.mat[getSel(obj)[0][2]],                // 数学
			getExam().sub[getSel(obj)[3][0]][getSel(obj)[0][2]], // 外语
			getExam().sub[getSel(obj)[0][0]][getSel(obj)[0][2]], // A科
			getExam().sub[getSel(obj)[1][0]][getSel(obj)[0][2]], // B科
			getExam().sub[getSel(obj)[2][0]][getSel(obj)[0][2]]  // C科
		]
	}
	return studentInfo
}
function check() { // 切至查询结果界面
	iNm = document.getElementById('name').value
	if (iNm == 'dl') {
		download(document.getElementById('exams').value)
	} else if (iNm == '') {
		hint('check', '请输入姓名')
	} else if (!getExam().main[iNm]) {
		hint('check', '无此人成绩')
	} else {
		dt = getData(iNm)
		document.body.innerHTML = `
	<div id="header">
		<h1 style="font-size: 24px;">${getExam().info[1]}</h1>
		<h2 style="font-size: 16px;">${getExam().info[2]}</h2>
	</div>
	<ul id="list">
		<li><span>姓名</span><span>${dt.name}</span></li>
		<li><span>班级</span><span>${dt.grade} (${dt.classNum}) 班</span></li>
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
		<div id='copy' class="button" onclick='copyGrade()'>复制</div>
		<div id='back' class="button" onclick='writeHTML()'>返回</div>
	</div>
	<p id="ps">
		加粗分数计入总分，小数赋分四舍五入<br>
		各科参考人数取自该科零分考生的排名
	</p>
	<br>\n`
	}
}
function copyGrade() { // 复制成绩至剪贴板
	text = `姓名：${dt.name}
班级：${dt.grade} (${dt.classNum}) 班
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
	document.body.innerHTML = `
	<style id="remove">
		body {
			border: 0;
			height: 100vh;
			display: flex;
			text-align: center;
			align-items: center;
			justify-content: center;
		}
	</style>
	<div id="container">
		<h1 id="title">深圳市云顶学校<br>成绩查询系统</h1>
		<input type="text" id="name" placeholder="请输入姓名"><br>
		<div id="row">
			<select name="exams" id="exams" title="exams">
				<option value="20230913">高三上学考</option>
				<option value="20231118">高三上期中</option>
				<option value="20240117">高三上期末</option>
				<option value="20240228">深圳市一模</option>
				<option value="20240327" selected>三月份月考</option>
				<option value="20240424" disabled>深圳市二模</option>
			</select>
			<div id="check" class="button" onclick="check()">查询</div>
		</div>
	</div>\n`
	if (typeof (iNm) !== 'undefined') {
		document.getElementById('name').value = iNm
	}
}
// 界面加载完成后自动运行
window.onload = function () {
	writeHTML()    // 写入初始HTML内容
	// list()      // 用于开发，测试list()函数
	// fastdebug() // 用于开发，跳过点击查询，直接显示成绩
}
//#endregion
//#region Universal functions
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
function hint(id, text) { // 更改一个按钮的内容，1.5s后恢复
	if (document.getElementById(id)) {
		var element = document.getElementById(id)
		var original = element.innerHTML
		element.innerHTML = text
		if (element) {
			setTimeout(function () {
				element.innerHTML = original
			}, 1500)
		}
	}
}
function allSame(arr) { // 输入数组，若数组内容完全一致，输出true
	var same = true
	for (var i = 1; i < arr.length; i++) {
		if (arr[i - 1] !== arr[i]) {
			same = false
		}
	}
	return same
}
function random(n) {
	return Math.floor(Math.random() * n)
	// random = n => Math.floor(Math.random() * n)
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
//#endregion
//#region Development utilities
function list() { // 打印数据库中的所有考试信息 (info)
	var info = `当前数据库内含数据简要信息如下：\n
日期/代号\t年级\t考试全称\n`
	for (exam in db) {
		info += `${exam}\t${db[exam].info[4]}\t${db[exam].info[0]}\n`
	}
	info += `\nP.S.: 在姓名框中输入'dl'，点击查询按钮后即开始下载
所选考试的CSV格式成绩表。也可用以下命令下载全部数据：
for (e in db) { download(e) }`
	console.log(info)
}
function download(exam) { // 下载指定考试的CSV格式成绩单
	var filename = db[exam].info[3] + '.csv'
	var cont = '姓名,班,A,B,C,W,总分,市排,语,语排,数,数排,外,'
		+ '外排,A科,A排,B科,B排,B赋,B赋排,C科,C排,C赋,C赋排'
	for (stu in db[exam].main) {
		var m = db[exam].main[stu]
		cont += `\n${stu},${m[0]}`
			+ `,${sl[m[1]][0]},${sl[m[1]][1]},${sl[m[1]][2]},${sl[m[1]][3]}`
		for (var i = 2; i < 20; i++) {
			cont += `,${m[i]}`
		}
	}
	csv(filename, cont)
	console.log(`"${db[exam].info[3]}.csv"下载成功：
代号：${exam}
考试：${db[exam].info[0]}`)
}
function fastdebug() { // 随机选择考试考生，直接进入查询结果界面 (调试时使用)
	writeHTML()
	var exams = [], stus = []
	for (e in db) { exams.push(e) }
	var rdmExam = exams[random(exams.length)]
	for (s in db[rdmExam].main) { stus.push(s) }
	var rdmStu = stus[random(stus.length)]
	document.getElementById('exams').value = rdmExam
	document.getElementById('name').value = rdmStu
	check()
}
//#endregion
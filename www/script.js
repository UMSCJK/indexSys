//#region Main functions
function getExam() { // 返回指定考试的全部数据
	if (document.getElementById('exams')) {
		return db[document.getElementById('exams').value]
	}
}
function getSel(obj) { // 返回指定考生的选科信息
	var rtDat = []
	oSel = getExam().main[obj]
		 if (oSel[1][0] == 'phy') { rtDat[0] = ['phy', '物理', 1] }
	else if (oSel[1][0] == 'his') { rtDat[0] = ['his', '历史', 0] }
		 if (oSel[1][1] == 'geo') { rtDat[1] = ['geo', '地理', '地原'] }
	else if (oSel[1][1] == 'che') { rtDat[1] = ['che', '化学', '化原'] }
		 if (oSel[1][2] == 'bio') { rtDat[2] = ['bio', '生物', '生原'] }
	else if (oSel[1][2] == 'pol') { rtDat[2] = ['pol', '政治', '政原'] }
	else if (oSel[1][2] == 'geo') { rtDat[2] = ['geo', '地理', '地原'] }
		 if (oSel[1][3] == 'eng') { rtDat[3] = ['eng', '英语'] }
	else if (oSel[1][3] == 'jap') { rtDat[3] = ['jap', '日语'] }
	else if (oSel[1][3] == 'rus') { rtDat[3] = ['rus', '俄语'] }
	return rtDat
}
function getData(obj) { // 返回查询所需的指定考试、考生的全部数据
	var oMn = getExam().main[obj], oDat = {
		"classNum": oMn[0],
		"exam": getExam().info[0],
		"grade": getExam().info[4],
		"name": obj, // 分数、排名：总分、语文、数学、外语、A科、B科原、B科、C科原、C科
		"grd": [oMn[2], oMn[4], oMn[6], oMn[8], oMn[10], oMn[12], oMn[14], oMn[16], oMn[18]],
		"cty": [oMn[3], oMn[5], oMn[7], oMn[9], oMn[11], oMn[13], oMn[15], oMn[17], oMn[19]],
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
	return oDat
}
function check() { // 切至查询结果界面
	iNm = document.getElementById('name').value
	if (iNm == 'dl') { download(document.getElementById('exams').value) }
	else if (iNm == '') { hint('check', '请输入姓名') }
	else if (!getExam().main[iNm]) { hint('check', '无此人成绩') }
	else {
		oDat = getData(iNm)
		document.body.innerHTML = `
	<div id="header">
		<h1 style="font-size: 24px;">${getExam().info[1]}</h1>
		<h2 style="font-size: 16px;">${getExam().info[2]}</h2>
	</div>
	<ul id="list">
		<li><span>姓名</span><span>${oDat.name}</span></li>
		<li><span>班级</span><span>${oDat.grade} (${oDat.classNum}) 班</span></li>
		<li><span><b>总分</b></span>
			<span><b>${oDat.grd[0]}</b> / 750 (${oDat.cty[0]} / ${oDat.tna[0]})</span></li>
		<li><span><b>语文</b></span>
			<span><b>${oDat.grd[1]}</b> / 150 (${oDat.cty[1]} / ${oDat.tna[1]})</span></li>
		<li><span><b>数学</b></span>
			<span><b>${oDat.grd[2]}</b> / 150 (${oDat.cty[2]} / ${oDat.tna[2]})</span></li>
		<li><span><b>${oDat.sel[0]}</b></span>
			<span><b>${oDat.grd[3]}</b> / 150 (${oDat.cty[3]} / ${oDat.tna[3]})</span></li>
		<li><span><b>${oDat.sel[1]}</b></span>
			<span><b>${oDat.grd[4]}</b> / 100 (${oDat.cty[4]} / ${oDat.tna[4]})</span></li>
		<li><span><i>${oDat.sel[2]}</i></span>
			<span><i>${oDat.grd[5]}</i> / 100 (${oDat.cty[5]} / ${oDat.tna[5]})</span></li>
		<li><span><b>${oDat.sel[3]}</b></span>
			<span><b>${oDat.grd[6]}</b> / 100 (${oDat.cty[6]} / ${oDat.tna[5]})</span></li>
		<li><span><i>${oDat.sel[4]}</i></span>
			<span><i>${oDat.grd[7]}</i> / 100 (${oDat.cty[7]} / ${oDat.tna[6]})</span></li>
		<li><span><b>${oDat.sel[5]}</b></span>
			<span><b>${oDat.grd[8]}</b> / 100 (${oDat.cty[8]} / ${oDat.tna[6]})</span></li>
		<li><span><b>说明</b></span><span><b>得分/满分 (排名/参考人数)</b></span></li>
	</ul>
	<div id='buttons'>
		<div id='copy' class="button" onclick='copyGrade()'>复制</div>
		<div id='back' class="button" onclick='writeHTML()'>返回</div>
	</div>
	<p id="ps">加粗分数计入总分，小数赋分四舍五入<br>各科参考人数取自该科零分考生的排名</p>
	<br>
	`
	}
}
function copyGrade() { // 复制成绩至剪贴板
	text = `姓名：${oDat.name}
班级：${oDat.grade} (${oDat.classNum}) 班
总分：${oDat.grd[0]}/750 (${oDat.cty[0]}/${oDat.tna[0]})
语文：${oDat.grd[1]}/150 (${oDat.cty[1]}/${oDat.tna[1]})
数学：${oDat.grd[2]}/150 (${oDat.cty[2]}/${oDat.tna[2]})
${oDat.sel[0]}：${oDat.grd[3]}/150 (${oDat.cty[3]}/${oDat.tna[3]})
${oDat.sel[1]}：${oDat.grd[4]}/100 (${oDat.cty[4]}/${oDat.tna[4]})
${oDat.sel[2]}：${oDat.grd[5]}/100 (${oDat.cty[5]}/${oDat.tna[5]})
${oDat.sel[3]}：${oDat.grd[6]}/100 (${oDat.cty[6]}/${oDat.tna[5]})
${oDat.sel[4]}：${oDat.grd[7]}/100 (${oDat.cty[7]}/${oDat.tna[6]})
${oDat.sel[5]}：${oDat.grd[8]}/100 (${oDat.cty[8]}/${oDat.tna[6]})
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
			</select>
			<div id="check" class="button" onclick="check()">查询</div>
		</div>
	</div>`
	if (typeof (iNm) !== 'undefined') {
		document.getElementById('name').value = iNm
	}
}
// 界面加载完成后自动运行
window.onload = function () {
	writeHTML()    // 写入初始HTML内容
	// list()      // 测试list()函数，用于开发
	// fastdebug() // 跳过点击查询，直接显示成绩，用于开发
}
//#endregion
//#region Universal functions
function copy(text) { // 将text存储至剪贴板 (传统实现)
	var tempArea = document.createElement('textarea')
	var tempScrollY = scrollY
	tempArea.value = text
	document.body.appendChild(tempArea)
	tempArea.focus()
	tempArea.select()
	document.execCommand('copy')
	document.body.removeChild(tempArea)
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
//#endregion
//#region Development utilities
function random(n) {
	return Math.floor(Math.random() * n)
	// const random = (n) => Math.floor(Math.random() * n)
}
function list() { // 打印数据库中的所有考试信息 (info)
	var info = `当前数据库内含数据简要信息如下：\n
日期/代号\t年级\t考试全称\n`
	for (exam in db) {
		info += `${exam}\t${db[exam].info[4]}\t${db[exam].info[0]}\n`
	}
	info += `\nP.S.: 在姓名框中输入'dl'，点击查询按钮后即开始下载
所选考试的CSV格式成绩表。`
	console.log(info)
}
function download(exam) { // 下载指定考试的CSV格式成绩单
	var content = '姓名,班,A,B,C,W,总分,市排,语,语排,数,数排,外,'
	content += '外排,A科,A排,B科,B排,B赋,B赋排,C科,C排,C赋,C赋排\n'
	for (stu in db[exam].main) {
		var m = db[exam].main[stu]
		content += stu
		for (var i = 0; i < 20; i++) {
			content += `,${m[i]}`
		}
		content += '\n'
	}
	var bom = new Uint8Array([0xEF, 0xBB, 0xBF])
	var blob = new Blob([bom, content], { type: 'text/csv;charset=utf-8' })
	var tempEle = document.createElement('a')
	tempEle.href = URL.createObjectURL(blob)
	tempEle.download = db[exam].info[3] + '.csv'
	tempEle.click()
	URL.revokeObjectURL(tempEle.href)
	console.log(`"${db[exam].info[3]}.csv"下载成功：
代号：${exam}
考试：${db[exam].info[0]}`)
}
function fastdebug() { // 随机选择考试考生，直接进入查询结果界面 (调试时使用)
	writeHTML()
	var exams = [], students = []
	for (exam in db) { exams.push(exam) }
	var random_exam = exams[random(exams.length)]
	for (stu in db[random_exam].main) { students.push(stu) }
	var random_stu = students[random(students.length)]
	document.getElementById('exams').value = random_exam
	document.getElementById('name').value = random_stu
	check()
}
//#endregion
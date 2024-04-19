function getExam() {
	if (document.getElementById('exams')) {
		selExam = document.getElementById('exams').value
	}
	return db[selExam]
}
function getSel(obj) {
	rtDat = []
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
function getData(obj) {
	oMn = getExam().main[obj]
	var oDat = {
		"exam": getExam().info[0],
		"grade": getExam().info[3],
		"classNum": oMn[0],
		"name": obj, // 分数、排名：总分、语文、数学、外语、A科、B科原、B科、C科原、C科
		"grd": [oMn[2], oMn[4], oMn[6], oMn[8], oMn[10], oMn[12], oMn[14], oMn[16], oMn[18]],
		"cty": [oMn[3], oMn[5], oMn[7], oMn[9], oMn[11], oMn[13], oMn[15], oMn[17], oMn[19]],
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
function query() {
	iNm = document.getElementById('name').value
	if (iNm == '') {
		document.getElementById('querybtn').innerHTML = '请输入姓名'
		setTimeout(function () { document.getElementById('querybtn').innerHTML = '查询' }, 1500)
	} else if (!getExam().main[iNm]) {
		document.getElementById('querybtn').innerHTML = '无此人成绩'
		setTimeout(function () { document.getElementById('querybtn').innerHTML = '查询' }, 1500)
	} else {
		oDat = getData(iNm)
		document.body.innerHTML = `
	<div id="header">
		<h1 style="font-size: 24px;">${getExam().info[1]}</h1>
		<h2 style="font-size: 16px;">${getExam().info[2]}</h2>
	</div>
	<ul id="list">
		<li><span class="sub">姓名</span><span class="data">${oDat.name}</span></li>
		<li><span class="sub">班级</span><span class="data">${oDat.grade} (${oDat.classNum}) 班</span></li>
		<li><span class="sub"><b>总分</b></span>
			<span class="data"><b>${oDat.grd[0]}</b> / 750 (${oDat.cty[0]} / ${oDat.tna[0]})</span></li>
		<li><span class="sub"><b>语文</b></span>
			<span class="data"><b>${oDat.grd[1]}</b> / 150 (${oDat.cty[1]} / ${oDat.tna[1]})</span></li>
		<li><span class="sub"><b>数学</b></span>
			<span class="data"><b>${oDat.grd[2]}</b> / 150 (${oDat.cty[2]} / ${oDat.tna[2]})</span></li>
		<li><span class="sub"><b>${getSel(iNm)[3][1]}</b></span>
			<span class="data"><b>${oDat.grd[3]}</b> / 150 (${oDat.cty[3]} / ${oDat.tna[3]})</span></li>
		<li><span class="sub"><b>${getSel(iNm)[0][1]}</b></span>
			<span class="data"><b>${oDat.grd[4]}</b> / 100 (${oDat.cty[4]} / ${oDat.tna[4]})</span></li>
		<li><span class="sub"><i>${getSel(iNm)[1][2]}</i></span>
			<span class="data"><i>${oDat.grd[5]}</i> / 100 (${oDat.cty[5]} / ${oDat.tna[5]})</span></li>
		<li><span class="sub"><b>${getSel(iNm)[1][1]}</b></span>
			<span class="data"><b>${oDat.grd[6]}</b> / 100 (${oDat.cty[6]} / ${oDat.tna[5]})</span></li>
		<li><span class="sub"><i>${getSel(iNm)[2][2]}</i></span>
			<span class="data"><i>${oDat.grd[7]}</i> / 100 (${oDat.cty[7]} / ${oDat.tna[6]})</span></li>
		<li><span class="sub"><b>${getSel(iNm)[2][1]}</b></span>
			<span class="data"><b>${oDat.grd[8]}</b> / 100 (${oDat.cty[8]} / ${oDat.tna[6]})</span></li>
		<li><span class="sub"><b>说明</b></span><span class="data"><b>得分/满分 (排名/参考人数)</b></span></li>
	</ul>
	<div id='buttons'>
		<div id='copy' class="button" onclick='copyGrade()'>复制</div>
		<div id='back' class="button" onclick='back()'>返回</div>
	</div>
	<p id="ps">加粗分数计入总分，小数赋分四舍五入<br>各科参考人数取自该科零分考生的排名</p>
	<br>
	`
	}
}
function copy(text) {
	var tempArea = document.createElement("textarea")
	var tempScrollY = scrollY
	tempArea.value = text
	document.body.appendChild(tempArea)
	tempArea.focus()
	tempArea.select()
	document.execCommand('copy')
	document.body.removeChild(tempArea)
	scroll(0, tempScrollY)
}
function copyGrade() {
	text = `姓名：${oDat.name}
班级：${oDat.grade} (${oDat.classNum}) 班
总分：${oDat.grd[0]}/750 (${oDat.cty[0]}/${oDat.tna[0]})
语文：${oDat.grd[1]}/150 (${oDat.cty[1]}/${oDat.tna[1]})
数学：${oDat.grd[2]}/150 (${oDat.cty[2]}/${oDat.tna[2]})
${getSel(iNm)[3][1]}：${oDat.grd[3]}/150 (${oDat.cty[3]}/${oDat.tna[3]})
${getSel(iNm)[0][1]}：${oDat.grd[4]}/100 (${oDat.cty[4]}/${oDat.tna[4]})
${getSel(iNm)[1][2]}：${oDat.grd[5]}/100 (${oDat.cty[5]}/${oDat.tna[5]})
${getSel(iNm)[1][1]}：${oDat.grd[6]}/100 (${oDat.cty[6]}/${oDat.tna[5]})
${getSel(iNm)[2][2]}：${oDat.grd[7]}/100 (${oDat.cty[7]}/${oDat.tna[6]})
${getSel(iNm)[2][1]}：${oDat.grd[8]}/100 (${oDat.cty[8]}/${oDat.tna[6]})
说明：得分/满分 (排名/报考人数)`
	copy(text)
	document.getElementById('copy').innerHTML = '复制成功'
	setTimeout(function () {
		if (document.getElementById('copy')) {
			document.getElementById('copy').innerHTML = '复制'
		}
	}, 1500)
}
function writeHTML() {
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
			<div id="querybtn" class="button" onclick="query()">查询</div>
		</div>
	</div>`
}
function back() {
	writeHTML()
	document.getElementById('name').value = iNm
}
// Dev utilities
function json2csv(exam) { // 数据库转CSV：适用于基于数组的新版数据库
	out = ''
	for (stu in db[exam].main) {
		var m = db[exam].main[stu]
		out += stu
		for (var i = 0; i < 20; i++) {
			out += ',' + m[i]
		}
		out += ',\n'
	}
	copy(out)
	console.log(`CSV格式成绩单已存储至剪贴板：\n代号：${exam}\n名称：${db[exam].info[0]}`)
	return out
}
function fastdebug() {
	document.getElementById('name').value = '曹俊楷'
	query()
}
window.onload = function () { // 页面加载完成后自动运行
	writeHTML()
	// fastdebug() // 跳过点击查询，直接显示成绩，用于开发
}
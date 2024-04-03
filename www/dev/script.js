function getExam() {
	if (document.getElementById('exams')) {
		selExam = document.getElementById('exams').value
	}
	return db[selExam]
}
function getSel(obj) {
	returnData = []
	oSel = getExam().main[obj]
		 if (oSel[1] == 'phy') { returnData[0] = ['phy', '物理', 1] }
	else if (oSel[1] == 'his') { returnData[0] = ['his', '历史', 0] }
		 if (oSel[2] == 'geo') { returnData[1] = ['geo', '地理', '地原'] }
	else if (oSel[2] == 'che') { returnData[1] = ['che', '化学', '化原'] }
		 if (oSel[3] == 'bio') { returnData[2] = ['bio', '生物', '生原'] }
	else if (oSel[3] == 'pol') { returnData[2] = ['pol', '政治', '政原'] }
	else if (oSel[3] == 'geo') { returnData[2] = ['geo', '地理', '地原'] }
		 if (oSel[4] == 'eng') { returnData[3] = ['eng', '英语'] }
	else if (oSel[4] == 'jap') { returnData[3] = ['jap', '日语'] }
	else if (oSel[4] == 'rus') { returnData[3] = ['rus', '俄语'] }
	return returnData
}
function getData(obj) {
	oMn = getExam().main[obj]
	var objData = {
		"exam": getExam().exam,
		"schoolName": getExam().schoolName,
		"grade": getExam().grade,
		"classNum": oMn[0],
		"name": obj,
		"grd": [oMn[5], oMn[7], oMn[9], oMn[11], oMn[13], oMn[15], oMn[17], oMn[19], oMn[21]],
		"cty": [oMn[6], oMn[8], oMn[10], oMn[12], oMn[14], oMn[16], oMn[18], oMn[20], oMn[22]],
		"tna": [
			getExam().sub.tot[getSel(obj)[0][2]],
			getExam().sub.chn[getSel(obj)[0][2]],
			getExam().sub.mat[getSel(obj)[0][2]],
			getExam().sub[getSel(obj)[3][0]][getSel(obj)[0][2]],
			getExam().sub[getSel(obj)[0][0]][getSel(obj)[0][2]],
			getExam().sub[getSel(obj)[1][0]][getSel(obj)[0][2]],
			getExam().sub[getSel(obj)[2][0]][getSel(obj)[0][2]]
		]
	}
	return objData
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
		objData = getData(iNm)
		document.body.innerHTML = `
	<div id="header">
		<h1 style="font-size: 24px;">${getExam().title[0]}</h1>
		<h2 style="font-size: 16px;">${getExam().title[1]}</h2>
	</div>
	<ul id="list">
		<li><span class="sub">姓名</span><span class="data">${objData.name}</span></li>
		<li><span class="sub">班级</span><span class="data">${objData.grade} (${objData.classNum}) 班</span></li>
		<li><span class="sub"><b>总分</b></span>
			<span class="data"><b>${objData.grd[0]}</b> / 750 (${objData.cty[0]} / ${objData.tna[0]})</span></li>
		<li><span class="sub"><b>语文</b></span>
			<span class="data"><b>${objData.grd[1]}</b> / 150 (${objData.cty[1]} / ${objData.tna[1]})</span></li>
		<li><span class="sub"><b>数学</b></span>
			<span class="data"><b>${objData.grd[2]}</b> / 150 (${objData.cty[2]} / ${objData.tna[2]})</span></li>
		<li><span class="sub"><b>${getSel(iNm)[3][1]}</b></span>
			<span class="data"><b>${objData.grd[3]}</b> / 150 (${objData.cty[3]} / ${objData.tna[3]})</span></li>
		<li><span class="sub"><b>${getSel(iNm)[0][1]}</b></span>
			<span class="data"><b>${objData.grd[4]}</b> / 100 (${objData.cty[4]} / ${objData.tna[4]})</span></li>
		<li><span class="sub"><i>${getSel(iNm)[1][2]}</i></span>
			<span class="data"><i>${objData.grd[5]}</i> / 100 (${objData.cty[5]} / ${objData.tna[5]})</span></li>
		<li><span class="sub"><b>${getSel(iNm)[1][1]}</b></span>
			<span class="data"><b>${objData.grd[6]}</b> / 100 (${objData.cty[6]} / ${objData.tna[5]})</span></li>
		<li><span class="sub"><i>${getSel(iNm)[2][2]}</i></span>
			<span class="data"><i>${objData.grd[7]}</i> / 100 (${objData.cty[7]} / ${objData.tna[6]})</span></li>
		<li><span class="sub"><b>${getSel(iNm)[2][1]}</b></span>
			<span class="data"><b>${objData.grd[8]}</b> / 100 (${objData.cty[8]} / ${objData.tna[6]})</span></li>
		<li><span class="sub"><b>说明</b></span><span class="data"><b>得分/满分 (排名/参考人数)</b></span></li>
	</ul>
	<div id='buttons'>
		<div id='copy' class="button" onclick='copy()'>复制</div>
		<div id='back' class="button" onclick='back()'>返回</div>
	</div>
	<p id="ps">加粗分数计入总分，小数赋分四舍五入<br>各科参考人数取自该科零分考生的排名</p>
	<br>
	`
	}
}
function copy() {
	copyText = `姓名：${objData.name}
班级：${objData.grade} (${objData.classNum}) 班
总分：${objData.grd[0]}/750 (${objData.cty[0]}/${objData.tna[0]})
语文：${objData.grd[1]}/150 (${objData.cty[1]}/${objData.tna[1]})
数学：${objData.grd[2]}/150 (${objData.cty[2]}/${objData.tna[2]})
${getSel(iNm)[3][1]}：${objData.grd[3]}/150 (${objData.cty[3]}/${objData.tna[3]})
${getSel(iNm)[0][1]}：${objData.grd[4]}/100 (${objData.cty[4]}/${objData.tna[4]})
${getSel(iNm)[1][2]}：${objData.grd[5]}/100 (${objData.cty[5]}/${objData.tna[5]})
${getSel(iNm)[1][1]}：${objData.grd[6]}/100 (${objData.cty[6]}/${objData.tna[5]})
${getSel(iNm)[2][2]}：${objData.grd[7]}/100 (${objData.cty[7]}/${objData.tna[6]})
${getSel(iNm)[2][1]}：${objData.grd[8]}/100 (${objData.cty[8]}/${objData.tna[6]})
说明：得分/满分 (排名/报考人数)`
	var tempArea = document.createElement("textarea")
	var tempScrollY = scrollY
	tempArea.value = copyText
	document.body.appendChild(tempArea)
	tempArea.focus()
	tempArea.select()
	document.execCommand('copy')
	document.body.removeChild(tempArea)
	scroll(0, tempScrollY)
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
				<option value="s3t1mt">高三上期中</option>
				<option value="s3t1fi">高三上期末</option>
				<option value="szme1">深圳市一模</option>
				<option value="s3t2m3" selected>三月份月考</option>
				<!-- <option value="szme2" disabled>深圳市二模</option>
				<option value="gzme1" disabled>广州市一模</option> -->
			</select>
			<div id="querybtn" class="button" onclick="query()">查询</div>
		</div>
	</div>`
}
function back() {
	writeHTML()
	document.getElementById('name').value = iNm
}
/* function json2arr(exam) {
	main = db[exam].main
	out = ''
	for (stu in main) {
		out += stu + '\t' + main[stu].cls + '\t'
			+ '\"' + main[stu].sel[0] + '\"\t\"' + main[stu].sel[1] + '\"\t'
			+ '\"' + main[stu].sel[2] + '\"\t\"' + main[stu].sel[3] + '\"\t'
			+ main[stu].main.t.t[0] + '\t' + main[stu].main.t.t[1] + '\t'
			+ main[stu].main.y.o[0] + '\t' + main[stu].main.y.o[1] + '\t'
			+ main[stu].main.s.o[0] + '\t' + main[stu].main.s.o[1] + '\t'
			+ main[stu].main.w.o[0] + '\t' + main[stu].main.w.o[1] + '\t'
			+ main[stu].main.a.o[0] + '\t' + main[stu].main.a.o[1] + '\t'
			+ main[stu].main.b.o[0] + '\t' + main[stu].main.b.o[1] + '\t'
			+ main[stu].main.b.t[0] + '\t' + main[stu].main.b.t[1] + '\t'
			+ main[stu].main.c.o[0] + '\t' + main[stu].main.c.o[1] + '\t'
			+ main[stu].main.c.t[0] + '\t' + main[stu].main.c.t[1] + '\t\n'
	}
	console.log(out)
} */
window.onload = writeHTML
document.getElementById('querybtn').addEventListener('click', function () { query() })
function setHTML(id, content) { document.getElementById(id).innerHTML = content }

function getSel(obj) {
	returnData = []
	oSel = data.main[obj].sel
	if (oSel[0] == 'phy') {
		returnData[0] = ['phy', '物理', 1]
	} else if (oSel[0] == 'his') {
		returnData[0] = ['his', '历史', 0]
	}
	if (oSel[1] == 'geo') {
		returnData[1] = ['geo', '地理', '地原']
	} else if (oSel[1] == 'che') {
		returnData[1] = ['che', '化学', '化原']
	}
	if (oSel[2] == 'bio') {
		returnData[2] = ['bio', '生物', '生原']
	} else if (oSel[2] == 'pol') {
		returnData[2] = ['pol', '政治', '政原']
	} else if (oSel[2] == 'geo') {
		returnData[2] = ['geo', '地理', '地原']
	}
	if (oSel[3] == 'eng') {
		returnData[3] = ['eng', '英语']
	} else if (oSel[3] == 'jap') {
		returnData[3] = ['jap', '日语']
	} else if (oSel[3] == 'rus') {
		returnData[3] = ['rus', '俄语']
	}
	return returnData
}

// 整理查询对象的数据
function getData(obj) {
	oMn = data.main[obj].main
	oSel = data.main[obj].sel
	var objData = {
		"exam": data.exam,
		"schoolName": data.schoolName,
		"classNum": data.main[obj].cls,
		"name": obj,
		"grd": [        // 分数
			oMn.t.t[0], // 总分
			oMn.y.o[0], // 语文
			oMn.s.o[0], // 数学
			oMn.w.o[0], // 外语
			oMn.a.o[0], // A科
			oMn.b.o[0], // B科原
			oMn.b.t[0], // B科
			oMn.c.o[0], // C科原
			oMn.c.t[0], // C科
		],
		"cty": [        // 排名
			oMn.t.t[1], // 总分
			oMn.y.o[1], // 语文
			oMn.s.o[1], // 数学
			oMn.w.o[1], // 外语
			oMn.a.o[1], // A科
			oMn.b.o[1], // B科原
			oMn.b.t[1], // B科
			oMn.c.o[1], // C科原
			oMn.c.t[1], // C科
		],
		"tna": [                                       // 各科总报考人数
			sub.tot[getSel(obj)[0][2]],                // 总分
			sub.chn[getSel(obj)[0][2]],                // 语文
			sub.mat[getSel(obj)[0][2]],                // 数学
			sub[getSel(obj)[3][0]][getSel(obj)[0][2]], // 外语
			sub[getSel(obj)[0][0]][getSel(obj)[0][2]], // A科
			sub[getSel(obj)[1][0]][getSel(obj)[0][2]], // B科
			sub[getSel(obj)[2][0]][getSel(obj)[0][2]], // C科
		]
	}
	return objData
}
// 查询
function query() {
	iNm = document.getElementById('name').value;
	if (iNm == '') {
		alert('请输入要查询成绩考生的姓名');
	} else if (typeof (data.main[iNm]) !== 'object') {
		alert('请输入一个云顶考生的姓名');
		document.getElementById('name').value = '';
	} else {
		objData = getData(iNm)
		document.body.removeChild(document.getElementById('container'));
		document.getElementById('remove').parentNode.removeChild(document.getElementById('remove'))
		document.body.innerHTML = `
		<div id="header" style="height: 56px; background-color: #0088EE; padding: 18px;">
			<h1 style="color: white; font-weight: normal;font-size: 24px;">2024年3月</h1>
			<h2 style="color: white; font-weight: normal;font-size: 16px;">${objData.exam.slice(5)}</h2>
		</div>
		<ul id="list">
			<li><span class="sub">姓名</span>
			<span class="data">${objData.name}</span></li>
			<li><span class="sub">班级</span>
			<span class="data">高三 (${objData.classNum}) 班</span></li>
			<li><span class="sub">总分</span>
			<span class="data"><b>${objData.grd[0]}</b>/750 (${objData.cty[0]} / ${objData.tna[0]})</span></li>
			<li><span class="sub">语文</span>
			<span class="data"><b>${objData.grd[1]}</b>/150 (${objData.cty[1]} / ${objData.tna[1]})</span></li>
			<li><span class="sub">数学</span>
			<span class="data"><b>${objData.grd[2]}</b>/150 (${objData.cty[2]} / ${objData.tna[2]})</span></li>
			<li><span class="sub">${getSel(iNm)[3][1]}</span>
			<span class="data"><b>${objData.grd[3]}</b>/150 (${objData.cty[3]} / ${objData.tna[3]})</span></li>
			<li><span class="sub">${getSel(iNm)[0][1]}</span>
			<span class="data"><b>${objData.grd[4]}</b>/100 (${objData.cty[4]} / ${objData.tna[4]})</span></li>
			<li><span class="sub">${getSel(iNm)[1][2]}</span>
			<span class="data"><i>${objData.grd[5]}</i> (${objData.cty[5]} / ${objData.tna[5]})</span></li>
			<li><span class="sub">${getSel(iNm)[1][1]}</span>
			<span class="data"><b>${objData.grd[6]}</b>/100 (${objData.cty[6]} / ${objData.tna[5]})</span></li>
			<li><span class="sub">${getSel(iNm)[2][2]}</span>
			<span class="data"><i>${objData.grd[7]}</i> (${objData.cty[7]} / ${objData.tna[6]})</span></li>
			<li><span class="sub">${getSel(iNm)[2][1]}</span>
			<span class="data"><b>${objData.grd[8]}</b>/100 (${objData.cty[8]} / ${objData.tna[6]})</span></li>
			<li><span class="sub"><b>说明</b></span><span class="data"><b>得分/满分 (排名/报考人数)</b></span></li>
		</ul><div id='back' onclick='javascript:location.reload()'>返回</div>
		<p id="ps">加粗分数计入总分<br />各科报考人数来自该科零分考生的排名</p><br />`
	}
}
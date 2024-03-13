document.getElementById('querybtn').addEventListener('click', function () { query() })
function setHTML(id, content) { document.getElementById(id).innerHTML = content }

function getSel(obj) {
	oSel = data.main[obj].sel
	if (oSel.includes("bio")) { return "bio" }
	else if (oSel.includes("pol")) { return "pol" }
	else if (oSel.includes("geo")) { return "geo" }
}

function getSelTxt(obj, ot) {
	if (getSel(obj) == 'bio') { if (ot == 'ori') { return '生原' } else if (ot == 'trs') { return '生物' } }
	else if (getSel(obj) == 'pol') { if (ot == 'ori') { return '政原' } else if (ot == 'trs') { return '政治' } }
	else if (getSel(obj) == 'geo') { if (ot == 'ori') { return '地原' } else if (ot == 'trs') { return '地理' } }
}

function getLan(obj, txt) {
	if (data.main[obj].sel.includes("jap") == true) {
		if (txt == true) { return '日语' } else if (txt == false) { return 'jap' }
	} else if (data.main[obj].sel.includes("eng") == true) {
		if (txt == true) { return '英语' } else if (txt == false) { return 'eng' }
	}
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
		"sel": getSel(obj),
		"grd": [            // 分数
			oMn.tot.trs[0], // 总分
			oMn.chn.ori[0], // 语文
			oMn.mat.ori[0], // 数学
			oMn.lan.ori[0], // 英语
			oMn.phy.ori[0], // 物理
			oMn.che.ori[0], // 化原
			oMn.che.trs[0], // 化学
			oMn.sel.ori[0], // 选原
			oMn.sel.trs[0], // 选科
		],
		"cty": [            // 排名
			oMn.tot.trs[1], // 总分
			oMn.chn.ori[1], // 语文
			oMn.mat.ori[1], // 数学
			oMn.lan.ori[1], // 英语
			oMn.phy.ori[1], // 物理
			oMn.che.ori[1], // 化原
			oMn.che.trs[1], // 化学
			oMn.sel.ori[1], // 选原
			oMn.sel.trs[1], // 选科
		],
		"tna": [            // 各科总报考人数
			tna.tot,
			tna.chn,
			tna.mat,
			tna[getLan(obj, false)],
			tna.phy,
			tna.che,
			tna[getSel(obj)],
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
		alert('请输入一个四班考生的姓名');
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
		<li><span class="sub">姓名</span><span class="data">${objData.name}</span></li>
		<li><span class="sub">班级</span><span class="data">高三 (${objData.classNum}) 班</span></li>
			<li><span class="sub">总分</span><span class="data"><b>${objData.grd[0]}</b>/750 (${objData.cty[0]}/${objData.tna[0]})</span></li>
			<li><span class="sub">语文</span><span class="data"><b>${objData.grd[1]}</b>/150 (${objData.cty[1]}/${objData.tna[1]})</span></li>
			<li><span class="sub">数学</span><span class="data"><b>${objData.grd[2]}</b>/150 (${objData.cty[2]}/${objData.tna[2]})</span></li>
			<li><span class="sub">${getLan(iNm, true)}</span><span class="data"><b>${objData.grd[3]}</b>/150 (${objData.cty[3]}/${objData.tna[3]})</span></li>
			<li><span class="sub">物理</span><span class="data"><b>${objData.grd[4]}</b>/100 (${objData.cty[4]}/${objData.tna[4]})</span></li>
			<li><span class="sub">化原</span><span class="data">${objData.grd[5]} (${objData.cty[5]}/${objData.tna[5]})</span></li>
			<li><span class="sub">化学</span><span class="data"><b>${objData.grd[6]}</b>/100 (${objData.cty[6]}/${objData.tna[5]})</span></li>
			<li><span class="sub">${getSelTxt(iNm, 'ori')}</span><span class="data">${objData.grd[7]} (${objData.cty[7]}/${objData.tna[6]})</span></li>
			<li><span class="sub">${getSelTxt(iNm, 'trs')}</span><span class="data"><b>${objData.grd[8]}</b>/100 (${objData.cty[8]}/${objData.tna[6]})</span></li>
			<li><span class="sub"><b>说明</b></span><span class="data"><b>得分/满分 (排名/报考人数)</b></span></li>
		</ul>
		<div id='back' onclick='javascript:location.reload()'>返回</div><p id="ps">加粗分数计入总分<br />各科报考人数来自该科零分考生的排名</p><br />`
	}
}
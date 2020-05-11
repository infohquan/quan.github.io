// JScript File
function ShowWeatherBox(vId){
	var sLink = '';
	sLink = domain + '/WeatherXml.aspx?id=' + vId;
	$.ajax({
			type: "GET",
			url: sLink,
			dataType: "xml",
			success: function(xml) 
			    {
			        var vAdImg, vAdImg1, vAdImg2, vAdImg3, vAdImg4, vAdImg5, vWeather;
				    $(xml).find('Item').each(function(){
					    var id = $(this).attr('ID');
					    var name = $(this).attr('NAME');
					    var vAdImg = $(this).find('AdImg').text();
					    var vAdImg1 = $(this).find('AdImg1').text();
					    var vAdImg2 = $(this).find('AdImg2').text();
					    var vAdImg3 = $(this).find('AdImg3').text();
					    var vAdImg4 = $(this).find('AdImg4').text();
					    var vAdImg5 = $(this).find('AdImg5').text();
					    var vWeather = $(this).find('Weather').text();
					    GetWeatherBox(vAdImg, vAdImg1, vAdImg2, vAdImg3, vAdImg4, vAdImg5, vWeather);
				    });
			    }
		    });
}

function GetWeatherBox(vImg, vImg1, vImg2, vImg3, vImg4, vImg5, vWeather){
	var sHTML = '';
	sHTML = sHTML.concat('<img src="http://vnexpress.net/Images/Weather/').concat(vImg).concat('" class="img-weather" alt="" />&nbsp;');
	sHTML = sHTML.concat('<img src="http://vnexpress.net/Images/Weather/').concat(vImg1).concat('" class="img-weather imgNumber" alt="" />');
	if(vImg2!=null) sHTML = sHTML.concat('<img src="http://vnexpress.net/Images/Weather/').concat(vImg2).concat('" class="img-weather imgNumber" alt="" />');
	if(vImg3!=null && vImg3!='') sHTML = sHTML.concat('<img src="http://vnexpress.net/Images/Weather/').concat(vImg3).concat('" class="img-weather imgNumber" alt="" />');
	if(vImg4!=null && vImg4!='') sHTML = sHTML.concat('<img src="http://vnexpress.net/Images/Weather/').concat(vImg4).concat('" class="img-weather imgNumber" alt="" />');
	if(vImg5!=null && vImg5!='') sHTML = sHTML.concat('<img src="http://vnexpress.net/Images/Weather/').concat(vImg5).concat('" class="img-weather imgNumber" alt="" />');
	sHTML = sHTML.concat('<img src="http://vnexpress.net/Images/Weather/c.gif" class="img-weather imgC" alt="" />');
	
    document.getElementById('img-Do').innerHTML = sHTML;
	document.getElementById('txt-Weather').innerHTML = vWeather;
}


function ShowGoldPrice(){
	var sHTML = '';
	sHTML = sHTML.concat('<div style="text-align:right;color:#8A0000;font:bold 10px arial;">ĐVT: tr.&#273;/l&#432;&#7907;ng</div>');
	if(vGoldSbjBuy=='{0}' || vGoldSbjSell=='{1}' || vGoldSjcBuy =='{2}' || vGoldSjcSell=='{3}'){
		sHTML = sHTML.concat('<table border="0px" cellpadding="2px" cellspacing="1px" class="tbl-goldprice">');
		sHTML = sHTML.concat('	<tr>');	
		sHTML = sHTML.concat('		<td class="td-weather-title" style="text-align:center;font-size:10px;width:35%;font-weight:bold">D&#7919; li&#7879;u &#273;ang &#273;&#432;&#7907;c c&#7853;p nh&#7853;t</td>');	
		sHTML = sHTML.concat('	</tr>');
		sHTML = sHTML.concat('</table>');
	}
	else{	
		sHTML = sHTML.concat('<table border="0px" cellpadding="2px" cellspacing="1px" class="tbl-goldprice">');
		sHTML = sHTML.concat('	<tr>');
		sHTML = sHTML.concat('		<td class="td-weather-title" style="font-size:10px;width:30%;">Lo&#7841;i</td>');
		sHTML = sHTML.concat('		<td class="td-weather-title" style="text-align:center;font-size:10px;width:35%;">Mua</td>');
		sHTML = sHTML.concat('		<td class="td-weather-title" style="text-align:center;font-size:10px;width:35%;">B&#225;n</td>');
		sHTML = sHTML.concat('	</tr>');
		sHTML = sHTML.concat('	<tr>');
		sHTML = sHTML.concat('		<td class="td-weather-title">SBJ</td>');
		sHTML = sHTML.concat('		<td class="td-weather-data txtr">').concat(vGoldSbjBuy).concat('</td>');
		sHTML = sHTML.concat('		<td class="td-weather-data txtr">').concat(vGoldSbjSell).concat('</td>');
		sHTML = sHTML.concat('	</tr>');
		sHTML = sHTML.concat('	<tr>');
		sHTML = sHTML.concat('		<td class="td-weather-title">SJC</td>');
		sHTML = sHTML.concat('		<td class="td-weather-data txtr">').concat(vGoldSjcBuy).concat('</td>');
		sHTML = sHTML.concat('		<td class="td-weather-data txtr">').concat(vGoldSjcSell).concat('</td>');
		sHTML = sHTML.concat('	</tr>');
		sHTML = sHTML.concat('</table>');	
	}
	document.getElementById('eGold').innerHTML = sHTML;
}

function ShowForexRate(){
	var sHTML = '';
	sHTML = sHTML.concat('<table border="0px" cellpadding="2px" cellspacing="1px" class="tbl-weather">');
	for(var i=0;i<vForexs.length;i++){
		sHTML = sHTML.concat('	<tr>');
		sHTML = sHTML.concat('		<td class="td-weather-title">').concat(vForexs[i]).concat('</td>');
		sHTML = sHTML.concat('		<td class="td-weather-data txtr">').concat(vCosts[i]).concat('</td>');
		sHTML = sHTML.concat('	</tr>');
	}
	sHTML = sHTML.concat('</table>');
	document.getElementById('eForex').innerHTML = sHTML;
}



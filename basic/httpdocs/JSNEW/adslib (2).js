
var FlashDetect = new function () {
    var self = this;
    self.installed = false;
    self.raw = "";
    self.major = -1;
    self.minor = -1;
    self.revision = -1;
    self.revisionStr = "";
    var activeXDetectRules = [
        {
            "name": "ShockwaveFlash.ShockwaveFlash.7",
            "version": function (obj) {
                return getActiveXVersion(obj);
            }
        },
        {
            "name": "ShockwaveFlash.ShockwaveFlash.6",
            "version": function (obj) {
                var version = "6,0,21";
                try {
                    obj.AllowScriptAccess = "always";
                    version = getActiveXVersion(obj);
                } catch (err) { }
                return version;
            }
        },
        {
            "name": "ShockwaveFlash.ShockwaveFlash",
            "version": function (obj) {
                return getActiveXVersion(obj);
            }
        }
    ];
    var getActiveXVersion = function (activeXObj) {
        var version = -1;
        try {
            version = activeXObj.GetVariable("$version");
        } catch (err) { }
        return version;
    };
    var getActiveXObject = function (name) {
        var obj = -1;
        try {
            obj = new ActiveXObject(name);
        } catch (err) {
            obj = { activeXError: true };
        }
        return obj;
    };
    var parseActiveXVersion = function (str) {
        var versionArray = str.split(","); //replace with regex
        return {
            "raw": str,
            "major": parseInt(versionArray[0].split(" ")[1], 10),
            "minor": parseInt(versionArray[1], 10),
            "revision": parseInt(versionArray[2], 10),
            "revisionStr": versionArray[2]
        };
    };
    var parseStandardVersion = function (str) {
        var descParts = str.split(/ +/);
        var majorMinor = descParts[2].split(/\./);
        var revisionStr = descParts[3];
        return {
            "raw": str,
            "major": parseInt(majorMinor[0], 10),
            "minor": parseInt(majorMinor[1], 10),
            "revisionStr": revisionStr,
            "revision": parseRevisionStrToInt(revisionStr)
        };
    };
    var parseRevisionStrToInt = function (str) {
        return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
    };
    self.majorAtLeast = function (version) {
        return self.major >= version;
    };
    self.minorAtLeast = function (version) {
        return self.minor >= version;
    };
    self.revisionAtLeast = function (version) {
        return self.revision >= version;
    };
    self.versionAtLeast = function (major) {
        var properties = [self.major, self.minor, self.revision];
        var len = Math.min(properties.length, arguments.length);
        for (i = 0; i < len; i++) {
            if (properties[i] >= arguments[i]) {
                if (i + 1 < len && properties[i] == arguments[i]) {
                    continue;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    };
    self.FlashDetect = function () {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var type = 'application/x-shockwave-flash';
            var mimeTypes = navigator.mimeTypes;
            if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description) {
                var version = mimeTypes[type].enabledPlugin.description;
                var versionObj = parseStandardVersion(version);
                self.raw = versionObj.raw;
                self.major = versionObj.major;
                self.minor = versionObj.minor;
                self.revisionStr = versionObj.revisionStr;
                self.revision = versionObj.revision;
                self.installed = true;
            }
        } else if (navigator.appVersion.indexOf("Mac") == -1 && window.execScript) {
            var version = -1;
            for (var i = 0; i < activeXDetectRules.length && version == -1; i++) {
                var obj = getActiveXObject(activeXDetectRules[i].name);
                if (!obj.activeXError) {
                    self.installed = true;
                    version = activeXDetectRules[i].version(obj);
                    if (version != -1) {
                        var versionObj = parseActiveXVersion(version);
                        self.raw = versionObj.raw;
                        self.major = versionObj.major;
                        self.minor = versionObj.minor;
                        self.revision = versionObj.revision;
                        self.revisionStr = versionObj.revisionStr;
                    }
                }
            }
        }
        else {
            self.installed = false;
         }
    } ();
};
FlashDetect.JS_RELEASE = "1.0.4";

//---------------------------------------------------------------------------------------
function dnc()
{
	var currentTime = new Date()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
	var seconds = currentTime.getSeconds()
	var day = currentTime.getDate()
	var mon = currentTime.getMonth()
    var y = currentTime.getFullYear()
    return "@dc=" + day + "." + mon + "-" + y
}
var currentPageUrl = window.location.href;//alert(pagecheck);

var jData = "";
var TopLeaderboard_Array = []; //declare and initialize array
var FooterLeaderboard_Array = [];
var LeftButton_Slot1_Array = [];
var LeftButton_Slot2_Array = [];
var LeftButton_Slot3_Array = [];
var LeftTower_Array = [];
var ListingPages_Array = [];
var MREC_Array = [];
var SREC_Slot1_Array = [];
var SREC_Slot2_Array = [];
var SREC_Slot3_Array = [];

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: pathClientAjax + "handler/adsBannerHandler.aspx" + dnc(),
        dataType: "xml",
        cache: true,
        success: function (xml) {
            jData = $(xml);
            var count1 = 0;
            var count2 = 0;
            var count3 = 0;
            var count4 = 0;
            var count5 = 0;
            var count6 = 0;
            var count7 = 0;
            var count8 = 0;
            var count9 = 0;
            var count10 = 0;
            var count11 = 0;
            $(xml).find('fls').each(function () {
                var companyname = $(this).find('companyname').text();
                var adswfUrl = $(this).find('adswf').text();
                var adimgUrl = $(this).find('adimg').text();
                var adlinkUrl = $(this).find('adlink').text();
                var createdate = $(this).find('createdate').text();
                var expiredate = $(this).find('expiredate').text();
                var adposition = $(this).find('adposition').text();
                var stateid = $(this).find('state').text();
                var status = $(this).find('status').text();
                var region = $(this).find('region').text();
                var priority = $(this).find('priority').text();
                var adpages = $(this).find('adpages').text();
                var adsid = $(this).find('adsid').text();
                if (adposition == "TopLeaderboard") {
                    TopLeaderboard_Array[parseInt(count1)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count1++;
                }
                if (adposition == "FooterLeaderboard") {
                    FooterLeaderboard_Array[parseInt(count2)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count2++;
                }
                if (adposition == "LeftButton_Slot1") {
                    LeftButton_Slot1_Array[parseInt(count3)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count3++;
                }
                if (adposition == "LeftButton_Slot2") {
                    LeftButton_Slot2_Array[parseInt(count4)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count4++;
                }
                if (adposition == "LeftButton_Slot3") {
                    LeftButton_Slot3_Array[parseInt(count5)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count5++;
                }
                if (adposition == "LeftTower") {
                    LeftTower_Array[parseInt(count6)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count6++;
                }
                if (adposition == "ListingPages") {
                    ListingPages_Array[parseInt(count7)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count7++;
                }
                if (adposition == "MREC") {
                    MREC_Array[parseInt(count8)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count8++;
                }
                if (adposition == "SREC_Slot1") {
                    SREC_Slot1_Array[parseInt(count9)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count9++;
                }
                if (adposition == "SREC_Slot2") {
                    SREC_Slot2_Array[parseInt(count10)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count10++;
                }
                if (adposition == "SREC_Slot3") {
                    //                                                  0       , 1      ,2         ,3          ,4          ,5          ,6      ,7      ,8      ,9          ,10     ,11         ,12
                    SREC_Slot3_Array[parseInt(count11)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages, adsid);
                    count11++;
                }
            });

        }
    });
});

function NVG_LoadAd(xmlFile,pos)
{
	var  companyname = "";
	var  adswfUrl    = "";
	var  adimgUrl    = "";
	var  adlinkUrl   = "";
	var  createdate  = "";
	var  expiredate  = "";
	var  adpages ="";
	var  adposition ="";

	var str_div="";
	var str_others="";
	var str_adpages="";
	var str_curpages="";
	var str_div1="";
	var str_others1="";
	var str_adpages1="";
	var str_curpages1="";
	
	var j=0;
	var k=0;
	var l=0;
	var n=0;
	
	var wxh="";
	if(pos=="TopLeaderboard")
	{
		wxh = 'width="640" height="80"';
	}
	if(pos=="FooterLeaderboard")
	{
		wxh = 'width="972" height="120"';
	}
	if(pos=="LeftButton_Slot1")
	{
		wxh = 'width="120" height="60"';
	}
	if(pos=="LeftButton_Slot2")
	{
		wxh = 'width="120" height="60"';
	}
	if(pos=="LeftButton_Slot3")
	{
		wxh = 'width="120" height="60"';
	}
	if(pos=="LeftTower")
	{
		wxh = 'width="120" height="600"';
	}
	if(pos=="ListingPages")
	{
		wxh = 'width="500" height="100"';
	}
	if(pos=="MREC")
	{
		wxh = 'width="300" height="250"';
	}
	if(pos=="SREC_Slot1")
	{
		wxh = 'width="300" height="100"';
	}
	if(pos=="SREC_Slot2")
	{
		wxh = 'width="300" height="100"';
	}
	if(pos=="SREC_Slot3")
	{
		wxh = 'width="300" height="100"';
	}

	if(jData!="")
	{
		
		$(jData).find('fls').each (function(){
				 
				  adpages = $(this).find('adpages').text();	
				  str_adpages	= $(this).find('adpages').text();	
				  
				  if(adpages=="" || adpages =="home")
				  {
						companyname = $(this).find('companyname').text();
						adswfUrl    = $(this).find('adswf').text();  
						adimgUrl    = $(this).find('adimg').text();
						adlinkUrl   = $(this).find('adlink').text();
						createdate  = $(this).find('createdate').text();       		
						expiredate  = $(this).find('expiredate').text();
						adposition  = $(this).find('adposition').text();
						
						if(pos == adposition)
						{ 
							if(adswfUrl!="")
							{
								if(FlashDetect.installed)//check if browser is supported flash
								{
									str_div += '<div id="dv_'+adposition+j+'" style="display:none;" ><embed src="' + adswfUrl + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" '+wxh+'></embed></div>';
									str_div1 += '<div id="dv_'+adposition+'1" style="display:none;" ><embed src="' + adswfUrl + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" '+wxh+'></embed></div>';
								}
								else
								{
									if(adlinkUrl!="")
									{
										str_div += '<div id="dv_'+adposition+j+'" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
										str_div1 += '<div id="dv_'+adposition+'1" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
									}
									else
									{
										str_div += '<div id="dv_'+adposition+j+'" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
										str_div1 += '<div id="dv_'+adposition+'1" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
									}
								}
							}
							else
							{
								if(adlinkUrl!="")
								{
									str_div += '<div id="dv_'+adposition+j+'" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
									str_div1 += '<div id="dv_'+adposition+'1" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
								}
								else
								{
									str_div += '<div id="dv_'+adposition+j+'" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
									str_div1 += '<div id="dv_'+adposition+'1" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
								}
							}
							
							j = j+ 1;	
						}
						
				  }
				  else if(adpages=="others")
				  {
						companyname = $(this).find('companyname').text();
						adswfUrl    = $(this).find('adswf').text();  
						adimgUrl    = $(this).find('adimg').text();
						adlinkUrl   = $(this).find('adlink').text();
						createdate  = $(this).find('createdate').text();       		
						expiredate  = $(this).find('expiredate').text();
						adposition  = $(this).find('adposition').text();
						
						if(pos == adposition)
						{ 
							if(adswfUrl!="")
							{
								if(FlashDetect.installed)
								{
									str_others += '<div id="dv_'+adposition+k+'" style="display:none;" ><embed src="' + adswfUrl + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" '+wxh+'></embed></div>';
									str_others1 += '<div id="dv_'+adposition+'1" style="display:none;" ><embed src="' + adswfUrl + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" '+wxh+'></embed></div>';
								}
								else
								{
									if(adlinkUrl!="")
									{
										str_others += '<div id="dv_'+adposition+k+'" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
										str_others1 += '<div id="dv_'+adposition+'1" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
									}
									else
									{
										str_others += '<div id="dv_'+adposition+k+'" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
										str_others1 += '<div id="dv_'+adposition+'1" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
									}
								}
							}
							else
							{
								if(adlinkUrl!="")
								{
									str_others += '<div id="dv_'+adposition+k+'" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
									str_others1 += '<div id="dv_'+adposition+'1" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
								}
								else
								{
									str_others += '<div id="dv_'+adposition+k+'" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
									str_others1 += '<div id="dv_'+adposition+'1" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
								}
							}
							
							k += 1;	
						}
						
				  }
				  else
				  {
						if(currentPageUrl.indexOf(adpages)!=-1)
						{
							companyname = $(this).find('companyname').text();
							adswfUrl    = $(this).find('adswf').text();  
							adimgUrl    = $(this).find('adimg').text();
							adlinkUrl   = $(this).find('adlink').text();
							createdate  = $(this).find('createdate').text();       		
							expiredate  = $(this).find('expiredate').text();
							adposition  = $(this).find('adposition').text();
							if(pos == adposition)
							{
								if(adswfUrl!="")
								{
									if(FlashDetect.installed)
									{
										str_curpages += '<div id="dv_'+adposition+n+'" style="display:none;" ><embed src="' + adswfUrl + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" '+wxh+'></embed></div>';
										str_curpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><embed src="' + adswfUrl + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" '+wxh+'></embed></div>';
									}
									else
									{
										if(adlinkUrl!="")
										{
											str_curpages += '<div id="dv_'+adposition+n+'" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
											str_curpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
										}
										else
										{
											str_curpages += '<div id="dv_'+adposition+n+'" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
											str_curpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
										}
									}
								}
								else
								{
									if(adlinkUrl!="")
									{
										str_curpages += '<div id="dv_'+adposition+n+'" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
										str_adpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
									}
									else
									{
										str_curpages += '<div id="dv_'+adposition+n+'" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
										str_curpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
									}
								}
								
								n += 1;	
							}
						}
						else
						{
							companyname = $(this).find('companyname').text();
							adswfUrl    = $(this).find('adswf').text();  
							adimgUrl    = $(this).find('adimg').text();
							adlinkUrl   = $(this).find('adlink').text();
							createdate  = $(this).find('createdate').text();       		
							expiredate  = $(this).find('expiredate').text();
							adposition  = $(this).find('adposition').text();
							
							
							if(pos == adposition)
							{ 
								if(adswfUrl!="")
								{
									if(FlashDetect.installed)
									{
										str_adpages += '<div id="dv_'+adposition+l+'" style="display:none;" ><embed src="' + adswfUrl + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" '+wxh+'></embed></div>';
										str_adpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><embed src="' + adswfUrl + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" '+wxh+'></embed></div>';
									}
									else
									{
										if(adlinkUrl!="")
										{
											str_adpages += '<div id="dv_'+adposition+l+'" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
											str_adpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
										}
										else
										{
											str_adpages += '<div id="dv_'+adposition+l+'" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
											str_adpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
										}
									}
								}
								else
								{
									if(adlinkUrl!="")
									{
										str_adpages += '<div id="dv_'+adposition+l+'" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
										str_adpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><a target="_blank" href="'+ adlinkUrl +'"><img  src="' + adimgUrl + '" '+wxh+' /></a></div>';
									}
									else
									{
										str_adpages += '<div id="dv_'+adposition+l+'" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
										str_adpages1 += '<div id="dv_'+adposition+'1" style="display:none;" ><img  src="' + adimgUrl + '" '+wxh+' /></div>';
									}
								}
								
								l += 1;	
							}
						}
						
				  }
			}
		);
		
		 if(str_adpages!="" && currentPageUrl.indexOf(adpages) != -1)
		{
			if(l<=1)
			{
				str_adpages += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="2"/>';
				str_adpages += str_adpages1;
			}
			else
			{
				str_adpages += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="'+l+'"/>';
			}
			$('#'+pos+'').html(str_adpages);	
		}
        else if (str_div != "" && (currentPageUrl == pathClientAjax + "index.aspx" || currentPageUrl == pathClientAjax))
		{
			if(j<=1)
			{
				str_div += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="2"/>';
				str_div += str_div1;
			}
			else
			{
				str_div += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="'+j+'"/>';
			}
			$('#'+pos+'').html(str_div);		
		}
		else if(str_others !="")
		{
			if(k<=1)
			{
				str_others += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="2"/>';
				str_others += str_others1;
			}
			else
			{
				str_others += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="'+k+'"/>';
			}
			$('#'+pos+'').html(str_others);
		}
		else if(str_curpages!="")
		{
			if(n<=1)
			{
				str_curpages += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="2"/>';
				str_curpages += str_curpages1;
			}
			else
			{
				str_curpages += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="'+n+'"/>';
			}
			$('#'+pos+'').html(str_curpages);
		}
		else
		{
			if(j<=1)
			{
				str_div += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="2"/>';
				str_div += str_div1;
			}
			else
			{
				str_div += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="'+j+'"/>';
			}
			$('#'+pos+'').html(str_div);		
		}
		setTimeout("Changediv('"+pos+"')", 0);
	}
	else
	{
			setTimeout("NVG_LoadAd('"+xmlFile+"','"+pos+"')", 3000);	
	}
} 

function LoadAdsTopLeaderboard()
{
    var str_div = "";
    var str_div1 = "";
    var str_divor = "";
    var str_divor1 = "";

    if (TopLeaderboard_Array.length > 1) {
                            
       // TopLeaderboard_Array[parseInt(count1)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages);
        var j = 0;
        var k = 0;
        for (var i = 0; i < TopLeaderboard_Array.length; i++) {

            if (currentPageUrl.indexOf(TopLeaderboard_Array[i][11]) != -1)//check page
            {
                
                if (TopLeaderboard_Array[i][1] != "") {

                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_divor += '<div id="dv_TopLeaderboard' + k + '" style="display:none;" ><embed src="' + TopLeaderboard_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="640" height="80"></embed></div>';
                        str_divor1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><embed src="' + TopLeaderboard_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="640" height="80"></embed></div>';
                    }
                    else {
                        if (TopLeaderboard_Array[i][3] != "") {
                            str_divor += '<div id="dv_TopLeaderboard' + k + '" style="display:none;" ><a target="_blank" href="' + TopLeaderboard_Array[i][3] + '"><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></a></div>';
                            str_divor1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><a target="_blank" href="' + TopLeaderboard_Array[i][3] + '"><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></a></div>';
                        }
                        else {
                            str_divor += '<div id="dv_TopLeaderboard' + k + '" style="display:none;" ><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></div>';
                            str_divor1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></div>';
                        }
                    }

                }
                else {
                    if (TopLeaderboard_Array[i][3] != "") {
                        str_divor += '<div id="dv_TopLeaderboard' + k + '" style="display:none;" ><a target="_blank" href="' + TopLeaderboard_Array[i][3] + '"><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></a></div>';
                        str_divor1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><a target="_blank" href="' + TopLeaderboard_Array[i][3] + '"><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></a></div>';
                    }
                    else {
                        str_divor += '<div id="dv_TopLeaderboard' + k + '" style="display:none;" ><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></div>';
                        str_divor1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></div>';
                    }
                }
             }
             else
             {
                if (TopLeaderboard_Array[i][1] != "") {

                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_div += '<div id="dv_TopLeaderboard' + j + '" style="display:none;" ><embed src="' + TopLeaderboard_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="640" height="80"></embed></div>';
                        str_div1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><embed src="' + TopLeaderboard_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="640" height="80"></embed></div>';
                    }
                    else {
                        if (TopLeaderboard_Array[i][3] != "") {
                            str_div += '<div id="dv_TopLeaderboard' + j + '" style="display:none;" ><a target="_blank" href="' + TopLeaderboard_Array[i][3] + '"><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></a></div>';
                            str_div1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><a target="_blank" href="' + TopLeaderboard_Array[i][3] + '"><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></a></div>';
                        }
                        else {
                            str_div += '<div id="dv_TopLeaderboard' + j + '" style="display:none;" ><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></div>';
                            str_div1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></div>';
                        }
                    }

                }
                else {
                    if (TopLeaderboard_Array[i][3] != "") {
                        str_div += '<div id="dv_TopLeaderboard' + j + '" style="display:none;" ><a target="_blank" href="' + TopLeaderboard_Array[i][3] + '"><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></a></div>';
                        str_div1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><a target="_blank" href="' + TopLeaderboard_Array[i][3] + '"><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></a></div>';
                    }
                    else {
                        str_div += '<div id="dv_TopLeaderboard' + j + '" style="display:none;" ><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></div>';
                        str_div1 += '<div id="dv_TopLeaderboard' + '1" style="display:none;" ><img  src="' + TopLeaderboard_Array[i][2] + '" width="640" height="80" /></div>';
                    }
                }
                j++;
             }
        }

        if (str_divor != "") {
            if (k <= 1) {
                str_divor += '<input id="ads_TopLeaderboard" name="ads_TopLeaderboard" type="hidden" value="2"/>';
                str_divor += str_divor1;
             }
            else {
                str_divor += '<input id="ads_TopLeaderboard" name="ads_TopLeaderboard" type="hidden" value="' + k + '"/>';
            }
            $('#TopLeaderboard').html(str_divor);
        }
        else {
            if (j <= 1) {
                str_div += '<input id="ads_TopLeaderboard" name="ads_TopLeaderboard" type="hidden" value="2"/>';
                str_div += str_div1;
             }
            else {
                str_div += '<input id="ads_TopLeaderboard" name="ads_TopLeaderboard" type="hidden" value="' + j + '"/>';
            }
            $('#TopLeaderboard').html(str_div);
        }
        

        setTimeout("Changediv('TopLeaderboard')", 0);
    }
    else
    {
        setTimeout("LoadAdsTopLeaderboard()", 3000);	
    }
}
function LoadAdsMREC() {
    var str_div = "";
    var str_div1 = "";
    var str_divor = "";
    var str_divor1 = "";

    if (MREC_Array.length > 1) {

        // TopLeaderboard_Array[parseInt(count1)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages);
        var j = 0;
        var k = 0;
        for (var i = 0; i < MREC_Array.length; i++) {

            if (currentPageUrl.indexOf(MREC_Array[i][11]) != -1)//check page
            {

                if (MREC_Array[i][1] != "") {

                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_divor += '<div id="dv_MREC' + k + '" style="display:none;" ><embed src="' + MREC_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="300" height="250"></embed></div>';
                        str_divor1 += '<div id="dv_MREC' + '1" style="display:none;" ><embed src="' + MREC_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="300" height="250"></embed></div>';
                    }
                    else {
                        if (MREC_Array[i][3] != "") {
                            str_divor += '<div id="dv_MREC' + k + '" style="display:none;" ><a target="_blank" href="' + MREC_Array[i][3] + '"><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></a></div>';
                            str_divor1 += '<div id="dv_MREC' + '1" style="display:none;" ><a target="_blank" href="' + MREC_Array[i][3] + '"><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></a></div>';
                        }
                        else {
                            str_divor += '<div id="dv_MREC' + k + '" style="display:none;" ><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></div>';
                            str_divor1 += '<div id="dv_MREC' + '1" style="display:none;" ><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></div>';
                        }
                    }

                }
                else {
                    if (MREC_Array[i][3] != "") {
                        str_divor += '<div id="dv_MREC' + k + '" style="display:none;" ><a target="_blank" href="' + MREC_Array[i][3] + '"><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></a></div>';
                        str_divor1 += '<div id="dv_MREC' + '1" style="display:none;" ><a target="_blank" href="' + MREC_Array[i][3] + '"><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></a></div>';
                    }
                    else {
                        str_divor += '<div id="dv_MREC' + k + '" style="display:none;" ><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></div>';
                        str_divor1 += '<div id="dv_MREC' + '1" style="display:none;" ><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></div>';
                    }
                }
            }
            else {
                if (MREC_Array[i][1] != "") {

                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_div += '<div id="dv_MREC' + j + '" style="display:none;" ><embed src="' + MREC_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="300" height="250"></embed></div>';
                        str_div1 += '<div id="dv_MREC' + '1" style="display:none;" ><embed src="' + MREC_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="300" height="250"></embed></div>';
                    }
                    else {
                        if (MREC_Array[i][3] != "") {
                            str_div += '<div id="dv_MREC' + j + '" style="display:none;" ><a target="_blank" href="' + MREC_Array[i][3] + '"><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></a></div>';
                            str_div1 += '<div id="dv_MREC' + '1" style="display:none;" ><a target="_blank" href="' + MREC_Array[i][3] + '"><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></a></div>';
                        }
                        else {
                            str_div += '<div id="dv_MREC' + j + '" style="display:none;" ><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></div>';
                            str_div1 += '<div id="dv_MREC' + '1" style="display:none;" ><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></div>';
                        }
                    }

                }
                else {
                    if (MREC_Array[i][3] != "") {
                        str_div += '<div id="dv_MREC' + j + '" style="display:none;" ><a target="_blank" href="' + MREC_Array[i][3] + '"><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></a></div>';
                        str_div1 += '<div id="dv_MREC' + '1" style="display:none;" ><a target="_blank" href="' + MREC_Array[i][3] + '"><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></a></div>';
                    }
                    else {
                        str_div += '<div id="dv_MREC' + j + '" style="display:none;" ><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></div>';
                        str_div1 += '<div id="dv_MREC' + '1" style="display:none;" ><img  src="' + MREC_Array[i][2] + '" width="300" height="250" /></div>';
                    }
                }
                j++;
            }
        }

        if (str_divor != "") {
            if (k <= 1) {
                str_divor += '<input id="ads_MREC" name="ads_MREC" type="hidden" value="2"/>';
                str_divor += str_divor1;
            }
            else {
                str_divor += '<input id="ads_MREC" name="ads_MREC" type="hidden" value="' + k + '"/>';
            }
            $('#MREC').html(str_divor);
        }
        else {
            if (j <= 1) {
                str_div += '<input id="ads_MREC" name="ads_MREC" type="hidden" value="2"/>';
                str_div += str_div1;
            }
            else {
                str_div += '<input id="ads_MREC" name="ads_MREC" type="hidden" value="' + j + '"/>';
            }
            $('#MREC').html(str_div);
        }


        setTimeout("Changediv('MREC')", 0);
    }
    else {
        setTimeout("LoadAdsMREC()", 3000);
    }
}
function LoadAdsSREC_Slot1() {
    var str_div = "";
    var str_div1 = "";
    var str_divor = "";
    var str_divor1 = "";

    if (SREC_Slot1_Array.length > 1) {

        // TopLeaderboard_Array[parseInt(count1)] = new Array(companyname, adswfUrl, adimgUrl, adlinkUrl, createdate, expiredate, stateid, status, region, priority, adposition, adpages);
        var j = 0;
        var k = 0;
        for (var i = 0; i < SREC_Slot1_Array.length; i++) {

            if (currentPageUrl.indexOf(SREC_Slot1_Array[i][11]) != -1)//check page
            {

                if (SREC_Slot1_Array[i][1] != "") {

                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_divor += '<div id="dv_SREC_Slot1' + k + '" style="display:none;" ><embed src="' + SREC_Slot1_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="300" height="100"></embed></div>';
                        str_divor1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><embed src="' + SREC_Slot1_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="300" height="100"></embed></div>';
                    }
                    else {
                        if (SREC_Slot1_Array[i][3] != "") {
                            str_divor += '<div id="dv_SREC_Slot1' + k + '" style="display:none;" ><a target="_blank" href="' + SREC_Slot1_Array[i][3] + '"><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></a></div>';
                            str_divor1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><a target="_blank" href="' + SREC_Slot1_Array[i][3] + '"><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></a></div>';
                        }
                        else {
                            str_divor += '<div id="dv_SREC_Slot1' + k + '" style="display:none;" ><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></div>';
                            str_divor1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></div>';
                        }
                    }

                }
                else {
                    if (SREC_Slot1_Array[i][3] != "") {
                        str_divor += '<div id="dv_SREC_Slot1' + k + '" style="display:none;" ><a target="_blank" href="' + SREC_Slot1_Array[i][3] + '"><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></a></div>';
                        str_divor1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><a target="_blank" href="' + SREC_Slot1_Array[i][3] + '"><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></a></div>';
                    }
                    else {
                        str_divor += '<div id="dv_SREC_Slot1' + k + '" style="display:none;" ><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></div>';
                        str_divor1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></div>';
                    }
                }
            }
            else {
                if (SREC_Slot1_Array[i][1] != "") {

                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_div += '<div id="dv_SREC_Slot1' + j + '" style="display:none;" ><embed src="' + SREC_Slot1_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="300" height="100"></embed></div>';
                        str_div1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><embed src="' + SREC_Slot1_Array[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="300" height="100"></embed></div>';
                    }
                    else {
                        if (SREC_Slot1_Array[i][3] != "") {
                            str_div += '<div id="dv_SREC_Slot1' + j + '" style="display:none;" ><a target="_blank" href="' + SREC_Slot1_Array[i][3] + '"><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></a></div>';
                            str_div1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><a target="_blank" href="' + SREC_Slot1_Array[i][3] + '"><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></a></div>';
                        }
                        else {
                            str_div += '<div id="dv_SREC_Slot1' + j + '" style="display:none;" ><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></div>';
                            str_div1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></div>';
                        }
                    }

                }
                else {
                    if (SREC_Slot1_Array[i][3] != "") {
                        str_div += '<div id="dv_SREC_Slot1' + j + '" style="display:none;" ><a target="_blank" href="' + SREC_Slot1_Array[i][3] + '"><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></a></div>';
                        str_div1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><a target="_blank" href="' + SREC_Slot1_Array[i][3] + '"><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></a></div>';
                    }
                    else {
                        str_div += '<div id="dv_SREC_Slot1' + j + '" style="display:none;" ><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></div>';
                        str_div1 += '<div id="dv_SREC_Slot1' + '1" style="display:none;" ><img  src="' + SREC_Slot1_Array[i][2] + '" width="300" height="100" /></div>';
                    }
                }
                j++;
            }
        }

        if (str_divor != "") {
            if (k <= 1) {
                str_divor += '<input id="ads_SREC_Slot1" name="ads_SREC_Slot1" type="hidden" value="2"/>';
                str_divor += str_divor1;
            }
            else {
                str_divor += '<input id="ads_SREC_Slot1" name="ads_SREC_Slot1" type="hidden" value="' + k + '"/>';
            }
            $('#SREC_Slot1').html(str_divor);
        }
        else {
            if (j <= 1) {
                str_div += '<input id="ads_SREC_Slot1" name="ads_SREC_Slot1" type="hidden" value="2"/>';
                str_div += str_div1;
            }
            else {
                str_div += '<input id="ads_SREC_Slot1" name="ads_SREC_Slot1" type="hidden" value="' + j + '"/>';
            }
            $('#SREC_Slot1').html(str_div);
        }


        setTimeout("Changediv('SREC_Slot1')", 0);
    }
    else {
        setTimeout("LoadAdsSREC_Slot1()", 3000);
    }
}
function LoadAds(pos,w,h) {
    var str_div = "";
    var str_div1 = "";
    var str_divor = "";
    var str_divor1 = "";
    var str_divothers = "";
    var str_divothers1 = "";

    var adsArray = new Array();
    if (pos == "TopLeaderboard") {
        adsArray = TopLeaderboard_Array;
    }   
    else if (pos == "FooterLeaderboard") {
        adsArray = FooterLeaderboard_Array;
    }
    else if (pos == "LeftButton_Slot1") {
        adsArray = LeftButton_Slot1_Array;        
    }
    else if (pos == "LeftButton_Slot2") {
        adsArray = LeftButton_Slot2_Array;
    }
    else if (pos == "LeftButton_Slot3") {
        adsArray = LeftButton_Slot3_Array;
    }
    else if (pos == "LeftTower") {
        adsArray = LeftTower_Array;
    }
    else if (pos == "ListingPages") {
        adsArray = ListingPages_Array;        
    }
    else if (pos == "MREC") {
        adsArray = MREC_Array;
    }
    else if (pos == "SREC_Slot1") {
        adsArray = SREC_Slot1_Array;
    }
    else if (pos == "SREC_Slot2") {
        adsArray = SREC_Slot2_Array;        
    }
    else if (pos == "SREC_Slot3") {
        adsArray = SREC_Slot3_Array;
    }
    
    if (adsArray.length >= 1) {

         var j = 0;
         var k = 0;
         var n = 0;
         adsArray.sort(randOrd);
         
        for (var i = 0; i < adsArray.length; i++) {

            if (adsArray[i][11] != "" && adsArray[i][11] != "home" && adsArray[i][11] != "others" && currentPageUrl.indexOf(adsArray[i][11]) != -1)//check page
            {
                if (adsArray[i][1] != "") {
                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_divor += '<div id="dv_' + pos + k + '" style="display:none;" ><embed src="' + adsArray[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"></embed></div>';
                        str_divor1 += '<div id="dv_' + pos + '1" style="display:none;" ><embed src="' + adsArray[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"></embed></div>';
                    }
                    else {
                        if (adsArray[i][3] != "") {
                            str_divor += '<div id="dv_' + pos + k + '" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                            str_divor1 += '<div id="dv_' + pos + '1" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                        }
                        else {
                            str_divor += '<div id="dv_' + pos + k + '" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                            str_divor1 += '<div id="dv_' + pos + '1" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                        }
                    }

                }
                else {
                    if (adsArray[i][3] != "") {
                        str_divor += '<div id="dv_' + pos + k + '" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                        str_divor1 += '<div id="dv_' + pos + '1" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                    }
                    else {
                        str_divor += '<div id="dv_' + pos + k + '" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                        str_divor1 += '<div id="dv_' + pos + '1" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                    }
                }
                k++;
            }
            else if (adsArray[i][11] == "others") {
                if (adsArray[i][1] != "") {
                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_divothers += '<div id="dv_' + pos + n + '" style="display:none;" ><embed src="' + adsArray[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"></embed></div>';
                        str_divothers1 += '<div id="dv_' + pos + '1" style="display:none;" ><embed src="' + adsArray[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"></embed></div>';
                    }
                    else {
                        if (adsArray[i][3] != "") {
                            str_divothers += '<div id="dv_' + pos + n + '" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                            str_divothers1 += '<div id="dv_' + pos + '1" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                        }
                        else {
                            str_divothers += '<div id="dv_' + pos + n + '" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                            str_divothers1 += '<div id="dv_' + pos + '1" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                        }
                    }

                }
                else {
                    if (adsArray[i][3] != "") {
                        str_divothers += '<div id="dv_' + pos + n + '" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                        str_divothers1 += '<div id="dv_' + pos + '1" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                    }
                    else {
                        str_divothers += '<div id="dv_' + pos + n + '" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                        str_divothers1 += '<div id="dv_' + pos + '1" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                    }
                }
                n++;
            }
            else if (adsArray[i][11] == "" || adsArray[i][11] == "home") {
                if (adsArray[i][1] != "") {
                    if (FlashDetect.installed)//check if browser is supported flash
                    {
                        str_div += '<div id="dv_' + pos + j + '" style="display:none;" ><embed src="' + adsArray[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"></embed></div>';
                        str_div1 += '<div id="dv_' + pos + '1" style="display:none;" ><embed src="' + adsArray[i][1] + '" allowscriptaccess="always" wmode="transparent" quality="high" pluginspage="../www.macromedia.com/shockwave/download/index.cgi@P1_Prod_Version=Shockwaveflash" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"></embed></div>';
                    }
                    else {
                        if (adsArray[i][3] != "") {
                            str_div += '<div id="dv_' + pos + j + '" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                            str_div1 += '<div id="dv_' + pos + '1" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                        }
                        else {
                            str_div += '<div id="dv_' + pos + j + '" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                            str_div1 += '<div id="dv_' + pos + '1" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                        }
                    }

                }
                else {
                    if (adsArray[i][3] != "") {
                        str_div += '<div id="dv_' + pos + j + '" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                        str_div1 += '<div id="dv_' + pos + '1" style="display:none;" ><a target="_blank" href="' + adsArray[i][3] + '" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></a></div>';
                    }
                    else {
                        str_div += '<div id="dv_' + pos + j + '" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                        str_div1 += '<div id="dv_' + pos + '1" style="display:none;" onclick="nvgData.AdsSavedClicks(' + adsArray[i][12] + ',\'' + adsArray[i][0] + '\',\'' + adsArray[i][0] + '\');"><img  src="' + adsArray[i][2] + '" width="' + w + '" height="' + h + '" /></div>';
                    }
                }
                j++;
            }
           
        }

        if (str_divor != "") {

            if (k <= 1) {
                str_divor += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="2"/>';
                str_divor += str_divor1;
            }
            else {
                str_divor += '<input id="ads_'+pos+'" name="ads_'+pos+'" type="hidden" value="' + k + '"/>';
            }
            $('#'+pos+'').html(str_divor);
        }
        else if (str_divothers != "") {

            if (k <= 1) {
                str_divothers += '<input id="ads_' + pos + '" name="ads_' + pos + '" type="hidden" value="2"/>';
                str_divothers += str_divothers1;
            }
            else {
                str_divothers += '<input id="ads_' + pos + '" name="ads_' + pos + '" type="hidden" value="' + k + '"/>';
            }
            $('#' + pos + '').html(str_divothers);
        }
        else {
            if (j <= 1) {
                str_div += '<input id="ads_' + pos + '" name="ads_' + pos + '" type="hidden" value="2"/>';
                str_div += str_div1;
            }
            else {
                str_div += '<input id="ads_' + pos + '" name="ads_' + pos + '" type="hidden" value="' + j + '"/>';
            }
            $('#'+pos+'').html(str_div);
        }


        setTimeout("Changediv('"+pos+"')", 0);
    }
    else {
        setTimeout("LoadAds('"+pos+"',"+w+","+h+")", 3000);
    }
}

function Changediv(pos)
{

		var tmp_div="";
		var itm = $('#ads_' + pos + '').val();

		if (parseInt(itm) == 0) {
		    var tmp0 = "dv_" + pos + parseInt(itm);
	
             document.getElementById(tmp0).style.display = "";
		               
         }
		else {
		    for (var j = 0; j < parseInt(itm); j++) {
		        tmp_div += "dv_" + pos + j + ",";
		    }
		    var temp_t = adstrim(tmp_div, ",");
		    var arr = new Array();
		    arr = temp_t.split(',');

		   
		    for (var i = 0; i < arr.length; i++) {

		        if (i != arr.length - 1) {
		            if (document.getElementById(arr[i]) != null) {
		                if (document.getElementById(arr[i]).style.display == "") {
		                    document.getElementById(arr[i]).style.display = "none";
                            if(document.getElementById(arr[i + 1])!=null)
		                        document.getElementById(arr[i + 1]).style.display = "";
		                    break;
		                }
		            }
		        }
		        else {
		            if (arr.length > 1) {
                        if( document.getElementById(arr[arr.length - 1])!=null)
                            document.getElementById(arr[arr.length - 1]).style.display = "none";
                        if (document.getElementById(arr[0])!=null)
		                    document.getElementById(arr[0]).style.display = "";
		                break;
		            }
		            else if (arr.length == 1) {
		                if (document.getElementById(arr[0])!=null)
		                    document.getElementById(arr[0]).style.display = "";
		                break;
		            }
		        }
		    }
		}
		setTimeout("Changediv('"+pos+"')", 37000);
}
function adstrim(str, chars) {
    return adsltrim(adsrtrim(str, chars), chars);
}
function adsltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function adsrtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


function randOrd() {
    return (Math.round(Math.random()) - 0.5);
}
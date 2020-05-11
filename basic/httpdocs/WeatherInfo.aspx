<%@ Page Language="C#" AutoEventWireup="true" CodeFile="WeatherInfo.aspx.cs" Inherits="Popup_WeatherInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
    <script type="text/javascript">
        var domain = 'http://thanhdat.cdg.vn';
    </script>    
    <script type="text/javascript" src="common/scripts/jquery.js"></script>
    <script type="text/javascript" src="scripts/main.js"></script>
    <script type="text/javascript" src="common/scripts/XmlLanguage.js"></script>
    <link type="text/css" rel="stylesheet" href="Cache/Resources/HighSlide/highslide.css" />
    <script type="text/javascript" src="Cache/Resources/HighSlide/highslide-full.js"></script>
    <script type="text/javascript">
        hs.graphicsDir = 'Cache/Resources/HighSlide/graphics/';
        hs.align = 'center';
        hs.transitions = ['expand', 'crossfade'];
        hs.outlineType = 'rounded-white';
        hs.fadeInOut = true;
        //hs.dimmingOpacity = 0.75;

        // Add the controlbar
        hs.addSlideshow({
            //slideshowGroup: 'group1',
            interval: 5000,
            repeat: false,
            useControls: true,
            fixedControls: 'fit',
            overlayOptions: {
                opacity: .75,
                position: 'bottom center',
                hideOnMouseOut: true
            }
        });
    </script>
    
    <script type="text/javascript" src="Cache/Resources/smoothmenu/ddsmoothmenu.js"></script> 

</head>
<body>
    <form id="form1" runat="server">
    <div>
        <script language="javascript" type="text/javascript" src="common/scripts/tools.js"></script>
        <p>
            <!--<img alt="" src="/Images/search.gif" class="fl">-->
            <select onchange="ShowWeatherBox(this.value);" class="slt-weather" id="cboWeather">
                <option value="1">Sơn La</option>
                <option value="2">Vi&#7879;t Tr&#236;</option>
                <option value="3">Hải Phòng</option>
                <option selected="selected" value="4">Hà Nội</option>
                <option value="5">Vinh</option>
                <option value="6">Đà Nẵng</option>
                <option value="7">Nha Trang</option>
                <option value="8">Pleiku</option>
                <option value="9">TP HCM</option>
            </select>
        </p>
        <p id="img-Do"></p>
        <p id="txt-Weather"></p>
        <script language="javascript" type="text/javascript">ShowWeatherBox(4);</script>
        
    </div>
    </form>
</body>
</html>

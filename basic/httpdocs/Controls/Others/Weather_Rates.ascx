<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Weather_Rates.ascx.cs" Inherits="Controls_Others_Weather_Rates" %>

<div class="weather-rate">
    <div class="title">
        <span id="lblTextWeather" runat="server" class="title_weather">Thời tiết</span>
        <span id="lblTextRate" runat="server" class="title_rate">Tỉ giá</span>
    </div>
    <div class="content">
        <div class="weather-rate-wrapper">
            <div style="float:left; width:50%; height:100%;">
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
            <div style="float:left; width:50%; height:100%; overflow-x:hidden; overflow-y:scroll;">
                <div id="eForex"></div>
            </div>
        </div>
    </div>
</div>
<div class="clear"></div>
<style type="text/css">
    .weather-rate-wrapper { float:left; background:url(images/box-weather.gif) repeat-x; width:222px; height:132px; margin:3px 0 3px 3px; }
    .tbl-weather { width:110px; }
    .tbl-goldprice, .tbl-weather { background-color:#A8A8A8; font:11px arial; }
    .td-weather-title { background-color:#FFFFFF; width:40px; }
    .td-weather-data { background-color:#FFFFFF; }
</style>
<script type="text/javascript" src="http://vnexpress.net/Service/Forex_Content.js"></script>
<script type="text/javascript" language="javascript">/*ShowGoldPrice();*/ShowForexRate();</script>

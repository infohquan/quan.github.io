<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LeftMenu.ascx.cs" Inherits="WebAdmin_controls_LeftMenu" %>

<div id="left-column">
    
    <h3 onclick="toggleMenu('ulProduct')">Left Menu</h3>
    <ul id="ulProduct" class="nav">
	    <li><a title="Add new products" href="../Product/ProductAddEdit.aspx">Add new products</a></li>
	    <li><a title="List products" href="../Product/ProductList.aspx">List products</a></li>
	    <li class="last"><a title="Add new main root of products" href="../Product/Catalog.aspx">Root products</a></li>
	    <!--<li class="last"><a title="Quản lý thông tin đơn đặt hàng qua email" href="../Others/CustomerIdea.aspx?t=ContactProduct">Đơn đặt hàng</a></li>-->
	    <!--<li><a title="Quản lý nhà sản xuất" href="../Product/Producer.aspx">Nhà sản xuất</a></li>-->
	    <!--<li><a title="Quản lý thông tin đơn đặt hàng" href="../Product/ManageOrder.aspx">Quản lý Đơn hàng</a></li>
	    <li><a title="Add new slide pictures" href="../Product/ImageSlideAdd.aspx">Add new slide pictures</a></li>
	    <li><a title="Danh sách Hình ảnh Slide của sản phẩm" href="../Product/ImageSlideList.aspx">List Slide Pictures</a></li>
	    <li><a title="Quản lý Size(kích thước) của sản phẩm" href="../Product/ManageSize.aspx">Manage sizes</a></li>
	    <li><a title="Quản lý Độ rộng của sản phẩm" href="../Product/ManageWidth.aspx">Manage width</a></li>
	    <li class="last"><a title="Quản lý Quản lý Màu sắc của sản phẩm" href="../Product/ManageColor.aspx">Manage color</a></li>-->
    </ul>
    
    <!--Menu Tin tức: Start-->
    <h3 onclick="toggleMenu('ulNews')">News- Introduction</h3>
    <ul id="ulNews" class="nav">
	    <li><a title="Thêm một Tin tức mới" href="../Article/ArticleAddEdit.aspx?t=news">Add new news</a></li>
	    <li><a title="Xem danh sách Tin tức hiện có" href="../Article/ArticleList.aspx?t=news">List news</a></li>
	    <li><a title="Quản lý Chuyên mục Tin tức" href="../Article/Category.aspx?t=news">Root of news</a></li>
	    <li><a title="Thêm một giới thiệu mới" href="../AboutUs/AboutUsAddEdit.aspx">Add new introduction</a></li>
	    <li class="last"><a title="Xem danh sách giới thiệu hiện có" href="../AboutUs/AboutUsList.aspx">List introduction</a></li>
    </ul>
    <!--Menu Tin tức: End-->
    
    <h3 onclick="toggleMenu('ulService')">Software</h3>
    <ul id="ulService" class="nav">
	    <li><a title="Thêm Khuyến mãi mới" href="../Article/ArticleAddEdit.aspx?t=promotion">Add new software</a></li>
	    <li><a title="Xem danh sách Khuyến mãi hiện có" href="../Article/ArticleList.aspx?t=promotion">List of software</a></li>
	    <li class="last"><a title="Quản lý Chuyên mục Khuyến mãi" href="../Article/Category.aspx?t=promotion">Root of software</a></li>
    </ul>
    
    
    
    <h3 onclick="toggleMenu('ulService')">TIPS</h3>
    <ul id="ulService" class="nav">
	    <li><a title="Thêm dịch vụ mới" href="../Article/ArticleAddEdit.aspx?t=service">Add tips</a></li>
	    <li><a title="Xem danh sách dịch vụ hiện có" href="../Article/ArticleList.aspx?t=service">List of tips</a></li>
	    <li class="last"><a title="Quản lý Chuyên mục dịch vụ" href="../Article/Category.aspx?t=service">Root of tips</a></li>

    
       <h3 onclick="toggleMenu('ulGallery')">Gallery </h3>
    <ul id="ulGallery" class="nav">
        <li><a href="../Gallery/Photo.aspx">Manage pictures</a></li>
	    <li class="last"><a href="../Gallery/Album.aspx">Mange Album</a></li>
    </ul>
        
    <!--Menu Người dùng: Start-->
    <h3 onclick="toggleMenu('ulUser')">User</h3>
    <ul id="ulUser" class="nav">
	    <li><a title="Thêm một người dùng mới" href="../User/UserAddEdit.aspx">Add new user</a></li>
	    <li><a title="Xem danh sách người dùng hiện có" href="../User/UserList.aspx">List of users</a></li>
	    <li class="last"><a title="Thay đổi mật khẩu đăng nhập" href="../User/ChangePassword.aspx">Change password</a></li>
    </ul>
    <!--Menu Người dùng: End-->
	
    <!--Menu Thông tin khác: Start-->
    <h3 onclick="toggleMenu('ulOthers')">Thông tin khác</h3>
    <ul id="ulOthers" class="nav">        
        <!--<li><a title="Thêm khách hàng mới" href="../Others/CustomerAddEdit.aspx">Thêm khách hàng mới</a></li>
        <li><a title="Xem danh sách khách hàng" href="../Others/CustomerList.aspx">Danh sách Khách hàng</a></li>-->
        <li><a title="Thêm quảng cáo mới" href="../Others/Advertisement.aspx?t=ads">Advertising</a></li>
        <!--<li><a title="Thêm một quảng cáo trượt 2 bên" href="../Others/Advertisement.aspx?t=ads2side">Quảng cáo trượt 2 bên</a></li>-->
        <li><a title="Thêm một liên kết web mới" href="../Others/Advertisement.aspx?t=weblink">Link webs</a></li>
        <li><a title="Quản lý hỗ trợ trực tuyến" href="../Others/SupportOnline.aspx">Support online</a></li>	    
	    <li><a title="Xem thông tin ý kiến khách hàng" href="../Others/CustomerIdea.aspx?t=contact">Inbox</a></li>
	    <!--<li><a title="Xem thông tin ý kiến nhà đầu tư" href="../Others/CustomerIdea.aspx?t=FaqInvest">Ý kiến Nhà đầu tư</a></li>
	    <li><a title="Thiết lập Mail Server của Admin để gửi email cho khách hàng" href="../Others/MailServer.aspx">Thiết lập Mail Server</a></li>-->
	    <li><a title="Quản lý Video Clip" href="../Others/VideoClip.aspx">Video Clip</a></li>
	    <li><a title="Quản lý File download" href="../Others/FileDownload.aspx">Manage Files</a></li>
	    <li><a title="Quản lý Thông tin Liên hệ công ty" href="../Others/Footer.aspx">Footer</a></li>
	    <li class="last"><a title="Quản lý Thông tin Footer Copyright" href="../Others/Footer.aspx?t=copyright">Footer Information</a></li>
        <!--<li><a title="Quản lý Hình ảnh Slide ở Trang chủ" href="../Others/ImageSlideIndex.aspx">Hình ảnh Slide Trang chủ</a></li>        
	    <li><a title="Thêm một dịch vụ mới" href="../Others/ServiceAddEdit.aspx">Thêm Dịch vụ mới</a></li>
	    <li><a title="Xem danh sách dịch vụ hiện có" href="../Others/ServiceList.aspx">Danh sách Dịch vụ</a></li>	    
	    <li><a title="Thêm một đối tác mới" href="../Others/Partner.aspx">Thêm Đối tác mới</a></li>-->
    </ul>
    <!--Menu Thông tin khác: End-->
    <script type="text/javascript">
        //toggleMenu('ulMenu'); toggleMenu('ulMusic'); toggleMenu('ulBlog');
        //toggleMenu('ulFun'); toggleMenu('ulPromotion'); toggleMenu('ulJob');
    </script>
</div>

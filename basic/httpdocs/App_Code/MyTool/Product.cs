using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Connection;

namespace MyTool
{
    /// <summary>
    /// Sản phẩm Class
    /// </summary>
    public class Product
    {
        public Product() { }

        
        public int InsertProduct(int AgentCatID, string Lang, int GroupID, string MaSanPham, string TenGoi, string NgoaiTe, string GiaBan, string GiaKhuyenMai,
                                  string ThongTin1, string ThongTin2, string Anh, int ProducerID, string Keyword, bool IsNew, bool IsHot, bool IsBestSeller)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO ProductCat (AgentCatID, Lang, GroupID, MaSanPham, TenGoi, NgoaiTe, GiaBan, GiaKhuyenMai, ThongTin1, ThongTin2, Anh, ProducerID, Keyword, IsNew, IsHot, IsBestSeller) ";
                Sql += "VALUES (@AgentCatID, @Lang, @GroupID, @MaSanPham, @TenGoi, @NgoaiTe, @GiaBan, @GiaKhuyenMai, @ThongTin1, @ThongTin2, @Anh, @ProducerID, @Keyword, @IsNew, @IsHot, @IsBestSeller)";

                string[] strParaName = new string[16] { "@AgentCatID", "@Lang", "@GroupID", "@MaSanPham", "@TenGoi", "@NgoaiTe", "@GiaBan", "@GiaKhuyenMai", "@ThongTin1", "@ThongTin2", "@Anh", "@ProducerID", "@Keyword", "@IsNew", "@IsHot", "@IsBestSeller" };
                SqlDbType[] sqlDbType = new SqlDbType[16] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit };
                object[] objValue = new object[16] { AgentCatID, Lang, GroupID, MaSanPham, TenGoi, NgoaiTe, GiaBan, GiaKhuyenMai, ThongTin1, ThongTin2, Anh, ProducerID, Keyword, IsNew, IsHot, IsBestSeller };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }
        
        public int UpdateProduct(int ProductID, string Lang, int GroupID, string MaSanPham, string TenGoi, string NgoaiTe, string GiaBan, string GiaKhuyenMai,
                                  string ThongTin1, string ThongTin2, string Anh, int ProducerID, string Keyword, bool IsNew, bool IsHot, bool IsBestSeller)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE ProductCat SET GroupID=@GroupID, MaSanPham=@MaSanPham, TenGoi=@TenGoi, NgoaiTe=@NgoaiTe, GiaBan=@GiaBan, GiaKhuyenMai=@GiaKhuyenMai, ThongTin1=@ThongTin1, ThongTin2=@ThongTin2, Anh=@Anh, ProducerID=@ProducerID, Keyword=@Keyword, IsNew=@IsNew, IsHot=@IsHot, IsBestSeller=@IsBestSeller ";
                Sql += "WHERE ID=@ProductID AND Lang=@Lang";

                string[] strParaName = new string[16] { "@ProductID", "@Lang", "@GroupID", "@MaSanPham", "@TenGoi", "@NgoaiTe", "@GiaBan", "@GiaKhuyenMai", "@ThongTin1", "@ThongTin2", "@Anh", "@ProducerID", "@Keyword", "@IsNew", "@IsHot", "@IsBestSeller" };
                SqlDbType[] sqlDbType = new SqlDbType[16] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit };
                object[] objValue = new object[16] { ProductID, Lang, GroupID, MaSanPham, TenGoi, NgoaiTe, GiaBan, GiaKhuyenMai, ThongTin1, ThongTin2, Anh, ProducerID, Keyword, IsNew, IsHot, IsBestSeller };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        //Xóa sản phẩm
        public int DeleteProduct(int ProductID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM ProductCat WHERE ID=@ProductID";
                kq = ca.ExcuteSql(Sql, "@ProductID", SqlDbType.Int, ProductID);
            }
            catch { }
            return kq;
        }
        public bool IsOffer(int ProductID, string Lang)
        {
            bool isOffer = false;
            Product obj = new Product();
            DataSet ds = obj.GetProductByProductID("ProductCat", ProductID, Lang);
            Double GiaBan = Convert.ToDouble(ds.Tables[0].Rows[0]["GiaBan"].ToString());
            Double GiaKhuyenMai = Convert.ToDouble(ds.Tables[0].Rows[0]["GiaKhuyenMai"].ToString());
            if (GiaKhuyenMai < GiaBan)
                isOffer = true;
            return isOffer;
        }
        //Lấy danh sách tất cả sản phẩm
        public DataSet GetAllProduct(string DatasetName, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, DateCreated ";
                Sql += "FROM ProductCat as p WHERE p.Lang='" + Lang + "' ORDER BY p.ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        //Lấy danh sách tất cả sản phẩm theo AgentCatID
        public DataSet GetAllProduct(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, ProducerID, TonKho, TrangThai, Anh, DonViTinh, DateCreated ";
                Sql += "FROM ProductCat as p WHERE AgentCatID = '" + AgentCatID + "' AND p.Lang='" + Lang + "' ORDER BY p.ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetAllProduct(string DatasetName, int AgentCatID, string Lang, string Order)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, ProducerID, TonKho, TrangThai, Anh, DonViTinh, DateCreated ";
                Sql += "FROM ProductCat as p WHERE AgentCatID = '" + AgentCatID + "' AND p.Lang='" + Lang + "' ORDER BY p.ID " + Order;
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        //Lấy thông tin chi tiết sản phẩm
        public DataSet GetProductByProductID(string DatasetName, int ProductID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, ";
                Sql += "GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, ";
                Sql += "ProducerID, TotalViews, UserName, Keyword, IsNew, IsHot, IsBestSeller, DateCreated ";
                Sql += "FROM ProductCat as p WHERE p.ID = '" + ProductID + "' AND p.Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetProductByProductID(string DatasetName, int ProductID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, ";
                Sql += "GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, ";
                Sql += "ProducerID, TotalViews, UserName, Keyword, IsNew, IsHot, IsBestSeller, DateCreated ";
                Sql += "FROM ProductCat as p WHERE p.ID = '" + ProductID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        //Lấy url hình ảnh của sản phẩm
        public string GetImageUrlByProductID(int ProductID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Anh FROM ProductCat WHERE ID = '" + ProductID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
        public DataSet GetProductByProducerID(string DatasetName, int ProducerID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, p.ProducerID, b.ProducerName, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, DateCreated ";
                Sql += "FROM ProductCat as p, Producer as b WHERE p.ProducerID = b.ProducerID AND p.ProducerID = '" + ProducerID + "' AND p.Lang='" + Lang + "' ";
                Sql += "ORDER BY p.ID DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy DS SP theo mã danh mục
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="Lang"></param>
        /// <param name="CatalogID"></param>
        /// <returns></returns>
        public DataSet GetProductByCatalogID(string DatasetName, string Lang, int CatalogID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, p.ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, DateCreated ";
                Sql += "FROM ProductCat as p WHERE p.GroupID = '" + CatalogID + "' AND p.Lang='" + Lang + "' ";
                Sql += "ORDER BY p.ID DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy hết DS sản phẩm theo chuỗi CatalogID
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="Lang"></param>
        /// <param name="StringCatalogID"></param>
        /// <returns></returns>
        public DataSet GetProductByStringCatalogID(string DatasetName, string Lang, string StringCatalogID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT p.ID, GroupID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, ProducerID, TonKho, TrangThai, Anh, DonViTinh, DateCreated ";
                Sql += "FROM ProductCat as p WHERE p.GroupID IN (" + StringCatalogID + ") AND p.Lang='" + Lang + "' ";
                Sql += "ORDER BY p.ID DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            //catch { }
            return ds;
        }

        public DataSet SearchProduct(string DatasetName, string Lang, string StringCatalogID, int CatalogID, int SizeID, int WidthID, int ColorID, int ProducerID, string OrderBy)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, p.ProducerID, b.ProducerName, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, (convert(int,GiaBan) - convert(int,GiaKhuyenMai)) as SaleOff ";
                string strFrom = "FROM ProductCat as p, Producer as b ";
                string strWhere = "WHERE p.ProducerID = b.ProducerID AND p.Lang='" + Lang + "' ";

                if (StringCatalogID != "")
                    strWhere += "AND p.GroupID IN (" + StringCatalogID + ") ";
                else if (StringCatalogID == "")
                {
                    if (CatalogID != -1)
                        strWhere += "AND p.GroupID = '" + CatalogID + "' ";
                }

                if (SizeID != -1)
                {
                    strFrom += ", Size as s, Product_Size as ps ";
                    strWhere += "AND ps.ProductID = p.ID AND ps.SizeID = s.SizeID AND s.SizeID = '" + SizeID + "' ";
                }

                if (WidthID != -1)
                {
                    strFrom += ", Width as w, Product_Width as pw ";
                    strWhere += "AND pw.ProductID = p.ID AND pw.WidthID = w.WidthID AND w.WidthID = '" + WidthID + "' ";
                }

                if (ColorID != -1)
                {
                    strFrom += ", Color as c, Product_Color as pc ";
                    strWhere += "AND pc.ProductID = p.ID AND pc.ColorID = c.ColorID AND c.ColorID = '" + ColorID + "' ";
                }

                if (ProducerID != -1)
                {
                    strWhere += "AND b.ProducerID = '" + ProducerID + "' ";
                }
                string strOrderBy = "";
                if (OrderBy == "Default")
                    strOrderBy = " ORDER BY p.ID DESC";
                else if (OrderBy == "Brand")
                    strOrderBy = " ORDER BY b.ProducerName ASC";
                else if (OrderBy == "StyleName")
                    strOrderBy = " ORDER BY p.TenGoi ASC";
                else if (OrderBy == "PercentOff")
                    strOrderBy = " ORDER BY SaleOff DESC";
                else if (OrderBy == "PriceLowToHigh")
                    strOrderBy = " ORDER BY GiaBan ASC";
                else if (OrderBy == "PriceLowToHigh")
                    strOrderBy = " ORDER BY GiaBan DESC";

                Sql += strFrom + strWhere + strOrderBy;
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { } 
            return ds;
        }

        public DataSet SearchProduct(string DatasetName, string Lang, string StringCatalogID, int CatalogID, string Type, int SizeID, int WidthID, int ColorID, int ProducerID, string OrderBy)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, p.ProducerID, b.ProducerName, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, (convert(int,GiaBan) - convert(int,GiaKhuyenMai)) as SaleOff ";
                string strFrom = "FROM ProductCat as p, Producer as b ";
                string strWhere = "WHERE p.ProducerID = b.ProducerID AND p.Lang='" + Lang + "' ";

                if (StringCatalogID != "")
                    strWhere += "AND p.GroupID IN (" + StringCatalogID + ") ";
                else if (StringCatalogID == "")
                {
                    if (CatalogID != -1)
                        strWhere += "AND p.GroupID = '" + CatalogID + "' ";
                }
                if (Type == "Offer") //saleoff
                    strWhere += "AND GiaBan > GiaKhuyenMai ";
                else if (Type == "NotOffer")  //no saleoff
                    strWhere += "AND GiaBan = GiaKhuyenMai ";

                if (SizeID != -1)
                {
                    strFrom += ", Size as s, Product_Size as ps ";
                    strWhere += "AND ps.ProductID = p.ID AND ps.SizeID = s.SizeID AND s.SizeID = '" + SizeID + "' ";
                }

                if (WidthID != -1)
                {
                    strFrom += ", Width as w, Product_Width as pw ";
                    strWhere += "AND pw.ProductID = p.ID AND pw.WidthID = w.WidthID AND w.WidthID = '" + WidthID + "' ";
                }

                if (ColorID != -1)
                {
                    strFrom += ", Color as c, Product_Color as pc ";
                    strWhere += "AND pc.ProductID = p.ID AND pc.ColorID = c.ColorID AND c.ColorID = '" + ColorID + "' ";
                }

                if (ProducerID != -1)
                {
                    strWhere += "AND b.ProducerID = '" + ProducerID + "' ";
                }
                string strOrderBy = "";
                if (OrderBy == "Default")
                    strOrderBy = " ORDER BY p.ID DESC";
                else if (OrderBy == "Brand")
                    strOrderBy = " ORDER BY b.ProducerName ASC";
                else if (OrderBy == "StyleName")
                    strOrderBy = " ORDER BY p.TenGoi ASC";
                else if (OrderBy == "PercentOff")
                    strOrderBy = " ORDER BY SaleOff DESC";
                else if (OrderBy == "PriceLowToHigh")
                    strOrderBy = " ORDER BY GiaBan ASC";
                else if (OrderBy == "PriceLowToHigh")
                    strOrderBy = " ORDER BY GiaBan DESC";

                Sql += strFrom + strWhere + strOrderBy;
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet SearchProduct(string DatasetName, string Lang, string StringCatalogID, int CatalogID, int SizeID, int WidthID, int ColorID, int ProducerID, string OrderBy, int nPage, int nPageSize, out int TotalItems)
        {
            TotalItems = -1;
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, p.ProducerID, b.ProducerName, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, (convert(int,GiaBan) - convert(int,GiaKhuyenMai)) as SaleOff ";
                string strFrom = "FROM ProductCat as p, Producer as b ";
                string strWhere = "WHERE p.ProducerID = b.ProducerID AND p.Lang='" + Lang + "' ";

                if (StringCatalogID != "")
                    strWhere += "AND p.GroupID IN (" + StringCatalogID + ") ";
                else if (StringCatalogID == "")
                {
                    if (CatalogID != -1)
                        strWhere += "AND p.GroupID = '" + CatalogID + "' ";
                }

                if (SizeID != -1)
                {
                    strFrom += ", Size as s, Product_Size as ps ";
                    strWhere += "AND ps.ProductID = p.ID AND ps.SizeID = s.SizeID AND s.SizeID = '" + SizeID + "' ";
                }

                if (WidthID != -1)
                {
                    strFrom += ", Width as w, Product_Width as pw ";
                    strWhere += "AND pw.ProductID = p.ID AND pw.WidthID = w.WidthID AND w.WidthID = '" + WidthID + "' ";
                }

                if (ColorID != -1)
                {
                    strFrom += ", Color as c, Product_Color as pc ";
                    strWhere += "AND pc.ProductID = p.ID AND pc.ColorID = c.ColorID AND c.ColorID = '" + ColorID + "' ";
                }

                if (ProducerID != -1)
                {
                    strWhere += "AND b.ProducerID = '" + ProducerID + "' ";
                }
                string strOrderBy = "";
                if (OrderBy == "Default")
                    strOrderBy = " ORDER BY p.ID DESC";
                else if (OrderBy == "Brand")
                    strOrderBy = " ORDER BY b.ProducerName ASC";
                else if (OrderBy == "StyleName")
                    strOrderBy = " ORDER BY p.TenGoi ASC";
                else if (OrderBy == "PercentOff")
                    strOrderBy = " ORDER BY SaleOff DESC";
                else if (OrderBy == "PriceLowToHigh")
                    strOrderBy = " ORDER BY GiaBan ASC";
                else if (OrderBy == "PriceLowToHigh")
                    strOrderBy = " ORDER BY GiaBan DESC";

                Sql += strFrom + strWhere + strOrderBy;
                ds = ca.SelectData(DatasetName, Sql, nPage, nPageSize);
                DataSet dsMain = ca.SelectData(DatasetName, Sql);
                TotalItems = dsMain.Tables[0].Rows.Count;
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Tìm kiếm sản phẩm (chuẩn)
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <param name="Text"></param>
        /// <param name="StringCatalogID"></param>
        /// <param name="ProducerID"></param>
        /// <param name="OrderBy">"Default", "Brand", "StyleName", "PercentOff", "PriceLowToHigh", "PriceLowToHigh"</param>
        /// <returns></returns>
        public DataSet SearchProduct(string DatasetName, int AgentCatID, string Lang, string Text, string StringCatalogID, int ProducerID, string OrderBy)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ID, GroupID, p.ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, (convert(int,GiaBan) - convert(int,GiaKhuyenMai)) as SaleOff ";
                string strFrom = "FROM ProductCat as p ";
                string strWhere = "WHERE p.AgentCatID = '" + AgentCatID + "' AND p.Lang='" + Lang + "' ";

                if (StringCatalogID != "")
                    strWhere += "AND p.GroupID IN (" + StringCatalogID + ") ";
                if (Text != "")
                    strWhere += "AND (TenGoi LIKE N'%" + Text + "%' OR ThongTin1 LIKE N'%" + Text + "%' OR ThongTin2 LIKE N'%" + Text + "%' ) ";
                if (ProducerID != -1)
                    strWhere += "AND ProducerID = '" + ProducerID + "' ";
               
                string strOrderBy = "";
                if (OrderBy == "Default")
                    strOrderBy = " ORDER BY p.ID DESC";
                else if (OrderBy == "Brand")
                    strOrderBy = " ORDER BY b.ProducerName ASC";
                else if (OrderBy == "StyleName")
                    strOrderBy = " ORDER BY p.TenGoi ASC";
                else if (OrderBy == "PercentOff")
                    strOrderBy = " ORDER BY SaleOff DESC";
                else if (OrderBy == "PriceLowToHigh")
                    strOrderBy = " ORDER BY GiaBan ASC";
                else if (OrderBy == "PriceLowToHigh")
                    strOrderBy = " ORDER BY GiaBan DESC";

                Sql += strFrom + strWhere + strOrderBy;
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy chuỗi SQL Search product
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="StringCatalogID"></param>
        /// <returns></returns>
        public string SQLSearchProduct(string DatasetName, int AgentCatID, string Lang, string Text, string StringCatalogID, int ProducerID, string OrderBy)
        {
            string Sql = "SELECT p.ID, GroupID, p.ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, (convert(int,GiaBan) - convert(int,GiaKhuyenMai)) as SaleOff ";
            string strFrom = "FROM ProductCat as p ";
            string strWhere = "WHERE p.AgentCatID = '" + AgentCatID + "' AND p.Lang='" + Lang + "' ";

            if (StringCatalogID != "")
                strWhere += "AND p.GroupID IN (" + StringCatalogID + ") ";
            if (Text != "")
                strWhere += "AND (TenGoi LIKE N'%" + Text + "%' OR ThongTin1 LIKE N'%" + Text + "%' OR ThongTin2 LIKE N'%" + Text + "%' ) ";
            if (ProducerID != -1)
                strWhere += "AND ProducerID = '" + ProducerID + "' ";

            string strOrderBy = "";
            if (OrderBy == "Default")
                strOrderBy = " ORDER BY p.ID DESC";
            else if (OrderBy == "Brand")
                strOrderBy = " ORDER BY b.ProducerName ASC";
            else if (OrderBy == "StyleName")
                strOrderBy = " ORDER BY p.TenGoi ASC";
            else if (OrderBy == "PercentOff")
                strOrderBy = " ORDER BY SaleOff DESC";
            else if (OrderBy == "PriceLowToHigh")
                strOrderBy = " ORDER BY GiaBan ASC";
            else if (OrderBy == "PriceLowToHigh")
                strOrderBy = " ORDER BY GiaBan DESC";

            Sql += strFrom + strWhere + strOrderBy;
            return Sql;
        }

        public DataSet SearchProductByText(string DatasetName, int AgentCatID, string Lang, string strSearch)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ID, GroupID, TenGoi, MaSanPham, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh ";
                Sql += "FROM ProductCat ";
                Sql += "WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ";
                Sql += "AND (TenGoi LIKE N'%" + strSearch + "%' OR ThongTin1 LIKE N'%" + strSearch + "%' OR ThongTin2 LIKE N'%" + strSearch + "%' ) ";                
                Sql += "ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public DataSet SearchProduct(string DatasetName, int AgentCatID, string Lang, int CatID, int ProducerID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ID, GroupID, TenGoi, ProducerID, MaSanPham, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh ";
                Sql += "FROM ProductCat ";
                Sql += "WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ";
                Sql += " AND GroupID = '" + CatID + "' AND ProducerID = '" + ProducerID + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        /// <summary>
        /// Lấy Top DS sản phẩm được xem nhiều nhất
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetTopViewedMostProduct(string DatasetName, int nTop, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " p.ID, GroupID, ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, TotalViews, DateCreated ";
                Sql += "FROM ProductCat as p WHERE p.Lang = '" + Lang + "' ORDER BY TotalViews DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy top SP mới nhất
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetTopNewProduct(string DatasetName, int AgentCatID, int nTop, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " p.ID, GroupID, ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, TotalViews, DateCreated ";
                Sql += "FROM ProductCat as p WHERE AgentCatID = '" + AgentCatID + "' AND p.Lang = '" + Lang + "' ORDER BY p.ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy top SP nổi bật (HOT)
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetTopHotProduct(string DatasetName, int AgentCatID, int nTop, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " p.ID, GroupID, ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, TotalViews, DateCreated ";
                Sql += "FROM ProductCat as p WHERE IsHot=1 AND AgentCatID = '" + AgentCatID + "' AND p.Lang = '" + Lang + "' ORDER BY p.ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="OrderBy">DESC, ASC</param>
        /// <returns></returns>
        public DataSet GetTopHotProduct(string DatasetName, int AgentCatID, int nTop, string Lang, string OrderBy)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " p.ID, GroupID, ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, TotalViews, DateCreated ";
                Sql += "FROM ProductCat as p WHERE IsHot=1 AND AgentCatID = '" + AgentCatID + "' AND p.Lang = '" + Lang + "' ORDER BY p.ID " + OrderBy;
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy top SP khuyến mãi
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetTopPromotionProduct(string DatasetName, int nTop, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " p.ID, GroupID, p.ProducerID, b.ProducerName, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, (GiaBan + ' ' + NgoaiTe) as FullPrice, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, TotalViews, DateCreated ";
                Sql += "FROM ProductCat as p, Producer as b WHERE p.ProducerID = b.ProducerID AND GiaBan != GiaKhuyenMai AND p.Lang = '" + Lang + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy ds màu sắc của sản phẩm
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="ProductID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetColorListOfProduct(string DatasetName, int ProductID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT c.ColorID, ColorName ";
                Sql += "FROM ProductCat as p, Color as c, Product_Color as pc ";
                Sql += "WHERE p.ID = pc.ProductID AND pc.ColorID = c.ColorID AND p.ID = '" + ProductID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy chuỗi màu sắc của sản phẩm
        /// </summary>
        /// <param name="ProductID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public string GetStringColorByProductID(int ProductID)
        {
            string strColor = "";
            DataSet dsColor = GetColorListOfProduct("Color", ProductID);
            for (int iColor = 0; iColor < dsColor.Tables[0].Rows.Count; iColor++)
            {
                strColor += Convert.ToString(dsColor.Tables[0].Rows[iColor]["ColorName"]);
                if (iColor < dsColor.Tables[0].Rows.Count - 1)
                    strColor += "/";
            }
            return strColor;
        }
        /// <summary>
        /// Lấy DS hình ảnh của sản phẩm trong table ProductImage, hiển thị trang chủ
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="ProductID"></param>
        /// <returns></returns>
        public DataSet GetImageListOfProduct(string DatasetName, int ProductID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProductImageID, ProductID, ProductImageURL, ProductImageOrder ";
                Sql += "FROM ProductImage WHERE ProductID='" + ProductID + "' ORDER BY ProductImageOrder ASC, ProductImageID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public DataSet GetImageListOfProduct(string DatasetName, int ProductID, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProductImageID, ProductID, ProductImageURL, ProductImageOrder ";
                Sql += "FROM ProductImage WHERE AgentCatID = '" + AgentCatID + "' AND ProductID='" + ProductID + "' ORDER BY ProductImageOrder ASC, ProductImageID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetTopProductByCatalogID(string DatasetName, int nTop, string Lang, int CatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " p.ID, GroupID, ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, TotalViews ";
                Sql += "FROM ProductCat as p, GroupCat as g WHERE p.Lang = '" + Lang + "' AND p.GroupID = g.ID AND g.ID = '" + CatID + "' ";
                Sql += "ORDER BY TotalViews DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public DataSet GetTopProductSameCatalog(string DatasetName, int nTop, int ProductID, int CatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " p.ID, GroupID, ProducerID, MaSanPham, TenGoi, QuyCach, NgoaiTe, GiaBan, GiaThamKhao, GiaKhuyenMai, ThongTin1, ThongTin2, TonKho, TrangThai, Anh, DonViTinh, TotalViews ";
                Sql += "FROM ProductCat as p, GroupCat as g WHERE p.Lang = '" + Lang + "' AND p.GroupID = g.ID AND g.ID = '" + CatID + "' AND p.ID != '" + ProductID + "' ";
                Sql += "ORDER BY TotalViews DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public bool InsertProductComment(int ProductID, int CustomerID, string Title, string Comment)
        {
            bool result = false;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Comment (ProductID, CustomerID, Title, Comment) ";
                Sql += "VALUES (N'" + ProductID + "', N'" + CustomerID + "',N'" + Title + "',N'" + Comment + "')";
                ca.ExeSql(Sql);
                result = true;
            }
            catch { result = false; }
            return result;
        }

        public bool InsertVoteDetail(int VoteTypeID, int CommentID, int VoteMark)
        {
            bool result = false;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO VoteDetail (VoteTypeID, CommentID, VoteMark) ";
                Sql += "VALUES (N'" + VoteTypeID + "', N'" + CommentID + "',N'" + VoteMark + "')";
                ca.ExeSql(Sql);
                result = true;
            }
            catch { result = false; }
            return result;
        }

        public DataSet GetProductComment(string DatasetName, int ProductID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CommentID, ProductID, CustomerID, Title, Comment, DatePost ";
                Sql += "FROM Comment as c, ProductCat as p WHERE c.ProductID = p.ID AND p.ID = '" + ProductID + "' ORDER BY CommentID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetProductReviewsDetail(string DatasetName, int CommentID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VoteDetailID, VoteTypeID, v.CommentID, VoteMark, VoteDetailAddDate, VoteDetailUpdate ";
                Sql += "FROM VoteDetail as v WHERE v.CommentID = '" + CommentID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetVoteTypeList(string DatasetName, string Lang)
        { 
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VoteTypeID, Lang, VoteTypeName, VoteTypeAddDate, VoteTypeUpdate, Notes, Stat ";
                Sql += "FROM VoteType as v WHERE Lang = '" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int GetLastCommentID()
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CommentID FROM Comment WHERE CommentID >= ALL (Select CommentID From Comment)";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return kq;
        }

        public DataSet GetTopProductVideo(string DatasetName, int nTop, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName ";
                Sql += "FROM VideoProduct WHERE Lang = '" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int GetCatalogIDByProductID(int ProductID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT GroupID FROM ProductCat WHERE ID = '" + ProductID + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return kq;
        }

        public int DeleteColorByProductID(int ProductID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Product_Color WHERE ProductID=@ProductID";
                kq = ca.ExcuteSql(Sql, "@ProductID", SqlDbType.Int, ProductID);
            }
            catch { }
            return kq;
        }

        public int InsertColorOfProduct(int ProductID, int ColorID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Product_Color (ProductID, ColorID) ";
                Sql += "VALUES (@ProductID, @ColorID)";

                string[] strParaName = new string[2] { "@ProductID", "@ColorID" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[2] { ProductID, ColorID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteSizeByProductID(int ProductID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Product_Size WHERE ProductID=@ProductID";
                kq = ca.ExcuteSql(Sql, "@ProductID", SqlDbType.Int, ProductID);
            }
            catch { }
            return kq;
        }

        public int InsertSizeOfProduct(int ProductID, int SizeID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Product_Size (ProductID, SizeID) ";
                Sql += "VALUES (@ProductID, @SizeID)";

                string[] strParaName = new string[2] { "@ProductID", "@SizeID" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[2] { ProductID, SizeID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int DeleteWidthByProductID(int ProductID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Product_Width WHERE ProductID=@ProductID";
                kq = ca.ExcuteSql(Sql, "@ProductID", SqlDbType.Int, ProductID);
            }
            catch { }
            return kq;
        }

        public int InsertWidthOfProduct(int ProductID, int WidthID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Product_Width (ProductID, WidthID) ";
                Sql += "VALUES (@ProductID, @WidthID)";

                string[] strParaName = new string[2] { "@ProductID", "@WidthID" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[2] { ProductID, WidthID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int GetLastProductID()
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID FROM ProductCat WHERE ID >= ALL (Select ID From ProductCat)";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return kq;
        }

        public int InsertImageSlideOfProduct(int ProductID, string ProductImageURL, int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO ProductImage (ProductID, ProductImageURL, AgentCatID) ";
                Sql += "VALUES (@ProductID, @ProductImageURL, @AgentCatID)";

                string[] strParaName = new string[3] { "@ProductID", "@ProductImageURL", "@AgentCatID" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int };
                object[] objValue = new object[3] { ProductID, ProductImageURL, AgentCatID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public DataSet GetProductImageByProductImageID(string DatasetName, int ProductImageID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProductImageID, ProductID, ProductImageURL, ProductImageOrder ";
                Sql += "FROM ProductImage WHERE ProductImageID='" + ProductImageID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int DeleteProductImage(int ProductImageID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM ProductImage WHERE ProductImageID=@ProductImageID";
                kq = ca.ExcuteSql(Sql, "@ProductImageID", SqlDbType.Int, ProductImageID);
            }
            catch { }
            return kq;
        }

        public bool IsHaveVideoClip(int ProductID, string Lang)
        {
            bool f = false;
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                OtherFunctions obj = new OtherFunctions();
                ds = obj.GetVideoByProductID("VideoProduct", ProductID, Lang);
                if (ds.Tables[0].Rows.Count > 0)
                    f = true;
            }
            catch { }
            return f;
        }
    }
}
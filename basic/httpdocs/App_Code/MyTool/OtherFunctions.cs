using System;
using System.Data;
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
    /// Summary description for OtherFunctions
    /// </summary>
    public class OtherFunctions
    {
        public OtherFunctions() { }

        public int InsertMailAdmin(int AgentCatID, string Email, string Password, string MailServer)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO MailAdmin (AgentCatID, Email, Password, MailServer) ";
                Sql += "VALUES (@AgentCatID, @Email, @Password, @MailServer)";

                string[] strParaName = new string[4] { "@AgentCatID", "@Email", "@Password", "@MailServer" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[4] { AgentCatID, Email, Password, MailServer };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateMailAdmin(int MailID, int AgentCatID, string Email, string Password, string MailServer)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE MailAdmin SET Email=@Email, Password=@Password, MailServer=@MailServer ";
                Sql += "WHERE AgentCatID=@AgentCatID AND MailID=@MailID";
                string[] strParaName = new string[5] { "@MailID", "@AgentCatID", "@Email", "@Password", "@MailServer" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[5] { MailID, AgentCatID, Email, Password, MailServer };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }
        public DataSet GetMailAdminByAgentCatID(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT MailID, AgentCatID, Email, Password, MailServer, Stat ";
                Sql += "FROM MailAdmin WHERE Stat = 'True' AND AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetAllSupportGroup(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT SupportGroupID, SupportGroupName" + Lang + " ";
                Sql += "FROM SupportGroup WHERE AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            //catch { }
            return ds;
        }

        public DataSet GetAllSupportOnlineByGroupID(string DatasetName, int GroupID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT NickID, NickNameYM, NickNameSkype, FullName, DisplayName, Email, Tel, GroupID, NickAddDate, NickUpdate ";
                Sql += "FROM SupportOnline WHERE GroupID = '" + GroupID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public DataSet GetAllSupportOnline(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT NickID, NickNameYM, NickNameSkype, FullName, DisplayName, Email, Tel, GroupID, NickAddDate, NickUpdate ";
                Sql += "FROM SupportOnline WHERE AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public DataSet GetAllLink(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, Logo, Link, LinkName, LinkAddDate, LinkUpdate ";
                Sql += "FROM AgentLink WHERE AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetAllPartner(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT PartnerID, AgentCatID, PartnerName, PartnerDescription, PartnerLogo, PartnerAddress, PartnerTel, PartnerFax, PartnerEmail, PartnerWebsite, PartnerAddDate, PartnerUpdate ";
                Sql += "FROM Partner WHERE AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetAllService(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ServiceID, AgentCatID, ServiceName, ServiceImageUrl, ServiceContent, TotalViews, ServiceAddDate, ServiceUpdate ";
                Sql += "FROM Service WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ORDER BY ServiceAddDate DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public void UpdateTotalViews(int ServiceID, string Lang)
        {
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Service SET TotalViews = TotalViews + 1 ";
                Sql += "WHERE ServiceID='" + ServiceID + "' AND Lang='" + Lang + "'";
                ca.ExeSql(Sql);
            }
            //catch { }
        }

        public DataSet GetOtherService(string DatasetName, int ServiceID, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ServiceID, AgentCatID, ServiceName, ServiceImageUrl, ServiceContent, TotalViews, ServiceAddDate, ServiceUpdate ";
                Sql += "FROM Service WHERE ServiceID != '" + ServiceID + "' AND AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ORDER BY ServiceAddDate DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetServiceByServiceID(string DatasetName, int ServiceID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ServiceID, AgentCatID, ServiceName, ServiceImageUrl, ServiceContent, TotalViews, ServiceAddDate, ServiceUpdate ";
                Sql += "FROM Service WHERE ServiceID = '" + ServiceID + "' AND Lang = '" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }


        public string GetServiceImageUrlByServiceID(int ServiceID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ServiceImageUrl FROM Service WHERE ServiceID = '" + ServiceID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public int DeleteService(int ServiceID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Service WHERE ServiceID=@ServiceID";
                kq = ca.ExcuteSql(Sql, "@ServiceID", SqlDbType.Int, ServiceID);
            }
            catch { }
            return kq;
        }

        public int InsertService(int AgentCatID, string Lang, string ServiceName, string ServiceImageUrl, string ServiceContent)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Service (AgentCatID, Lang, ServiceName, ServiceImageUrl, ServiceContent ) ";
                Sql += "VALUES (@AgentCatID, @Lang, @ServiceName, @ServiceImageUrl, @ServiceContent )";

                string[] strParaName = new string[5] { "@AgentCatID", "@Lang", "@ServiceName", "@ServiceImageUrl", "@ServiceContent" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new object[5] { AgentCatID, Lang, ServiceName, ServiceImageUrl, ServiceContent };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateService(int ServiceID, int AgentCatID, string Lang, string ServiceName, string ServiceImageUrl, string ServiceContent)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Service SET Lang=@Lang, ServiceName=@ServiceName, ServiceImageUrl=@ServiceImageUrl, ServiceContent=@ServiceContent ";
                Sql += "WHERE ServiceID=@ServiceID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[6] { "@ServiceID", "@AgentCatID", "@Lang", "@ServiceName", "@ServiceImageUrl", "@ServiceContent" };
                SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new object[6] { ServiceID, AgentCatID, Lang, ServiceName, ServiceImageUrl, ServiceContent };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public DataSet GetPartnerByPartnerID(string DatasetName, int PartnerID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT PartnerID, AgentCatID, PartnerName, PartnerDescription, PartnerLogo, PartnerAddress, PartnerTel, PartnerFax, PartnerEmail, PartnerWebsite, PartnerAddDate, PartnerUpdate ";
                Sql += "FROM Partner WHERE PartnerID = '" + PartnerID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public string GetPartnerLogoByPartnerID(int PartnerID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT PartnerLogo FROM Partner WHERE PartnerID = '" + PartnerID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public int DeletePartner(int PartnerID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Partner WHERE PartnerID=@PartnerID";
                kq = ca.ExcuteSql(Sql, "@PartnerID", SqlDbType.Int, PartnerID);
            }
            catch { }
            return kq;
        }

        public int InsertPartner(int AgentCatID, string PartnerName, string PartnerDescription, string PartnerLogo, string PartnerAddress, string PartnerTel, string PartnerFax, string PartnerWebsite)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Partner (AgentCatID, PartnerName, PartnerDescription, PartnerLogo, PartnerAddress, PartnerTel, PartnerFax, PartnerWebsite ) ";
                Sql += "VALUES (@AgentCatID, @PartnerName, @PartnerDescription, @PartnerLogo, @PartnerAddress, @PartnerTel, @PartnerFax, @PartnerWebsite )";

                string[] strParaName = new string[8] { "@AgentCatID", "@PartnerName", "@PartnerDescription", "@PartnerLogo", "@PartnerAddress", "@PartnerTel", "@PartnerFax", "@PartnerWebsite" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new object[8] { AgentCatID, PartnerName, PartnerDescription, PartnerLogo, PartnerAddress, PartnerTel, PartnerFax, PartnerWebsite };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdatePartner(int PartnerID, int AgentCatID, string PartnerName, string PartnerDescription, string PartnerLogo, string PartnerAddress, string PartnerTel, string PartnerFax, string PartnerWebsite)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Partner SET PartnerName=@PartnerName, PartnerDescription=@PartnerDescription, PartnerLogo=@PartnerLogo, PartnerAddress=@PartnerAddress, PartnerTel=@PartnerTel, PartnerFax=@PartnerFax, PartnerWebsite=@PartnerWebsite ";
                Sql += "WHERE PartnerID=@PartnerID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[9] { "@PartnerID", "@AgentCatID", "@PartnerName", "@PartnerDescription", "@PartnerLogo", "@PartnerAddress", "@PartnerTel", "@PartnerFax", "@PartnerWebsite" };
                SqlDbType[] sqlDbType = new SqlDbType[9] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new object[9] { PartnerID, AgentCatID, PartnerName, PartnerDescription, PartnerLogo, PartnerAddress, PartnerTel, PartnerFax, PartnerWebsite };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public DataSet GetAllVideo(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName, TotalViews, FileExt ";
                Sql += "FROM VideoProduct WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ORDER By VideoID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy DS video clip theo contenttype
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType"></param>
        /// <param name="Order">DESC, ASC</param>
        /// <returns></returns>
        public DataSet GetAllVideo(string DatasetName, int AgentCatID, string Lang, string ContentType, string Order)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName, TotalViews, FileExt ";
                Sql += "FROM VideoProduct WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' AND ContentType = '" + ContentType + "' ORDER By VideoID " + Order;
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetVideoByProductID(string DatasetName, int ProductID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName, TotalViews, FileExt ";
                Sql += "FROM VideoProduct WHERE ProductID = '" + ProductID + "' AND Lang = '" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetVideoByVideoID(string DatasetName, int VideoID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName, TotalViews, FileExt ";
                Sql += "FROM VideoProduct WHERE VideoID = '" + VideoID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetTopVideoByContentType(string DatasetName, int AgentCatID, string Lang, int nTop, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop + " VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName, TotalViews, FileExt ";
                Sql += "FROM VideoProduct WHERE AgentCatID = '" + AgentCatID + "' AND ContentType = '" + ContentType + "' AND Lang = '" + Lang + "' ORDER BY VideoID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy thông tin 1 video clip mới nhất
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetFirstVideo(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName, TotalViews, FileExt ";
                Sql += "FROM VideoProduct WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ORDER BY VideoID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy video đầu tiên, hoặc mới nhất (tùy vào Order)
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType"></param>
        /// <param name="Order">ASC:lấy đầu tiên, DESC:lấy mới nhất</param>
        /// <returns></returns>
        public DataSet GetFirstVideo(string DatasetName, int AgentCatID, string Lang, string ContentType, string Order)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName, TotalViews, FileExt ";
                Sql += "FROM VideoProduct WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' AND ContentType = '" + ContentType + "' ORDER BY VideoID " + Order;
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataRow GetRandomVideo(string DatasetName, int AgentCatID, string Lang)
        {
            DataRow dr = null;
            MyConnection ca = new MyConnection();
            try
            {
                DataSet ds = GetAllVideo("VideoProduct", AgentCatID, Lang);
                int Total = ds.Tables[0].Rows.Count;
                Random objR = new Random();
                int iRand = objR.Next(0, Total - 1);
                dr = ds.Tables[0].Rows[iRand];
            }
            catch { }
            return dr;
        }
        /// <summary>
        /// Lấy DS Video theo ký tự đầu tiên của tên video
        /// </summary>
        /// <param name="p"></param>
        /// <param name="Letter"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetVideoByLetter(string DatasetName, string Letter, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VideoID, Lang, ProductID, VideoImage, VideoSrc, VideoName, TotalViews, FileExt ";
                Sql += "FROM VideoProduct WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' AND ";
                if (Letter == "A")
                    Sql += "SUBSTRING(VideoName,1,1) IN ('A', 'Ă', 'Â', 'a', 'ă', 'â')";
                else if (Letter == "D")
                    Sql += "SUBSTRING(VideoName,1,1) IN ('D','Đ', 'd','đ')";
                else if (Letter == "E")
                    Sql += "SUBSTRING(VideoName,1,1) IN ('E','Ê', 'e','ê')";
                else if (Letter == "O")
                    Sql += "SUBSTRING(VideoName,1,1) IN ('O','Ô','Ơ', 'o','ô','ơ')";
                else if (Letter == "U")
                    Sql += "SUBSTRING(VideoName,1,1) IN ('U','Ư', 'u', 'ư')";
                else
                    Sql += "SUBSTRING(VideoName,1,1) = '" + Letter + "'";
                
                Sql += " ORDER By VideoID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet SearchServiceByText(string DatasetName, string strSearch, string Lang, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ServiceID, Lang, AgentCatID, ServiceName, ServiceImageUrl, ServiceContent, TotalViews, ServiceAddDate, ServiceUpdate ";
                Sql += "FROM Service ";
                Sql += "WHERE Lang = '" + Lang + "' AND AgentCatID = '" + AgentCatID + "' ";
                Sql += "AND (ServiceName LIKE N'%" + strSearch + "%' OR ServiceContent LIKE N'%" + strSearch + "%') ";
                Sql += "ORDER BY ServiceID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public int InsertVideoClip(int AgentCatID, string Lang, int ProductID, string VideoImage, string VideoSrc, string VideoName, string FileExt)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO VideoProduct (AgentCatID, Lang, ProductID, VideoImage, VideoSrc, VideoName, FileExt) ";
                Sql += "VALUES (@AgentCatID, @Lang, @ProductID, @VideoImage, @VideoSrc, @VideoName, @FileExt)";

                string[] strParaName = new string[7] { "@AgentCatID", "@Lang", "@ProductID", "@VideoImage", "@VideoSrc", "@VideoName", "@FileExt" };
                SqlDbType[] sqlDbType = new SqlDbType[7] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[7] { AgentCatID, Lang, ProductID, VideoImage, VideoSrc, VideoName, FileExt };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int InsertVideoClip(int AgentCatID, string Lang, int ProductID, string VideoImage, string VideoSrc, string VideoName, string FileExt, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO VideoProduct (AgentCatID, Lang, ProductID, VideoImage, VideoSrc, VideoName, FileExt, ContentType) ";
                Sql += "VALUES (@AgentCatID, @Lang, @ProductID, @VideoImage, @VideoSrc, @VideoName, @FileExt, @ContentType)";

                string[] strParaName = new string[8] { "@AgentCatID", "@Lang", "@ProductID", "@VideoImage", "@VideoSrc", "@VideoName", "@FileExt", "@ContentType" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new object[8] { AgentCatID, Lang, ProductID, VideoImage, VideoSrc, VideoName, FileExt, ContentType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public string GetVideoImageUrlByVideoID(int VideoID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VideoImage FROM VideoProduct WHERE VideoID = '" + VideoID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public int DeleteVideo(int VideoID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM VideoProduct WHERE VideoID=@VideoID";
                kq = ca.ExcuteSql(Sql, "@VideoID", SqlDbType.Int, VideoID);
            }
            catch { }
            return kq;
        }

        public int UpdateVideoClip(int VideoID, int AgentCatID, string Lang, int ProductID, string VideoImage, string VideoSrc, string VideoName, string FileExt)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE VideoProduct SET Lang=@Lang, ProductID=@ProductID, VideoImage=@VideoImage, VideoSrc=@VideoSrc, VideoName=@VideoName, FileExt=@FileExt ";
                Sql += "WHERE AgentCatID=@AgentCatID AND VideoID=@VideoID";
                string[] strParaName = new string[8] { "@VideoID", "@AgentCatID", "@Lang", "@ProductID", "@VideoImage", "@VideoSrc", "@VideoName", "@FileExt" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[8] { VideoID, AgentCatID, Lang, ProductID, VideoImage, VideoSrc, VideoName, FileExt };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int InsertImageSlideIndex(int AgentCatID, string ImageUrl, string ImageOrder, string ImageDesc)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO ImageSlideIndex (AgentCatID, ImageUrl, ImageOrder, ImageDesc) ";
                Sql += "VALUES (@AgentCatID, @ImageUrl, @ImageOrder, @ImageDesc)";

                string[] strParaName = new string[4] { "@AgentCatID", "@ImageUrl", "@ImageOrder", "@ImageDesc" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new object[4] { AgentCatID, ImageUrl, ImageOrder, ImageDesc };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public DataSet GetImageListSlideIndex(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ImageID, AgentCatID, ImageUrl, ImageOrder, ImageDesc ";
                Sql += "FROM ImageSlideIndex WHERE AgentCatID = '" + AgentCatID + "' ORDER BY ImageID DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            //catch { }
            return ds;
        }

        public DataSet GetImageSlideIndexByImageID(string DatasetName, int ImageID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ImageID, AgentCatID, ImageUrl, ImageOrder, ImageDesc ";
                Sql += "FROM ImageSlideIndex WHERE ImageID = '" + ImageID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public int DeleteImageSlideIndex(int ImageID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM ImageSlideIndex WHERE ImageID=@ImageID";
                kq = ca.ExcuteSql(Sql, "@ImageID", SqlDbType.Int, ImageID);
            }
            catch { }
            return kq;
        }

        public int InsertSupportOnline(int AgentCatID, string NickNameYM, string NickNameSkype, string FullName, string DisplayName, string Email, string Tel, int GroupID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO SupportOnline (AgentCatID, NickNameYM, NickNameSkype, FullName, DisplayName, Email, Tel, GroupID ) ";
                Sql += "VALUES (@AgentCatID, @NickNameYM, @NickNameSkype, @FullName, @DisplayName, @Email, @Tel, @GroupID )";

                string[] strParaName = new string[8] { "@AgentCatID", "@NickNameYM", "@NickNameSkype", "@FullName", "@DisplayName", "@Email", "@Tel", "@GroupID" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int };
                object[] objValue = new object[8] { AgentCatID, NickNameYM, NickNameSkype, FullName, DisplayName, Email, Tel, GroupID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateSupportOnline(int NickID, int AgentCatID, string NickNameYM, string NickNameSkype, string FullName, string DisplayName, string Email, string Tel, int GroupID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE SupportOnline SET NickNameYM=@NickNameYM, NickNameSkype=@NickNameSkype, FullName=@FullName, DisplayName=@DisplayName, Email=@Email, Tel=@Tel, GroupID=@GroupID ";
                Sql += "WHERE NickID=@NickID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[9] { "@NickID", "@AgentCatID", "@NickNameYM", "@NickNameSkype", "@FullName", "@DisplayName", "@Email", "@Tel", "@GroupID" };
                SqlDbType[] sqlDbType = new SqlDbType[9] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int };
                object[] objValue = new object[9] { NickID, AgentCatID, NickNameYM, NickNameSkype, FullName, DisplayName, Email, Tel, GroupID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteSupportOnline(int NickID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM SupportOnline WHERE NickID=@NickID";
                kq = ca.ExcuteSql(Sql, "@NickID", SqlDbType.Int, NickID);
            }
            catch { }
            return kq;
        }

        public DataSet GetSupportOnlineDetail(string DatasetName, int NickID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT NickID, AgentCatID, NickNameYM, NickNameSkype, FullName, DisplayName, Email, Tel, GroupID, NickAddDate, NickUpdate ";
                Sql += "FROM SupportOnline WHERE NickID = '" + NickID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetAllFileDownload(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, Group_ID, FileTitle, FileName, FileSize, FileUrl, DatePost, ImageUrl, Description ";
                Sql += "FROM FileDownLoad WHERE AgentCatID = '" + AgentCatID + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetFileDownloadByID(string DatasetName, int ID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, Group_ID, FileTitle, FileName, FileSize, FileUrl, DatePost, ImageUrl, Description ";
                Sql += "FROM FileDownLoad WHERE ID = '" + ID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public string GetFileNameByID(int ID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT FileName FROM FileDownLoad WHERE ID = '" + ID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public int InsertFileDownload(int AgentCatID, string FileTitle, string FileName, string Description)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO FileDownload (AgentCatID, FileTitle, FileName, Description) ";
                Sql += "VALUES (@AgentCatID, @FileTitle, @FileName, @Description )";

                string[] strParaName = new string[4] { "@AgentCatID", "@FileTitle", "@FileName", "@Description" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[4] { AgentCatID, FileTitle, FileName, Description };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteFileDownload(int ID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM FileDownload WHERE ID=@ID";
                kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, ID);
            }
            catch { }
            return kq;
        }
        
        public int UpdateFileDownload(int AgentCatID, int ID, string FileTitle, string FileName)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE FileDownload SET FileTitle=@FileTitle, FileName=@FileName ";
                Sql += "WHERE AgentCatID=@AgentCatID AND ID=@ID";
                string[] strParaName = new string[4] { "@ID", "@AgentCatID", "@FileTitle", "@FileName" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[4] { ID, AgentCatID, FileTitle, FileName };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        #region "Country, Province, District"
        public int InsertCountry(int AgentCatID, string CountryName, string Intro, string Details)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Country (AgentCatID, CountryName, Intro, Details) ";
                Sql += "VALUES (@AgentCatID, @CountryName, @Intro, @Details)";

                string[] strParaName = new string[4] { "@AgentCatID", "@CountryName", "@Intro", "@Details" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[4] { AgentCatID, CountryName, Intro, Details };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateCountry(int CountryID, int AgentCatID, string CountryName, string Intro, string Details)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Country SET CountryName=@CountryName, Intro=@Intro, Details=@Details ";
                Sql += "WHERE CountryID=@CountryID";
                string[] strParaName = new string[5] { "@CountryID", "@AgentCatID", "@CountryName", "@Intro", "@Details" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[5] { CountryID, AgentCatID, CountryName, Intro, Details };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteCountry(int CountryID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Country WHERE CountryID=@CountryID";
                kq = ca.ExcuteSql(Sql, "@CountryID", SqlDbType.Int, CountryID);
            }
            catch { }
            return kq;
        }

        public int InsertProvince(int AgentCatID, string ProvinceName, int CountryID, string Intro, string Details)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Province (AgentCatID, CountryID, ProvinceName, Intro, Details) ";
                Sql += "VALUES (@AgentCatID, @CountryID, @ProvinceName, @Intro, @Details)";

                string[] strParaName = new string[5] { "@AgentCatID", "@CountryID", "@ProvinceName", "@Intro", "@Details" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[5] { AgentCatID, CountryID, ProvinceName, Intro, Details };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateProvince(int ProvinceID, int AgentCatID, string ProvinceName, string Intro, string Details)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Province SET ProvinceName=@ProvinceName, Intro=@Intro, Details=@Details ";
                Sql += "WHERE ProvinceID=@ProvinceID";
                string[] strParaName = new string[5] { "@ProvinceID", "@AgentCatID", "@ProvinceName", "@Intro", "@Details" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[5] { ProvinceID, AgentCatID, ProvinceName, Intro, Details };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteProvince(int ProvinceID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Province WHERE ProvinceID=@ProvinceID";
                kq = ca.ExcuteSql(Sql, "@ProvinceID", SqlDbType.Int, ProvinceID);
            }
            catch { }
            return kq;
        }

        public int InsertDistrict(int AgentCatID, string DistrictName, int ProvinceID, string Intro, string Details)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO District (AgentCatID, DistrictName, ProvinceID, Intro, Details) ";
                Sql += "VALUES (@AgentCatID, @DistrictName, @ProvinceID, @Intro, @Details)";

                string[] strParaName = new string[5] { "@AgentCatID", "@DistrictName", "@ProvinceID", "@Intro", "@Details" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[5] { AgentCatID, DistrictName, ProvinceID, Intro, Details };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateDistrict(int DistrictID, int AgentCatID, string DistrictName, int ProvinceID, string Intro, string Details)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE District SET DistrictName=@DistrictName, ProvinceID=@ProvinceID, Intro=@Intro, Details=@Details ";
                Sql += "WHERE DistrictID=@DistrictID";
                string[] strParaName = new string[6] { "@DistrictID", "@AgentCatID", "@DistrictName", "@ProvinceID", "@Intro", "@Details" };
                SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[6] { DistrictID, AgentCatID, DistrictName, ProvinceID, Intro, Details };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteDistrict(int DistrictID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM District WHERE DistrictID=@DistrictID";
                kq = ca.ExcuteSql(Sql, "@DistrictID", SqlDbType.Int, DistrictID);
            }
            catch { }
            return kq;
        }
        #endregion


        public DataSet GetAllProvince(string DatasetName, int AgentCatID, int CountryID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProvinceID, AgentCatID, CountryID, ProvinceName, Intro, Details, CreationDate ";
                Sql += "FROM Province WHERE AgentCatID = '" + AgentCatID + "' AND CountryID = '" + CountryID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetProvinceByProvinceID(string DatasetName, int ProvinceID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProvinceID, AgentCatID, CountryID, ProvinceName, Intro, Details, CreationDate ";
                Sql += "FROM Province WHERE ProvinceID = '" + ProvinceID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds; 
        }

        public DataSet GetProvinceByDistrictID(string DatasetName, int AgentCatID, int DistrictID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT p.ProvinceID, p.AgentCatID, CountryID, p.ProvinceName, p.Intro, p.Details, p.CreationDate ";
                Sql += "FROM Province as p, District as d WHERE d.ProvinceID = p.ProvinceID AND p.AgentCatID = '" + AgentCatID + "' AND d.DistrictID = '" + DistrictID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetAllDistrict(string DatasetName, int AgentCatID, int ProvinceID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT DistrictID, AgentCatID, ProvinceID, DistrictName, Intro, Details, CreationDate ";
                Sql += "FROM District WHERE AgentCatID = '" + AgentCatID + "' AND ProvinceID = '" + ProvinceID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }



        public DataSet GetDistrictByDistrictID(string DatasetName, int DistrictID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT DistrictID, AgentCatID, ProvinceID, DistrictName, Intro, Details, CreationDate ";
                Sql += "FROM District WHERE DistrictID = '" + DistrictID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public int InsertFooterWebsite(int AgentCatID, string FooterWebsite, string Lang)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO AgentCat (AgentCatID, FooterWebsite" + Lang + ") ";
                Sql += "VALUES (@AgentCatID, @FooterWebsite)";

                string[] strParaName = new string[2] { "@AgentCatID", "@FooterWebsite" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.NVarChar };
                object[] objValue = new object[2] { AgentCatID, FooterWebsite };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateFooterWebsite(int AgentCatID, string FooterWebsite, string Lang)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            
                string Sql = "UPDATE AgentCat SET FooterWebsite" + Lang + "=@FooterWebsite ";
                Sql += "WHERE ID=@AgentCatID";
                string[] strParaName = new string[2] { "@AgentCatID", "@FooterWebsite" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.NVarChar };
                object[] objValue = new object[2] { AgentCatID, FooterWebsite };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            
            //catch { }
            return kq;
        }
        public DataSet GetFooterWebsite(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT FooterWebsite" + Lang + " FROM AgentCat WHERE ID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public int InsertContactInfo(int AgentCatID, string ContactInfo, string Lang)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            string Sql = "INSERT INTO Contact (AgentCatID, ContactInfo" + Lang + ") ";
            Sql += "VALUES (@AgentCatID, @ContactInfo)";
            string[] strParaName = new string[2] { "@AgentCatID", "@ContactInfo" };
            SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.NVarChar };
            object[] objValue = new object[2] { AgentCatID, ContactInfo };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);

            //catch { }
            return kq;
        }

        public int UpdateContactInfo(int AgentCatID, string ContactInfo, string Lang)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try

            string Sql = "UPDATE Contact SET ContactInfo" + Lang + "=@ContactInfo ";
            Sql += "WHERE AgentCatID=@AgentCatID";
            string[] strParaName = new string[2] { "@AgentCatID", "@ContactInfo" };
            SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.NVarChar };
            object[] objValue = new object[2] { AgentCatID, ContactInfo };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);

            //catch { }
            return kq;
        }
        /// <summary>
        /// Lấy thong tin lien he (hoac copyright)
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetContactInfo(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 ContactInfo" + Lang + " FROM Contact WHERE AgentCatID = '" + AgentCatID + "' ORDER BY ContactID ASC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Tăng lượt truy cập
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <returns></returns>
        public int UpdateVisitors(int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE AgentCat SET Visitors = Visitors + 1 WHERE ID=@AgentCatID";
                kq = ca.ExcuteSql(Sql, "@AgentCatID", SqlDbType.Int, AgentCatID);
            }
            //catch { }
            return kq;
        }
        /// <summary>
        /// Lấy giá trị số lượt truy cập
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <returns></returns>
        public string GetVisitors(string DatasetName, int AgentCatID)
        {
            string value = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Visitors FROM AgentCat WHERE ID = '" + AgentCatID + "'";
                value = Convert.ToString(ca.ExecuteScalar(Sql));

            }
            catch { }
            return value;
        }

        public DataSet GetLanguageByAgentCatID(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * FROM AgentLanguage WHERE AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public bool IsHaveLanguage(string Lang, int AgentCatID)
        {
            bool f = false;
            if (Lang != "")
            {
                DataSet ds = GetLanguageByAgentCatID("AgentLanguage", AgentCatID);
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    if (Convert.ToString(ds.Tables[0].Rows[i]["LanguageCode"]).Contains(Lang))
                    {
                        f = true;
                        break;
                    }
            }
            return f;
        }
    }
}

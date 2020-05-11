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
    /// Thông tin chi tiết Bất động sản
    /// </summary>
    public class RealEstate
    {
        public RealEstate() { }

        public int Insert(int AgentCatID, string Lang, string Title, string ImageUrl, string Descriptions, int TransactionTypeID, int RealEstateTypeID, int DistrictID, float Price, string Currency, string PriceType, bool IsNegotiatedPrice, 
                      string Address, float UsedArea, float CampusAreaHorizontal, float CampusAreaVertical, float CampusAreaHorizontalBonus, float ConstructionAreaHorizontal, float ConstructionAreaVertical, 
                      float ConstructionAreaHorizontalBonus, int PercentBroker, int LegalStatusID, string Position, string Direction, string StreetLength, int NumberFloors, int NumberGuestRooms,
                      int NumberBedRooms, int NumberBathRooms, int NumberOtherRoom, bool IsFacility, bool IsParking, bool IsGarden, bool IsPool, bool IsBusiness, bool IsStay, bool IsOffice, bool IsProduction, 
                      bool IsStudentRent, string Username, string ContactName, string Tel, string Mobile, string ContactAddress, string Notes, bool IsHot)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO RealEstate (AgentCatID, Lang, Title, ImageUrl, Descriptions, TransactionTypeID, RealEstateTypeID, DistrictID, Price, Currency, PriceType, IsNegotiatedPrice, ";
                Sql += "Address, UsedArea, CampusAreaHorizontal, CampusAreaVertical, CampusAreaHorizontalBonus, ConstructionAreaHorizontal, ConstructionAreaVertical, ";
                Sql += "ConstructionAreaHorizontalBonus, PercentBroker, LegalStatusID, Position, Direction, StreetLength, NumberFloors, NumberGuestRooms, ";
                Sql += "NumberBedRooms, NumberBathRooms, NumberOtherRoom, IsFacility, IsParking, IsGarden, IsPool, IsBusiness, IsStay, IsOffice, IsProduction, ";
                Sql += "IsStudentRent, Username, ContactName, Tel, Mobile, ContactAddress, Notes, IsHot) ";
                
                Sql += "VALUES (@AgentCatID, @Lang, @Title, @ImageUrl, @Descriptions, @TransactionTypeID, @RealEstateTypeID, @DistrictID, @Price, @Currency, @PriceType, @IsNegotiatedPrice, ";
                Sql += "@Address, @UsedArea, @CampusAreaHorizontal, @CampusAreaVertical, @CampusAreaHorizontalBonus, @ConstructionAreaHorizontal, @ConstructionAreaVertical, ";
                Sql += "@ConstructionAreaHorizontalBonus, @PercentBroker, @LegalStatusID, @Position, @Direction, @StreetLength, @NumberFloors, @NumberGuestRooms, ";
                Sql += "@NumberBedRooms, @NumberBathRooms, @NumberOtherRoom, @IsFacility, @IsParking, @IsGarden, @IsPool, @IsBusiness, @IsStay, @IsOffice, @IsProduction, ";
                Sql += "@IsStudentRent, @Username, @ContactName, @Tel, @Mobile, @ContactAddress, @Notes, @IsHot)";

                string[] strParaName = new string[46] { "@AgentCatID", "@Lang", "@Title", "@ImageUrl", "@Descriptions", "@TransactionTypeID", "@RealEstateTypeID", "@DistrictID", "@Price", "@Currency", "@PriceType", "@IsNegotiatedPrice",
                "@Address", "@UsedArea", "@CampusAreaHorizontal", "@CampusAreaVertical", "@CampusAreaHorizontalBonus", "@ConstructionAreaHorizontal", "@ConstructionAreaVertical", 
                "@ConstructionAreaHorizontalBonus", "@PercentBroker", "@LegalStatusID", "@Position", "@Direction", "@StreetLength", "@NumberFloors", "@NumberGuestRooms", "@NumberBedRooms", "@NumberBathRooms", 
                "@NumberOtherRoom", "@IsFacility", "@IsParking", "@IsGarden", "@IsPool", "@IsBusiness", "@IsStay", "@IsOffice", "@IsProduction", "@IsStudentRent", "@Username", "@ContactName", "@Tel", "@Mobile", "@ContactAddress", "@Notes", "@IsHot" };

                object[] objValue = new object[46] { AgentCatID, Lang, Title, ImageUrl, Descriptions, TransactionTypeID, RealEstateTypeID, DistrictID, Price, Currency, PriceType, IsNegotiatedPrice, 
                Address, UsedArea, CampusAreaHorizontal, CampusAreaVertical, CampusAreaHorizontalBonus, ConstructionAreaHorizontal, ConstructionAreaVertical, 
                ConstructionAreaHorizontalBonus, PercentBroker, LegalStatusID, Position, Direction, StreetLength, NumberFloors, NumberGuestRooms, 
                NumberBedRooms, NumberBathRooms, NumberOtherRoom, IsFacility, IsParking, IsGarden, IsPool, IsBusiness, IsStay, IsOffice, IsProduction, 
                IsStudentRent, Username, ContactName, Tel, Mobile, ContactAddress, Notes, IsHot };
                kq = ca.ExcuteSql(Sql, strParaName, objValue);
            }
            catch { }
            return kq;
        }

        public int Update(int ID, int AgentCatID, string Lang, string Title, string ImageUrl, string Descriptions, int TransactionTypeID, int RealEstateTypeID, int DistrictID, float Price, string Currency, string PriceType, bool IsNegotiatedPrice, string Address, float UsedArea, float CampusAreaHorizontal, float CampusAreaVertical, float CampusAreaHorizontalBonus, float ConstructionAreaHorizontal, float ConstructionAreaVertical, float ConstructionAreaHorizontalBonus, int PercentBroker, int LegalStatusID, string Position, string Direction, string StreetLength, int NumberFloors, int NumberGuestRooms, int NumberBedRooms, int NumberBathRooms, int NumberOtherRoom, bool IsFacility, bool IsParking, bool IsGarden, bool IsPool, bool IsBusiness, bool IsStay, bool IsOffice, bool IsProduction, bool IsStudentRent, string Username, string ContactName, string Tel, string Mobile, string ContactAddress, string Notes, bool IsHot)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE RealEstate SET Title=@Title, ImageUrl=@ImageUrl, Descriptions=@Descriptions, TransactionTypeID=@TransactionTypeID, RealEstateTypeID=@RealEstateTypeID, DistrictID=@DistrictID, Price=@Price, Currency=@Currency, PriceType=@PriceType, IsNegotiatedPrice=@IsNegotiatedPrice, ";
                Sql += "Address=@Address, UsedArea=@UsedArea, CampusAreaHorizontal=@CampusAreaHorizontal, CampusAreaVertical=@CampusAreaVertical, CampusAreaHorizontalBonus=@CampusAreaHorizontalBonus, ConstructionAreaHorizontal=@ConstructionAreaHorizontal, ConstructionAreaVertical=@ConstructionAreaVertical, ";
                Sql += "ConstructionAreaHorizontalBonus=@ConstructionAreaHorizontalBonus, PercentBroker=@PercentBroker, LegalStatusID=@LegalStatusID, Position=@Position, Direction=@Direction, StreetLength=@StreetLength, NumberFloors=@NumberFloors, NumberGuestRooms=@NumberGuestRooms, ";
                Sql += "NumberBedRooms=@NumberBedRooms, NumberBathRooms=@NumberBathRooms, NumberOtherRoom=@NumberOtherRoom, IsFacility=@IsFacility, IsParking=@IsParking, IsGarden=@IsGarden, IsPool=@IsPool, IsBusiness=@IsBusiness, IsStay=@IsStay, IsOffice=@IsOffice, IsProduction=@IsProduction, ";
                Sql += "IsStudentRent=@IsStudentRent, ContactName=@ContactName, Tel=@Tel, Mobile=@Mobile, ContactAddress=@ContactAddress, Notes=@Notes, IsHot=@IsHot ";
                Sql += "WHERE ID=@ID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[47] { "@ID", "@AgentCatID", "@Lang", "@Title", "@ImageUrl", "@Descriptions", "@TransactionTypeID", "@RealEstateTypeID", "@DistrictID", "@Price", "@Currency", "@PriceType", "@IsNegotiatedPrice",
                "@Address", "@UsedArea", "@CampusAreaHorizontal", "@CampusAreaVertical", "@CampusAreaHorizontalBonus", "@ConstructionAreaHorizontal", "@ConstructionAreaVertical", 
                "@ConstructionAreaHorizontalBonus", "@PercentBroker", "@LegalStatusID", "@Position", "@Direction", "@StreetLength", "@NumberFloors", "@NumberGuestRooms", "@NumberBedRooms", "@NumberBathRooms", 
                "@NumberOtherRoom", "@IsFacility", "@IsParking", "@IsGarden", "@IsPool", "@IsBusiness", "@IsStay", "@IsOffice", "@IsProduction", "@IsStudentRent", "@Username", "@ContactName", "@Tel", "@Mobile", "@ContactAddress", "@Notes", "@IsHot" };

                //SqlDbType[] sqlDbType = new SqlDbType[47] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.Int, SqlDbType.Float, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Bit, 
                //    SqlDbType.NVarChar, SqlDbType.Float, SqlDbType.Float, SqlDbType.Float, SqlDbType.Float, SqlDbType.Float, SqlDbType.Float, 
                //    SqlDbType.Float, SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.Int, SqlDbType.Int,
                //    SqlDbType.Int, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Bit };

                object[] objValue = new object[47] { ID, AgentCatID, Lang, Title, ImageUrl, Descriptions, TransactionTypeID, RealEstateTypeID, DistrictID, Price, Currency, PriceType, IsNegotiatedPrice, 
                Address, UsedArea, CampusAreaHorizontal, CampusAreaVertical, CampusAreaHorizontalBonus, ConstructionAreaHorizontal, ConstructionAreaVertical, 
                ConstructionAreaHorizontalBonus, PercentBroker, LegalStatusID, Position, Direction, StreetLength, NumberFloors, NumberGuestRooms, 
                NumberBedRooms, NumberBathRooms, NumberOtherRoom, IsFacility, IsParking, IsGarden, IsPool, IsBusiness, IsStay, IsOffice, IsProduction, 
                IsStudentRent, Username, ContactName, Tel, Mobile, ContactAddress, Notes, IsHot };
                kq = ca.ExcuteSql(Sql, strParaName, objValue);
            }
            catch { }
            return kq;
        }

        public int Delete(int ID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM RealEstate WHERE ID=@ID";
                kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, ID);
            }
            catch { }
            return kq;
        }

        public DataSet GetRealEstateDetails(string DatasetName, int ID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * FROM RealEstate WHERE ID='" + ID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public string GetImageUrlByID(int ID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ImageUrl FROM RealEstate WHERE ID = '" + ID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }


        public DataSet GetAllRealEstate(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT * FROM RealEstate WHERE AgentCatID='" + AgentCatID + "' AND Lang='" + Lang + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public DataSet GetTopOtherRealEstate(string DatasetName, int AgentCatID, int ID, int nTop, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT TOP " + nTop + " * FROM RealEstate WHERE AgentCatID='" + AgentCatID + "' AND ID != '" + ID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public DataSet GetTopHotRealEstate(string DatasetName, int AgentCatID, int nTop, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT TOP " + nTop + " * FROM RealEstate WHERE AgentCatID='" + AgentCatID + "' AND Lang='" + Lang + "' AND IsHot=1 ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public DataSet Search(string DatasetName, int AgentCatID, string Lang, int DistrictID, int TransactionTypeID, int RealEstateTypeID, int MinPrice, int MaxPrice)
        { 
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT * FROM RealEstate WHERE AgentCatID='" + AgentCatID + "' AND Lang='" + Lang + "' ";
                if (DistrictID != -1)
                    Sql += " AND DistrictID='" + DistrictID + "'";
                if (TransactionTypeID != -1)
                    Sql += " AND TransactionTypeID='" + TransactionTypeID + "'";
                if (RealEstateTypeID != -1)
                    Sql += " AND RealEstateTypeID='" + RealEstateTypeID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }
    }
}

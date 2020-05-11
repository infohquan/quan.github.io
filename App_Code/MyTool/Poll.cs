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
    public class Poll
    {
        public Poll() { }

        /// <summary>
        /// Lấy tất cả các cuộc khảo sát của 1 cty
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetAllPoll(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT PollID, AgentCatID, PollQuestion" + Lang + ", CreationDate ";
                Sql += "FROM Poll WHERE AgentCatID = '" + AgentCatID + "' AND Stat=1";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetPollActive(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 PollID, AgentCatID, PollQuestion" + Lang + ", CreationDate ";
                Sql += "FROM Poll WHERE AgentCatID = '" + AgentCatID + "' AND Stat=1";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy danh sách lựa chọn của một cuộc khảo sát
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="PollID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetPollAnswerByPollID(string DatasetName, int PollID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, PollID, PollAnswer" + Lang + ", Mark ";
                Sql += "FROM PollAnswer WHERE PollID = '" + PollID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public double GetTotalMarkByPollID(int PollID)
        {
            double TotalMark = 0;
            MyConnection ca = new MyConnection();
            try
            {
                DataSet ds = GetPollAnswerByPollID("Poll", PollID, "VI");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    TotalMark += Convert.ToDouble(ds.Tables[0].Rows[i]["Mark"]);
            }
            catch { }
            return TotalMark;
        }
        /// <summary>
        /// Tăng điểm cho câu trả lời mà user bình chọn
        /// </summary>
        /// <param name="PollAnswerID"></param>
        /// <returns></returns>
        public int UpdateMark(int PollAnswerID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE PollAnswer SET Mark=Mark + 1 WHERE ID=@PollAnswerID";
                kq = ca.ExcuteSql(Sql, "@PollAnswerID", SqlDbType.Int, PollAnswerID);
            }
            //catch { }
            return kq;
        }
    }
}

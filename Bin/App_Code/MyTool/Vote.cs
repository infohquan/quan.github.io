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
    public class Vote
    {
        public Vote() { }

        /// <summary>
        /// Lấy tổng lượt đánh giá của 1 công ty
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <returns></returns>
        public int GetTotalVotes(int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT COUNT(VoteDetailID) FROM VoteDetail WHERE AgentCatID = '" + AgentCatID + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return kq;
        }
        /// <summary>
        /// Lấy DS loại đánh giá của cty
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetVoteTypeByAgentCatID(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VoteTypeID, AgentCatID, VoteTypeName" + Lang + ", VoteTypeAddDate ";
                Sql += "FROM VoteType WHERE AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy thông tin điểm chi tiết của từng loại đánh giá
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="VoteTypeID"></param>
        /// <returns></returns>
        public DataSet GetVoteDetailByVoteTypeID(string DatasetName, int VoteTypeID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT VoteDetailID, AgentCatID, VoteTypeID, CommentID, VoteMark, VoteDetailAddDate ";
                Sql += "FROM VoteDetail WHERE VoteTypeID = '" + VoteTypeID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy điểm đánh giá trung bình của cty
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <returns></returns>
        public double GetAverageMark(int AgentCatID)
        {
            double AverageMark = 0f;
            try
            {
                DataSet dsVoteType = GetVoteTypeByAgentCatID("VoteType", AgentCatID, "VI");
                DataSet dsVoteDetail = new DataSet();
                double TotalMarks = 0f;
                int TotalVotes = GetTotalVotes(AgentCatID);
                for (int i = 0; i < dsVoteType.Tables[0].Rows.Count; i++)
                {
                    int VoteTypeID = Convert.ToInt32(dsVoteType.Tables[0].Rows[i]["VoteTypeID"]);
                    dsVoteDetail = GetVoteDetailByVoteTypeID("VoteDetail", VoteTypeID);
                    for (int j = 0; j < dsVoteDetail.Tables[0].Rows.Count; j++)
                    {
                        TotalMarks += Convert.ToInt32(dsVoteDetail.Tables[0].Rows[j]["VoteMark"]);
                    }
                }
                AverageMark = (double)(TotalMarks / TotalVotes);
                AverageMark = Math.Round(AverageMark, 0);
            }
            catch { }
            return AverageMark;
        }
    }
}

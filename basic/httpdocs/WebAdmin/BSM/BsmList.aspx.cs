using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Khavi.Web.Assistant;
using Khavi.Web.UIHelper;
using Khavi.Provider;
using MyTool;
using Subgurim.Controles;

public partial class WebAdmin_BSM_BsmList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            //LoadProvince();
            //LoadFaculty();
            LoadGridViewAgentCat(ddlLanguage.SelectedValue, -1, -1);
        }
    }

    private void LoadFaculty()
    {
        try
        {
            string Lang = ddlLanguage.SelectedValue;
            Faculty obj = new Faculty();
            DataSet ds = obj.GetAllFaculty("Faculty", Globals.AgentCatID, Lang, 3);
            DropDownListHelper ddlHelper = new DropDownListHelper();
            ddlHelper.FillData(ddlFaculty, ds, "FacultyName" + Lang, "FacultyID", "---Chọn Ngành nghề---");
        }
        catch { }
    }

    private void LoadProvince()
    {
        //try
        {
            int _AgentCatID = 177;
            string Lang = ddlLanguage.SelectedValue;
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetAllProvince("Province", _AgentCatID, 1);
            DropDownListHelper ddlHelper = new DropDownListHelper();
            ddlHelper.FillData(ddlProvince, ds, "ProvinceName", "ProvinceID", "---Chọn Tỉnh/Thành phố---");
        }
        //catch { }
    }

    private void LoadGridViewAgentCat(string Lang, int FacultyID, int ProvinceID)
    {
        //try
        {
            AgentCat obj = new AgentCat();
            int AgentCatID_BSM = 184;
            DataSet ds = obj.GetAllAgentCat("AgentCat", AgentCatID_BSM, Lang);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewAgentCat, ds);
        }
        //catch { }
    }
    protected void gridViewAgentCat_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        //try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[5].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[6].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa thông tin Thành viên mạng này";
                btnDelete.ToolTip = "Xóa Thành viên mạng này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa Thành viên mạng này không?') == false) return false;";
            }
        }
        //catch { }
    }
    protected void gridViewAgentCat_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewAgentCat.Rows[e.NewEditIndex];
            String AgentCatID = ((Label)row.Cells[0].FindControl("lblID")).Text;
            Response.Redirect("BsmAddEdit.aspx?Action=Edit&ID=" + AgentCatID + "&Lang=" + ddlLanguage.SelectedValue);
        }
        catch { }
    }
    protected void gridViewAgentCat_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewAgentCat.PageIndex = e.NewPageIndex;
        LoadGridViewAgentCat("VI", -1, -1);
        //LoadGridViewAgentCat(ddlLanguage.SelectedValue, Convert.ToInt32(ddlFaculty.SelectedValue), Convert.ToInt32(ddlProvince.SelectedValue));
    }
    protected void gridViewAgentCat_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        //try
        {
            GridViewRow row = gridViewAgentCat.Rows[e.RowIndex];
            int AgentCatID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblID")).Text);
            AgentCat obj = new AgentCat();
            //String imageFileName = obj.GetLogo(AgentCatID);
            //Globals.DeleteFile(imageFileName);
            
            obj.DeleteAgentCat(AgentCatID);
            //MessageBox.Show(AgentCatID.ToString());
            LoadGridViewAgentCat("VI", -1, -1);
        }
        //catch { }
    }
    
    protected void ddlCategory_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewAgentCat(ddlLanguage.SelectedValue, Convert.ToInt32(ddlFaculty.SelectedValue), Convert.ToInt32(ddlProvince.SelectedValue));
    }
    protected void ddlFaculty_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
    protected void ddlProvince_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
}

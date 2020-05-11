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

public partial class WebAdmin_Others_Advertisement : System.Web.UI.Page
{
    public string t;
    protected void Page_Load(object sender, EventArgs e)
    {
        t = Globals.GetStringFromQueryString("t");
        string pos = Globals.GetStringFromQueryString("pos");
        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, false);
        if (!IsPostBack)
        {
            if (pos == "left")
                ddlPosition.SelectedValue = "left";
            else
                ddlPosition.SelectedValue = "right";
            string Action = Globals.GetStringFromQueryString("Action");
            LoadGridViewLink();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật quảng cáo";
                lblTitle2.InnerText = "Cập nhật quảng cáo";
                LoadDataEdit();
                linkAdd.Visible = true;
                linkAdd.NavigateUrl = "Advertisement.aspx?t=" + t;
            }
        }
    }

    private void LoadDataEdit()
    {
        try
        {
            Link obj = new Link();
            int LinkID = Globals.GetIntFromQueryString("LinkID");
            DataSet ds = obj.GetLinkByLinkID("Link", LinkID);
            txtLinkName.Value = Convert.ToString(ds.Tables[0].Rows[0]["LinkName"]);
            txtLinkWeb.Value = Convert.ToString(ds.Tables[0].Rows[0]["Link"]);
            //ImageLink.Src = Globals.GetImageUploadsUrl() + "Links/" + Convert.ToString(ds.Tables[0].Rows[0]["Logo"]);
            Session["FileImageName"] = Convert.ToString(ds.Tables[0].Rows[0]["Logo"]);
            link.Text = Convert.ToString(ds.Tables[0].Rows[0]["Logo"]);
            link.NavigateUrl = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["Logo"]);
            ddlLogoType.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["LogoType"]);
            ddlPosition.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["Position"]);
            ddlTarget.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["Target"]);
            txtWidth.Value = Convert.ToString(ds.Tables[0].Rows[0]["Width"]);
            txtHeight.Value = Convert.ToString(ds.Tables[0].Rows[0]["Height"]);
        }
        catch
        {
            Response.Redirect("Advertisement.aspx?t=" + t);
        }
    }

    private void LoadGridViewLink()
    {
        try
        {
            Link obj = new Link();
            DataSet ds = obj.GetAllLink("Link", Globals.AgentCatID, t);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewLink, ds);
        }
        catch { }
    }
    protected void gridViewLink_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[4].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[5].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa quảng cáo này";
                btnDelete.ToolTip = "Xóa quảng cáo này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa quảng cáo này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewLink_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewLink.Rows[e.NewEditIndex];
            Int32 LinkID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblLinkID")).Text);
            Response.Redirect("Advertisement.aspx?Action=Edit&LinkID=" + LinkID + "&t=" + t);
        }
        catch { }
    }
    protected void gridViewLink_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewLink.PageIndex = e.NewPageIndex;
        LoadGridViewLink();
    }
    protected void gridViewLink_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewLink.Rows[e.RowIndex];
            Int32 LinkID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblLinkID")).Text);
            Link obj = new Link();
            String imageFileName = obj.GetLinkImageUrlByLinkID(LinkID);
            Globals.DeleteFile(imageFileName);
            obj.DeleteLink(LinkID);
            LoadGridViewLink();
        }
        catch
        {

        }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        //try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Link obj = new Link();
            string LinkName = txtLinkName.Value.Trim();
            string Link = txtLinkWeb.Value.Trim();
            string Position = ddlPosition.SelectedValue;
            string Target = ddlTarget.SelectedValue;
            string LogoType = ddlLogoType.SelectedValue;
            int Width = 0, Height = 0;
            if (txtWidth.Value != "")
                Width = Convert.ToInt32(txtWidth.Value);
            if (txtHeight.Value != "")
                Height = Convert.ToInt32(txtHeight.Value);

            int kq = -1;
            if (Action == "Edit")
            {
                int LinkID = Globals.GetIntFromQueryString("LinkID");
                kq = obj.UpdateLink(LinkID, Globals.AgentCatID, Convert.ToString(Session["FileImageName"]), LogoType, Width, Height, Link, LinkName, Target, Position, t);
                //ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertLink(Globals.AgentCatID, Convert.ToString(Session["FileImageName"]), LogoType, Width, Height, Link, LinkName, Target, Position, t);
                //ShowMessage(kq, "thêm mới");
            }
            Response.Redirect("Advertisement.aspx?t=" + t);
        }
        //catch { }
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtLinkName.Value = "";
        txtLinkWeb.Value = "";
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 LinkID = Globals.GetIntFromQueryString("LinkID");
            Link obj = new Link();
            String imageFileName = obj.GetLinkImageUrlByLinkID(LinkID);
            Globals.DeleteFile(imageFileName);
            int kq = -1;
            kq = obj.DeleteLink(LinkID);
            ShowMessage(kq, "xóa");
            LoadGridViewLink();
        }
        catch { }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " quảng cáo thành công!";
        else
            lblMessage.Text = "Không thể " + text + " quảng cáo!";
    }
    protected void ddlPosition2_SelectedIndexChanged(object sender, EventArgs e)
    {
        try
        {
            if (ddlPosition2.SelectedValue == "all")
                LoadGridViewLink();
            else
            {
                Link obj = new Link();
                DataSet ds = obj.GetLinkByPosition("Link", Globals.AgentCatID, ddlPosition2.SelectedValue, t);
                GridViewHelper gvHelper = new GridViewHelper();
                gvHelper.FillData(gridViewLink, ds);
            }
        }
        catch { }
    }
}

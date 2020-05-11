using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Khavi.Web.Assistant;
using MyTool;

namespace Khavi.Web.UIHelper
{
    public class CommonDropDownList
    {
        public CommonDropDownList() { }

        #region "Catalog"
        public void LoadDropDownListCatalog(DropDownList ddlCatalog, string Lang, string SelectedText)
        {
            try
            {
                ddlCatalog.Items.Clear();
                ddlCatalog.Attributes.Add("style", "color:Blue;font-size:14px;");
                ddlCatalog.Items.Insert(0, new ListItem(SelectedText, "0"));
                Catalog obj = new Catalog();
                DataSet dsParent = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, 0, Lang);
                for (int i = 0; i < dsParent.Tables[0].Rows.Count; i++)
                {
                    ListItem liParent = new ListItem("---- " + Convert.ToString(dsParent.Tables[0].Rows[i]["TenNhom"]).ToUpper(), Convert.ToString(dsParent.Tables[0].Rows[i]["ID"]));
                    ddlCatalog.Items.Add(liParent);
                    ShowListChildCatalog(ddlCatalog, liParent, Lang);
                }
            }
            catch { }
        }
        
        /// <summary>
        /// Hiển thị level 2, level 3, level4, level 5 của Catalog (PRODUCT's CATALOG la Level 1 rui!)
        /// </summary>
        /// <param name="li"></param>
        /// <param name="Lang"></param>
        private void ShowListChildCatalog(DropDownList ddlCatalog, ListItem li, string Lang)
        {
            Catalog obj = new Catalog();
            DataSet dsChild = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, Convert.ToInt32(li.Value), Lang);
            if (dsChild.Tables.Count > 0)
            {
                for (int i = 0; i < dsChild.Tables[0].Rows.Count; i++)
                {
                    ListItem liChild = new ListItem("-------- " + Convert.ToString(dsChild.Tables[0].Rows[i]["TenNhom"]), Convert.ToString(dsChild.Tables[0].Rows[i]["ID"]));
                    ddlCatalog.Items.Add(liChild);

                    DataSet dsLevel3 = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, Convert.ToInt32(liChild.Value), Lang);
                    if (dsLevel3.Tables.Count > 0)
                    {
                        for (int j = 0; j < dsLevel3.Tables[0].Rows.Count; j++)
                        {
                            ListItem liLevel3 = new ListItem("------------ " + Convert.ToString(dsLevel3.Tables[0].Rows[j]["TenNhom"]), Convert.ToString(dsLevel3.Tables[0].Rows[j]["ID"]));
                            ddlCatalog.Items.Add(liLevel3);

                            DataSet dsLevel4 = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, Convert.ToInt32(liLevel3.Value), Lang);
                            if (dsLevel4.Tables.Count > 0)
                            {
                                for (int k = 0; k < dsLevel4.Tables[0].Rows.Count; k++)
                                {
                                    ListItem liLevel4 = new ListItem("---------------- " + Convert.ToString(dsLevel4.Tables[0].Rows[k]["TenNhom"]), Convert.ToString(dsLevel4.Tables[0].Rows[k]["ID"]));
                                    ddlCatalog.Items.Add(liLevel4);

                                    DataSet dsLevel5 = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, Convert.ToInt32(liLevel4.Value), Lang);
                                    if (dsLevel5.Tables.Count > 0)
                                    {
                                        for (int l = 0; l < dsLevel5.Tables[0].Rows.Count; l++)
                                        {
                                            ListItem liLevel5 = new ListItem("-------------------- " + Convert.ToString(dsLevel5.Tables[0].Rows[l]["TenNhom"]), Convert.ToString(dsLevel5.Tables[0].Rows[l]["ID"]));
                                            ddlCatalog.Items.Add(liLevel5);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        #endregion

        public void LoadDropDownListProducer(DropDownList ddlProducer, string Lang, bool f)
        {
            try
            {
                Producer obj = new Producer();
                DataSet ds = obj.GetAllProducer("Producer", Globals.AgentCatID);
                DropDownListHelper ddlHelper = new DropDownListHelper();
                ddlHelper.FillData(ddlProducer, ds, "ProducerName", "ProducerID");
                if (f == false)
                {
                    if (Lang == "VI")
                        ddlProducer.Items.Insert(0, new ListItem("--- Vui lòng chọn ---", "0"));
                    else if (Lang == "EN")
                        ddlProducer.Items.Insert(0, new ListItem("--- Please Choose ---", "0"));
                }
                else if (f == true)
                {
                    if (Lang == "VI")
                        ddlProducer.Items.Insert(0, new ListItem("--- Tất cả ---", "0"));
                    else if (Lang == "EN")
                        ddlProducer.Items.Insert(0, new ListItem("--- All ---", "0"));
                }
                ddlProducer.Attributes.Add("style", "color:Blue;font-size:14px;");
            }
            catch { }
        }

        #region "Article Category"
        public void LoadDropDownListArticleCategory(DropDownList ddlArticleCategory, string Lang, string SelectedText, string ContentType)
        {
            try
            {
                ddlArticleCategory.Items.Clear();
                ddlArticleCategory.Attributes.Add("style", "color:Blue;font-size:14px;");
                ddlArticleCategory.Items.Insert(0, new ListItem(SelectedText, "0"));
                ArticleCategory obj = new ArticleCategory();
                DataSet dsParent = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, 0, Lang, ContentType);
                for (int i = 0; i < dsParent.Tables[0].Rows.Count; i++)
                {
                    ListItem liParent = new ListItem("---- " + Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryName"]).ToUpper(), Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryID"]));
                    ddlArticleCategory.Items.Add(liParent);
                    ShowListChildArticleCategory(ddlArticleCategory, liParent, Lang, ContentType);
                }
            }
            catch { }
        }

        /// <summary>
        /// Hiển thị level 2 và level 3 của ArticleCategory
        /// </summary>
        /// <param name="li"></param>
        /// <param name="Lang"></param>
        private void ShowListChildArticleCategory(DropDownList ddlArticleCategory, ListItem li, string Lang, string ContentType)
        {
            ArticleCategory obj = new ArticleCategory();
            DataSet dsChild = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, Convert.ToInt32(li.Value), Lang, ContentType);
            if (dsChild.Tables.Count > 0)
            {
                for (int i = 0; i < dsChild.Tables[0].Rows.Count; i++)
                {
                    ListItem liChild = new ListItem("-------- " + Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryName"]), Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryID"]));
                    ddlArticleCategory.Items.Add(liChild);

                    DataSet dsLevel3 = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, Convert.ToInt32(liChild.Value), Lang, ContentType);
                    if (dsLevel3.Tables.Count > 0)
                    {
                        for (int j = 0; j < dsLevel3.Tables[0].Rows.Count; j++)
                        {
                            ListItem liLevel3 = new ListItem("------------ " + Convert.ToString(dsLevel3.Tables[0].Rows[j]["CategoryName"]), Convert.ToString(dsLevel3.Tables[0].Rows[j]["CategoryID"]));
                            ddlArticleCategory.Items.Add(liLevel3);

                            DataSet dsLevel4 = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, Convert.ToInt32(liLevel3.Value), Lang, ContentType);
                            if (dsLevel4.Tables.Count > 0)
                            {
                                for (int k = 0; k < dsLevel4.Tables[0].Rows.Count; k++)
                                {
                                    ListItem liLevel4 = new ListItem("---------------- " + Convert.ToString(dsLevel4.Tables[0].Rows[k]["CategoryName"]), Convert.ToString(dsLevel4.Tables[0].Rows[k]["CategoryID"]));
                                    ddlArticleCategory.Items.Add(liLevel4);

                                    DataSet dsLevel5 = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, Convert.ToInt32(liLevel4.Value), Lang, ContentType);
                                    if (dsLevel5.Tables.Count > 0)
                                    {
                                        for (int l = 0; l < dsLevel5.Tables[0].Rows.Count; l++)
                                        {
                                            ListItem liLevel5 = new ListItem("-------------------- " + Convert.ToString(dsLevel5.Tables[0].Rows[l]["CategoryName"]), Convert.ToString(dsLevel5.Tables[0].Rows[l]["CategoryID"]));
                                            ddlArticleCategory.Items.Add(liLevel5);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        /*
         
        /// <summary>
        /// Load danh sách ArticleCategory vào DropDownList
        /// </summary>
        /// <param name="Lang"></param>
        public void LoadDropDownListArticleCategory(DropDownList ddlArticleCategory, string Lang, bool f, string ContentType)
        {
            try
            {
                ddlArticleCategory.Items.Clear();
                ddlArticleCategory.Attributes.Add("style", "color:Blue;font-size:14px;");
                if (f == false)
                {
                    if (Lang == "VI")
                        ddlArticleCategory.Items.Insert(0, new ListItem("--- Vui lòng chọn ---", "-1"));
                    else if (Lang == "EN")
                        ddlArticleCategory.Items.Insert(0, new ListItem("--- Please Choose ---", "-1"));
                }
                else if (f == true)
                {
                    if (Lang == "VI")
                        ddlArticleCategory.Items.Insert(0, new ListItem("--- Tất cả ---", "-1"));
                    else if (Lang == "EN")
                        ddlArticleCategory.Items.Insert(0, new ListItem("--- All ---", "-1"));
                }
                ArticleCategory obj = new ArticleCategory();
                DataSet dsParent = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, 0, Lang, ContentType);
                for (int i = 0; i < dsParent.Tables[0].Rows.Count; i++)
                {
                    ListItem liParent = new ListItem("---- " + Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryName"]).ToUpper(), Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryID"]));
                    ddlArticleCategory.Items.Add(liParent);
                    ShowListChildArticleCategory(ddlArticleCategory, liParent, Lang, ContentType);
                }
                if (f == true)
                    ddlArticleCategory.Items.RemoveAt(1);   //remove 'ARTICLE's CATEGORY'
            }
            catch { }
        }
         
         /// <summary>
        /// Load danh sách Catalog vào DropDownList
        /// </summary>
        /// <param name="Lang"></param>
        public void LoadDropDownListCatalog(DropDownList ddlCatalog, string Lang, bool f)
        {
            try
            {
                ddlCatalog.Items.Clear();
                ddlCatalog.Attributes.Add("style", "color:Blue;font-size:14px;");
                if (f == false)
                {
                    if (Lang == "VI")
                        ddlCatalog.Items.Insert(0, new ListItem("--- Vui lòng chọn ---", "-1"));
                    else if (Lang == "EN")
                        ddlCatalog.Items.Insert(0, new ListItem("--- Please Choose ---", "-1"));
                }
                else if (f == true)
                {
                    if (Lang == "VI")
                        ddlCatalog.Items.Insert(0, new ListItem("--- Tất cả ---", "-1"));
                    else if (Lang == "EN")
                        ddlCatalog.Items.Insert(0, new ListItem("--- All ---", "-1"));
                }
                Catalog obj = new Catalog();
                DataSet dsParent = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, 0, Lang);
                for (int i = 0; i < dsParent.Tables[0].Rows.Count; i++)
                {
                    ListItem liParent = new ListItem("---- " + Convert.ToString(dsParent.Tables[0].Rows[i]["TenNhom"]).ToUpper(), Convert.ToString(dsParent.Tables[0].Rows[i]["ID"]));
                    ddlCatalog.Items.Add(liParent);
                    ShowListChildCatalog(ddlCatalog, liParent, Lang);
                }
                if (f == true)
                    ddlCatalog.Items.RemoveAt(1);   //remove 'PRODUCT's CATALOG'
            }
            catch { }
        }
         */
        #endregion
    }
}

#pragma checksum "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "934c6d0d986aa25dfcc549be7eeededc2f338dcd"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_CompanyUsers_Details), @"mvc.1.0.view", @"/Views/CompanyUsers/Details.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/CompanyUsers/Details.cshtml", typeof(AspNetCore.Views_CompanyUsers_Details))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\_ViewImports.cshtml"
using CleanMasterApp;

#line default
#line hidden
#line 2 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\_ViewImports.cshtml"
using CleanMasterApp.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"934c6d0d986aa25dfcc549be7eeededc2f338dcd", @"/Views/CompanyUsers/Details.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"3423955bbcc9d763f29a8cb23b8c08c006635b41", @"/Views/_ViewImports.cshtml")]
    public class Views_CompanyUsers_Details : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<CleanMasterApp.Models.CompanyUser>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Edit", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Index", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(42, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 3 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml"
  
    ViewData["Title"] = "Details";

#line default
#line hidden
            BeginContext(87, 134, true);
            WriteLiteral("\r\n<h1>Details</h1>\r\n\r\n<div>\r\n    <h4>CompanyUser</h4>\r\n    <hr />\r\n    <dl class=\"row\">\r\n        <dt class = \"col-sm-2\">\r\n            ");
            EndContext();
            BeginContext(222, 44, false);
#line 14 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml"
       Write(Html.DisplayNameFor(model => model.FullName));

#line default
#line hidden
            EndContext();
            BeginContext(266, 63, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd class = \"col-sm-10\">\r\n            ");
            EndContext();
            BeginContext(330, 40, false);
#line 17 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml"
       Write(Html.DisplayFor(model => model.FullName));

#line default
#line hidden
            EndContext();
            BeginContext(370, 62, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt class = \"col-sm-2\">\r\n            ");
            EndContext();
            BeginContext(433, 44, false);
#line 20 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml"
       Write(Html.DisplayNameFor(model => model.Username));

#line default
#line hidden
            EndContext();
            BeginContext(477, 63, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd class = \"col-sm-10\">\r\n            ");
            EndContext();
            BeginContext(541, 40, false);
#line 23 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml"
       Write(Html.DisplayFor(model => model.Username));

#line default
#line hidden
            EndContext();
            BeginContext(581, 133, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt class = \"col-sm-2\">\r\n            Login name\r\n        </dt>\r\n        <dd class=\"col-sm-10\">\r\n            ");
            EndContext();
            BeginContext(715, 40, false);
#line 29 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml"
       Write(Html.DisplayFor(model => model.Username));

#line default
#line hidden
            EndContext();
            BeginContext(755, 1, true);
            WriteLiteral("+");
            EndContext();
            BeginContext(757, 45, false);
#line 29 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml"
                                                 Write(Html.DisplayFor(model => model.Company.Email));

#line default
#line hidden
            EndContext();
            BeginContext(802, 47, true);
            WriteLiteral("\r\n        </dd>\r\n    </dl>\r\n</div>\r\n<div>\r\n    ");
            EndContext();
            BeginContext(849, 54, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "934c6d0d986aa25dfcc549be7eeededc2f338dcd7406", async() => {
                BeginContext(895, 4, true);
                WriteLiteral("Edit");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            if (__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues == null)
            {
                throw new InvalidOperationException(InvalidTagHelperIndexerAssignment("asp-route-id", "Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper", "RouteValues"));
            }
            BeginWriteTagHelperAttribute();
#line 34 "C:\Users\user\Documents\Visual Studio 2019\Projects\Final years projects\CleanMasterApp\CleanMasterApp\Views\CompanyUsers\Details.cshtml"
                           WriteLiteral(Model.Id);

#line default
#line hidden
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"] = __tagHelperStringValueBuffer;
            __tagHelperExecutionContext.AddTagHelperAttribute("asp-route-id", __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"], global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(903, 8, true);
            WriteLiteral(" |\r\n    ");
            EndContext();
            BeginContext(911, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "934c6d0d986aa25dfcc549be7eeededc2f338dcd9781", async() => {
                BeginContext(933, 12, true);
                WriteLiteral("Back to List");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(949, 10, true);
            WriteLiteral("\r\n</div>\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<CleanMasterApp.Models.CompanyUser> Html { get; private set; }
    }
}
#pragma warning restore 1591

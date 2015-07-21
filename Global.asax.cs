using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Farasis
{

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
              name: "DefaultApi",
              routeTemplate: "api/{controller}/{id}",
              defaults: new { id = RouteParameter.Optional }
          );



            //
            //MVC setup
            //
            RouteTable.Routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            RouteTable.Routes.IgnoreRoute("");
            log4net.Config.XmlConfigurator.Configure();
            //RouteTable.Routes.MapRoute(
            //    name: "Default",
            //    url: "api/{controller}/{action}/{id}",
            //    defaults: new { action = "Index", id = UrlParameter.Optional }
            //);
            //custom path for views for clean separation of webapi/mvc
           // GlobalConfiguration.Configuration.Routes.MapHttpRoute(
           //    name: "DefaultApi",
           //    routeTemplate: "api/{controller}/{id}",
           //    defaults: new { id = RouteParameter.Optional }
           //);
           // AreaRegistration.RegisterAllAreas();

            //WebApiConfig.Register(GlobalConfiguration.Configuration);
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
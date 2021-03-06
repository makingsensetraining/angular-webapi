﻿namespace Hiperion
{
    #region References

    using Newtonsoft.Json.Serialization;
    using System.Net.Http.Formatting;
    using System.Web.Http;
    using System.Linq;

    #endregion

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new { id = RouteParameter.Optional });       
        }
    }
}
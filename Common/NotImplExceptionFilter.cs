using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using System.Net;
using System.Net.Http;
namespace Farasis.Common
{
    public class NotImplExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext.Exception is NotImplementedException)
            {
                actionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.NotImplemented);
            }
        }
    }
}
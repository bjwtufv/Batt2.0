using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using Newtonsoft.Json;

namespace form.Controllers
{
    public class FormSubmitController : ApiController
    {
        [HttpPost]
        public void submitForm()
        {
            StringBuilder sb = new StringBuilder();
            HttpContent content = Request.Content;
            foreach (var x in content.Headers)
            {
                sb.Append(x.Key);
            }
        }
    }
}

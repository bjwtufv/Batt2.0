using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Farasis.Common;

namespace Farasis.Controllers
{
    public class LogController : ApiController
    {
        // GET: api/Log
        public IEnumerable<string> Get()
        {
            //return new string[] { "value1", "value2" };
            //LogHelper.WriteLog("Hello can you hear");
            return new string[] { "value1", "value2" };
        }

        // GET: api/Log/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Log
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Log/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Log/5
        public void Delete(int id)
        {
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Farasis.Common
{
    public class LogHelper
    {
        private static readonly log4net.ILog logger = log4net.LogManager.GetLogger("logHelper");
        public static void WriteLog(string msg)
        {
            logger.Info(msg);
        }
    }
}
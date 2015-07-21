using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Farasis.Models;
using System.Data.Entity;
namespace Farasis.Controllers
{
    public class OrderController : ApiController
    {
        private BattEntities m_db = new BattEntities();

        public IEnumerable<Order> GetAll()
        {
            return m_db.Order.ToList();
        }
        public Order GetById(int id)
        {
            return m_db.Order.Find(id);
        }
        public HttpResponseMessage Post(Order order)
        {
            if (order == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "Order is not allow null");
            }
            if (order.OrderId == 0)
            {
                m_db.Order.Add(order);
            }
            else
            {
                var od = m_db.Order.AsNoTracking().FirstOrDefault(item => item.OrderId == order.OrderId);
                od.OrderDate = order.OrderDate;
                od.UserId = order.UserId;
                od.Fax = order.Fax;
                od.Phone = order.Phone;
                od.VenderId = order.VenderId;
                od.ShipAddress = order.ShipAddress;
                od.OrderTotal = order.OrderTotal;
                od.Approval = order.Approval;
                od.ApprovalDate = order.ApprovalDate;
                m_db.Order.Attach(od);
                m_db.Entry(od).State = EntityState.Modified;
            }
            try
            {
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "operater forbidden");
            }
        }
    }
}

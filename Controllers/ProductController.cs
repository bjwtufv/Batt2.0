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
    public class ProductController : ApiController
    {
        private BattEntities m_db = new BattEntities();
        public IEnumerable<Product> GetAll()
        {
            return m_db.Product.ToList();
        }
        public Product GetBy(int id)
        {
            return m_db.Product.Find(id);
        }
        public HttpResponseMessage PostProduct(Product product)
        {
            if (product == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "Product is not allow null");
            }
            var pd = m_db.Product.AsNoTracking().FirstOrDefault(item => item.ProductId == product.ProductId);
            if (product.ProductId == 0)
            {
                m_db.Product.Add(product);
            }
            else
            {
                pd.Dist = product.Dist;
                pd.Farasis = product.Farasis;
                pd.Unit = product.Unit;
                pd.Price = product.Price;
                pd.VenderId = product.VenderId;
                pd.AcctNo = product.AcctNo;
                pd.Description = product.Description;
                m_db.Product.Attach(pd);
                m_db.Entry(pd).State = EntityState.Modified;
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

        public HttpResponseMessage Delete(int id)
        {
            var product = m_db.Product.Find(id);
            if (product == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "already deleted");
            }
            try
            {
                m_db.Product.Remove(product);
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch 
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "forbidden deleted");
            }
        }
    }
}

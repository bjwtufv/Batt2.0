using Farasis.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Farasis
{
    public class GenericRespository<TEntity>:IGenericRepository<TEntity> where TEntity:class
    {
        private BattEntities m_db = null;
        private DbSet<TEntity> m_table = null;

        public GenericRespository()
        {
            this.m_db = new BattEntities();
            m_table = m_db.Set<TEntity>();
        }
        public GenericRespository(BattEntities db)
        {
            this.m_db = db;
             m_table = db.Set<TEntity>();
        }
    
        public IEnumerable<TEntity> GetAll()
        {
            return m_table.ToList();
        }

        public TEntity Get(object id)
        {
            return m_table.Find(id);
        }

        public void Insert(TEntity obj)
        {
            TEntity te = m_table.AsNoTracking().FirstOrDefault(item => item == obj);
            if (te!= null)
            {
                return;
            }
            m_table.Add(obj);
            Save();
        }

        public void Update(TEntity obj)
        {
            m_table.Attach(obj);
            m_db.Entry(obj).State = EntityState.Modified;
            Save();            
        }
        public void Delete(object id)
        {
            var existing = m_table.Find(id);
            m_table.Remove(existing);
            Save();
        }
        //delete 
        public void Delete(TEntity obj)
        {
            if (m_db.Entry(obj).State == EntityState.Detached)
            {
                m_table.Attach(obj);
            }
            m_table.Remove(obj);
        }

        public void Save()
        {
            m_db.SaveChanges();
        }
    }
}
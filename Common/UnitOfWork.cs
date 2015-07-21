using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Farasis.Models;

namespace Farasis.Common
{
    public class UnitOfWork :IDisposable
    {
        private BattEntities m_db = new BattEntities();

        private GenericRespository<Group> groupRepository;

        public GenericRespository<Group> GroupRepository
        {
            get
            {
                if (this.groupRepository == null)
                    this.groupRepository = new GenericRespository<Group>();
                return groupRepository;
            }
        }
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;
            if (disposing)
            {
                m_db.Dispose();
            }

        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
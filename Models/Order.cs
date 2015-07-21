

namespace Farasis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Order
    {
        public int OrderId { get; set; }
        public Nullable<System.DateTime> OrderDate { get; set; }
        public Nullable<int> UserId { get; set; }
        public string Fax { get; set; }
        public string Phone { get; set; }
        public Nullable<int> VenderId { get; set; }
        public string ShipAddress { get; set; }
        public Nullable<decimal> OrderTotal { get; set; }
        public Nullable<System.DateTime> ApprovalDate { get; set; }
        public string Approval { get; set; }
    
        public virtual User User { get; set; }
        public virtual Vender Vender { get; set; }
    }
}

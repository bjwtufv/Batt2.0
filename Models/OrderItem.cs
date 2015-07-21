

namespace Farasis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class OrderItem
    {
        public int OrderItemId { get; set; }
        public Nullable<int> OrderId { get; set; }
        public Nullable<int> Qty { get; set; }
        public string Dist { get; set; }
        public string Farasis { get; set; }
        public string Description { get; set; }
        public string AcctNo { get; set; }
        public string Unit { get; set; }
        public Nullable<decimal> Price { get; set; }
    }
}

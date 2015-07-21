

namespace Farasis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Product
    {
        public int ProductId { get; set; }
        public string Dist { get; set; }
        public string Farasis { get; set; }
        public string Description { get; set; }
        public string AcctNo { get; set; }
        public string Unit { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<int> VenderId { get; set; }
    
        public virtual Vender Vender { get; set; }
    }
}

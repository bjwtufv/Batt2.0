

namespace Farasis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Order_Details
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public Nullable<short> Quantity { get; set; }
    }
}

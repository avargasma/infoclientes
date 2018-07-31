using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PruebaArlington.Models
{
    public class MovXclienteModel
    {
        public string ClNombresApe { get; set; }
        public string NomVendedor { get; set; }
        public decimal VsValorNeto { get; set; }
        public string VsFeha { get; set; }
        public decimal VsValorVisita { get; set; }
        public string Observaciones { get; set; }
        public DateTime fechaSinFormat { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PruebaArlington.Models
{
    public class ClienteXidResModel
    {
        public string ClNIt { get; set; }
        public string ClNombresApe { get; set; }
        public string ClDireccion { get; set; }
        public string ClTel { get; set; }
        public string MnIdMunicipio { get; set; }
        public decimal ClCupo { get; set; }
        public string DpCodDpto { get; set; }
        public string PsCodPais { get; set; }
        public Nullable<decimal> ClSaldoCupo { get; set; }
        public Nullable<decimal> ClPorceVisitas { get; set; }
    }
}
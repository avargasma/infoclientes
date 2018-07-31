using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class MovXclienteController : Controller
    {
        Sgi.Encrypter.Encrypter cl = new Sgi.Encrypter.Encrypter();
        dbInfoClientes db = new dbInfoClientes();

        //SELECT CL.ClNIt, CL.ClNombresApe, VS.VsFeha, VS.VsValorNeto,
        //VS.VsValorVisita, SUM(CC.CcValor) AS SumCupos, CL.ClSaldoCupo
        // FROM Visitas VS
        //INNER JOIN Clientes CL ON VS.ClNit = CL.ClNIt
        //INNER JOIN CuposCliente CC ON CL.ClNIt = CC.CcClNit
        //WHERE CL.ClNIt = 'YMvRBEZ3+aE='
        //GROUP BY CL.ClNIt, CL.ClNombresApe, VS.VsFeha, VS.VsValorNeto, VS.VsValorVisita , CL.ClSaldoCupo

      
        public JsonResult listarMovs(string nitCliente)
        {
            try
            {

                string nitCryp = cl.DESEncrypt(nitCliente);               
                var response = (from visitas in db.Visitas
                                join clientes in db.Clientes on visitas.ClNit equals clientes.ClNIt into ps
                                from p in ps.DefaultIfEmpty()
                                join vendedor in db.Vendedor on visitas.VdDocumento equals vendedor.VdDocumento into ps1
                                from p1 in ps1.DefaultIfEmpty()
                                where p.ClNIt == nitCryp
                                select new Models.MovXclienteModel { ClNombresApe = p.ClNombresApe, NomVendedor = p1.VdNombresApe,   fechaSinFormat= visitas.VsFeha,
                                    VsValorNeto = visitas.VsValorNeto, VsValorVisita = visitas.VsValorVisita,
                                    Observaciones = visitas.VsObservacion  }).ToList();
                foreach (Models.MovXclienteModel it in response)
                {
                    it.VsFeha = it.fechaSinFormat.ToString("dd/MM/yyyy hh:mm tt");
                }
                JsonResult j = Json(response, JsonRequestBehavior.AllowGet);
                return j;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
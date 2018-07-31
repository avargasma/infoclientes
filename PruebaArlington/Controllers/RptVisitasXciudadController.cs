using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class RptVisitasXciudadController : Controller
    {
        // GET: RptVisistasXciudad
        //SELECT MN.MnNombreMunicipio AS nomCiudad, COUNT(CL.ClNit) AS countVisitas
        //FROM Visitas VS
        //INNER JOIN Clientes CL ON VS.ClNit = CL.ClNIt
        //INNER JOIN Municipio MN ON CL.MnIdMunicipio = MN.MnIdMunicipio
        //GROUP BY CL.MnIdMunicipio, MN.MnNombreMunicipio
      
        dbInfoClientes db = new dbInfoClientes();
        public JsonResult ListarVisitasXciudad()
        {
            try
            {
                //var queryresults = (from VS in db.Visitas
                //                    join CL in db.Clientes on VS.ClNit equals CL.ClNIt
                //                    join MN in db.Municipio on CL.MnIdMunicipio equals MN.MnIdMunicipio
                //                    select new Models.mdl
                //                    {
                //                        nomCiudad = MN.MnNombreMunicipio,
                //                        countVisitas = CL.ClNIt.Count()
                //                    }).ToList();

                var er = from VS in db.Visitas
                         join MN in db.Municipio on VS.VsIdMuni equals MN.MnIdMunicipio into j3
                         join CL in db.Clientes on VS.ClNit equals CL.ClNIt into j1
                         from j2 in j3.DefaultIfEmpty()
                         group j2 by j2.MnNombreMunicipio into grouped
                         select new Models.VisitasXciudadModel { nomCiudad = grouped.Key, countVisitas = grouped.Count(t => t.MnNombreMunicipio != null) };



                //queryresults = queryresults.GroupBy(x => x.nomCiudad).Select(g => g.First()).ToList();
                JsonResult r = Json(er, JsonRequestBehavior.AllowGet);
                return r;

            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando los municipios.", w);
                w.Close();
                return null;
            }
        }

    }
}
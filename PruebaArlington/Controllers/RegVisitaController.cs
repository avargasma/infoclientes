using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class RegVisitaController : Controller
    {
        Sgi.Encrypter.Encrypter cl = new Sgi.Encrypter.Encrypter();
        dbInfoClientes db = new dbInfoClientes();
        
        public string AggVisita(Visitas visita)
        {
            try
            {
                if (visita != null)
                {
                    string nitCryp = cl.DESEncrypt(visita.ClNit);
                    visita.VsFeha = DateTime.Now;
                    visita.ClNit = nitCryp;
                    db.Visitas.Add(visita);
                    db.SaveChanges();
                    var query = from c in db.Clientes
                                where c.ClNIt == nitCryp
                    select c;
                    foreach (Clientes c in query) c.ClSaldoCupo = c.ClSaldoCupo - visita.VsValorVisita;
                    db.SaveChanges();
                    return "Visita insertada correctamente.";
                }
                else
                {
                    return "Error en datos";
                }
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error agregando clienite.", w);
                w.Close();
                return "Error";
            }
        }            
    }
}
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class PaisesController : Controller
    {
        dbInfoClientes db = new dbInfoClientes();
        // GET: Pais
        public JsonResult ListarPaises()
        {
            List<Pais> listPaises = new List<Pais>();
            try
            {
                    listPaises = db.Pais.OrderBy(a => a.PsCodPais).ToList();                
                    JsonResult r = Json(listPaises, JsonRequestBehavior.AllowGet);
                    return r;
               
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando el paises.", w);
                w.Close();
                return null;
            }
        }

        public JsonResult consultaDptoXpais(string codPais)
        {
            codPais = codPais.Replace("\"", "");
            List<Departamento> listDptos = new List<Departamento>();
            try
            {
                var dptos = from b in db.Departamento
                            where b.DpPais.Equals(codPais)
                            select b;
                JsonResult j = Json(dptos, JsonRequestBehavior.AllowGet);
                return j;
                
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error consultando departamentos por pais con id:" + codPais, w);
                w.Close();
                return null;
            }
        }
        
        public string ActualizaPais(Pais pais)
        {
            try
            {
                if (pais != null)
                {
                    string cod = pais.PsCodPais;
                    var paisExite = db.Pais.Where(x => x.PsCodPais == cod).FirstOrDefault();
                    paisExite.PsNomPais = pais.PsNomPais;
                    paisExite.PsCodIso = pais.PsCodIso;
                    db.SaveChanges();
                    return "Pais actualizado correctamente.";
                }
                else
                {
                    return "Error";
                }
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error actualizando pais con cod: " + pais.PsCodPais, w);
                w.Close();
                return "Error";
            }
            
        }
        public string AggPais(Pais pais)
        {
            if (pais != null)
            {
                using (dbInfoClientes db = new dbInfoClientes())
                {
                    try
                    {
                        if (ExistePais(pais.PsCodPais))
                        {
                            return "Ya existe un pais con el codigo " + pais.PsCodPais;
                        }
                        db.Pais.Add(pais);
                        db.SaveChanges();
                        return "Pais insertado correctamente.";
                    }
                    catch (Exception ex)
                    {
                        StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                        w.Close();
                        w = System.IO.File.AppendText(Clases.Funciones.ruta);
                        Clases.Funciones.LogError(ex.Message, "Error insertando pais", w);
                        w.Close();
                        return "Error";
                    }

                }
            }
            else
            {
                return "Error";
            }
        }

        private bool ExistePais(string codPais)
        {
            try
            {
                return db.Pais.Count(e => e.PsCodPais == codPais) > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        public JsonResult consultaPaisById(string codPais)
        {
            try
            {
                codPais = codPais.Replace("\"", "");
                var pais = db.Pais.Find(codPais);
                return Json(pais, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error consultando pais con el id:"+codPais, w);
                w.Close();
                return null;
            }
            

        }
        public string EliminarPais(string codPais)
        {
            try
            {
                codPais = codPais.Replace("\"", "");
                if (codPais != null || codPais != "")
                {
                    var terList = db.Pais.Where(a => a.PsCodPais == codPais).FirstOrDefault();
                    db.Pais.Remove(terList);
                    db.SaveChanges();
                    return "Pais eliminado correctamente.";
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
                Clases.Funciones.LogError(ex.Message, "Error eliminando pais con el id:" + codPais, w);
                w.Close();
                return "Error en datos";
            }            
        }
    }
}
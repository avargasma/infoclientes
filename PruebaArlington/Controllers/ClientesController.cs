using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sgi;
using System.Data.Entity;
using System.IO;

namespace PruebaArlington.Controllers
{
    public class ClientesController : Controller
    {
        Sgi.Encrypter.Encrypter cl = new Sgi.Encrypter.Encrypter();
        dbInfoClientes db = new dbInfoClientes();
              
        public string AggCliente(Clientes cliente)
        {
            try
            {
                if (cliente != null)
                {
                    string nitCryp = cl.DESEncrypt(cliente.ClNIt);
                    if (ExisteCliente(nitCryp))
                    {
                        return "Ya existe un cliente con el nit " + cliente.ClNIt;
                    }
                    cliente.ClNIt = nitCryp;
                    db.Clientes.Add(cliente);
                    db.SaveChanges();
                    return "Cliente insertado correctamente.";
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
                return null;
            }            
        }
        private bool ExisteCliente(string nitCliente)
        {
            try
            {
                return db.Clientes.Count(e => e.ClNIt== nitCliente) > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public string ActualizaCliente(Clientes cliente)
        {
            try
            {
                if (cliente != null)
                {
                    string nitCryp = cl.DESEncrypt(cliente.ClNIt);
                    var clienteExite = db.Clientes.Where(x => x.ClNIt == nitCryp).FirstOrDefault();
                    //decimal saldoActual = (cliente.ClSaldoCupo == null) ? 0 : Convert.ToDecimal(cliente.ClSaldoCupo);
                    //decimal newSaldo = Convert.ToDecimal( saldoActual + cliente.ClCupo);
                    clienteExite.ClNombresApe = cliente.ClNombresApe;
                    clienteExite.ClDireccion = cliente.ClDireccion;
                    clienteExite.ClTel = cliente.ClTel;
                    clienteExite.MnIdMunicipio = cliente.MnIdMunicipio;
                    clienteExite.ClCupo = cliente.ClCupo;
                    clienteExite.ClSaldoCupo = cliente.ClSaldoCupo;
                    clienteExite.ClPorceVisitas = cliente.ClPorceVisitas;
                    db.SaveChanges();
                    return "Cliente actualizado correctamente.";
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
                Clases.Funciones.LogError(ex.Message, "Error consultando clienite.", w);
                w.Close();
                return null;
            }
        }


        public JsonResult consultaClienteById(string nitCliente)
        {
            try
            {
                string nitCryp = cl.DESEncrypt(nitCliente);
                //var cliente = db.Clientes.Find(nitCryp);
                ////SELECT CL.ClNIt, CL.ClNombresApe,CL.ClDireccion, CL.ClTel, CL.ClCupo,
                ////CL.MnIdMunicipio, DP.DpCodDpto, PS.PsCodPais FROM Clientes CL
                ////INNER JOIN Municipio MN ON CL.MnIdMunicipio = MN.MnCodMunicipio
                ////INNER JOIN Departamento DP ON MN.MnDepartamento = DP.DpCodDpto
                ////INNER JOIN Pais PS ON DP.DpPais = PS.PsCodPais
                ////WHERE CL.ClNIt = '2312312'
                List<Models.ClienteXidResModel> res = new List<Models.ClienteXidResModel>();
                res = (from CL in db.Clientes
                    join MN in db.Municipio on CL.MnIdMunicipio equals MN.MnIdMunicipio
                    join DP in db.Departamento on MN.MnDepartamento equals DP.DpCodDpto
                    join PS in db.Pais on DP.DpPais equals PS.PsCodPais
                    where CL.ClNIt == nitCryp
                    select new Models.ClienteXidResModel
                    {
                        ClNIt = CL.ClNIt,
                        ClNombresApe = CL.ClNombresApe,
                        ClDireccion = CL.ClDireccion,
                        ClTel = CL.ClTel,
                        ClCupo = CL.ClCupo,
                        ClSaldoCupo = CL.ClSaldoCupo,
                        ClPorceVisitas = CL.ClPorceVisitas,
                        MnIdMunicipio = CL.MnIdMunicipio,
                        DpCodDpto = DP.DpCodDpto,
                        PsCodPais = PS.PsCodPais
                    }).ToList();
                Models.ClienteXidResModel resQuery = new Models.ClienteXidResModel();
                if (res.Count > 0)
                {
                    resQuery.ClCupo = res[0].ClCupo;
                    resQuery.ClDireccion = res[0].ClDireccion;
                    resQuery.ClNIt = cl.DESDecrypt(res[0].ClNIt);
                    resQuery.ClNombresApe = res[0].ClNombresApe;
                    resQuery.ClPorceVisitas = res[0].ClPorceVisitas;
                    resQuery.ClSaldoCupo = res[0].ClSaldoCupo;
                    resQuery.ClTel = res[0].ClTel;
                    resQuery.DpCodDpto = res[0].DpCodDpto;
                    resQuery.PsCodPais = res[0].PsCodPais;
                    resQuery.MnIdMunicipio = res[0].MnIdMunicipio;                  
                }
                return Json(resQuery, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error consultando cliente.", w);
                w.Close();
                return null;
            }           
            
        }
        public string EliminarCliente(string nit)
        {
            try
            {
                if (nit != null || nit != "")
                {
                    string nitCryp = cl.DESDecrypt(nit); 
                    var terList = db.Clientes.Where(a => a.ClNIt == nitCryp).FirstOrDefault();
                    db.Clientes.Remove(terList);
                    db.SaveChanges();
                    return "Cliente eliminado correctamente.";
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
                Clases.Funciones.LogError(ex.Message, "Error eliminando clienite.", w);
                w.Close();
                return null;
            }            
        }

        public JsonResult listarMunisXdpto(string codDpto)
        {
            try
            {
                codDpto = codDpto.Replace("\"", "");
                var queryresults = (from mn in db.Municipio
                                    where mn.MnDepartamento == codDpto                             
                                    select new
                                    {
                                        MnIdMunicipio = mn.MnIdMunicipio,
                                        MnNombreMunicipio = mn.MnNombreMunicipio                                        
                                    }).ToList();
                JsonResult r = Json(queryresults, JsonRequestBehavior.AllowGet);
                return r;
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando el municipios en la vista agg cliente.", w);
                w.Close();
                return null;
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace PruebaArlington.Clases
{
    public class Funciones
    {
        public static string ruta = ConfigurationManager.AppSettings["RutaArchivoLogErrores"];

        public static void LogError(string ex, string logMessage, StreamWriter w)
        {
            w.Write("\r\nLog Entry : ");
            w.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
                DateTime.Now.ToLongDateString());
            w.WriteLine("   Exception   :{0}", ex);
            w.WriteLine("   Descripción :{0}", logMessage);
            w.WriteLine("-------------------------------");
        }
    }
}
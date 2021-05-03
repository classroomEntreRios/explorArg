using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExplorArg.Models.Login
{
    public class Respuesta
    {
        public int Resultado { get; set; }
        public object Datos { get; set; }
        public string Mensaje { get; set; }
        public Usuario DatosUsuario { get; set; }
        public DateTime FechaExpiracion { get; set; }
    }
}
using ExplorArg.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ExplorArg.Controllers
{
    public class UsuarioController : ApiController
    {
        ExplorArgEntities db = new ExplorArgEntities();


        [HttpGet]

        public IHttpActionResult  ObtenerUsuarios(){
            var usuarios = db.Usuario.ToList();
            return Ok(usuarios);
        }


        [HttpPost]
        public IHttpActionResult RegistrarUsuario(Usuario var)
        {
            string nombreU = var.Nombre.ToString();
            var usuarioRegistrado = db.Usuario.Where(x => x.Nombre == var.Nombre).FirstOrDefault();
            string nombreUsRegistrado;
            if (usuarioRegistrado != null)
            {
                 nombreUsRegistrado = usuarioRegistrado.Nombre.ToString();
            }else
            {
                nombreUsRegistrado = "";
            }
            

            if (var.Nombre == "" || var.Password == "" || var.Email == "")
            {
                return BadRequest("Complete todos los campos");
            }
            else if (nombreU == nombreUsRegistrado)
            {
                return BadRequest("El nombre de usuario ya existe");
            }
            else
            {
                db.Usuario.Add(var);
                db.SaveChanges();
                return Ok("Usuario creado correctamente");
            }
        }
    }
}

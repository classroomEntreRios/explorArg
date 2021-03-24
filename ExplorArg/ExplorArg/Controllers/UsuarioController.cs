using ExplorArg.Models;
using ExplorArg.Models.Login;
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

        // obtener lista de todos los usuarios
        [HttpGet]
        public IHttpActionResult  ObtenerUsuarios(){
            var usuarios = db.Usuario.ToList();
            return Ok(usuarios);
        }
        // busca usuario segun el email
        [HttpGet]
        public IHttpActionResult ObtenerUsuarios(string email)
        {
            var usuario = db.Usuario.Where(u => u.Email == email).FirstOrDefault();
            return Ok(usuario);
        }

        // registra un usuario si es que no existe previamente y si todos los campos están llenos.
        [HttpPost]
        public IHttpActionResult RegistrarUsuario(Usuario var)
        {
            // pasa el nombre del usuario a string para comparar
            string nombreU = var.Nombre.ToString();
            // busca un usuario en la bd segun datos ingresados
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
            // si el nombre de usuario ingresado ya existe devuelve un error
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

        //chequea si existe un usuario registrado con esos datos y devuelve 1 o 0 dependiendo de si existe o no
        [HttpPost]
        [Route("api/usuario/login")]
        public Respuesta AutenticarUsuario(Usuario val)
        {
            Respuesta oRespuesta = new Respuesta();

            try
            {
              var usuarioRegistrado = db.Usuario.Where(a => a.Email == val.Email && a.Password == val.Password).ToList();

                if (usuarioRegistrado.Count > 0)
                {
                    oRespuesta.Resultado = 1;
                    oRespuesta.Mensaje = "Login correcto";
                } 
                else
                {
                    oRespuesta.Resultado = 0;
                    oRespuesta.Mensaje = "Ocurrió un error";
                }
                return oRespuesta;
            }
            catch (Exception ex)
            {

                oRespuesta.Mensaje = "Ocurrió un error. Intente más tarde. Detalles del error:" + ex.Message;
                return oRespuesta;
            }

            
            
        }

    }
}

using ExplorArg.Models;
using ExplorArg.Models.Login;
using ExplorArg.Models.Registro;
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

        // Obtener lista de todos los usuarios registrados (testing)
        [HttpGet]
        public IHttpActionResult  ObtenerUsuarios(){
            var usuarios = db.Usuario.ToList();
            return Ok(usuarios);
        }

        // Obtener info. de un usuario en particular (dashboard)
        [HttpGet]
        public IHttpActionResult ObtenerUsuarios(string email)
        {
            var usuario = db.Usuario.Where(u => u.Email == email).FirstOrDefault();
            return Ok(usuario);
        }

        // Registro de nuevos usuarios
        [HttpPost]
        public IHttpActionResult RegistrarUsuario(Usuario var)
        {
            // encripta y actualiza el valor del password introducido por el usuario
            string oVarPass = Encrypt.GetSHA256(var.Password);
            var.Password = oVarPass;

            // variables para revisar que el usuario no existe y que todos los campos esten completos
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
                // si se pasan todos los chequeos se agrega el nuevo usuario

                var.isAdmin = false;

                db.Usuario.Add(var);
                db.SaveChanges();
                return Ok("Usuario creado correctamente");
            }
        }








/*
        [HttpGet]
        public Respuesta RandomData()
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.Mensaje = "Hola mundo";
            oRespuesta.Resultado = 1;
            return oRespuesta;
        }
*/

        [HttpPost]
        public Respuesta GenerarToken(string email, string password)
        {
            Respuesta oRespuesta = new Respuesta();

            using (ExplorArgEntities db = new ExplorArgEntities())
            {
                var regUserToken = db.Usuario.Where(a => a.Email == email && a.Password == password);

                if (regUserToken.Count() > 0)
                {
                    oRespuesta.Resultado = 1;
                    oRespuesta.Datos = Guid.NewGuid().ToString();

                    Usuario oUsuario = regUserToken.FirstOrDefault();
                    oUsuario.Token = oRespuesta.Datos.ToString();
                    db.Entry(oUsuario).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                }
                else
                {
                    oRespuesta.Resultado = 0;
                }
            }
            return oRespuesta;
        }
















        // Login o autenticación de usuario
        [HttpPost]
        [Route("api/usuario/login")]
        public Respuesta AutenticarUsuario(Usuario val)
        {
            Respuesta oRespuesta = new Respuesta();

            // encripta la passw ingresada por el usuario para revisar si coincide con la password encriptada anteriormente
            string oValPass = Encrypt.GetSHA256(val.Password);
            val.Password = oValPass;

            try
            {
                // revisa si existe un usuario que coincida con los datos aportados como parametro
              var usuarioRegistrado = db.Usuario.Where(a => a.Email == val.Email && a.Password == val.Password).ToList();

                if (usuarioRegistrado.Count > 0)
                {
                    oRespuesta.Resultado = 1;
                    oRespuesta.Mensaje = "Login correcto";


                    oRespuesta.Datos = Guid.NewGuid().ToString();

                    Usuario oUsuario = usuarioRegistrado.FirstOrDefault();
                    oUsuario.Token = oRespuesta.Datos.ToString();
                    db.Entry(oUsuario).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    
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

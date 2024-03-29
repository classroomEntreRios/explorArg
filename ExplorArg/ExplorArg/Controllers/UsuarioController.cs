﻿using ExplorArg.Models;
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




        // Login o autenticación de usuario
        [HttpPost]
        [Route("api/usuario/login")]
        public IHttpActionResult AutenticarUsuario([FromBody] Usuario val)
        {
            Respuesta oRespuesta = new Respuesta();

            // Encripta la password ingresada por el usuario para revisar si coincide con la password encriptada anteriormente
            string oValPass = Encrypt.GetSHA256(val.Password);
            val.Password = oValPass;

            try
            {
                // Revisa si existe un usuario que coincida con los datos aportados como parámetro
              var usuarioRegistrado = db.Usuario.Where(a => a.Email == val.Email && a.Password == val.Password).ToList();

                if (usuarioRegistrado.Count > 0)
                {
                    oRespuesta.Resultado = 1;
                    oRespuesta.Mensaje = "Login correcto";

                    // Crea un número aleatorio irrepetible
                    oRespuesta.Datos = Guid.NewGuid().ToString();

                    // Ingresa ese número en la columna 'Token' de un UsuarioRegistrado y lo guarda en BD
                    Usuario oUsuario = usuarioRegistrado.FirstOrDefault();
                    oUsuario.Token = oRespuesta.Datos.ToString();
                    oRespuesta.DatosUsuario = oUsuario;
                    oRespuesta.FechaExpiracion = DateTime.Now.AddDays(1);
                    db.Entry(oUsuario).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                } 
                else
                {
                    oRespuesta.Resultado = 0;
                    oRespuesta.Mensaje = "Ocurrió un error";
                    oRespuesta.DatosUsuario = null;
                }
                return Ok(oRespuesta);
            }
            catch (Exception ex)
            {
                oRespuesta.Mensaje = "Ocurrió un error. Intente más tarde. Detalles del error:" + ex.Message;
                return BadRequest();
            }     
            
        }

        // Modificar nombre.
        [HttpPut]
        [Route("api/usuario/editnombre")]
        public IHttpActionResult PutNombreUsuario( int id, string nombre)
        {
            try
            {
                var busqueda = db.Usuario.Where(u => u.id_usuarioReg == id).Count();
                if (busqueda > 0)
                {
                    var usuarioReg = db.Usuario.Where(u => u.id_usuarioReg == id).FirstOrDefault();
                    usuarioReg.Nombre = nombre;
                    db.SaveChanges();
                    return Ok(usuarioReg);
                }
                else
                {
                    return BadRequest("No se encontró un usuario que coincida con los datos aportados");
                }
            }
            catch (Exception ex)
            {

                throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
            }
        }

        // Modificar Email
        [HttpPut]
        [Route("api/usuario/editmail")]
        public IHttpActionResult PutEmail( int id, string email)
        {
            try
            {
                var busqueda = db.Usuario.Where(u => u.id_usuarioReg == id).Count();

                if (busqueda > 0)
                {
                    var usuarioReg = db.Usuario.Where(u => u.id_usuarioReg == id).FirstOrDefault();
                    usuarioReg.Email = email;
                    db.SaveChanges();
                    return Ok(usuarioReg);
                }
                else
                {
                    return BadRequest("No se encontró un usuario que coincida con los datos aportados");
                }
            }
            catch (Exception ex)
            {

                throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
            }
            
        }

        // Modificar contraseña
        [HttpPut]
        [Route("api/usuario/editpassw")]
        public IHttpActionResult PutContraseña( int id, string nuevoPass)
        {

            try
            {
                var busqueda = db.Usuario.Where(u => u.id_usuarioReg == id).Count();

                if (busqueda > 0)
                {
                    var usuarioReg = db.Usuario.Where(u => u.id_usuarioReg == id).FirstOrDefault();

                    usuarioReg.Password = Encrypt.GetSHA256(nuevoPass);
                    db.SaveChanges();
                    return Ok(usuarioReg);
                }
                else
                {
                    return BadRequest("No se encontró un usuario que coincida con los datos aportados");
                }
            }
            catch (Exception ex)
            {

                throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
            }
            
        }

        [HttpDelete]
        public IHttpActionResult delUsuario(int id)
        {
            try
            {
                var busqueda = db.Usuario.Where(u => u.id_usuarioReg == id).Count();
                if (busqueda > 0)
                {
                    var usuario = db.Usuario.Where(u => u.id_usuarioReg == id).FirstOrDefault();
                    db.Usuario.Remove(usuario);
                    db.SaveChanges();
                    return Ok(usuario);
                }
                else
                {
                    return BadRequest("El usuario seleccionado no existe");
                }
            }
            catch (Exception ex)
            {

                throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
            }
        }
    }
}

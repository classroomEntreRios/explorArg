using ExplorArg.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ExplorArg.Controllers
{
    public class BaseController : ApiController
    {
        public bool VerificarToken(string token)
        {
            using(ExplorArgEntities db = new ExplorArgEntities())
            {
                if (db.Usuario.Where(a => a.Token == token).Count() > 0)
                    return true;
            }
            return false;
        }
    }
}

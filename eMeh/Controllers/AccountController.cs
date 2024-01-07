using eMeh.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json.Nodes;

namespace eMeh.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        [HttpPost("login")]
        public ActionResult Login([FromBody] JsonValue userJson)
        {
            try
            {
                if (userJson == null)
                    throw new NullReferenceException("JsonValue received from the request body is null.");

                var user = Newtonsoft.Json.JsonConvert.DeserializeObject<User>(userJson.ToString());

                if (user == null)
                    throw new JsonException($"Failed to deserialize JSON: {nameof(userJson)}");

                //

                return Ok($"Successfully logged in.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public ActionResult Logout([FromBody] JsonValue userJson)
        {
            try
            {
                if (userJson == null)
                    throw new NullReferenceException("JsonValue received from the request body is null.");

                var user = Newtonsoft.Json.JsonConvert.DeserializeObject<User>(userJson.ToString());

                if (user == null)
                    throw new JsonException($"Failed to deserialize JSON: {nameof(userJson)}");

                //

                return Ok($"Successfully logged out.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task AuthorizeAsync(ActionContext actionContext, AuthorizationPolicy policy)
        {
            //var httpContext = actionContext.HttpContext;
            //var authenticateResult = await policyEvaluator.AuthenticateAsync(policy, httpContext);
            //var authorizeResult = await policyEvaluator.AuthorizeAsync(policy, authenticateResult, httpContext, actionContext.ActionDescriptor);
            //if (authorizeResult.Challenged)
            //{
            //    if (policy.AuthenticationSchemes.Count > 0)
            //    {
            //        foreach (var scheme in policy.AuthenticationSchemes)
            //        {
            //            await httpContext.ChallengeAsync(scheme);
            //        }
            //    }
            //    else
            //    {
            //        await httpContext.ChallengeAsync();
            //    }

            //    return;
            //}
            //else if (authorizeResult.Forbidden)
            //{
            //    if (policy.AuthenticationSchemes.Count > 0)
            //    {
            //        foreach (var scheme in policy.AuthenticationSchemes)
            //        {
            //            await httpContext.ForbidAsync(scheme);
            //        }
            //    }
            //    else
            //    {
            //        await httpContext.ForbidAsync();
            //    }

            //    return;
            //}
        }
    }
}

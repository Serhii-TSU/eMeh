using System;

namespace eMeh.Middleware
{
    public class ApiVersionMiddleware
    {
        private readonly RequestDelegate _next;

        public ApiVersionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            //var path = context.Request.Path.Value;

            //if (path.StartsWith("/api/orders/complete"))
            //{

            //    var hasPhoneNumberCookie = context.Request.Cookies["HasPhoneNumber"];
            //    bool hasPhoneNumber;

            //    if (bool.TryParse(hasPhoneNumberCookie, out bool parsedPhoneNumber))
            //    {
            //        hasPhoneNumber = parsedPhoneNumber;
            //    }
            //    else
            //    {
            //        hasPhoneNumber = false;
            //    }

            //    if (!hasPhoneNumber)
            //    {
            //        context.Response.Redirect(path + "?api-version=2.0", true);
            //        return;
            //    }
            //}

            await _next(context);
        }
    }
}

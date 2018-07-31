using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PruebaArlington.Startup))]
namespace PruebaArlington
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
           // ConfigureAuth(app);
        }
    }
}

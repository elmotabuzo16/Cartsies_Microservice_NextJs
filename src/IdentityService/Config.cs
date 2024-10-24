using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("auctionApp", "Auction app full access"),
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client
            {
                ClientId = "postman",
                ClientName = "Postman",
                ClientSecrets = new[] { new Secret ("NotASecret".Sha256()) },

                AllowedScopes = { "openid", "profile", "auctionApp" },
                RedirectUris = { "https://www.getpostman.com/oauth2/callback" },

                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword
            },
            
            new Client
            {
                ClientId = "nextApp",
                ClientName = "nextApp",
                ClientSecrets = new[] { new Secret ("secret".Sha256()) },

                AllowedScopes = { "openid", "profile", "auctionApp" },
                RedirectUris = { "https://www.localhost:3000.com/api/auth/callback/id-server" },
                AllowOfflineAccess = true,

                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                RequirePkce = false,
                AccessTokenLifetime = 3600*24*30,
                AlwaysIncludeUserClaimsInIdToken = true
            }

        };
}

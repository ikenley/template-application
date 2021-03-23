# TemplateAPI

Sample .NET Core API to be hosted in a Docker container

---

## Docker

- [docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-5.0)
- [Dockerfile based on](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md)

```
docker build -t template-api .
docker run --rm -it -p 3000:80 template-api
```

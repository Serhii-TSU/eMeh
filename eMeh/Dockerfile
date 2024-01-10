# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source
COPY . .
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm  
RUN dotnet restore "./eMeh/eMeh.csproj" --disable-parallel
RUN dotnet publish "./eMeh/eMeh.csproj" -c release -o /app --no-restore

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5000

ENTRYPOINT ["dotnet", "eMeh.dll"]

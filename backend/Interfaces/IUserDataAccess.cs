using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

public interface IUserDataAccess
{
    // Get data with generic response type
    Task<T> GetUserDataAsync<T>() where T : class;

    // Generic type for adding user data
    Task AddUserDataAsync<T>(T addDataRequestModel) where T : class;
}



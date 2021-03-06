﻿namespace Hiperion.Services.Interfaces
{
    #region References

    using System.Collections.Generic;
    using Models;

    #endregion

    public interface IUserServices
    {
        IEnumerable<UserDto> GetAllUsers();

        bool SaveOrUpdateUser(UserDto userDto);

        void DeleteUser(int id);

        bool SignUp(UserDto userDto);

        bool Login(string userName, string password);
    }
}
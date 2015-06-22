/**
 * Created by postepenno on 22.06.2015.
 */

app.factory('VKService', function () {
  return {
    get: function (userId, callback) {
      var fields = 'verified,sex,bdate,city,country,home_town,photo_50,photo_100,photo_200,photo_400_orig,online,domain,site,status,followers_count,relation'
      VK.Api.call('users.get', {uids:userId, fields:fields}, function(r) {
        if(r.response) {
          callback(r.response[0]);
        }
      });
    },

    login: function (success, error) {
      VK.Auth.login(function(response) {
        if (response.session) {
          console.log("success");
          success(response.session.user);
          if (response.settings) {
            /* Выбранные настройки доступа пользователя, если они были запрошены */
            console.log("settings");
          }
        } else {
          console.log("canceled");
          error();
        }
      });
    }
  }
})

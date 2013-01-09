// jQuery flavored settings for Builder
var settings = {
      'template engine': function (tmpl) {
        return tmpl;
      },
      'dom engine': function (content) {
        return $(content);
      }
    };
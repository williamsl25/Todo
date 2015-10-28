$(document).ready(function () {
  page.init();
});
var page = {
  deleteArticle: function (idx) {
    todoData.splice(idx,1);
    $('.todo').html('');
    page.loadArticles(todoData);
  },
  init: function () {
      page.initStyling();
      page.initEvents();
    },
  initStyling: function () {
      page.loadArticles(todoData);
      page.loadTemplate($('createTodoForm'), {}, $('#todoTmpl').html());
    },
  initEvents: function() {
    $('nav').on('click', 'a', function (event) {
        event.preventDefault();
        var sectionClass = '.' + $(this).attr('rel');
        var $pageSection = $(sectionClass);
        $pageSection.addClass('active-section');
        $pageSection.siblings('section').removeClass('active-section');

      });
      $('section').on('click', '.delete', function (event) {
        event.preventDefault();
        var todoId = $(this).closest('article').data('id');
        console.log(todoId);
        page.deleteTodo(todoId);
      });


      $('#createTodoForm').on('submit', function (event) {
          event.preventDefault();
          var newTodo = {
            title: $('input[name="newTodoInput"]').val(),
          };
          todoData.push(newTodo);

          var todoId = todoData.indexOf(newTodo);
          newTodo.id = todoId;
          page.loadTemplate($('.todo'), newTodo, $('#todoTmpl').html());
          $('.form input').val('');

        });
      },

    loadTemplate: function ($el, data, tmpl) {
    var template = _.template(tmpl);
    var html = template(data);
    $el.append(html);
    },
    loadArticles: function (arr) {
    _.each(arr, function (currEl, idx, arr) {
      currEl.id = idx;
      page.loadTemplate($('.todo'), currEl, $('#todoTmpl').html());
      });
    },

};
